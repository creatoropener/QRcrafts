import test from 'node:test';
import assert from 'node:assert/strict';
import { buildContent } from '../src/utils/qrBuilder.ts';
import type { QRFormData } from '../src/types.ts';

test('buildContent generates valid WiFi QR payload for standard network', () => {
  const formData: QRFormData = {
    type: 'wifi',
    url: '',
    text: '',
    phone: '',
    email: { address: '', subject: '', body: '' },
    wifi: {
      ssid: 'OfficeNetwork',
      pass: 'SecretPassword123',
      sec: 'WPA',
    },
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

  const payload = buildContent(formData);
  assert.equal(payload, 'WIFI:T:WPA;S:OfficeNetwork;P:SecretPassword123;;');
});
