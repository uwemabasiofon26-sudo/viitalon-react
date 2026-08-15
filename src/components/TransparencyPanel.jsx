import React, { useState } from 'react';
import SignalLine from './SignalLine';
import IngredientModal from './IngredientModal';
import SupplementFactsLabel from './SupplementFactsLabel';
import { getIngredientData } from '@/lib/ingredientData';

export default function TransparencyPanel({ product }) {
  const [selected, setSelected] = useState(null);

  // Products that ship as two separate bottles (e.g. REDLINE STACK) carry
  // their own real supplement-facts labels — rendered side by side here
  // instead of the single-formula ingredient list below.
  if (product?.supplement_facts?.length) {
    return (
      <div className="bg-ink-surface border border-line rounded-sm p-8 md:p-12">
        {product.signal_path && (
          <div className="h-10 mb-8">
            <SignalLine path={product.signal_path} className="w-full h-full" />
          </div>
        )}
        <div className="eyebrow mb-2">Fully Disclosed Formula</div>
        <h3 className="font-display text-2xl md:text-3xl text-cream mb-8">
          Supplement Facts — Both Formulas
        </h3>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
          {product.supplement_facts.map((facts, i) => (
            <SupplementFactsLabel key={i} data={facts} />
          ))}
        </div>
        {product.made_in && (
          <div className="mt-8 font-mono text-[10px] tracking-widest uppercase text-ash">
            Made in {product.made_in}
          </div>
        )}
      </div>
    );
  }

  if (!product?.ingredients?.length) return null;

  return (
    <div className="bg-ink-surface border border-line rounded-sm p-8 md:p-12">
      {/* Signal line */}
      {product.signal_path && (
        <div className="h-10 mb-8">
          <SignalLine path={product.signal_path} className="w-full h-full" />
        </div>
      )}

      <div className="flex items-baseline justify-between mb-2">
        <div>
          <div className="eyebrow mb-2">Fully Disclosed Formula</div>
          <h3 className="font-display text-2xl md:text-3xl text-cream">
            {product.slug === 'the-stack' ? 'THE MAKEUP' : 'Supplement Facts'}
          </h3>
        </div>
        <div className="font-mono text-xs text-ash text-right hidden md:block">
          {product.serving_size && <div>Serving: {product.serving_size}</div>}
          {product.capsule_count && <div>{product.capsule_count}</div>}
        </div>
      </div>

      <p className="font-mono text-[10px] tracking-widest uppercase text-ash mb-6">
        Tap any ingredient to explore the science
      </p>

      {/* Ingredient rows */}
      <div className="space-y-0">
        {product.ingredients.map((ing, i) => {
          const data = getIngredientData(ing.name);
          const clickable = !!data;
          return (
            <div
              key={i}
              onClick={() => clickable && setSelected({ ...ing, ...data })}
              className={`grid grid-cols-12 gap-4 items-baseline py-4 border-b border-line last:border-b-0 group transition-colors ${
                clickable ? 'cursor-pointer hover:bg-ink/50 -mx-2 px-2 rounded-sm' : ''
              }`}
            >
              <div className="col-span-7 md:col-span-6 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-sm tracking-wide uppercase ${clickable ? 'group-hover:text-vital-bright transition-colors' : 'text-cream'}`}>
                    {ing.name}
                  </span>
                  {clickable && <span className="text-vital-bright text-xs">{'\u2197'}</span>}
                </div>
                <div className="text-ash text-xs mt-1">{ing.benefit}</div>
              </div>
              <div className="col-span-5 md:col-span-6 flex items-center gap-3 justify-end min-w-0">
                <div className="flex-1 h-px bg-line max-w-[120px] hidden md:block" />
                <span className="font-mono text-sm text-vital-bright tracking-wide text-right">
                  {ing.dose}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tagline */}
      <div className="mt-8 pt-8 border-t border-line">
        <p className="font-display text-lg text-cream italic">
          Every mg disclosed. No blend to hide behind.
        </p>
      </div>

      {product.made_in && (
        <div className="mt-4 font-mono text-[10px] tracking-widest uppercase text-ash">
          Made in {product.made_in}
        </div>
      )}

      {selected && (
        <IngredientModal ingredient={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
