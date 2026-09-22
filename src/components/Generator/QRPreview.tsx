import React, { useRef } from 'react';
import { QRCustomizeOptions } from '../../types';
import { generateHighResPngDataUrl, generateSvgString } from '../../utils/qrBuilder';

interface QRPreviewProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  generatedContent: string | null;
  hasGenerated: boolean;
  options: QRCustomizeOptions;
  onShowToast: (msg: string) => void;
}

export const QRPreview: React.FC<QRPreviewProps> = ({
  canvasRef,
  generatedContent,
  hasGenerated,
  options,
  onShowToast,
}) => {
  const downloadAnchorRef = useRef<HTMLAnchorElement | null>(null);

  const handleDownloadPng = async () => {
    if (!generatedContent) return;
    try {
      const dataUrl = await generateHighResPngDataUrl(generatedContent, options);
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `qrcraft-${options.size}x${options.size}.png`;
      a.click();
      onShowToast('PNG downloaded!');
    } catch {
      onShowToast('Failed to generate PNG download.');
    }
  };

  const handleDownloadSvg = async () => {
    if (!generatedContent) return;
    try {
      const svgString = await generateSvgString(generatedContent, options);
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `qrcraft-${options.size}x${options.size}.svg`;
      a.click();
      URL.revokeObjectURL(blobUrl);
      onShowToast('SVG downloaded!');
    } catch {
      onShowToast('Failed to generate SVG download.');
    }
  };

  const handleCopyQr = async () => {
    if (!generatedContent || !canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) {
          onShowToast('Copy not supported — use Download instead.');
          return;
        }
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          onShowToast('Copied to clipboard!');
        } catch {
          onShowToast('Copy not supported on this browser — use Download instead.');
        }
      });
    } catch {
      onShowToast('Copy not supported — use Download instead.');
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white border border-[#E0DED8] rounded-xl p-6">
        <div className="font-mono-custom text-[10px] tracking-[2px] uppercase text-[#7A7A7A] mb-3.5 font-bold">
          Preview
        </div>

        <div className="flex items-center justify-center min-h-[240px] bg-[#F7F6F2] rounded-lg p-5 mb-3">
          <div className="flex items-center justify-center">
            {hasGenerated && generatedContent ? (
              <canvas
                ref={canvasRef}
                id="qr-canvas"
                className="rounded-md max-w-full h-auto shadow-sm"
              />
            ) : (
              <div className="flex flex-col items-center gap-2.5 text-[#7A7A7A]">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="opacity-25">
                  <rect x="4" y="4" width="28" height="28" rx="4" stroke="#1A1A1A" strokeWidth="4" />
                  <rect x="12" y="12" width="12" height="12" rx="2" fill="#1A1A1A" />
                  <rect x="48" y="4" width="28" height="28" rx="4" stroke="#1A1A1A" strokeWidth="4" />
                  <rect x="56" y="12" width="12" height="12" rx="2" fill="#1A1A1A" />
                  <rect x="4" y="48" width="28" height="28" rx="4" stroke="#1A1A1A" strokeWidth="4" />
                  <rect x="12" y="56" width="12" height="12" rx="2" fill="#1A1A1A" />
                  <rect x="48" y="48" width="8" height="8" rx="1" fill="#1A1A1A" />
                  <rect x="60" y="48" width="8" height="8" rx="1" fill="#1A1A1A" />
                  <rect x="48" y="60" width="8" height="8" rx="1" fill="#1A1A1A" />
                  <rect x="60" y="60" width="8" height="8" rx="1" fill="#1A1A1A" />
                </svg>
                <p className="text-[13px]">Your QR code appears here</p>
              </div>
            )}
          </div>
        </div>

        <div
          id="qrMeta"
          className="font-mono-custom text-[11px] text-[#7A7A7A] text-center min-h-[16px]"
        >
          {hasGenerated && generatedContent
            ? `${generatedContent.length} chars · EC: ${options.ecLevel} · ${options.size}×${options.size}px`
            : ''}
        </div>

        <div className="flex gap-2 mt-3.5">
          <button
            id="dlPng"
            type="button"
            onClick={handleDownloadPng}
            disabled={!hasGenerated || !generatedContent}
            className="flex-1 font-sans-custom text-[13px] font-semibold py-2.5 px-2 rounded-lg bg-[#0066FF] hover:bg-[#0052cc] text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all text-center whitespace-nowrap"
          >
            ↓ PNG
          </button>
          <button
            id="dlSvg"
            type="button"
            onClick={handleDownloadSvg}
            disabled={!hasGenerated || !generatedContent}
            className="flex-1 font-sans-custom text-[13px] font-semibold py-2.5 px-2 rounded-lg border-[1.5px] border-[#E0DED8] hover:border-[#1A1A1A] text-[#1A1A1A] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all text-center whitespace-nowrap"
          >
            ↓ SVG
          </button>
          <button
            id="copyBtn"
            type="button"
            onClick={handleCopyQr}
            disabled={!hasGenerated || !generatedContent}
            className="flex-1 font-sans-custom text-[13px] font-semibold py-2.5 px-2 rounded-lg border-[1.5px] border-[#E0DED8] hover:border-[#1A1A1A] text-[#1A1A1A] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all text-center whitespace-nowrap"
          >
            ⧉ Copy
          </button>
        </div>
      </div>

      {/* Quick Tips card */}
      <div className="bg-white border border-[#E0DED8] rounded-xl p-6 mt-4">
        <div className="font-mono-custom text-[10px] tracking-[2px] uppercase text-[#7A7A7A] mb-3.5 font-bold">
          Quick Tips
        </div>
        <div className="flex flex-col gap-2.5 text-[13px] text-[#7A7A7A] leading-[1.6]">
          <div>
            📐 <strong className="text-[#1A1A1A]">Print:</strong> Use 256px+ for flyers; 300px+ for posters.
          </div>
          <div>
            🎨 <strong className="text-[#1A1A1A]">Contrast:</strong> Dark dots on light background scans best.
          </div>
          <div>
            🔒 <strong className="text-[#1A1A1A]">Logo overlay:</strong> Set error correction to Max first.
          </div>
          <div>
            📶 <strong className="text-[#1A1A1A]">WiFi QR:</strong> Guests join without typing a password.
          </div>
          <div>
            👤 <strong className="text-[#1A1A1A]">vCard:</strong> Scan to save contact — great for biz cards.
          </div>
        </div>
      </div>

      <a ref={downloadAnchorRef} className="hidden" aria-hidden="true" />
    </div>
  );
};
