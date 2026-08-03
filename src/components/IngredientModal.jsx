import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function IngredientModal({ ingredient, onClose }) {
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!ingredient) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-6"
      onClick={onClose}>
      
      <div className="absolute inset-0 bg-ink-deep/90 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-ink-surface border border-line rounded-lg scrollbar-hide"
        onClick={(e) => e.stopPropagation()}>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-ink-deep/80 border border-line rounded-full text-ash hover:text-cream hover:border-vital transition-colors"
          aria-label="Close">
          
          <X size={18} />
        </button>

        {/* Ingredient image */}
        <div className="aspect-[16/10] w-full overflow-hidden rounded-t-lg relative">
          <img
            src={ingredient.image_url}
            alt={ingredient.name}
            className="w-full h-full object-cover" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-ink-surface via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          <div className="eyebrow mb-3">Ingredient Science</div>
          <h3 className="font-display text-3xl md:text-4xl text-cream mb-3">{ingredient.name}</h3>
          <p className="text-vital-bright font-mono text-xs tracking-wide uppercase mb-6">{ingredient.summary}</p>

          <div className="border-t border-line pt-6">
            <div className="font-mono text-[10px] tracking-widest uppercase text-ash mb-3">Scientific Research</div>
            <p className="text-cream-dim text-sm md:text-base leading-relaxed">{ingredient.study}</p>
          </div>

          {ingredient.dose &&
          <div className="mt-6 flex items-center gap-4">
              <div className="font-mono text-[10px] tracking-widest uppercase text-ash">Dose in formula</div>
              <div className="font-mono text-sm text-vital-bright">{ingredient.dose}</div>
            </div>
          }

          



          
        </div>
      </div>
    </div>);

}
