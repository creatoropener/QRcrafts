import React, { useState } from 'react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Is QRCraft really free?',
      a: 'Yes, completely. All features — all QR types, custom colours, PNG and SVG download — are free with no hidden limits, trial period, or credit card.',
    },
    {
      q: 'Do I need to create an account?',
      a: 'No account, no login, no email. Open the page, generate a QR code, download it.',
    },
    {
      q: 'Is the QR code unique to my content?',
      a: "The same content always produces the same QR code — that's how QR codes work (deterministic encoding). Two people entering the same URL get identical codes. Any change in content produces a completely different code. Uniqueness comes from your content, just like a barcode.",
    },
    {
      q: 'Do my QR codes expire?',
      a: 'No. QRCraft generates static QR codes — they are permanent as long as the URL or content you encoded stays live. No monthly fee, no expiry.',
    },
    {
      q: 'Is it legal to generate QR codes?',
      a: 'Yes, completely legal. The QR code format was invented by Denso Wave in 1994, and they voluntarily waived all patent rights globally. The qrcode library is MIT licensed — free for commercial use.',
    },
    {
      q: "What's the difference between error correction levels?",
      a: 'Error correction allows a QR code to scan even when partially damaged or covered. Levels: L (7% recovery), M (15%), Q (25%), H (30%). Use M for most purposes. Use H if you plan to add a logo over the centre.',
    },
    {
      q: 'What size should I use for print?',
      a: 'Business cards and labels: 256–300px. Flyers: 300–400px. Posters meant to be scanned from a distance: 512px (minimum 3×3 cm when printed). Download SVG for sharpest print results.',
    },
    {
      q: 'Can I use coloured QR codes?',
      a: 'Yes. Keep strong contrast — dark dots on light background. Avoid light dots on dark backgrounds as some scanners struggle with this. Always test on multiple phones before printing at scale.',
    },
    {
      q: 'Can I add a logo to my QR code?',
      a: "QRCraft doesn't have a built-in logo overlay yet. Download as SVG or PNG with Max (H) error correction, then overlay your logo in Canva or Figma. A logo can safely cover up to 30% of the QR area at Max error correction.",
    },
    {
      q: 'Is this tool safe for children to use?',
      a: "Yes. QRCraft collects no personal data from any user, regardless of age, so there's nothing to expose. That said, the tool is intended primarily for users 13 and above (in line with India's DPDP Act and global standards like COPPA), and we recommend parental supervision for younger children as with any website.",
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="max-w-[980px] mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <div className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#0066FF] mb-2.5 font-bold">
          FAQ
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A]">
          Frequently asked questions
        </h2>
      </div>

      <div className="bg-white border border-[#E0DED8] rounded-xl overflow-hidden divide-y divide-[#E0DED8]">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="faq-item">
              <button
                type="button"
                onClick={() => toggleFaq(i)}
                className="w-full text-left py-4 px-5 font-sans-custom text-sm font-semibold text-[#1A1A1A] hover:bg-[#F7F6F2] transition-colors flex justify-between items-center gap-3 cursor-pointer"
              >
                <span>{faq.q}</span>
                <span
                  className={`text-[#0066FF] text-xl font-mono-custom transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              {isOpen && (
                <div className="px-5 pb-4 text-[13px] text-[#7A7A7A] leading-[1.75]">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
