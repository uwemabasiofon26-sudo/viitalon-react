import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Play, Pause } from "lucide-react";
import { Image } from "@/components/ui/image";
import { formatNZD } from "@/lib/brand";
import { cn } from "@/lib/utils";

// Looping apparel showcase. Respects prefers-reduced-motion by starting
// paused, and always exposes a visible, keyboard-reachable pause/play
// control — the animation is never the only way to see every item, since
// the same products are also listed in the mobile grid.
export default function ApparelMarquee({ items }) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPaused(mq.matches);
    const onChange = (e) => setPaused(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div>
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 mb-6 flex justify-end">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? "Play apparel showcase animation" : "Pause apparel showcase animation"}
          className="inline-flex items-center gap-2 rounded-full border border-av-teal px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-av-alloy/80 hover:text-av-gold hover:border-av-gold transition"
        >
          {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          {paused ? "Play" : "Pause"}
        </button>
      </div>
      <div
        className={cn("flex gap-6 w-max", !paused && "animate-marquee")}
        style={paused ? { animationPlayState: "paused" } : undefined}
      >
        {[...items, ...items, ...items, ...items].map((p, i) => (
          <Link key={i} to={`/product/${p.slug}`} className="group block w-72 shrink-0">
            <div className="frame-corner aspect-[4/5] overflow-hidden bg-av-teal/20">
              <Image src={p.image} alt={p.name} fittingType="fill" className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="mt-4">
              <h3 className="font-display text-lg font-bold text-av-alloy">{p.name}</h3>
              <p className="text-sm text-av-alloy/80">{p.tagline}</p>
              <p className="mt-2 text-av-gold font-semibold">{formatNZD(p.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
