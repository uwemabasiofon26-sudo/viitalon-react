import React from 'react';
import LegalPageShell from '@/components/legal/LegalPageShell';
import { PRIVACY_CONTENT } from '@/lib/legalData';

export default function PrivacyPolicy() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Privacy Policy."
      lastUpdated="31 July 2026"
      intro="This Privacy Policy explains how VIITALON collects, uses, stores and shares personal information when you visit www.viitalon.com, purchase our products, contact us, subscribe to our communications or otherwise interact with us. VIITALON is operated by VIITALON LIMITED, New Zealand — info@viitalon.com."
      blocks={PRIVACY_CONTENT}
    />
  );
}
