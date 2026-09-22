import React from 'react';

export const PrivacySection: React.FC = () => {
  return (
    <section id="privacy" className="max-w-[980px] mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <div className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#0066FF] mb-2.5 font-bold">
          Privacy Policy
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A]">
          We collect nothing. Here's the proof.
        </h2>
        <p className="text-[15px] text-[#7A7A7A] mt-2.5 leading-[1.65] max-w-[540px] mx-auto">
          Short version: your data never leaves your browser. Long version below.
        </p>
      </div>

      <div className="bg-white border border-[#E0DED8] rounded-xl p-6 sm:p-9">
        <div className="inline-flex items-center gap-1.5 bg-[#dcfce7] text-[#16a34a] text-[11px] font-bold py-1 px-3 rounded-full mb-6 tracking-wide">
          🔒 Effective: July 2026 · Applies to toolsflow.in/qr and QRCraft
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-[#1A1A1A] mb-1.5">📌 What we collect</h3>
            <p className="text-[13px] text-[#7A7A7A] leading-[1.7]">
              <strong className="text-[#1A1A1A]">Nothing.</strong> QRCraft does not collect, store,
              transmit, or process any personal data. The content you enter — URLs, WiFi
              credentials, contact details, or any text — is processed entirely within your browser
              and never sent to any server.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#1A1A1A] mb-1.5">
              🌐 How QR codes are generated
            </h3>
            <p className="text-[13px] text-[#7A7A7A] leading-[1.7]">
              All QR codes are created locally in your browser using modern client-side open-source
              technology. No API calls are made during generation. Open your browser's Network tab
              while generating a code — you will see zero requests to our servers.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#1A1A1A] mb-1.5">🍪 Cookies & tracking</h3>
            <p className="text-[13px] text-[#7A7A7A] leading-[1.7]">
              QRCraft does not use tracking cookies, analytics scripts, fingerprinting, or any
              third-party tracking tools. The only cookie-like behaviour is a small{' '}
              <code className="bg-[#F7F6F2] px-1 py-0.5 rounded text-[#1A1A1A]">localStorage</code>{' '}
              flag to remember your consent choice so the banner doesn't re-appear on every visit.
              No personal data is stored in this flag.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#1A1A1A] mb-1.5">
              🔤 Google Fonts (third-party resource)
            </h3>
            <p className="text-[13px] text-[#7A7A7A] leading-[1.7]">
              This site loads fonts from Google Fonts (fonts.googleapis.com). Your browser makes a
              request to Google's servers to fetch these fonts. This is subject to{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0066FF] hover:underline"
              >
                Google's Privacy Policy
              </a>
              . No content you enter into QRCraft is shared with Google. If you prefer, you can use
              the site with system fonts by blocking Google Fonts in your browser.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#1A1A1A] mb-1.5">
              👶 Children's privacy (COPPA / DPDP Act / GDPR)
            </h3>
            <p className="text-[13px] text-[#7A7A7A] leading-[1.7]">
              QRCraft is not directed at children under 13 and is not designed to appeal to children.
              We do not knowingly collect, request, or store personal data from anyone, regardless of
              age. Since no personal data is collected at any point, there is no data to be exposed if
              a child under 13 uses this tool. This approach satisfies the core intent of India's
              Digital Personal Data Protection Act 2023 (DPDP), the US Children's Online Privacy
              Protection Act (COPPA), and the EU GDPR — all of which are primarily concerned with the
              collection and processing of personal data, not the mere act of using a calculator-like
              utility. Parents and guardians are welcome to supervise use of this tool as with any
              website.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#1A1A1A] mb-1.5">
              🇮🇳 India — DPDP Act 2023 compliance note
            </h3>
            <p className="text-[13px] text-[#7A7A7A] leading-[1.7]">
              India's Digital Personal Data Protection Act was notified on 13 November 2025. Full
              enforcement begins May 2027. Since QRCraft collects no personal data and uses no cookies
              for tracking, the Act's consent and data processing obligations do not apply to us.
              However, we display a consent notice for transparency around third-party font loading
              (Google Fonts), which may be considered a minor data touch-point.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#1A1A1A] mb-1.5">
              🌍 International users (GDPR / CCPA)
            </h3>
            <p className="text-[13px] text-[#7A7A7A] leading-[1.7]">
              For EU users under GDPR and California users under CCPA/CPRA: since QRCraft collects no
              personal data and uses no tracking, most obligations under these laws do not apply. We
              display a consent banner for transparency. You can always continue using the tool
              without accepting, as no tracking occurs either way.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#1A1A1A] mb-1.5">📬 Contact</h3>
            <p className="text-[13px] text-[#7A7A7A] leading-[1.7]">
              Questions? Email{' '}
              <a href="mailto:hello@toolsflow.in" className="text-[#0066FF] hover:underline">
                hello@toolsflow.in
              </a>
              . We aim to respond within 48 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
