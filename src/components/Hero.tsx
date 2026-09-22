import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="text-center pt-14 pb-9 px-6 max-w-[680px] mx-auto">
      <div className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#0066FF] mb-3.5 font-bold">
        Free QR Code Generator
      </div>
      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-3.5 text-[#1A1A1A]">
        Paste a link.<br />
        <em className="not-italic text-[#0066FF]">Get a QR code.</em>
      </h1>
      <p className="text-base text-[#7A7A7A] leading-[1.65] max-w-[520px] mx-auto">
        Works for URLs, WiFi, email, phone, vCard and plain text. Download PNG or SVG — free forever, no watermark, no signup.
      </p>
      <div className="flex justify-center gap-5 mt-5 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-[#7A7A7A] font-medium">
          <span className="text-emerald-600">✅</span> No signup
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#7A7A7A] font-medium">
          <span>🔒</span> Nothing stored
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#7A7A7A] font-medium">
          <span>🚫</span> No watermark
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#7A7A7A] font-medium">
          <span>⚡</span> Works offline
        </div>
      </div>
    </section>
  );
};
