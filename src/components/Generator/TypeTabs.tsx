import React from 'react';
import { QRType } from '../../types';

interface TypeTabsProps {
  currentType: QRType;
  onSelectType: (type: QRType) => void;
}

const TAB_OPTIONS: { type: QRType; label: string; icon: string }[] = [
  { type: 'url', label: 'URL', icon: '🔗' },
  { type: 'text', label: 'Text', icon: '📝' },
  { type: 'email', label: 'Email', icon: '✉️' },
  { type: 'phone', label: 'Phone', icon: '📞' },
  { type: 'wifi', label: 'WiFi', icon: '📶' },
  { type: 'vcard', label: 'vCard', icon: '👤' },
];

export const TypeTabs: React.FC<TypeTabsProps> = ({ currentType, onSelectType }) => {
  return (
    <div className="flex flex-wrap gap-1.5 mb-5">
      {TAB_OPTIONS.map((tab) => {
        const isActive = currentType === tab.type;
        return (
          <button
            key={tab.type}
            id={`tab-type-${tab.type}`}
            type="button"
            onClick={() => onSelectType(tab.type)}
            className={`font-sans-custom text-[13px] font-medium py-1.5 px-3.5 rounded-lg border transition-all cursor-pointer ${
              isActive
                ? 'bg-[#0066FF] border-[#0066FF] text-white'
                : 'bg-transparent border-[#E0DED8] text-[#7A7A7A] hover:border-[#0066FF] hover:text-[#0066FF]'
            }`}
          >
            <span className="mr-1">{tab.icon}</span> {tab.label}
          </button>
        );
      })}
    </div>
  );
};
