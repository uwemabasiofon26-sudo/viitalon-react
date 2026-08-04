import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Minus, Plus, Trash2, Loader2 } from 'lucide-react';
import { useCart } from './CartContext';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { startCheckout } from '@/lib/checkout';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, subtotal, count } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  const handleCheckout = async () => {
    setCheckoutError(null);
    setCheckingOut(true);
    try {
      await startCheckout(items);
      // On success the browser navigates to Stripe, so no need to reset state here.
    } catch (err) {
      setCheckoutError(err.message);
      setCheckingOut(false);
    }
  };

  // If the shopper hits "back" from Stripe Checkout (or cancels and returns)
  // without completing payment, the browser can restore this page from its
  // back-forward cache with the button frozen mid-"Redirecting…" state.
  // Reset it whenever the page becomes visible again.
  useEffect(() => {
    const resetIfStuck = () => setCheckingOut(false);
    window.addEventListener('pageshow', resetIfStuck);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') resetIfStuck();
    });
    return () => {
      window.removeEventListener('pageshow', resetIfStuck);
    };
  }, []);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-black/70 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[101] h-full w-full max-w-md bg-ink border-l border-line flex flex-col transition-transform duration-400 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} className="text-vital-bright" />
            <span className="font-mono text-xs tracking-widest uppercase text-cream">
              Your Cart {count > 0 && `(${count})`}
            </span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-ash hover:text-cream transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <p className="font-display text-2xl text-cream mb-2">Your cart is empty</p>
              <p className="text-ash text-sm mb-6">Add a formula to begin your protocol.</p>
              <Button asChild variant="outline" className="border-vital text-vital-bright hover:bg-vital hover:text-cream">
                <Link to="/shop" onClick={() => setIsOpen(false)}>Browse the Range</Link>
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-line">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 px-6 py-5">
                  <div className="w-16 h-20 bg-surface border border-line rounded-sm flex-shrink-0 overflow-hidden">
                    {item.image_url && (
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to={`/products/${item.slug}`} onClick={() => setIsOpen(false)} className="font-display text-base text-cream hover:text-vital-bright transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-ash text-xs mt-1">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-line rounded-sm">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-2 py-1 text-ash hover:text-cream transition-colors">
                          <Minus size={12} />
                        </button>
                        <span className="px-3 font-mono text-xs text-cream">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-2 py-1 text-ash hover:text-cream transition-colors">
                          <Plus size={12} />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-ash hover:text-vital-bright transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="font-mono text-sm text-cream">
                    {formatPrice(item.price * item.qty)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-line px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs tracking-widest uppercase text-ash">Subtotal</span>
              <span className="font-display text-xl text-cream">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-ash text-xs">Shipping and taxes calculated at checkout.</p>
            {checkoutError && (
              <p className="text-red-400 text-xs">{checkoutError}</p>
            )}
            <Button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="w-full bg-vital hover:bg-vital-bright text-cream font-mono text-xs tracking-widest uppercase disabled:opacity-60"
            >
              {checkingOut ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={14} className="animate-spin" /> Redirecting to checkout…
                </span>
              ) : (
                'Proceed to Checkout'
              )}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
