import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image } from "@/components/ui/image";

/**
 * Auto-advancing product slideshow.
 * - First slide enters with an energetic bounce.
 * - Subsequent slides transition with a subtle zoom-in and fade.
 */
export default function HeroSlideshow({ images = [], interval = 3200 }) {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % Math.max(images.length, 1));
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(next, interval);
    return () => clearInterval(t);
  }, [next, interval, images.length]);

  if (!images.length) return null;
  const current = images[index];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={index === 0 ? { scale: 0.6, opacity: 0, y: 40 } : { scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: index === 0 ? 0.95 : 1.05, opacity: 0 }}
          transition={
            index === 0
              ? { type: "spring", stiffness: 220, damping: 12, bounce: 0.55 }
              : { duration: 1.1, ease: [0.22, 1, 0.36, 1] }
          }
          className="absolute inset-0"
        >
          <Image src={current} alt="Korzavo product" fittingType="fill" className="h-full w-full" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-av-deep via-av-deep/30 to-av-deep/40 pointer-events-none" />

      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-8 bg-av-gold" : "w-2 bg-av-alloy/40 hover:bg-av-alloy/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
