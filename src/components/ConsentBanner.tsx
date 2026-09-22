import React, { useState, useEffect } from 'react';

export const ConsentBanner: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('qrc-consent');
      if (!consent) {
        setVisible(true);
      }
    } catch {
      // In case localStorage is blocked in some iframes
      setVisible(false);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('qrc-consent', '1');
    } catch {
      // ignore
    }
    setVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('qrc-consent', '0');
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      id="consent-banner"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-[#E0DED8] p-4 sm:px-7 py-4 flex items-center justify-between gap-5 flex-wrap shadow-lg"
    >
      <div className="flex-1 min-w-[260px] text-[13px] text-[#7A7A7A] leading-[1.6]">
        <strong className="text-[#1A1A1A]">🍪 We respect your privacy.</strong> This site uses
        Google Fonts (loaded from Google's servers) to display text. No tracking cookies, no
        analytics, no ads — your QR code data never leaves your browser.{' '}
        <a href="#privacy" onClick={handleDecline} className="text-[#0066FF] hover:underline">
          Read our Privacy Policy
        </a>
      </div>
      <div className="flex items-center gap-2.5 flex-shrink-0 flex-wrap">
        <button
          type="button"
          onClick={handleDecline}
          className="font-sans-custom text-[13px] font-semibold py-2 px-4 rounded-lg border-[1.5px] border-[#E0DED8] text-[#1A1A1A] hover:border-[#1A1A1A] transition-all cursor-pointer"
        >
          Continue without accepting
        </button>
        <button
          type="button"
          onClick={handleAccept}
          className="font-sans-custom text-[13px] font-semibold py-2 px-4 rounded-lg bg-[#0066FF] hover:bg-[#0052cc] text-white transition-all cursor-pointer"
        >
          Got it, OK
        </button>
      </div>
    </div>
  );
};
