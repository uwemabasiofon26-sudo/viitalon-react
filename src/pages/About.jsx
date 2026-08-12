import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FlaskConical, Eye, Leaf } from 'lucide-react';

const values = [
{ icon: Eye, title: 'Transparency', desc: 'Every milligram disclosed. No proprietary blends, no hidden doses, no marketing designed to obscure what is actually in the bottle.' },
{ icon: ShieldCheck, title: 'Quality', desc: 'Third-party tested, every batch. Purity, potency, and contaminants checked by independent labs before anything reaches you.' },
{ icon: FlaskConical, title: 'Efficacy', desc: 'Ingredients dosed to clinical standard — the levels shown to work in research, not token amounts for a label claim.' },
{ icon: Leaf, title: 'Purpose', desc: 'Formulas built around ingredients we would take ourselves. No fillers, no fluff, no 40-ingredient kitchen-sink formulas.' }];


export default function About() {
  return (
    <div className="pt-40 md:pt-48">
      {/* Hero */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="eyebrow mb-6">About Viitalon</div>
          <h1 className="font-display font-light text-5xl md:text-7xl text-cream leading-tight">
            Built for people who<br />
            <span className="text-vital-bright italic">train.</span>
          </h1>
          <p className="text-ash mt-8 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Viitalon creates effective, high-quality supplements that support everyday health, physical performance, vitality, and long-term wellbeing — combining purposeful ingredients, practical formulas, and transparent product information.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="px-6 py-16 md:py-24 border-y border-line">
        <div className="max-w-4xl mx-auto">
          <div className="eyebrow mb-4">Our Mission</div>
          <p className="font-display font-light text-2xl md:text-4xl text-cream leading-tight">
            To help people feel stronger, perform better, and live with greater vitality — every day.
          </p>
          <p className="text-cream-dim mt-8 text-base md:text-lg leading-relaxed">
            We combine purposeful ingredients, practical formulas, and transparent product information to support everyday health, physical performance, vitality, and long-term wellbeing. Every formula is dosed to clinical standard, tested by third-party labs, and built around ingredients we would take ourselves. No fillers, no proprietary blends hiding weak doses — just what works, at doses that work.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="eyebrow mb-3">What We Stand For</div>
            <h2 className="font-display font-light text-4xl md:text-5xl text-cream">Four principles.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 border border-line rounded-sm flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-vital-bright" />
                  </div>
                  <div>
                    
                    <h3 className="font-display text-2xl text-cream mb-3">{v.title}</h3>
                    <p className="text-ash text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>);

            })}
          </div>
        </div>
      </section>

      {/* Transparency callout */}
      <section className="px-6 py-20 md:py-28 border-t border-line">
        <div className="max-w-4xl mx-auto text-center">
          <div className="eyebrow mb-6">The Viitalon Standard</div>
          <h2 className="font-display font-light text-4xl md:text-6xl text-cream leading-tight">
            Fully disclosed.<br />
            <span className="text-vital-bright italic">No blends to hide behind.</span>
          </h2>
          <p className="text-ash mt-8 text-lg max-w-xl mx-auto leading-relaxed">
            Every ingredient, every milligram, on every label. That is not a marketing claim — it is the minimum standard for anything we put our name on.
          </p>
          <Link
            to="/shop"
            className="inline-block mt-10 bg-vital hover:bg-vital-bright text-cream tracking-widest uppercase px-8 py-4 transition-colors rounded-[40px] text-sm [font-family:'Inter',_ui-sans-serif,_system-ui,_sans-serif] font-bold">EXPLORE THE RANGE


          </Link>
        </div>
      </section>
    </div>);

}
