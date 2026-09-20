import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatNZD } from "@/lib/brand";
import { useCart } from "@/context/CartContext";

export default function FuelBar({ product, purchaseType, price, size, color }) {
  const [show, setShow] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!product || product.inStock === false) return null;

  const add = () =>
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.image,
      price,
      purchaseType,
      size,
      color,
    });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 inset-x-0 z-40 border-t border-av-teal/50 bg-av-deep/95 backdrop-blur-xl"
        >
          <div className="mx-auto max-w-[1400px] px-5 md:px-10 h-16 md:h-20 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.25em] text-av-gold/70">Fuel Now</div>
              <div className="font-display text-sm md:text-lg font-bold text-av-alloy leading-tight">
                {product.name} · <span className="text-av-gold">{formatNZD(price)}</span>
              </div>
            </div>
            <button
              onClick={add}
              className="shrink-0 px-6 md:px-8 py-3 rounded-full bg-av-gold text-av-deep text-xs md:text-sm uppercase tracking-[0.2em] font-bold hover:brightness-110 transition"
            >
              Add to Cart
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
