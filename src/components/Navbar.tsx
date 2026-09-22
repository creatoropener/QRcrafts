import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav
      id="site-nav"
      className="sticky top-0 z-50 flex items-center justify-between px-6 sm:px-8 py-4 bg-white border-b border-[#E0DED8]"
    >
      <a href="#generator" className="font-mono-custom text-lg font-bold text-[#1A1A1A] no-underline hover:no-underline">
        QR<span className="text-[#0066FF]">Craft</span>
      </a>

      <div className="hidden sm:flex items-center gap-6">
        <a
          href="#generator"
          className="text-xs font-medium text-[#7A7A7A] hover:text-[#0066FF] transition-colors"
        >
          Generator
        </a>
        <a
          href="#how-it-works"
          className="text-xs font-medium text-[#7A7A7A] hover:text-[#0066FF] transition-colors"
        >
          How It Works
        </a>
        <a
          href="#use-cases"
          className="text-xs font-medium text-[#7A7A7A] hover:text-[#0066FF] transition-colors"
        >
          Use Cases
        </a>
        <a
          href="#faq"
          className="text-xs font-medium text-[#7A7A7A] hover:text-[#0066FF] transition-colors"
        >
          FAQ
        </a>
        <a
          href="#privacy"
          className="text-xs font-medium text-[#7A7A7A] hover:text-[#0066FF] transition-colors"
        >
          Privacy
        </a>
      </div>

      <div className="flex items-center gap-3">
        <a
          id="btn-download-zip"
          href="/qrcrafts-react.zip"
          download="qrcrafts-react.zip"
          className="font-mono-custom text-[11px] font-bold text-[#0066FF] border border-[#0066FF] hover:bg-[#0066FF] hover:text-white px-2.5 py-1 rounded transition-colors flex items-center gap-1.5"
          title="Download complete project ZIP"
        >
          <span>📦</span>
          <span>Source ZIP</span>
        </a>
        <div className="hidden md:block font-mono-custom text-[11px] font-semibold tracking-widest uppercase text-[#7A7A7A]">
          Free · No Signup
        </div>
      </div>
    </nav>
  );
};
