import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useSEO } from "@/hooks/useSEO";

export default function ThankYou() {
  useSEO({ title: "Order Confirmed", path: "/thank-you", noindex: true });

  const { clear } = useCart();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const clearedRef = useRef(false);

  // Guard with a ref (not just the effect's dependency array) so the cart
  // is cleared exactly once even under React 18 StrictMode's
  // mount-effect-unmount-remount-effect dance in development.
  useEffect(() => {
    if (!clearedRef.current) {
      clearedRef.current = true;
      clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-av-deep pt-36 pb-24 min-h-screen">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 text-center">
        <div className="mx-auto grid place-items-center h-16 w-16 rounded-full bg-av-gold text-av-deep mb-6">
          <Check className="h-8 w-8" />
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-av-alloy">Thank you for your order</h1>
        <p className="mt-4 text-av-alloy/60 max-w-md mx-auto">
          Your payment was successful. A confirmation email with your order details is on its way to your inbox.
        </p>
        {sessionId && (
          <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-av-alloy/40">
            Order reference: {sessionId}
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/shop" className="inline-flex items-center gap-2 bg-av-gold text-av-deep px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:brightness-110 transition">
            Continue Shopping
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 border-2 border-av-teal text-av-alloy px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold hover:border-av-gold hover:text-av-gold transition">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
