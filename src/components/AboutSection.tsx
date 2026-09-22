import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="max-w-[980px] mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#0066FF] mb-2.5 font-bold">
            About QRCraft
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] leading-snug mb-3.5">
            Built for people who just need a QR code — fast.
          </h2>
          <p className="text-sm text-[#7A7A7A] leading-[1.75] mb-3">
            Most QR generators ask you to sign up, show ads, add watermarks, or charge for basic features. QRCraft does none of that.
          </p>
          <p className="text-sm text-[#7A7A7A] leading-[1.75] mb-3">
            All encoding happens right in your browser using modern client-side open-source standards. No account, no server, no tracking.
          </p>
          <p className="text-sm text-[#7A7A7A] leading-[1.75]">
            QRCraft is part of <strong>ToolsFlow</strong> — a collection of free, focused web tools for everyday tasks. We believe the best tools get out of your way.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-[#E0DED8] rounded-xl p-5 text-center">
            <div className="font-mono-custom text-3xl font-bold text-[#0066FF]">6</div>
            <div className="text-xs text-[#7A7A7A] mt-1 font-medium">QR types supported</div>
          </div>
          <div className="bg-white border border-[#E0DED8] rounded-xl p-5 text-center">
            <div className="font-mono-custom text-3xl font-bold text-[#0066FF]">0</div>
            <div className="text-xs text-[#7A7A7A] mt-1 font-medium">Server requests made</div>
          </div>
          <div className="bg-white border border-[#E0DED8] rounded-xl p-5 text-center">
            <div className="font-mono-custom text-3xl font-bold text-[#0066FF]">100%</div>
            <div className="text-xs text-[#7A7A7A] mt-1 font-medium">Free, forever</div>
          </div>
          <div className="bg-white border border-[#E0DED8] rounded-xl p-5 text-center">
            <div className="font-mono-custom text-3xl font-bold text-[#0066FF]">0KB</div>
            <div className="text-xs text-[#7A7A7A] mt-1 font-medium">Data sent to us</div>
          </div>
        </div>
      </div>
    </section>
  );
};
