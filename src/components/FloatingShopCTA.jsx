import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export default function FloatingShopCTA() {
  const location = useLocation();

  // Don't show the button on the shop page itself.
  if (location.pathname === '/shop') return null;

  return (
    <Link
      to="/shop"
      className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2 bg-vital-bright text-cream px-4 py-2.5 rounded-full shadow-lg shadow-black/40 hover:bg-vital transition-colors font-body font-medium text-xs"
      aria-label="Shop products"
    >
      <ShoppingBag size={15} />
      Shop Now
    </Link>
  );
}
