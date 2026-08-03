import React from 'react';
import LegalPageShell from '@/components/legal/LegalPageShell';
import { DISCLAIMER_CONTENT } from '@/lib/legalData';

export default function Disclaimer() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Health & Product Disclaimer."
      lastUpdated="31 July 2026"
      intro="Information provided by VIITALON through its website, product pages, articles, emails, social-media accounts and other communications is general educational and product information only — not personalised medical, dietary, pharmaceutical or healthcare advice."
      blocks={DISCLAIMER_CONTENT}
    />
  );
}
