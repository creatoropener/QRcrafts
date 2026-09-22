import React from 'react';
import { QRFormData } from '../../types';

interface TypeInputsProps {
  formData: QRFormData;
  onChange: <K extends keyof QRFormData>(field: K, value: QRFormData[K]) => void;
  onSubmit: () => void;
}

export const TypeInputs: React.FC<TypeInputsProps> = ({ formData, onChange, onSubmit }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (formData.type !== 'text' && formData.type !== 'email') {
        e.preventDefault();
        onSubmit();
      }
    }
  };

  return (
    <div className="mb-4">
      {formData.type === 'url' && (
        <div className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#7A7A7A] mb-1.5 uppercase tracking-wide">
              Website URL
            </label>
            <input
              id="f-url"
              type="url"
              value={formData.url}
              onChange={(e) => onChange('url', e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="https://yoursite.com"
              className="w-full px-3.5 py-2.5 font-sans-custom text-sm bg-[#F7F6F2] border-[1.5px] border-[#E0DED8] rounded-lg text-[#1A1A1A] outline-none focus:border-[#0066FF] transition-colors"
            />
          </div>
        </div>
      )}

      {formData.type === 'text' && (
        <div className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#7A7A7A] mb-1.5 uppercase tracking-wide">
              Text content
            </label>
            <textarea
              id="f-text"
              value={formData.text}
              onChange={(e) => onChange('text', e.target.value)}
              placeholder="Enter any text…"
              rows={4}
              className="w-full px-3.5 py-2.5 font-sans-custom text-sm bg-[#F7F6F2] border-[1.5px] border-[#E0DED8] rounded-lg text-[#1A1A1A] outline-none focus:border-[#0066FF] transition-colors resize-y min-h-[90px]"
            />
          </div>
        </div>
      )}

      {formData.type === 'email' && (
        <div className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#7A7A7A] mb-1.5 uppercase tracking-wide">
              Email address
            </label>
            <input
              id="f-email-addr"
              type="email"
              value={formData.email.address}
              onChange={(e) =>
                onChange('email', { ...formData.email, address: e.target.value })
              }
              onKeyDown={handleKeyDown}
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 font-sans-custom text-sm bg-[#F7F6F2] border-[1.5px] border-[#E0DED8] rounded-lg text-[#1A1A1A] outline-none focus:border-[#0066FF] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#7A7A7A] mb-1.5 uppercase tracking-wide">
              Subject (optional)
            </label>
            <input
              id="f-email-sub"
              type="text"
              value={formData.email.subject}
              onChange={(e) =>
                onChange('email', { ...formData.email, subject: e.target.value })
              }
              onKeyDown={handleKeyDown}
              placeholder="Hello there"
              className="w-full px-3.5 py-2.5 font-sans-custom text-sm bg-[#F7F6F2] border-[1.5px] border-[#E0DED8] rounded-lg text-[#1A1A1A] outline-none focus:border-[#0066FF] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#7A7A7A] mb-1.5 uppercase tracking-wide">
              Body (optional)
            </label>
            <textarea
              id="f-email-body"
              value={formData.email.body}
              onChange={(e) =>
                onChange('email', { ...formData.email, body: e.target.value })
              }
              placeholder="Message…"
              className="w-full px-3.5 py-2.5 font-sans-custom text-sm bg-[#F7F6F2] border-[1.5px] border-[#E0DED8] rounded-lg text-[#1A1A1A] outline-none focus:border-[#0066FF] transition-colors resize-y min-h-[70px]"
            />
          </div>
        </div>
      )}

      {formData.type === 'phone' && (
        <div className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#7A7A7A] mb-1.5 uppercase tracking-wide">
              Phone number
            </label>
            <input
              id="f-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="+91 9876543210"
              className="w-full px-3.5 py-2.5 font-sans-custom text-sm bg-[#F7F6F2] border-[1.5px] border-[#E0DED8] rounded-lg text-[#1A1A1A] outline-none focus:border-[#0066FF] transition-colors"
            />
          </div>
        </div>
      )}

      {formData.type === 'wifi' && (
        <div className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#7A7A7A] mb-1.5 uppercase tracking-wide">
              Network name (SSID)
            </label>
            <input
              id="f-wifi-ssid"
              type="text"
              value={formData.wifi.ssid}
              onChange={(e) =>
                onChange('wifi', { ...formData.wifi, ssid: e.target.value })
              }
              onKeyDown={handleKeyDown}
              placeholder="MyHomeWiFi"
              className="w-full px-3.5 py-2.5 font-sans-custom text-sm bg-[#F7F6F2] border-[1.5px] border-[#E0DED8] rounded-lg text-[#1A1A1A] outline-none focus:border-[#0066FF] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#7A7A7A] mb-1.5 uppercase tracking-wide">
              Password
            </label>
            <input
              id="f-wifi-pass"
              type="text"
              value={formData.wifi.pass}
              onChange={(e) =>
                onChange('wifi', { ...formData.wifi, pass: e.target.value })
              }
              onKeyDown={handleKeyDown}
              placeholder="password123"
              className="w-full px-3.5 py-2.5 font-sans-custom text-sm bg-[#F7F6F2] border-[1.5px] border-[#E0DED8] rounded-lg text-[#1A1A1A] outline-none focus:border-[#0066FF] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#7A7A7A] mb-1.5 uppercase tracking-wide">
              Security
            </label>
            <select
              id="f-wifi-sec"
              value={formData.wifi.sec}
              onChange={(e) =>
                onChange('wifi', {
                  ...formData.wifi,
                  sec: e.target.value as 'WPA' | 'WEP' | 'nopass',
                })
              }
              className="w-full px-3.5 py-2.5 font-sans-custom text-sm bg-[#F7F6F2] border-[1.5px] border-[#E0DED8] rounded-lg text-[#1A1A1A] outline-none focus:border-[#0066FF] transition-colors"
            >
              <option value="WPA">WPA / WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">None (open network)</option>
            </select>
          </div>
        </div>
      )}

      {formData.type === 'vcard' && (
        <div className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#7A7A7A] mb-1.5 uppercase tracking-wide">
                First name
              </label>
              <input
                id="f-vc-first"
                type="text"
                value={formData.vcard.firstName}
                onChange={(e) =>
                  onChange('vcard', { ...formData.vcard, firstName: e.target.value })
                }
                onKeyDown={handleKeyDown}
                placeholder="Rahul"
                className="w-full px-3.5 py-2.5 font-sans-custom text-sm bg-[#F7F6F2] border-[1.5px] border-[#E0DED8] rounded-lg text-[#1A1A1A] outline-none focus:border-[#0066FF] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#7A7A7A] mb-1.5 uppercase tracking-wide">
                Last name
              </label>
              <input
                id="f-vc-last"
                type="text"
                value={formData.vcard.lastName}
                onChange={(e) =>
                  onChange('vcard', { ...formData.vcard, lastName: e.target.value })
                }
                onKeyDown={handleKeyDown}
                placeholder="Sharma"
                className="w-full px-3.5 py-2.5 font-sans-custom text-sm bg-[#F7F6F2] border-[1.5px] border-[#E0DED8] rounded-lg text-[#1A1A1A] outline-none focus:border-[#0066FF] transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#7A7A7A] mb-1.5 uppercase tracking-wide">
              Job title
            </label>
            <input
              id="f-vc-title"
              type="text"
              value={formData.vcard.title}
              onChange={(e) =>
                onChange('vcard', { ...formData.vcard, title: e.target.value })
              }
              onKeyDown={handleKeyDown}
              placeholder="Supply Chain Manager"
              className="w-full px-3.5 py-2.5 font-sans-custom text-sm bg-[#F7F6F2] border-[1.5px] border-[#E0DED8] rounded-lg text-[#1A1A1A] outline-none focus:border-[#0066FF] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#7A7A7A] mb-1.5 uppercase tracking-wide">
              Company
            </label>
            <input
              id="f-vc-org"
              type="text"
              value={formData.vcard.org}
              onChange={(e) =>
                onChange('vcard', { ...formData.vcard, org: e.target.value })
              }
              onKeyDown={handleKeyDown}
              placeholder="Acme Logistics Pvt Ltd"
              className="w-full px-3.5 py-2.5 font-sans-custom text-sm bg-[#F7F6F2] border-[1.5px] border-[#E0DED8] rounded-lg text-[#1A1A1A] outline-none focus:border-[#0066FF] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#7A7A7A] mb-1.5 uppercase tracking-wide">
              Phone
            </label>
            <input
              id="f-vc-phone"
              type="tel"
              value={formData.vcard.phone}
              onChange={(e) =>
                onChange('vcard', { ...formData.vcard, phone: e.target.value })
              }
              onKeyDown={handleKeyDown}
              placeholder="+91 9876543210"
              className="w-full px-3.5 py-2.5 font-sans-custom text-sm bg-[#F7F6F2] border-[1.5px] border-[#E0DED8] rounded-lg text-[#1A1A1A] outline-none focus:border-[#0066FF] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#7A7A7A] mb-1.5 uppercase tracking-wide">
              Email
            </label>
            <input
              id="f-vc-email"
              type="email"
              value={formData.vcard.email}
              onChange={(e) =>
                onChange('vcard', { ...formData.vcard, email: e.target.value })
              }
              onKeyDown={handleKeyDown}
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 font-sans-custom text-sm bg-[#F7F6F2] border-[1.5px] border-[#E0DED8] rounded-lg text-[#1A1A1A] outline-none focus:border-[#0066FF] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#7A7A7A] mb-1.5 uppercase tracking-wide">
              Website
            </label>
            <input
              id="f-vc-url"
              type="url"
              value={formData.vcard.url}
              onChange={(e) =>
                onChange('vcard', { ...formData.vcard, url: e.target.value })
              }
              onKeyDown={handleKeyDown}
              placeholder="https://yoursite.com"
              className="w-full px-3.5 py-2.5 font-sans-custom text-sm bg-[#F7F6F2] border-[1.5px] border-[#E0DED8] rounded-lg text-[#1A1A1A] outline-none focus:border-[#0066FF] transition-colors"
            />
          </div>
        </div>
      )}
    </div>
  );
};
