import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    quote: "HAVOC is the cleanest pre-workout I've used. No jitters, just locked-in focus and a pump that lasts the whole session.",
    name: "Marcus T.",
    role: "Powerlifter",
    rating: 5,
  },
  {
    quote: "The stack keeps me consistent for the first time. DRIVE every morning, HAVOC before training — I feel the difference every week.",
    name: "Priya S.",
    role: "CrossFit Athlete",
    rating: 5,
  },
  {
    quote: "GROW mixes smooth and actually tastes good. 25g of clean protein post-workout has made a real difference to my recovery.",
    name: "Daniel K.",
    role: "Bodybuilder",
    rating: 5,
  },
  {
    quote: "Fully disclosed formulas sold me. I know exactly what I'm putting in my body. That's rare and it matters.",
    name: "Aroha M.",
    role: "Hybrid Athlete",
    rating: 5,
  },
];

export default function ReviewCarousel() {
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (dir) => setIndex((i) => (i + dir + REVIEWS.length) % REVIEWS.length),
    []
  );

  useEffect(() => {
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [go]);

  const r = REVIEWS[index];

  return (
    <div className="relative max-w-3xl mx-auto">
      <Quote className="h-10 w-10 text-av-gold/40 mx-auto mb-6 rotate-180" />
      <div className="relative min-h-[180px] md:min-h-[150px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-av-gold text-av-gold" />
              ))}
            </div>
            <p className="text-lg md:text-2xl text-av-alloy font-display font-medium leading-relaxed text-balance">
              "{r.quote}"
            </p>
            <div className="mt-6 text-sm">
              <span className="text-av-gold font-semibold uppercase tracking-[0.15em]">{r.name}</span>
              <span className="text-av-alloy/50"> · {r.role}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Review ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index ? "w-8 bg-av-gold" : "w-2 bg-av-alloy/30 hover:bg-av-alloy/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
