import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, Loader2 } from 'lucide-react';
import { useCart } from '@/components/CartContext';
import { formatPrice } from '@/lib/utils';

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }
    fetch(`/api/checkout-session?session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setOrder(data);
      })
      .catch(() => setError('Unable to load your order details.'))
      .finally(() => setLoading(false));
  }, [sessionId]);

  return (
    <div className="pt-32 md:pt-40 pb-24 px-6 min-h-[70vh]">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-14 h-14 rounded-full bg-vital/20 border border-vital-bright flex items-center justify-center mx-auto mb-6">
          <Check size={24} className="text-vital-bright" />
        </div>
        <div className="eyebrow mb-3">Order Confirmed</div>
        <h1 className="font-display font-light text-3xl md:text-5xl text-cream mb-4">
          Thank you for your order.
        </h1>
        <p className="text-ash mb-10 max-w-md mx-auto">
          {order?.customer_email
            ? `A confirmation has been sent to ${order.customer_email}.`
            : 'A confirmation email is on its way to your inbox.'}
        </p>

        {loading && (
          <div className="flex items-center justify-center gap-2 text-ash text-sm mb-10">
            <Loader2 size={16} className="animate-spin" /> Loading your order…
          </div>
        )}

        {error && !loading && (
          <p className="text-red-400 text-sm mb-10">{error}</p>
        )}

        {order && !loading && (
          <div className="bg-ink-surface border border-line rounded-sm p-6 text-left mb-10">
            <div className="font-mono text-xs tracking-widest uppercase text-ash mb-4">
              Order Summary
            </div>
            <div className="space-y-3 mb-4">
              {order.line_items?.map((li, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-cream-dim">
                    {li.description} {li.quantity > 1 && `× ${li.quantity}`}
                  </span>
                  <span className="text-cream font-mono">{formatPrice(li.amount_total / 100)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-line pt-4 flex items-center justify-between">
              <span className="font-mono text-xs tracking-widest uppercase text-ash">Total</span>
              <span className="font-display text-xl text-cream">{formatPrice(order.amount_total / 100)}</span>
            </div>
          </div>
        )}

        <Link
          to="/shop"
          className="inline-block font-mono text-xs tracking-widest uppercase text-vital-bright hover:text-cream transition-colors border border-vital-bright hover:bg-vital-bright hover:text-ink px-8 py-4 rounded-sm"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
