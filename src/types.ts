export type QRType = 'url' | 'text' | 'email' | 'phone' | 'wifi' | 'vcard';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface VCardData {
  firstName: string;
  lastName: string;
  title: string;
  org: string;
  phone: string;
  email: string;
  url: string;
}

export interface EmailData {
  address: string;
  subject: string;
  body: string;
}

export interface WifiData {
  ssid: string;
  pass: string;
  sec: 'WPA' | 'WEP' | 'nopass';
}

export interface QRFormData {
  type: QRType;
  url: string;
  text: string;
  phone: string;
  email: EmailData;
  wifi: WifiData;
  vcard: VCardData;
}

export interface QRCustomizeOptions {
  size: number;
  ecLevel: ErrorCorrectionLevel;
  fgColor: string;
  bgColor: string;
}
