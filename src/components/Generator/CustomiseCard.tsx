import React from 'react';
import { QRCustomizeOptions, ErrorCorrectionLevel } from '../../types';

interface CustomiseCardProps {
  options: QRCustomizeOptions;
  onChange: (options: QRCustomizeOptions) => void;
}

export const CustomiseCard: React.FC<CustomiseCardProps> = ({ options, onChange }) => {
  const handleHexChange = (key: 'fgColor' | 'bgColor', hexVal: string) => {
    let cleanHex = hexVal.toUpperCase();
    if (!cleanHex.startsWith('#')) {
      cleanHex = '#' + cleanHex;
    }
    // Update raw value or normalized valid hex
    if (/^#[0-9A-Fa-f]{6}$/.test(cleanHex)) {
      onChange({ ...options, [key]: cleanHex });
    }
  };

  return (
    <div className="bg-white border border-[#E0DED8] rounded-xl p-6 mt-4">
      <div className="font-mono-custom text-[10px] tracking-[2px] uppercase text-[#7A7A7A] mb-3.5 font-bold">
        Customise
      </div>

      <div className="mb-3.5">
        <label className="block text-xs font-semibold text-[#7A7A7A] mb-1.5 uppercase tracking-wide">
          Size — <span className="font-mono-custom text-xs text-[#0066FF] font-bold">{options.size}px</span>
        </label>
        <input
          id="sizeRange"
          type="range"
          min={128}
          max={512}
          step={32}
          value={options.size}
          onChange={(e) => onChange({ ...options, size: parseInt(e.target.value, 10) })}
          className="w-full accent-[#0066FF] cursor-pointer"
        />
      </div>

      <div className="mb-3.5">
        <label className="block text-xs font-semibold text-[#7A7A7A] mb-1.5 uppercase tracking-wide">
          Error correction
        </label>
        <select
          id="ecLevel"
          value={options.ecLevel}
          onChange={(e) =>
            onChange({
              ...options,
              ecLevel: e.target.value as ErrorCorrectionLevel,
            })
          }
          className="w-full px-3.5 py-2.5 font-sans-custom text-sm bg-[#F7F6F2] border-[1.5px] border-[#E0DED8] rounded-lg text-[#1A1A1A] outline-none focus:border-[#0066FF] transition-colors"
        >
          <option value="L">Low — smaller file size</option>
          <option value="M">Medium — balanced (recommended)</option>
          <option value="Q">High — more robust</option>
          <option value="H">Max — best if adding a logo</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#7A7A7A] mb-1.5 uppercase tracking-wide">
          Colors
        </label>
        <div className="flex gap-2 flex-wrap mt-1.5">
          <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
            <span className="text-[11px] text-[#7A7A7A] font-semibold">Foreground (dots)</span>
            <div className="flex items-center gap-2 bg-[#F7F6F2] border-[1.5px] border-[#E0DED8] rounded-lg p-1.5 px-2.5">
              <input
                id="fgColor"
                type="color"
                value={options.fgColor}
                onChange={(e) => onChange({ ...options, fgColor: e.target.value.toUpperCase() })}
                className="w-7 h-7 border-none bg-transparent p-0 cursor-pointer rounded"
              />
              <input
                id="fgHex"
                type="text"
                value={options.fgColor}
                maxLength={7}
                onChange={(e) => handleHexChange('fgColor', e.target.value)}
                className="border-none bg-transparent font-mono-custom text-[13px] w-20 p-0 text-[#1A1A1A] outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
            <span className="text-[11px] text-[#7A7A7A] font-semibold">Background</span>
            <div className="flex items-center gap-2 bg-[#F7F6F2] border-[1.5px] border-[#E0DED8] rounded-lg p-1.5 px-2.5">
              <input
                id="bgColor"
                type="color"
                value={options.bgColor}
                onChange={(e) => onChange({ ...options, bgColor: e.target.value.toUpperCase() })}
                className="w-7 h-7 border-none bg-transparent p-0 cursor-pointer rounded"
              />
              <input
                id="bgHex"
                type="text"
                value={options.bgColor}
                maxLength={7}
                onChange={(e) => handleHexChange('bgColor', e.target.value)}
                className="border-none bg-transparent font-mono-custom text-[13px] w-20 p-0 text-[#1A1A1A] outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
