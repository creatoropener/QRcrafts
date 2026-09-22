import React from 'react';

export const ComparisonTable: React.FC = () => {
  const comparisonRows = [
    { feature: 'Free to use', qrc: '✓', canva: 'Partial (Pro plan)', paid: '✗' },
    { feature: 'No signup required', qrc: '✓', canva: '✗', paid: '✗' },
    { feature: 'No watermark', qrc: '✓', canva: '✓', paid: 'Paid only' },
    { feature: 'Works offline', qrc: '✓', canva: '✗', paid: '✗' },
    { feature: 'Zero data sent to server', qrc: '✓', canva: '✗', paid: '✗' },
    { feature: 'WiFi & vCard QR types', qrc: '✓', canva: '✗ (URL only)', paid: '✓' },
    { feature: 'PNG & SVG download', qrc: '✓', canva: '✓', paid: '✓' },
    { feature: 'Custom colours', qrc: '✓', canva: '✓', paid: '✓' },
  ];

  const renderBadge = (val: string) => {
    if (val === '✓') {
      return <span className="text-emerald-500 text-base font-bold">✓</span>;
    }
    if (val === '✗') {
      return <span className="text-rose-500 text-base font-bold">✗</span>;
    }
    return <span className="text-amber-500 text-xs font-semibold">{val}</span>;
  };

  return (
    <section className="max-w-[980px] mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <div className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#0066FF] mb-2.5 font-bold">
          Comparison
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A]">
          QRCraft vs other generators
        </h2>
        <p className="text-[15px] text-[#7A7A7A] mt-2.5 leading-[1.65] max-w-[540px] mx-auto">
          No email. No trial. No watermark. Just QR codes.
        </p>
      </div>

      <div className="overflow-x-auto bg-white border border-[#E0DED8] rounded-xl shadow-xs">
        <table className="w-full border-collapse text-sm text-left">
          <thead>
            <tr className="border-b border-[#E0DED8] bg-[#F7F6F2]">
              <th className="py-3 px-5 text-[11px] font-bold tracking-wider uppercase text-[#7A7A7A]">
                Feature
              </th>
              <th className="py-3 px-5 text-[11px] font-bold tracking-wider uppercase text-[#0066FF]">
                QRCraft
              </th>
              <th className="py-3 px-5 text-[11px] font-bold tracking-wider uppercase text-[#7A7A7A]">
                Canva
              </th>
              <th className="py-3 px-5 text-[11px] font-bold tracking-wider uppercase text-[#7A7A7A]">
                Typical paid tools
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, idx) => (
              <tr
                key={idx}
                className={idx !== comparisonRows.length - 1 ? 'border-b border-[#E0DED8]' : ''}
              >
                <td className="py-3.5 px-5 font-medium text-[#1A1A1A]">{row.feature}</td>
                <td className="py-3.5 px-5">{renderBadge(row.qrc)}</td>
                <td className="py-3.5 px-5">{renderBadge(row.canva)}</td>
                <td className="py-3.5 px-5">{renderBadge(row.paid)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
