import io
import tempfile
import unittest
from types import SimpleNamespace
from pathlib import Path
from unittest.mock import Mock, patch

from proof import (
    PatchProofError,
    InferenceError,
    _empty_response_details,
    _message_text,
    extract_json_object,
    model_json,
    render_report,
    validate_candidate,
)
from runtimes import detect_runtime


class JsonExtractionTests(unittest.TestCase):
    def test_extracts_fenced_json(self):
        value = extract_json_object('result:\n```json\n{"ok": true}\n```')
        self.assertEqual(value, {"ok": True})

    def test_extracts_json_after_reasoning(self):
        value = extract_json_object('thinking first\n{"value": 3}\nfinished')
        self.assertEqual(value["value"], 3)

    def test_extracts_multipart_message_text(self):
        message = SimpleNamespace(content=[{"type": "text", "text": '{"ok":'},
                                           SimpleNamespace(type="text", text=" true}")])
        self.assertEqual(_message_text(message), '{"ok": true}')

    def test_empty_response_details_are_safe_and_useful(self):
        response = SimpleNamespace(
            choices=[SimpleNamespace(finish_reason="length", message=SimpleNamespace(
                content="", refusal=None, reasoning_content="private reasoning"))],
            usage=SimpleNamespace(completion_tokens=6000),
        )
        details = _empty_response_details(response)
        self.assertIn("finish_reason=length", details)
        self.assertIn("completion_tokens=6000", details)
        self.assertIn("reasoning_chars=17", details)
        self.assertNotIn("private reasoning", details)

    def test_model_json_falls_back_when_structured_response_is_empty(self):
        empty = SimpleNamespace(
            choices=[SimpleNamespace(finish_reason="stop", message=SimpleNamespace(
                content="", refusal=None, reasoning_content="thinking"))],
            usage=SimpleNamespace(completion_tokens=12000),
        )
        valid = SimpleNamespace(
            choices=[SimpleNamespace(finish_reason="stop", message=SimpleNamespace(
                content='{"ok": true}', refusal=None, reasoning_content=None))],
            usage=SimpleNamespace(completion_tokens=10),
        )
        completions = SimpleNamespace(create=Mock(
            side_effect=[empty, valid]))
        client = Mock()
        client.__enter__ = Mock(return_value=SimpleNamespace(chat=SimpleNamespace(completions=completions)))
        client.__exit__ = Mock(return_value=False)
        fake_module = SimpleNamespace(OpenAI=Mock(return_value=client),
                                      APIStatusError=FakeStatusError, APIConnectionError=FakeConnectionError)
        with patch.dict("sys.modules", {"openai": fake_module}), \
             patch.dict("os.environ", {}, clear=True), patch("proof.time.sleep"):
            self.assertEqual(model_json(api_key="key", model="model", system="s",
                                        user="u", temperature=0.1), {"ok": True})
        self.assertEqual(completions.create.call_count, 2)
        self.assertIn("response_format", completions.create.call_args_list[0].kwargs)
        self.assertNotIn("response_format", completions.create.call_args_list[1].kwargs)


class FakeStatusError(Exception):
    def __init__(self, status, body=None):
        super().__init__("PRIVATE_PROVIDER_BODY_AND_KEY")
        self.status_code = status
        self.body = body


class FakeConnectionError(Exception):
    pass


def completion(content='{"ok": true}', reason="stop", refusal=None, choices=True):
    return SimpleNamespace(
        choices=[SimpleNamespace(finish_reason=reason, message=SimpleNamespace(
            content=content, refusal=refusal, reasoning_content="PRIVATE_REASONING"))] if choices else [],
        usage=SimpleNamespace(completion_tokens=12000),
    )


class InferenceReliabilityTests(unittest.TestCase):
    def invoke(self, responses, expected_error=None, env=None):
        create = Mock(side_effect=responses)
        sdk = Mock()
        sdk.__enter__ = Mock(return_value=SimpleNamespace(chat=SimpleNamespace(completions=SimpleNamespace(create=create))))
        sdk.__exit__ = Mock(return_value=False)
        factory = Mock(return_value=sdk)
        module = SimpleNamespace(OpenAI=factory, APIStatusError=FakeStatusError,
                                 APIConnectionError=FakeConnectionError)
        with patch.dict("sys.modules", {"openai": module}), \
             patch.dict("os.environ", env or {}, clear=True), patch("proof.time.sleep"), \
             patch("sys.stderr", new_callable=io.StringIO) as log:
            if expected_error:
                with self.assertRaisesRegex(InferenceError, expected_error) as raised:
                    model_json(api_key="PRIVATE_KEY", model="model", system="PRIVATE_PROMPT", user="PRIVATE_SOURCE", temperature=0.1)
                output = str(raised.exception) + log.getvalue()
            else:
                self.assertEqual(model_json(api_key="key", model="model", system="s", user="u", temperature=0.1), {"ok": True})
                output = log.getvalue()
        for marker in ("PRIVATE_KEY", "PRIVATE_PROMPT", "PRIVATE_SOURCE", "PRIVATE_PROVIDER_BODY_AND_KEY", "PRIVATE_REASONING", "PRIVATE_REFUSAL"):
            self.assertNotIn(marker, output)
        if factory.called:
            self.assertEqual(factory.call_args.kwargs["max_retries"], 0)
            sdk.__exit__.assert_called_once()
        return create, factory

    def test_valid_json_needs_one_request(self):
        create, _ = self.invoke([completion()])
        self.assertEqual(create.call_count, 1)

    def test_truncated_even_parseable_json_is_rejected(self):
        for content in ('{"ok": true}', "", '{"nested":{"ok":true},'):
            with self.subTest(content=content):
                create, _ = self.invoke([completion(content, reason="length")], "completion limit")
                self.assertEqual(create.call_count, 1)

    def test_refusal_and_filter_never_fall_back(self):
        for response in (completion(refusal="PRIVATE_REFUSAL"), completion(reason="content_filter"),
                         completion(content=[{"type":"refusal", "refusal":"PRIVATE_REFUSAL"}])):
            with self.subTest(response=response):
                create, _ = self.invoke([response], "declined")
                self.assertEqual(create.call_count, 1)

    def test_missing_choices_have_clear_diagnostics(self):
        create, _ = self.invoke([completion(choices=False), completion(choices=False)], "choices=0")
        self.assertEqual(create.call_count, 2)

    def test_missing_message_has_no_attribute_error(self):
        self.invoke([SimpleNamespace(choices=[SimpleNamespace(finish_reason="stop")]), completion()])

    def test_no_auth_or_unrelated_bad_request_fallback(self):
        for status in (400, 401, 403, 404, 422):
            with self.subTest(status=status):
                create, _ = self.invoke([FakeStatusError(status)], f"HTTP {status}")
                self.assertEqual(create.call_count, 1)

    def test_only_explicit_unsupported_format_changes_mode(self):
        body = {"error": {"param":"response_format", "code":"unsupported_parameter"}}
        create, _ = self.invoke([FakeStatusError(400, body), completion()])
        self.assertNotIn("response_format", create.call_args_list[1].kwargs)

    def test_invalid_format_schema_is_not_unsupported(self):
        body = {"param":"response_format", "message":"Invalid schema", "code":"invalid_value"}
        create, _ = self.invoke([FakeStatusError(400, body)], "HTTP 400")
        self.assertEqual(create.call_count, 1)

    def test_transient_errors_keep_format_and_stop_after_three(self):
        for error in (FakeStatusError(429), FakeStatusError(503), FakeConnectionError("PRIVATE_KEY")):
            with self.subTest(error=type(error)):
                create, _ = self.invoke([error, error, error], "after 3 requests")
                self.assertEqual(create.call_count, 3)
                self.assertTrue(all("response_format" in call.kwargs for call in create.call_args_list))

    def test_transient_error_can_recover(self):
        create, _ = self.invoke([FakeStatusError(503), completion()])
        self.assertEqual(create.call_count, 2)

    def test_invalid_json_falls_back_once(self):
        create, _ = self.invoke([completion("malformed"), completion("still malformed")], "invalid final JSON")
        self.assertEqual(create.call_count, 2)

    def test_format_fallback_and_transients_share_budget(self):
        create, _ = self.invoke([completion(""), FakeStatusError(503), FakeStatusError(503)], "after 3 requests")
        self.assertEqual(create.call_count, 3)

    def test_invalid_budget_fails_before_client_creation(self):
        for value in ("", "NaN", "999", "32001"):
            with self.subTest(value=value):
                create, factory = self.invoke([], "NEBIUS_MAX_TOKENS", {"NEBIUS_MAX_TOKENS":value})
                create.assert_not_called()
                factory.assert_not_called()

    def test_configured_budget_is_not_raised(self):
        create, _ = self.invoke([completion()], env={"NEBIUS_MAX_TOKENS":"1000"})
        self.assertEqual(create.call_args.kwargs["max_tokens"], 1000)

    def test_unknown_finish_reason_is_not_logged_verbatim(self):
        self.invoke([completion(reason="PRIVATE_SOURCE")], "finish_reason=unknown")

    def test_reasoning_is_never_used_as_final_json(self):
        create, _ = self.invoke([completion(""), completion("")], "no final content")
        self.assertEqual(create.call_count, 2)
        with self.assertRaises(PatchProofError):
            extract_json_object('<think>{"ok":true}')
        self.assertEqual(extract_json_object('<think>{"wrong":true}</think>{"ok":true}'), {"ok":True})
        self.assertEqual(extract_json_object('{"tag":"<think>"}'), {"tag":"<think>"})

    def test_malformed_outer_json_is_not_salvaged_from_nested_object(self):
        with self.assertRaises(PatchProofError):
            extract_json_object('{"outer":{"ok": true}, "unfinished":')


class CandidateValidationTests(unittest.TestCase):
    def test_accepts_allowed_source_replacement(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "calculator.py").write_text("VALUE = 0\n", encoding="utf-8")
            adapter = detect_runtime(root)
            changes, summary = validate_candidate(
                {
                    "summary": "Fix edge case",
                    "edits": [
                        {
                            "path": "calculator.py",
                            "old": "VALUE = 0",
                            "new": "VALUE = 1",
                        }
                    ],
                },
                {"calculator.py"},
                root,
                adapter,
            )
            self.assertEqual(summary, "Fix edge case")
            self.assertEqual(changes[0]["path"], "calculator.py")
            self.assertEqual(changes[0]["content"], "VALUE = 1\n")

    def test_accepts_small_edit_in_large_html_file(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            html = "<html><script>function value() { return 0; }</script></html>"
            (root / "index.html").write_text(html, encoding="utf-8")
            adapter = detect_runtime(root)
            changes, _ = validate_candidate(
                {
                    "summary": "Correct web behavior",
                    "edits": [
                        {
                            "path": "index.html",
                            "old": "return 0;",
                            "new": "return 1;",
                        }
                    ],
                },
                {"index.html"},
                root,
                adapter,
            )
            self.assertIn("return 1;", changes[0]["content"])
            self.assertNotIn("return 0;", changes[0]["content"])

    def test_rejects_regression_test_edit(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "calculator.py").write_text("VALUE = 0\n", encoding="utf-8")
            adapter = detect_runtime(root)
            with self.assertRaises(PatchProofError):
                validate_candidate(
                    {
                        "summary": "Cheat",
                        "edits": [
                            {
                                "path": "test_patchproof_issue_1.py",
                                "old": "assert False",
                                "new": "assert True",
                            }
                        ],
                    },
                    {"calculator.py"},
                    root,
                    adapter,
                )


class ReportTests(unittest.TestCase):
    def test_verified_report_contains_evidence(self):
        report = render_report(
            {
                "verdict": "verified",
                "issue": {"number": 1, "title": "Bug"},
                "model": "nvidia/example",
                "sandbox": {"base_image": "image-1"},
                "regression_test": {
                    "path": "test_patchproof_issue_1.py",
                    "failed_before_fix": True,
                    "protected": True,
                },
                "candidates": [
                    {
                        "candidate": index,
                        "passed": index == 2,
                        "test_protected": True,
                        "changed_files": ["calculator.py"],
                        "duration_seconds": 1.0,
                        "image": f"candidate-image-{index}",
                    }
                    for index in range(1, 4)
                ],
                "winner": {"candidate": 2, "summary": "Fix"},
                "clean_replay": {"passed": True, "tests_passed": 6},
            }
        )
        self.assertIn("VERIFIED", report)
        self.assertIn("PatchProof v0.5.2", report)
        self.assertIn("Candidate sandbox branches evaluated: 3", report)
        self.assertIn("Winner replayed from the clean base image", report)


if __name__ == "__main__":
    unittest.main()
