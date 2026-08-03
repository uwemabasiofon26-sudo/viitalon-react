import React from 'react';
import LegalPageShell from '@/components/legal/LegalPageShell';
import { SHIPPING_CONTENT } from '@/lib/legalData';

export default function ShippingReturns() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Shipping & Returns."
      lastUpdated="31 July 2026"
      intro="This policy applies to purchases made directly through www.viitalon.com and covers order processing, shipping, delivery, and our approach to returns, refunds and faulty products."
      blocks={SHIPPING_CONTENT}
    />
  );
}
