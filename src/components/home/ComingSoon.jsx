import React from 'react';

const comingSoon = [
  { name: 'Hydrate GO™', slug: 'hydrate-go', tag: 'Hydration + Electrolytes' },
  { name: 'Testo V2', slug: 'testo-v2', tag: "Advanced Men's Support Formula" },
  { name: 'Recovery EAA', slug: 'recovery-eaa', tag: 'Essential Amino Acids + Glutamine' },
  { name: 'Whey Protein', slug: 'whey-protein', tag: 'High-Protein Muscle Formula' },
  { name: 'Surge™', slug: 'surge', tag: 'Stim-Free Pump Formula' },
  { name: 'Cream of Rice', slug: 'cream-of-rice', tag: 'Fast-Digesting Carbohydrate' },
];

export default function ComingSoon() {
  return (
    <section className="py-20 md:py-28 overflow-hidden border-t border-line">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="eyebrow mb-3">What's Next</div>
        <h2 className="font-display font-light text-4xl md:text-5xl text-cream leading-tight">
          More coming to the range.
        </h2>
      </div>

      <div className="relative">
        <div className="flex gap-6 animate-marquee w-max">
          {[...comingSoon, ...comingSoon].map((p, i) => (
            <div
              key={i}
              className="w-[260px] md:w-[300px] flex-shrink-0 bg-ink-surface border border-line rounded-sm overflow-hidden group"
            >
              <div className="aspect-[4/5] bg-ink-deep relative overflow-hidden">
                <img
                  src={`/images/coming-soon/${p.slug}.jpg`}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 font-mono text-[10px] tracking-widest uppercase text-cream bg-vital/90 border border-vital-bright px-2.5 py-1 rounded-sm">
                  Coming Soon
                </div>
              </div>
              <div className="p-5">
                <div className="font-display text-lg text-cream leading-tight mb-1">{p.name}</div>
                <div className="font-mono text-[11px] tracking-widest uppercase text-ash">{p.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
