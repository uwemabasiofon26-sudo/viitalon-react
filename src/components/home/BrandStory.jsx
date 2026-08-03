import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_STORY_IMAGE } from '@/lib/productData';

export default function BrandStory() {
  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      <img
        src={BRAND_STORY_IMAGE}
        alt="Viitalon brand story"
        className="absolute inset-0 w-full h-full object-cover" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-deep/80 via-transparent to-transparent" />

      <div className="relative h-full flex items-end pb-16 md:pb-24 px-6 md:px-16">
        <div className="max-w-xl">
          <div className="eyebrow mb-4 hidden">Our Mission</div>
          <h2 className="font-display font-light text-3xl md:text-5xl text-cream leading-tight">
            Effective supplements, built around ingredients we would take ourselves.
          </h2>
          <p className="text-cream-dim mt-6 text-base md:text-lg leading-relaxed">
            Viitalon combines purposeful ingredients, practical formulas, and transparent product information to help people feel stronger, perform better, and live with greater vitality — every day.
          </p>
          <Link
            to="/about"
            className="inline-block mt-8 tracking-widest uppercase text-vital-bright hover:text-cream transition-colors [font-family:'Bungee',_system-ui] text-base">READ OUR STORY →


          </Link>
        </div>
      </div>
    </section>);

}
