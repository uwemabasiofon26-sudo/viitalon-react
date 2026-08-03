import React from 'react';
import { ShieldCheck, FlaskConical, Beaker, Eye } from 'lucide-react';

const reasons = [
{
  icon: Eye,
  title: 'Fully Disclosed',
  desc: 'Every milligram on the label. No proprietary blends hiding weak doses behind a wall of marketing.'
},
{
  icon: ShieldCheck,
  title: 'Third-Party Tested',
  desc: 'Every batch tested by independent labs for purity, potency, and contaminants before it reaches you.'
},
{
  icon: Beaker,
  title: 'Clinical Dosing',
  desc: 'Ingredients dosed to the levels shown to work in research — not token amounts for a label claim.'
},
{
  icon: FlaskConical,
  title: 'Purposeful Formulas',
  desc: 'No fillers, no fluff, no 40-ingredient kitchen-sink formulas. Just what works, in combinations that make sense.'
}];


export default function WhyViitalon() {
  return (
    <section className="py-20 md:py-32 px-6 border-t border-line">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="eyebrow mb-4">Why Viitalon</div>
          <h2 className="font-display font-light text-cream leading-tight text-[32px] md:text-[32px]">Trust, engineered in.

          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <div key={i} className="group">
                <div className="w-12 h-12 border border-line rounded-sm flex items-center justify-center mb-6 group-hover:border-vital transition-colors hidden">
                  <Icon size={20} className="text-vital-bright hidden" />
                </div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-ash mb-2 hidden">
                  0{i + 1}
                </div>
                <h3 className="font-display text-[22px] text-cream mb-3">{r.title}</h3>
                <p className="text-ash text-[16px] leading-relaxed">{r.desc}</p>
              </div>);

          })}
        </div>
      </div>
    </section>);

}
