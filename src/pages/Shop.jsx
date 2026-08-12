import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { base44 } from '@/api/base44Client';
import { PRODUCTS } from '@/lib/productData';

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Peak — Energy & Strength', value: 'peak' },
  { label: 'Rest — Sleep & Recovery', value: 'rest' },
  { label: 'Clarity — Calm & Wellness', value: 'clarity' },
  { label: 'Drive — Vitality', value: 'drive' },
  { label: 'Stacks', value: 'stack' },
];

const categoryMap = {
  vortex: 'peak',
  'creatine-monohydrate': 'peak',
  somnus: 'rest',
  'magnesium-glycinate': 'clarity',
  vigor: 'drive',
  'the-stack': 'stack',
};

export default function Shop() {
  const [products, setProducts] = useState(PRODUCTS);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    base44.entities.Product.list('display_order', 20)
      .then(data => {
        if (data && data.length > 0) setProducts(data);
      })
      .catch(() => {});
  }, []);

  const filtered = activeFilter === 'all'
    ? products
    : products.filter(p => categoryMap[p.slug] === activeFilter);

  return (
    <div className="pt-40 md:pt-48">
      {/* Header */}
      <section className="px-6 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="eyebrow mb-3">The Range</div>
          <h1 className="font-display font-light text-5xl md:text-7xl text-cream leading-tight">
            Five formulas.<br />One system.
          </h1>
          <p className="text-ash mt-6 max-w-xl text-base md:text-lg">
            Fully disclosed, high-strength supplements for training, strength, recovery, and everyday vitality. Find the signal that matches your goal.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 pb-12 border-b border-line">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`font-mono text-[11px] tracking-widest uppercase px-4 py-2 rounded-sm border transition-colors ${
                activeFilter === f.value
                  ? 'border-vital bg-vital text-cream'
                  : 'border-line text-ash hover:text-cream hover:border-ash'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <ProductCard key={p.id || p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
