import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useCart } from "@/context/CartContext";
import { formatNZD } from "@/lib/brand";
import ScrollReveal from "@/components/ScrollReveal";
import { useSEO } from "@/hooks/useSEO";

export default function Cart() {
  useSEO({ title: "Your Cart", path: "/cart", noindex: true });

  const { items, removeItem, updateQty, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-av-deep pt-36 pb-24 min-h-screen">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 text-center">
          <ShoppingBag className="h-12 w-12 text-av-gold/40 mx-auto mb-6" />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-av-alloy">Your cart is empty</h1>
          <p className="mt-4 text-av-alloy/60">Build your performance system and fuel your training.</p>
          <Link to="/shop" className="mt-8 inline-flex items-center gap-2 bg-av-gold text-av-deep px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:brightness-110 transition">
            Shop The Range <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-av-deep pt-28 md:pt-36 pb-24">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <ScrollReveal>
          <p className="text-[11px] uppercase tracking-[0.3em] text-av-gold mb-3">Cart</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-av-alloy">Your performance system</h1>
        </ScrollReveal>

        <div className="mt-12 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.cartId} className="flex gap-4 border border-av-teal/40 p-4">
                <Link to={`/product/${item.slug}`} className="shrink-0">
                  <div className="w-24 h-28 bg-av-teal/20 overflow-hidden">
                    <Image src={item.image} alt={item.name} fittingType="fill" className="h-full w-full" />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg font-bold text-av-alloy">{item.name}</h3>
                      {(item.size || item.color) && (
                        <p className="text-xs uppercase tracking-[0.15em] text-av-alloy/50 mt-1">
                          {[item.size, item.color].filter(Boolean).join(" · ")}
                        </p>
                      )}
                    </div>
                    <button onClick={() => removeItem(item.cartId)} className="text-av-alloy/40 hover:text-destructive transition" aria-label="Remove">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="inline-flex items-center border border-av-teal rounded-full">
                      <button onClick={() => updateQty(item.cartId, item.quantity - 1)} className="p-2 text-av-alloy/70 hover:text-av-gold" aria-label="Decrease"><Minus className="h-3 w-3" /></button>
                      <span className="px-3 text-sm text-av-alloy">{item.quantity}</span>
                      <button onClick={() => updateQty(item.cartId, item.quantity + 1)} className="p-2 text-av-alloy/70 hover:text-av-gold" aria-label="Increase"><Plus className="h-3 w-3" /></button>
                    </div>
                    <span className="font-display text-lg font-bold text-av-gold">{formatNZD(item.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="border border-av-teal/40 p-6 sticky top-28">
              <h2 className="font-display text-xl font-bold text-av-alloy mb-5">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-av-alloy/70"><span>Subtotal</span><span>{formatNZD(subtotal)}</span></div>
                <div className="flex justify-between text-av-alloy/70"><span>Shipping</span><span>Calculated at checkout</span></div>
              </div>
              <div className="border-t border-av-teal/40 mt-5 pt-5 flex justify-between items-baseline">
                <span className="text-av-alloy">Total</span>
                <span className="font-display text-2xl font-bold text-av-gold">{formatNZD(subtotal)}</span>
              </div>
              <Link to="/checkout" className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-av-gold text-av-deep px-6 py-4 rounded-full text-sm uppercase tracking-[0.2em] font-bold hover:brightness-110 transition">
                Checkout <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/shop" className="mt-3 block text-center text-xs uppercase tracking-[0.2em] text-av-alloy/50 hover:text-av-gold transition">
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
