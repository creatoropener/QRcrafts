import test from 'node:test';
import assert from 'node:assert/strict';
import { buildContent } from '../src/utils/qrBuilder.ts';
import type { QRFormData } from '../src/types.ts';

test('buildContent escapes special characters in WiFi SSID and password', async () => {
  const formData: QRFormData = {
    type: 'wifi',
    url: '',
    text: '',
    phone: '',
    email: { address: '', subject: '', body: '' },
    wifi: {
      ssid: 'Cafe;Guest',
      pass: 'pass:word',
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
  assert.equal(payload, 'WIFI:T:WPA;S:Cafe\\;Guest;P:pass\\:word;;');
});

test('buildContent escapes commas, backslashes, and quotes in WiFi credentials', async () => {
  const formData: QRFormData = {
    type: 'wifi',
    url: '',
    text: '',
    phone: '',
    email: { address: '', subject: '', body: '' },
    wifi: {
      ssid: 'Office,West\\Lab',
      pass: 'say"hello',
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
  assert.equal(payload, 'WIFI:T:WPA;S:Office\\,West\\\\Lab;P:say\\"hello;;');
});

test('buildContent leaves ordinary credentials unchanged', async () => {
  const formData: QRFormData = {
    type: 'wifi',
    url: '',
    text: '',
    phone: '',
    email: { address: '', subject: '', body: '' },
    wifi: {
      ssid: 'SimpleNetwork',
      pass: 'simplepass',
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
  assert.equal(payload, 'WIFI:T:WPA;S:SimpleNetwork;P:simplepass;;');
});
