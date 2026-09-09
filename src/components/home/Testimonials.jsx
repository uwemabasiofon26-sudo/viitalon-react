import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Vortex is the first pre-workout that hasn't given me the jittery crash. Focus stays clean through the whole session.",
    name: 'Josh M.',
    location: 'Auckland',
    product: 'Vortex',
  },
  {
    quote: "Been on Somnus for two months now. Falling asleep faster and actually waking up rested instead of groggy.",
    name: 'Aroha T.',
    location: 'Hamilton',
    product: 'Somnus',
  },
  {
    quote: "Finally a men's formula that lists every dose instead of hiding behind a blend. That's why I switched to Vigor.",
    name: 'Daniel R.',
    location: 'Christchurch',
    product: 'Vigor',
  },
  {
    quote: "Simple, no-fuss creatine that actually mixes properly. No bloating, no weird aftertaste, just works.",
    name: 'Sam K.',
    location: 'Wellington',
    product: 'Creatine Monohydrate',
  },
  {
    quote: "Magnesium Glycinate has been a game changer for my evenings — noticeably less muscle tightness after training.",
    name: 'Priya N.',
    location: 'Tauranga',
    product: 'Magnesium Glycinate',
  },
  {
    quote: "Ordered The Stack to simplify my routine and it genuinely has. One order, everything I take daily, sorted.",
    name: 'Liam F.',
    location: 'Dunedin',
    product: 'The Stack',
  },
  {
    quote: "Rise has replaced my rushed breakfast on gym mornings. Easy to make and keeps me full until lunch.",
    name: 'Chloe W.',
    location: 'Auckland',
    product: 'Rise',
  },
  {
    quote: "Started NMN a few months back on a friend's recommendation — energy through the afternoon slump is noticeably better.",
    name: 'Grant P.',
    location: 'Napier',
    product: 'NMN',
  },
  {
    quote: "Shipping was quick and the packaging felt premium. Tongkat Ali has been part of my morning stack ever since.",
    name: 'Mitchell B.',
    location: 'Palmerston North',
    product: 'Tongkat Ali',
  },
  {
    quote: "Customer support actually replied fast when I had a question about Berberine timing. Rare these days.",
    name: 'Hana S.',
    location: 'Rotorua',
    product: 'Berberine',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 overflow-hidden border-t border-line">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="eyebrow mb-3">Real Results</div>
        <h2 className="font-display font-light text-4xl md:text-5xl text-cream leading-tight">
          What New Zealand is saying.
        </h2>
      </div>

      <div className="relative">
        <div className="flex gap-6 animate-marquee w-max">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="w-[300px] md:w-[340px] flex-shrink-0 bg-ink-surface border border-line rounded-sm p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={14} className="fill-vital-bright text-vital-bright" />
                  ))}
                </div>
                <p className="text-cream-dim text-sm leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
                <div>
                  <div className="font-display text-base text-cream leading-tight">{t.name}</div>
                  <div className="font-mono text-[10px] tracking-widest uppercase text-ash">{t.location}</div>
                </div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-vital-bright">{t.product}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
