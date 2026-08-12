import React from 'react';

export default function ShippingBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-9 md:h-9 bg-vital text-cream flex items-center justify-center px-4 overflow-hidden">
      <p className="font-mono text-[10px] md:text-xs tracking-wide uppercase text-center leading-tight">
        Free shipping within New Zealand
        <span className="mx-2 text-cream/50">·</span>
        NZ$40 shipping outside New Zealand
      </p>
    </div>
  );
}
