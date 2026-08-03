import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import ProductCard from '../ProductCard';
import { PRODUCTS } from '@/lib/productData';

export default function ProductShowcase() {
  const [products, setProducts] = useState(PRODUCTS);

  useEffect(() => {
    base44.entities.Product.list('display_order', 10).
    then((data) => {
      if (data && data.length > 0) setProducts(data);
    }).
    catch(() => {});
  }, []);

  return (
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16 gap-4">
          <h2 className="text-4xl md:text-6xl text-cream leading-tight [font-family:'EB_Garamond',_serif] font-bold">Five Products.
One system.
          </h2>
          <p className="text-ash max-w-md text-sm md:text-base">
            Each product is treated as a distinct performance signal — not just another SKU on a shelf. Find the one that matches your goal.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) =>
          <ProductCard key={p.id || p.slug} product={p} index={i} />
          )}

          {/* View Full Range CTA card */}
          <Link
            to="/shop"
            className="group border border-dashed border-line rounded-sm p-8 flex flex-col items-center justify-center text-center min-h-[400px] hover:border-vital transition-colors">
            
            <div className="font-display text-2xl text-cream mb-3 group-hover:text-vital-bright transition-colors">
              View Full Range
            </div>
            <p className="text-ash text-sm max-w-[200px]">
              Explore all five formulas and find your signal.
            </p>
            <div className="mt-6 font-mono text-[10px] tracking-widest uppercase text-vital-bright">
              Shop All →
            </div>
          </Link>
        </div>
      </div>
    </section>);

}
