import React from 'react';
import LegalPageShell from '@/components/legal/LegalPageShell';
import { TERMS_CONTENT } from '@/lib/legalData';

export default function TermsOfService() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Terms of Service."
      lastUpdated="31 July 2026"
      intro="These Terms of Service govern your access to and use of www.viitalon.com, including purchases made through the website. The website and products are provided by VIITALON, operated by VIITALON LIMITED, New Zealand — info@viitalon.com."
      blocks={TERMS_CONTENT}
    />
  );
}
