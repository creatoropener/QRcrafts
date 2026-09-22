import QRCode from 'qrcode';
import { QRFormData, QRCustomizeOptions } from '../types';

export function buildContent(formData: QRFormData): string | null {
  switch (formData.type) {
    case 'url':
      return formData.url.trim() || null;

    case 'text':
      return formData.text.trim() || null;

    case 'phone': {
      const p = formData.phone.trim();
      return p ? `tel:${p}` : null;
    }

    case 'email': {
      const addr = formData.email.address.trim();
      if (!addr) return null;
      const sub = encodeURIComponent(formData.email.subject.trim());
      const body = encodeURIComponent(formData.email.body.trim());
      let m = `mailto:${addr}`;
      const params: string[] = [];
      if (sub) params.push(`subject=${sub}`);
      if (body) params.push(`body=${body}`);
      if (params.length) m += '?' + params.join('&');
      return m;
    }

    case 'wifi': {
      const ssid = formData.wifi.ssid.trim();
      if (!ssid) return null;
      return `WIFI:T:${formData.wifi.sec};S:${ssid};P:${formData.wifi.pass.trim()};;`;
    }

    case 'vcard': {
      const first = formData.vcard.firstName.trim();
      const last = formData.vcard.lastName.trim();
      if (!first && !last) return null;
      let vc = `BEGIN:VCARD\nVERSION:3.0\nN:${last};${first};;;\nFN:${first} ${last}`.trim();
      const t = formData.vcard.title.trim();
      const o = formData.vcard.org.trim();
      const ph = formData.vcard.phone.trim();
      const em = formData.vcard.email.trim();
      const u = formData.vcard.url.trim();
      if (t) vc += `\nTITLE:${t}`;
      if (o) vc += `\nORG:${o}`;
      if (ph) vc += `\nTEL:${ph}`;
      if (em) vc += `\nEMAIL:${em}`;
      if (u) vc += `\nURL:${u}`;
      vc += `\nEND:VCARD`;
      return vc;
    }

    default:
      return null;
  }
}

export async function generateQrCanvas(
  canvas: HTMLCanvasElement,
  content: string,
  options: QRCustomizeOptions
): Promise<void> {
  const displaySize = Math.min(options.size, 280);
  await QRCode.toCanvas(canvas, content, {
    width: displaySize,
    margin: 2,
    color: {
      dark: options.fgColor,
      light: options.bgColor,
    },
    errorCorrectionLevel: options.ecLevel,
  });
}

export async function generateHighResPngDataUrl(
  content: string,
  options: QRCustomizeOptions
): Promise<string> {
  return await QRCode.toDataURL(content, {
    width: options.size,
    margin: 2,
    color: {
      dark: options.fgColor,
      light: options.bgColor,
    },
    errorCorrectionLevel: options.ecLevel,
  });
}

export async function generateSvgString(
  content: string,
  options: QRCustomizeOptions
): Promise<string> {
  return await QRCode.toString(content, {
    type: 'svg',
    width: options.size,
    margin: 2,
    color: {
      dark: options.fgColor,
      light: options.bgColor,
    },
    errorCorrectionLevel: options.ecLevel,
  });
}
