import React, { useState } from 'react';
import IngredientModal from './IngredientModal';
import { getIngredientData } from '@/lib/ingredientData';

// Renders one FDA-style "Supplement Facts" panel from structured data:
// {
//   product_name: 'TESTCORE',
//   serving_size: '3 Capsules',
//   servings_per_container: 30,
//   vitamins: [{ name, amount, dv }],
//   groups: [{ title, total_dose, ingredients: [{ name, note }] }],
//   other_ingredients: 'Magnesium Stearate, Vegetable Capsule',
// }
export default function SupplementFactsLabel({ data }) {
  const [selected, setSelected] = useState(null);

  if (!data) return null;

  const openIngredient = (name) => {
    const info = getIngredientData(name);
    if (info) setSelected({ name, ...info });
  };

  return (
    <div className="bg-cream text-ink border-2 border-ink rounded-sm p-5 md:p-6 font-body max-w-md mx-auto w-full">
      {data.product_name && (
        <div className="font-mono text-[10px] tracking-widest uppercase text-vital mb-2">
          {data.product_name}
        </div>
      )}

      <h4 className="font-display text-2xl md:text-3xl font-bold leading-none mb-2 border-b-8 border-ink pb-2">
        Supplement Facts
      </h4>

      <div className="border-b-4 border-ink py-1.5 text-sm">
        Serving Size: {data.serving_size}
      </div>
      <div className="border-b-8 border-ink py-1.5 text-sm">
        Servings Per Container: {data.servings_per_container}
      </div>

      <div className="flex justify-between items-end border-b border-ink pt-2 pb-1">
        <span className="text-xs font-bold uppercase">Amount Per Serving</span>
        <span className="text-xs font-bold uppercase">% Daily Value</span>
      </div>

      {/* Vitamins & Minerals */}
      {data.vitamins?.length > 0 && (
        <div className="border-b-4 border-ink">
          <div className="text-xs font-bold uppercase tracking-wide pt-2 pb-1">Vitamins &amp; Minerals</div>
          {data.vitamins.map((v, i) => {
            const clickable = !!getIngredientData(v.name);
            return (
              <div
                key={i}
                onClick={() => clickable && openIngredient(v.name)}
                className={`flex justify-between gap-2 py-1 border-t border-ink/20 text-sm ${clickable ? 'cursor-pointer hover:text-vital transition-colors' : ''}`}
              >
                <span className="flex-1">{v.name}</span>
                <span className="whitespace-nowrap">{v.amount}</span>
                <span className="whitespace-nowrap w-12 text-right">{v.dv}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Proprietary-style blends, fully disclosed */}
      {data.groups?.map((g, gi) => (
        <div key={gi} className="border-b border-ink/40 py-2">
          <div className="flex justify-between text-sm font-bold uppercase tracking-wide">
            <span>{g.title}{g.dagger !== false ? '†' : ''}</span>
            <span className="whitespace-nowrap">{g.total_dose}</span>
            <span className="whitespace-nowrap w-12 text-right">**</span>
          </div>
          <ul className="mt-1 space-y-0.5">
            {g.ingredients.map((ing, ii) => {
              const name = typeof ing === 'string' ? ing : ing.name;
              const clickable = !!getIngredientData(name);
              return (
                <li
                  key={ii}
                  onClick={() => clickable && openIngredient(name)}
                  className={`text-sm pl-3 ${clickable ? 'cursor-pointer hover:text-vital transition-colors underline decoration-dotted underline-offset-2' : ''}`}
                >
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* Footnotes */}
      <div className="pt-3 text-[11px] leading-snug text-ink/70">
        <p>† Daily Value (DV) not established.</p>
        <p>* Percent Daily Values are based on a 2,000 calorie diet.</p>
        <p>** Daily Value (DV) not established.</p>
      </div>

      {data.other_ingredients && (
        <div className="mt-3 pt-3 border-t border-ink text-[11px] leading-snug">
          <span className="font-bold uppercase">Other Ingredients: </span>
          {data.other_ingredients}
        </div>
      )}

      <p className="mt-3 text-center font-mono text-[9px] tracking-widest uppercase text-ink/50">
        Tap any ingredient to explore the science
      </p>

      {selected && (
        <IngredientModal ingredient={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
