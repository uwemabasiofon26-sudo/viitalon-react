import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useProducts } from "@/hooks/useProducts";
import { formatNZD } from "@/lib/brand";
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxText from "@/components/ParallaxText";
import { useSEO } from "@/hooks/useSEO";

export default function PerformanceNutrition() {
  useSEO({
    title: "Performance Nutrition Supplements",
    description: "Explore Korzavo's performance nutrition range — pre-workout, protein, creatine, daily performance and recovery supplements, all fully disclosed with exact dosages.",
    path: "/performance-nutrition",
  });

  const { data: products } = useProducts();
  const supps = (products || []).filter((p) => p.category === "supplement");

  return (
    <div className="bg-av-deep pt-28 md:pt-36">
      <section className="mx-auto max-w-[1400px] px-5 md:px-10 pb-16">
        <ScrollReveal>
          <p className="text-[11px] uppercase tracking-[0.3em] text-av-gold mb-3">Korzavo Performance Nutrition</p>
          <h1 className="font-display text-4xl md:text-7xl font-bold tracking-tight text-av-alloy max-w-4xl">
            Fuel Your Strength. Elevate Your Performance.
          </h1>
          <p className="mt-6 text-lg text-av-alloy/70 max-w-2xl leading-relaxed">
            A complete performance nutrition range created for people who train with purpose and demand more from every session.
          </p>
        </ScrollReveal>
      </section>

      <section className="relative py-16 md:py-24 border-y border-av-teal/30 overflow-hidden">
        {/* Hidden on mobile — at 18vw this decorative watermark was
            overflowing/clipping awkwardly on narrow screens. */}
        <ParallaxText className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
          <span className="font-display text-[18vw] font-black tracking-tighter text-av-teal/20">PERFORMANCE</span>
        </ParallaxText>
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10 space-y-20 md:space-y-28">
          {supps.map((p, i) => (
            <div key={p.id} className={`grid md:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 ? "md:[direction:rtl]" : ""}`}>
              <ScrollReveal className="[direction:ltr]">
                <div className="frame-corner overflow-hidden bg-av-teal/20 aspect-[4/5]">
                  <Image src={p.image} alt={p.name} fittingType="fill" className="h-full w-full" />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1} className="[direction:ltr]">
                <div className="font-mono text-av-gold/50 text-sm mb-3">0{i + 1}</div>
                <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-av-alloy">{p.name}</h2>
                <p className="text-av-gold text-sm uppercase tracking-[0.2em] mt-2">{p.tagline}</p>
                <p className="mt-5 text-av-alloy/70 leading-relaxed">{p.description}</p>
                {p.benefits?.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                    {p.benefits.map((b, j) => (
                      <li key={j} className="text-sm text-av-alloy/80 border-b border-av-teal/40 pb-1">{b}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-8 flex items-center gap-6">
                  <span className="font-display text-3xl font-bold text-av-gold">{formatNZD(p.price)}</span>
                  <Link to={`/product/${p.slug}`} className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-av-alloy hover:text-av-gold transition">
                    View Product <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-24 text-center">
        <ScrollReveal>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-av-alloy">Build Your Performance System</h2>
          <p className="mt-4 text-av-alloy/60 max-w-xl mx-auto">
            Get all five products together as a complete stack and save.
          </p>
          <Link to="/stack" className="mt-8 inline-flex items-center gap-2 bg-av-gold text-av-deep px-8 py-4 rounded-full text-sm uppercase tracking-[0.2em] font-bold hover:brightness-110 transition">
            View The Stack <ArrowUpRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
