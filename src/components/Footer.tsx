import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#E0DED8] px-6 sm:px-8 pt-10 pb-7">
      <div className="max-w-[980px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr_1fr] gap-8 mb-8">
          <div>
            <div className="font-mono-custom text-lg font-bold text-[#1A1A1A]">
              QR<span className="text-[#0066FF]">Craft</span>
            </div>
            <p className="text-[13px] text-[#7A7A7A] leading-[1.65] max-w-[260px] mt-2">
              A free, privacy-first QR code generator. Part of the ToolsFlow suite of web tools. Built in India 🇮🇳
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A7A7A] mb-3">
              Tool
            </h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <a href="#generator" className="text-[#1A1A1A] hover:text-[#0066FF] transition-colors">
                  QR Generator
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-[#1A1A1A] hover:text-[#0066FF] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#use-cases" className="text-[#1A1A1A] hover:text-[#0066FF] transition-colors">
                  Use Cases
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A7A7A] mb-3">
              Info
            </h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <a href="#about" className="text-[#1A1A1A] hover:text-[#0066FF] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#faq" className="text-[#1A1A1A] hover:text-[#0066FF] transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-[#1A1A1A] hover:text-[#0066FF] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="mailto:hello@toolsflow.in" className="text-[#1A1A1A] hover:text-[#0066FF] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#E0DED8] pt-5 flex justify-between items-center flex-wrap gap-2.5 text-xs text-[#7A7A7A] font-mono-custom">
          <p>© 2026 QRCraft by ToolsFlow · All QR codes generated locally · No data stored</p>
          <p>Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
};
