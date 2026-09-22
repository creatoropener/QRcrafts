import React from 'react';

export const UseCases: React.FC = () => {
  const useCases = [
    {
      icon: '🍽️',
      title: 'Restaurant menus',
      desc: 'Replace paper menus with a scannable QR that links to your online menu. Update the menu anytime without reprinting.',
    },
    {
      icon: '💼',
      title: 'Digital business cards',
      desc: 'Put a vCard QR on your business card. Contacts scan it and save your details in one tap.',
    },
    {
      icon: '📶',
      title: 'Guest WiFi sharing',
      desc: 'Print a WiFi QR for your home, café, or office. Guests scan and connect — no password typing needed.',
    },
    {
      icon: '📦',
      title: 'Product packaging',
      desc: 'Link customers to manuals, warranty registration, review pages, or tutorial videos directly from the box.',
    },
    {
      icon: '📣',
      title: 'Marketing & events',
      desc: 'Put QR codes on flyers and banners to drive traffic to your landing page, registration form, or social profile.',
    },
    {
      icon: '🏢',
      title: 'Office & logistics',
      desc: 'Label assets, shelves, and shipments with QR codes linking to tracking info, documents, or inventory systems.',
    },
  ];

  return (
    <section id="use-cases" className="max-w-[980px] mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <div className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#0066FF] mb-2.5 font-bold">
          Use Cases
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A]">
          What can you do with a QR code?
        </h2>
        <p className="text-[15px] text-[#7A7A7A] mt-2.5 leading-[1.65] max-w-[540px] mx-auto">
          QR codes are everywhere — here are the most common ways people use QRCraft.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {useCases.map((item, i) => (
          <div
            key={i}
            className="bg-white border border-[#E0DED8] rounded-xl p-5 flex gap-3.5 items-start hover:border-[#0066FF] transition-colors"
          >
            <div className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</div>
            <div>
              <h3 className="text-sm font-bold text-[#1A1A1A] mb-1">{item.title}</h3>
              <p className="text-[13px] text-[#7A7A7A] leading-[1.55]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
