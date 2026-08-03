import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function CheckoutCancel() {
  return (
    <div className="pt-32 md:pt-40 pb-24 px-6 min-h-[70vh] flex items-center">
      <div className="max-w-2xl mx-auto text-center">
        <div className="eyebrow mb-3">Checkout Cancelled</div>
        <h1 className="font-display font-light text-3xl md:text-5xl text-cream mb-4">
          Your order wasn't completed.
        </h1>
        <p className="text-ash mb-10 max-w-md mx-auto">
          No payment was taken. Your cart is still saved, so you can pick up right where you left off.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-vital-bright hover:text-cream transition-colors border border-vital-bright hover:bg-vital-bright hover:text-ink px-8 py-4 rounded-sm"
        >
          <ArrowLeft size={14} /> Back to the Range
        </Link>
      </div>
    </div>
  );
}
