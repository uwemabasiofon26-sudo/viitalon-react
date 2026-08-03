import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { HERO_IMAGE } from '@/lib/productData';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink-deep">
      {/* Background glow */}
      <div className="absolute inset-0 glow-red animate-breathe" />

      {/* Hero image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40" />
        
        <div className="absolute inset-0 bg-gradient-to-b from-ink-deep/60 via-ink-deep/40 to-ink-deep" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="eyebrow mb-8 animate-fade-up hidden" style={{ animationDelay: '0.1s', opacity: 0 }}>
          VIITALON
        </div>
        <h1 className="font-display font-light text-5xl md:text-7xl lg:text-8xl text-cream leading-[1.05] tracking-tight animate-fade-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          Live stronger.<br />
          <span className="text-vital-bright italic">Every</span> day.
        </h1>
        <p className="text-ash text-lg md:text-xl mt-8 max-w-xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
          Fully disclosed, high-strength formulas for training, strength, recovery, and everyday vitality — no proprietary blends, no shortcuts.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-up" style={{ animationDelay: '0.6s', opacity: 0 }}>
          <Link
            to="/shop"
            className="bg-vital hover:bg-vital-bright text-cream font-body font-bold text-sm tracking-wide px-8 py-4 rounded-[40px] transition-colors">
            
            Shop the Range
          </Link>
          <Link
            to="/about"
            className="border border-line hover:border-vital text-cream font-body font-bold text-sm tracking-wide px-8 py-4 rounded-[40px] transition-colors">
            
            Our Mission
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-vital-bright animate-scroll-cue" />
        <ArrowDown size={14} className="text-ash" />
      </div>
    </section>);

}
