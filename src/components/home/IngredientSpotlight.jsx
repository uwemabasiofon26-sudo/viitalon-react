import React, { useState, useEffect, useMemo } from 'react';
import { INGREDIENT_DATA, normalizeIngredientName } from '@/lib/ingredientData';
import { PRODUCTS } from '@/lib/productData';

// Build the set of ingredient keys that are actually used by a real product
// today (excluding The Stack, whose "ingredients" list is really just the
// names of the bundled products, not raw ingredients). This means the
// spotlight automatically stays in sync with productData.js — if an
// ingredient is dropped from every formula, it disappears from here too,
// with no manual exclusion list to maintain.
const activeIngredientKeys = new Set(
  PRODUCTS
    .filter((p) => p.slug !== 'the-stack' && p.slug !== 'redline-stack')
    .flatMap((p) => p.ingredients.map((ing) => normalizeIngredientName(ing.name)))
);

const allIngredients = Object.entries(INGREDIENT_DATA)
  .filter(([key]) => activeIngredientKeys.has(key))
  .map(([key, data]) => ({
    key,
    name: key.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    image_url: data.image_url,
    summary: data.summary,
    study: data.study,
  }));

function pickNewIndex(currentIdx, used, total, excluded) {
  let newIdx;
  let attempts = 0;
  do {
    newIdx = Math.floor(Math.random() * total);
    attempts++;
  } while ((newIdx === currentIdx || used.has(newIdx) || excluded.has(newIdx)) && attempts < 50);
  return newIdx;
}

export default function IngredientSpotlight() {
  const [indices, setIndices] = useState([0, 1, 2].filter((i) => i < allIngredients.length));
  const [brokenIdx, setBrokenIdx] = useState(() => new Set());

  const rotate = () => {
    setIndices((prev) => {
      const used = new Set();
      return prev.map((currentIdx) => {
        const newIdx = pickNewIndex(currentIdx, used, allIngredients.length, brokenIdx);
        used.add(newIdx);
        return newIdx;
      });
    });
  };

  useEffect(() => {
    if (allIngredients.length <= 3) return;
    const interval = setInterval(rotate, 4000);
    return () => clearInterval(interval);
  }, [brokenIdx]);

  const handleImageError = (idx) => {
    // If an image ever 404s (e.g. a file was renamed), stop selecting it
    // going forward and immediately swap it out rather than showing a
    // broken image icon.
    setBrokenIdx((prev) => {
      if (prev.has(idx)) return prev;
      return new Set(prev).add(idx);
    });
    rotate();
  };

  if (allIngredients.length === 0) return null;

  return (
    <section className="py-20 md:py-32 px-6 border-t border-line">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="eyebrow mb-3">Ingredient Spotlight</div>
          <h2 className="font-display font-light text-4xl md:text-6xl text-cream leading-tight max-w-2xl">
            What is actually in the bottle.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {indices.map((idx, cardNum) => {
            const ing = allIngredients[idx];
            if (!ing) return null;
            return (
              <div key={cardNum} className="group">
                <div className="aspect-square bg-ink-surface border border-line rounded-sm overflow-hidden mb-6 relative">
                  <img
                    key={idx}
                    src={ing.image_url}
                    alt={ing.name}
                    onError={() => handleImageError(idx)}
                    className="w-full h-full object-cover animate-zoom-fade"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/60 via-transparent to-transparent" />
                </div>
                <div key={`text-${idx}`} className="animate-fade-slow">
                  <div className="font-mono text-[10px] tracking-widest uppercase text-vital-bright mb-2">
                    {ing.summary}
                  </div>
                  <h3 className="font-display text-2xl text-cream mb-3">{ing.name}</h3>
                  <p className="text-ash text-sm leading-relaxed">{ing.study}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
