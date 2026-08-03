import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SignalLine from './SignalLine';
import { formatPrice } from '@/lib/utils';

export default function ProductCard({ product, index = 0 }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group relative bg-ink-surface border border-line rounded-sm p-6 md:p-8 flex flex-col transition-all duration-300 hover:border-vital hover:bg-ink-surface/80">
      
      {/* Number */}
      <div className="flex items-center justify-between mb-6 hidden">
        <span className="font-mono text-[10px] tracking-widest uppercase text-ash hidden">
          0{index + 1}
        </span>
        <ArrowUpRight size={16} className="text-ash group-hover:text-vital-bright transition-colors" />
      </div>

      {/* Image */}
      <div
        className={`${
          product.slug === 'the-stack' ? 'aspect-[16/10]' : 'aspect-[3/4]'
        } bg-ink-deep rounded-sm overflow-hidden mb-6 relative`}
      >
        {product.image_url &&
        <img src={product.image_url}
        alt={product.name}
        className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${
          product.slug === 'the-stack' ? 'object-contain p-3' : 'object-cover'
        }`} />

        }
        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/80 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Signal line */}
      <div className="h-8 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <SignalLine path={product.signal_path} className="w-full h-full" />
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="tracking-widest uppercase text-vital-bright mb-2 text-[15px] font-medium">
          {product.category}
        </div>
        <h3 className="font-display text-2xl text-cream tracking-wide mb-3">
          {product.name}
        </h3>
        <p className="text-ash leading-relaxed mb-4 text-base">
          {product.tagline}
        </p>
      </div>

      {/* Price */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-line">
        <span className="font-mono text-sm text-cream">{formatPrice(product.price)}</span>
        <span className="tracking-widest uppercase text-ash group-hover:text-vital-bright transition-colors text-xs [font-family:'Inter',_ui-sans-serif,_system-ui,_sans-serif] font-light">VIEW FORMULA →

        </span>
      </div>
    </Link>);

}
