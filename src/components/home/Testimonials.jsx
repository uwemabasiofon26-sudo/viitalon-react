import React from 'react';

const testimonials = [
{ quote: "The transparency sold me. Every mg disclosed, no blends hiding behind labels. Vortex hits harder than anything I've tried.", name: 'Marcus T.', role: 'Strength athlete' },
{ quote: 'Somnus changed my recovery completely. I wake up actually ready, not just awake. The formula is clean and it works.', name: 'Sarah K.', role: 'CrossFit coach' },
{ quote: 'Been on Creatine for 6 months. Pure, unflavored, exactly what it should be. No nonsense, no filler.', name: 'James R.', role: 'Powerlifter' },
{ quote: 'Vigor is the real deal. High-strength, fully disclosed, and you feel the difference. No proprietary blend BS.', name: 'David L.', role: 'Active professional' },
{ quote: 'Magnesium Glycinate is part of my nightly routine now. Gentle on the stomach, genuinely helps me unwind.', name: 'Emma W.', role: 'Runner' }];


export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 overflow-hidden border-t border-line">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        
        <h2 className="font-display font-light text-4xl md:text-5xl text-cream leading-tight">
          From the people who train.
        </h2>
      </div>

      <div className="relative">
        <div className="flex gap-6 animate-marquee w-max">
          {[...testimonials, ...testimonials].map((t, i) =>
          <div
            key={i}
            className="w-[340px] md:w-[420px] flex-shrink-0 bg-ink-surface border border-line rounded-sm p-8">
            
              <p className="font-display text-lg md:text-xl text-cream leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <div className="font-mono tracking-widest uppercase text-[14px] text-vital-bright font-bold">
                {t.name}
              </div>
              <div className="font-mono tracking-widest uppercase mt-1 text-[12px] font-bold text-ash">
                {t.role}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}
