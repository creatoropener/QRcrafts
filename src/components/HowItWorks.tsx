import React from 'react';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="max-w-[980px] mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <div className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#0066FF] mb-2.5 font-bold">
          How It Works
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A]">
          Three steps. Five seconds.
        </h2>
        <p className="text-[15px] text-[#7A7A7A] mt-2.5 leading-[1.65] max-w-[540px] mx-auto">
          No account. No credit card. No hidden steps. Just generate and download.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-[#E0DED8] rounded-xl p-6">
          <div className="font-mono-custom text-[11px] font-bold text-[#0066FF] tracking-wide mb-2.5">
            STEP 01
          </div>
          <div className="text-3xl mb-2.5">✏️</div>
          <h3 className="text-[15px] font-bold text-[#1A1A1A] mb-1.5">Enter your content</h3>
          <p className="text-[13px] text-[#7A7A7A] leading-[1.6]">
            Pick a QR type — URL, WiFi, vCard, email, phone, or plain text — and fill in the details.
          </p>
        </div>

        <div className="bg-white border border-[#E0DED8] rounded-xl p-6">
          <div className="font-mono-custom text-[11px] font-bold text-[#0066FF] tracking-wide mb-2.5">
            STEP 02
          </div>
          <div className="text-3xl mb-2.5">🎨</div>
          <h3 className="text-[15px] font-bold text-[#1A1A1A] mb-1.5">Customise (optional)</h3>
          <p className="text-[13px] text-[#7A7A7A] leading-[1.6]">
            Choose colours, set the size (128–512px), and pick an error correction level. Or skip and use the defaults.
          </p>
        </div>

        <div className="bg-white border border-[#E0DED8] rounded-xl p-6">
          <div className="font-mono-custom text-[11px] font-bold text-[#0066FF] tracking-wide mb-2.5">
            STEP 03
          </div>
          <div className="text-3xl mb-2.5">⬇️</div>
          <h3 className="text-[15px] font-bold text-[#1A1A1A] mb-1.5">Download & use</h3>
          <p className="text-[13px] text-[#7A7A7A] leading-[1.6]">
            Click Generate, then download as PNG or SVG — or copy directly to clipboard.
          </p>
        </div>

        <div className="bg-white border border-[#E0DED8] rounded-xl p-6">
          <div className="font-mono-custom text-[11px] font-bold text-[#0066FF] tracking-wide mb-2.5">
            BEHIND THE SCENES
          </div>
          <div className="text-3xl mb-2.5">🔐</div>
          <h3 className="text-[15px] font-bold text-[#1A1A1A] mb-1.5">Everything stays local</h3>
          <p className="text-[13px] text-[#7A7A7A] leading-[1.6]">
            All QR generation happens in your browser using open-source libraries. Your data never leaves your device.
          </p>
        </div>
      </div>
    </section>
  );
};
