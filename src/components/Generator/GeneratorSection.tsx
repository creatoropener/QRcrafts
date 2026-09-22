import React, { useState, useRef, useEffect, useCallback } from 'react';
import { QRFormData, QRCustomizeOptions, QRType } from '../../types';
import { TypeTabs } from './TypeTabs';
import { TypeInputs } from './TypeInputs';
import { CustomiseCard } from './CustomiseCard';
import { QRPreview } from './QRPreview';
import { buildContent, generateQrCanvas } from '../../utils/qrBuilder';

interface GeneratorSectionProps {
  onShowToast: (msg: string) => void;
}

const INITIAL_FORM_DATA: QRFormData = {
  type: 'url',
  url: '',
  text: '',
  phone: '',
  email: { address: '', subject: '', body: '' },
  wifi: { ssid: '', pass: '', sec: 'WPA' },
  vcard: {
    firstName: '',
    lastName: '',
    title: '',
    org: '',
    phone: '',
    email: '',
    url: '',
  },
};

const INITIAL_CUSTOMIZE: QRCustomizeOptions = {
  size: 256,
  ecLevel: 'M',
  fgColor: '#1A1A1A',
  bgColor: '#FFFFFF',
};

export const GeneratorSection: React.FC<GeneratorSectionProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState<QRFormData>(INITIAL_FORM_DATA);
  const [options, setOptions] = useState<QRCustomizeOptions>(INITIAL_CUSTOMIZE);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFieldChange = <K extends keyof QRFormData>(field: K, value: QRFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTypeSelect = (type: QRType) => {
    setFormData((prev) => ({ ...prev, type }));
  };

  const handleGenerate = useCallback(async () => {
    const content = buildContent(formData);
    if (!content) {
      onShowToast('Please fill in the required field first.');
      return;
    }
    setGeneratedContent(content);
    setHasGenerated(true);
  }, [formData, onShowToast]);

  // Render canvas whenever generatedContent or options change
  useEffect(() => {
    if (!hasGenerated || !generatedContent) return;

    // Canvas might be mounting after state update
    const renderTimer = setTimeout(async () => {
      if (canvasRef.current && generatedContent) {
        try {
          await generateQrCanvas(canvasRef.current, generatedContent, options);
        } catch {
          onShowToast('Content too long — try shortening the URL or text.');
        }
      }
    }, 50);

    return () => clearTimeout(renderTimer);
  }, [hasGenerated, generatedContent, options, onShowToast]);

  return (
    <div id="generator" className="max-w-[980px] mx-auto px-6 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6 items-start">
        {/* LEFT: INPUT COLUMN */}
        <div className="min-w-0 order-2 md:order-1">
          <div className="bg-white border border-[#E0DED8] rounded-xl p-6">
            <div className="font-mono-custom text-[10px] tracking-[2px] uppercase text-[#7A7A7A] mb-3.5 font-bold">
              QR Type
            </div>

            <TypeTabs currentType={formData.type} onSelectType={handleTypeSelect} />

            <TypeInputs
              formData={formData}
              onChange={handleFieldChange}
              onSubmit={handleGenerate}
            />

            <button
              id="btn-generate"
              type="button"
              onClick={handleGenerate}
              className="w-full font-sans-custom text-[15px] font-bold py-3.5 px-4 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white cursor-pointer transition-colors mt-1.5 tracking-tight flex items-center justify-center gap-1.5"
            >
              Generate QR Code →
            </button>
          </div>

          <CustomiseCard options={options} onChange={setOptions} />
        </div>

        {/* RIGHT: PREVIEW COLUMN */}
        <div className="min-w-0 order-1 md:order-2 md:sticky md:top-20">
          <QRPreview
            canvasRef={canvasRef}
            generatedContent={generatedContent}
            hasGenerated={hasGenerated}
            options={options}
            onShowToast={onShowToast}
          />
        </div>
      </div>
    </div>
  );
};
