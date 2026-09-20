import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Lock, Loader2, XCircle, ShoppingBag } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useCart } from "@/context/CartContext";
import { formatNZD } from "@/lib/brand";
import ScrollReveal from "@/components/ScrollReveal";
import { useSEO } from "@/hooks/useSEO";

export default function Checkout() {
  useSEO({ title: "Checkout", path: "/checkout", noindex: true });

  const { items, subtotal } = useCart();
  const [searchParams] = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "", firstName: "", lastName: "", address: "", city: "", postcode: "", country: "New Zealand",
  });

  // Successful payments now land on their own /thank-you page (see
  // src/pages/ThankYou.jsx) — this page only ever needs to handle the
  // "still shopping" and "checkout was canceled" states.
  const canceled = searchParams.get("canceled") === "true";

  const shipping = subtotal > 0 ? (subtotal >= 100 ? 0 : 9.99) : 0;
  const total = subtotal + shipping;

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // If a customer starts checkout, gets redirected to Stripe, then hits
  // Back before completing payment, browsers often restore this page from
  // the back/forward cache with its JS state frozen mid-request — so the
  // button was stuck showing "Redirecting to payment…" forever. The
  // "pageshow" event fires with event.persisted === true specifically when
  // a page is restored from bfcache (as opposed to a normal fresh load,
  // where submitting is already false by default), so this only resets the
  // button in the exact case that was broken.
  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) setSubmitting(false);
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");

    const stripeItems = items.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      purchaseType: item.purchaseType,
      size: item.size,
      color: item.color,
    }));
    if (shipping > 0) {
      stripeItems.push({ name: "Shipping", price: shipping, quantity: 1 });
    }

    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: stripeItems,
          email: form.email,
          shipping: form,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) throw new Error(data.error || "Could not start checkout.");
      window.location.href = data.url; // hand off to Stripe's hosted checkout page
    } catch (err) {
      setError(err.message || "Could not start checkout. Please try again.");
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-av-deep pt-36 pb-24 min-h-screen">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 text-center">
          <ShoppingBag className="h-12 w-12 text-av-gold/40 mx-auto mb-6" />
          <h1 className="font-display text-4xl font-bold text-av-alloy">Your cart is empty</h1>
          <p className="mt-4 text-av-alloy/60">Add something first, then come back here to check out.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/shop" className="inline-flex items-center gap-2 bg-av-gold text-av-deep px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:brightness-110 transition">
              Shop The Range
            </Link>
            <Link to="/" className="inline-flex items-center gap-2 border-2 border-av-teal text-av-alloy px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold hover:border-av-gold hover:text-av-gold transition">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-av-deep pt-28 md:pt-36 pb-24">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <ScrollReveal>
          <p className="text-[11px] uppercase tracking-[0.3em] text-av-gold mb-3">Checkout</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-av-alloy">Complete your order</h1>
        </ScrollReveal>

        {canceled && (
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 border border-destructive/40 bg-destructive/10 text-destructive px-5 py-4 rounded">
            <div className="flex items-center gap-3 flex-1">
              <XCircle className="h-5 w-5 shrink-0" />
              <span className="text-sm">Checkout was canceled — your cart is still here whenever you're ready.</span>
            </div>
            {/* Explicit, guaranteed-working links back out of this page —
                not relying on the person to notice the header nav. */}
            <div className="flex items-center gap-3 shrink-0">
              <Link to="/cart" className="text-xs uppercase tracking-[0.15em] font-semibold underline underline-offset-4 hover:text-av-alloy transition">
                View Cart
              </Link>
              <Link to="/shop" className="text-xs uppercase tracking-[0.15em] font-semibold underline underline-offset-4 hover:text-av-alloy transition">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}

        <form onSubmit={submit} className="mt-12 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="font-display text-xl font-bold text-av-alloy mb-4">Contact</h2>
              <Field label="Email" type="email" value={form.email} onChange={update("email")} required />
            </section>
            <section>
              <h2 className="font-display text-xl font-bold text-av-alloy mb-4">Shipping Address</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="First name" value={form.firstName} onChange={update("firstName")} required />
                <Field label="Last name" value={form.lastName} onChange={update("lastName")} required />
                <div className="sm:col-span-2"><Field label="Address" value={form.address} onChange={update("address")} required /></div>
                <Field label="City" value={form.city} onChange={update("city")} required />
                <Field label="Postcode" value={form.postcode} onChange={update("postcode")} required />
                <div className="sm:col-span-2"><Field label="Country" value={form.country} onChange={update("country")} required /></div>
              </div>
            </section>
            <section>
              <h2 className="font-display text-xl font-bold text-av-alloy mb-4">Payment</h2>
              <div className="border border-av-teal/40 p-5 rounded flex items-center gap-3 text-av-alloy/60 text-sm">
                <Lock className="h-4 w-4 text-av-gold" />
                You'll enter your card details on Stripe's secure checkout page in the next step — no card details are ever collected or stored on this site.
              </div>
              {error && (
                <div className="mt-4 border border-destructive/40 bg-destructive/10 text-destructive px-4 py-3 rounded text-sm">
                  {error}
                </div>
              )}
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="border border-av-teal/40 p-6 sticky top-28">
              <h2 className="font-display text-xl font-bold text-av-alloy mb-5">Order Summary</h2>
              <div className="space-y-4 max-h-72 overflow-auto pr-1">
                {items.map((item) => (
                  <div key={item.cartId} className="flex gap-3">
                    <div className="w-14 h-16 bg-av-teal/20 shrink-0 overflow-hidden">
                      <Image src={item.image} alt={item.name} fittingType="fill" className="h-full w-full" />
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="text-av-alloy font-semibold">{item.name}</p>
                      <p className="text-xs text-av-alloy/50">
                        {item.size ? `${item.size} · ` : ""}Qty {item.quantity}
                      </p>
                      <p className="text-av-gold mt-1">{formatNZD(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-av-teal/40 mt-5 pt-5 space-y-2 text-sm">
                <div className="flex justify-between text-av-alloy/70"><span>Subtotal</span><span>{formatNZD(subtotal)}</span></div>
                <div className="flex justify-between text-av-alloy/70"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatNZD(shipping)}</span></div>
                <div className="flex justify-between items-baseline pt-2 border-t border-av-teal/40 mt-2">
                  <span className="text-av-alloy">Total</span>
                  <span className="font-display text-2xl font-bold text-av-gold">{formatNZD(total)}</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-av-gold text-av-deep px-6 py-4 rounded-full text-sm uppercase tracking-[0.2em] font-bold hover:brightness-110 transition disabled:opacity-60"
              >
                {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Redirecting to payment…</> : "Continue to Payment"}
              </button>
              <Link
                to="/cart"
                className="mt-3 block text-center text-xs uppercase tracking-[0.2em] text-av-alloy/50 hover:text-av-gold transition"
              >
                Back to Cart
              </Link>
              <p className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-av-alloy/40">
                {form.country || "New Zealand"} · NZD
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, type = "text", value, onChange, required }) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.2em] text-av-alloy/50 mb-2">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border border-av-teal rounded px-4 py-3 text-av-alloy focus:border-av-gold outline-none transition"
      />
    </div>
  );
}
