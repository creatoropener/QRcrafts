/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GeneratorSection } from './components/Generator/GeneratorSection';
import { HowItWorks } from './components/HowItWorks';
import { UseCases } from './components/UseCases';
import { AboutSection } from './components/AboutSection';
import { ComparisonTable } from './components/ComparisonTable';
import { FaqSection } from './components/FaqSection';
import { PrivacySection } from './components/PrivacySection';
import { Footer } from './components/Footer';
import { ConsentBanner } from './components/ConsentBanner';
import { Toast } from './components/Toast';

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F2] text-[#1A1A1A]">
      <ConsentBanner />
      <Navbar />

      <main className="flex-1">
        <Hero />
        <GeneratorSection onShowToast={showToast} />

        <hr className="border-t border-[#E0DED8] mx-6" />
        <HowItWorks />

        <hr className="border-t border-[#E0DED8] mx-6" />
        <UseCases />

        <hr className="border-t border-[#E0DED8] mx-6" />
        <AboutSection />

        <hr className="border-t border-[#E0DED8] mx-6" />
        <ComparisonTable />

        <hr className="border-t border-[#E0DED8] mx-6" />
        <FaqSection />

        <hr className="border-t border-[#E0DED8] mx-6" />
        <PrivacySection />
      </main>

      <Footer />
      <Toast message={toastMessage} />
    </div>
  );
}

