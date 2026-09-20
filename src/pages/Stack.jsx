import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Star } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useProducts } from "@/hooks/useProducts";
import { formatNZD } from "@/lib/brand";
import { useCart } from "@/context/CartContext";
import ScrollReveal from "@/components/ScrollReveal";
import { useSEO } from "@/hooks/useSEO";

export default function Stack() {
  useSEO({
    title: "The Complete Stack",
    description: "HAVOC, DRIVE, CREATINE, GROW and GLYCOLOAD bundled as a complete performance nutrition system — a discounted one-time purchase for training, nutrition and recovery.",
    path: "/stack",
  });

  const { data: products } = useProducts();
  const { addItem } = useCart();
  const [packed, setPacked] = useState([]);

  // The stack is a fixed bundle of these five products specifically — not
  // every product in the "supplement" category (which now also includes
  // NITROXAR and ALPHA NIGHT RECOVERY, which aren't part of this bundle).
  const STACK_PRODUCT_IDS = ["havoc", "drive", "creatine", "grow", "glycoload"];
  const supps = (products || []).filter((p) => STACK_PRODUCT_IDS.includes(p.id));
  const stack = (products || []).find((p) => p.category === "stack");

  const pack = (p) => {
    setPacked((prev) => (prev.includes(p.id) ? prev : [...prev, p.id]));
  };

  const addStack = () => {
    if (!stack) return;
    addItem({
      productId: stack.id,
      name: stack.name,
      slug: stack.slug,
      image: stack.image,
      price: stack.price,
      purchaseType: "one_time",
    });
  };

  const individualValue = 323.95;
  const stackPrice = stack?.price || 259.99;
  const savings = individualValue - stackPrice;

  return (
    <div className="bg-av-deep pt-28 md:pt-36 pb-24">
      <section className="mx-auto max-w-[1400px] px-5 md:px-10">
        <ScrollReveal>
          <p className="text-[11px] uppercase tracking-[0.3em] text-av-gold mb-3">The Korzavo Stack</p>
          <h1 className="font-display text-4xl md:text-7xl font-bold tracking-tight text-av-alloy max-w-4xl">
            One pack. Three systems. Total daily performance.
          </h1>
          <p className="mt-6 text-lg text-av-alloy/70 max-w-2xl">
            Get all five products together as a complete performance system — designed to support preparation, training, nutrition and recovery.
          </p>
        </ScrollReveal>

        {/* TIERED SAVINGS */}
        <ScrollReveal delay={0.1} className="mt-12 grid md:grid-cols-2 gap-px bg-av-teal/30 border border-av-teal/30">
          <div className="bg-av-deep p-8 md:p-10">
            <p className="text-[11px] uppercase tracking-[0.25em] text-av-alloy/50">Individual Value</p>
            <p className="font-display text-5xl font-bold text-av-alloy/60 mt-3 line-through">{formatNZD(individualValue)}</p>
            <p className="text-sm text-av-alloy/50 mt-3">HAVOC + DRIVE + CREATINE + GROW + GLYCOLOAD bought separately</p>
          </div>
          <div className="bg-av-gold text-av-deep p-8 md:p-10">
            <p className="text-[11px] uppercase tracking-[0.25em] text-av-deep/70">Stack Price</p>
            <p className="font-display text-5xl font-bold mt-3">{formatNZD(stackPrice)}</p>
            <p className="text-sm mt-3 font-semibold">You save {formatNZD(savings)}</p>
          </div>
        </ScrollReveal>

        {/* STACK BUILDER */}
        <div className="mt-20">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-av-alloy mb-3">Stack Builder</h2>
            <p className="text-av-alloy/60 max-w-xl">Click each product to pack it into your system.</p>
          </ScrollReveal>

          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {supps.map((p, i) => {
              const isPacked = packed.includes(p.id);
              return (
                <motion.button
                  key={p.id}
                  onClick={() => pack(p)}
                  whileTap={{ scale: 0.97 }}
                  className="group text-left"
                >
                  <div className="relative frame-corner overflow-hidden bg-av-teal/20 aspect-[4/5]">
                    <Image src={p.image} alt={p.name} fittingType="fill" className="h-full w-full" />
                    <AnimatePresence>
                      {isPacked && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-av-deep/40 grid place-items-center"
                        >
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="grid place-items-center h-12 w-12 rounded-full bg-av-gold text-av-deep"
                          >
                            <Check className="h-6 w-6" />
                          </motion.span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-display text-lg font-bold text-av-alloy">{p.name}</h3>
                    <p className="text-xs text-av-alloy/80">{p.tagline}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-av-gold/80">
                      {isPacked ? "Packed" : "Tap to pack"}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-av-teal/40 pt-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-av-alloy/50">Complete Performance Stack</p>
              <p className="font-display text-4xl font-bold text-av-gold mt-1">{formatNZD(stackPrice)}</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-3">
              {/* Trust signal placed right at the decision point, not
                  buried below the fold with the single review carousel. */}
              <div className="flex items-center gap-1.5 text-[11px] text-av-alloy/80">
                <div className="flex text-av-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-av-gold text-av-gold" />
                  ))}
                </div>
                <span>4.9 rating from 300+ athletes</span>
              </div>
              {stack?.inStock === false ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-av-teal/60 bg-av-teal/10 px-8 py-4 text-sm uppercase tracking-[0.2em] font-bold text-av-alloy/60">
                  Out of Stock
                </div>
              ) : (
                <button
                  onClick={addStack}
                  className="inline-flex items-center gap-2 bg-av-gold text-av-deep px-8 py-4 rounded-full text-sm uppercase tracking-[0.2em] font-bold hover:brightness-110 transition"
                >
                  Add Stack To Cart <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <ScrollReveal className="mt-16 text-center">
          <Link to="/shop" className="text-sm uppercase tracking-[0.2em] text-av-alloy/60 hover:text-av-gold transition">
            Or shop individual products →
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
