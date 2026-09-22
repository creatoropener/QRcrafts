# QRCraft — Modern ES6 & React QR Code Generator

A modern, privacy-first, client-side QR Code Generator built with React, TypeScript, Vite, Tailwind CSS, and `qrcode`.

## Features

- **6 QR Types**: URL, Plain Text, Email (with subject & body), Phone (`tel:`), WiFi (WPA, WEP, Open), and vCard 3.0.
- **Client-Side Generation**: QR generation runs 100% in the user's browser with zero server telemetry or storage.
- **Customisation**:
  - Size controls (128px to 512px).
  - Error correction levels: Low (L), Medium (M), High (Q), and Max (H).
  - Custom foreground and background colors with synchronized color picker & hex code inputs.
- **Export & Sharing**:
  - High-resolution PNG download.
  - Scalable vector SVG download.
  - Direct clipboard copy (`image/png`).
- **Informative Modules**:
  - Step-by-step "How It Works" guide.
  - Real-world use case cards.
  - Comparison table vs Canva and paid alternatives.
  - Interactive FAQ accordion.
  - Comprehensive privacy notice (COPPA, DPDP Act 2023, GDPR compliance).
  - Cookie & font transparency consent banner with `localStorage` persistence.

## Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **qrcode** library
