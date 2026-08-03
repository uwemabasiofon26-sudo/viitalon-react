import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useCart } from '@/components/CartContext';
import ProductImageSlideshow from '@/components/ProductImageSlideshow';
import TransparencyPanel from '@/components/TransparencyPanel';
import { PRODUCTS } from '@/lib/productData';
import { formatPrice } from '@/lib/utils';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [showQuickBuy, setShowQuickBuy] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    // Try entity first, fall back to shared data
    base44.entities.Product.filter({ slug }).
    then((data) => {
      if (data && data.length > 0) {
        setProduct(data[0]);
      } else {
        setProduct(PRODUCTS.find((p) => p.slug === slug));
      }
    }).
    catch(() => {
      setProduct(PRODUCTS.find((p) => p.slug === slug));
    }).
    finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    const onScroll = () => setShowQuickBuy(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-line border-t-vital-bright rounded-full animate-spin" />
      </div>);

  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <p className="font-display text-3xl text-cream mb-4">Product not found</p>
        <Link to="/shop" className="font-mono text-xs tracking-widest uppercase text-vital-bright hover:text-cream transition-colors">
          ← Back to Shop
        </Link>
      </div>);

  }

  const handleAddToCart = () => {
    addItem(product, qty);
  };

  return (
    <div className="pt-28 md:pt-32">
      {/* Breadcrumb */}
      <div className="px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <Link to="/shop" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-ash hover:text-vital-bright transition-colors">
            <ArrowLeft size={12} /> Back to Shop
          </Link>
        </div>
      </div>

      {/* Outlined product name */}
      <div className="px-6 mb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display font-black leading-none tracking-tight text-cream text-4xl md:text-4xl lg:text-4xl">
            {product.name}
          </h1>
          <div className="flex items-center gap-4 mt-4">
            <div className="font-mono text-xs tracking-widest uppercase text-vital-bright">
              {product.category}
            </div>
            <div className="h-px flex-1 bg-line max-w-[200px]" />
            <div className="font-mono text-xs text-ash">
              {formatPrice(product.price)}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="px-6 pb-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Sticky product image */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <ProductImageSlideshow
              images={product.images || []}
              fallbackImage={product.image_url}
              alt={product.name}
              signalPath={product.signal_path}
              signalLabel={product.signal_label}
              showFull={product.slug === 'the-stack'}
            />
          </div>

          {/* Right: Narrative */}
          <div>
            {/* Marketing tagline */}
            <p className="font-display text-2xl md:text-3xl text-cream italic leading-tight mb-4">
              {product.marketing_tagline}
            </p>

            {product.marketing_statement && (
              <p className="text-vital-bright text-sm md:text-base leading-relaxed mb-8">
                {product.marketing_statement}
              </p>
            )}

            {/* Description */}
            <p className="text-cream-dim text-base md:text-lg leading-relaxed mb-8">
              {product.long_description}
            </p>

            {/* Benefits */}
            <div className="mb-10">
              <div className="eyebrow mb-4">Key Benefits</div>
              <div className="space-y-4">
                {product.benefits?.map((b, i) =>
                <div key={i} className="flex items-start gap-3">
                    <Check size={16} className="text-vital-bright mt-1 flex-shrink-0" />
                    {typeof b === 'string' ? (
                      <span className="text-cream-dim text-sm">{b}</span>
                    ) : (
                      <div>
                        <div className="text-cream text-sm font-medium">{b.title}</div>
                        {b.description && (
                          <div className="text-ash text-sm leading-relaxed mt-0.5">{b.description}</div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Ideal for */}
            {product.ideal_for &&
            <div className="mb-10 p-6 bg-ink-surface border-l-2 border-vital rounded-sm">
                <div className="eyebrow mb-2">Ideal For</div>
                <p className="text-cream-dim text-sm leading-relaxed">{product.ideal_for}</p>
              </div>
            }

            {/* Product details */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {product.serving_size &&
              <div className="border border-line rounded-sm p-4">
                  <div className="font-mono text-[10px] tracking-widest uppercase text-ash mb-1">Serving</div>
                  <div className="font-mono text-sm text-cream">{product.serving_size}</div>
                </div>
              }
              {product.capsule_count &&
              <div className="border border-line rounded-sm p-4">
                  <div className="font-mono text-[10px] tracking-widest uppercase text-ash mb-1">Supply</div>
                  <div className="font-mono text-sm text-cream">{product.capsule_count}</div>
                </div>
              }
            </div>

            {/* Add to cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-line rounded-sm">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-3 text-ash hover:text-cream transition-colors">
                  <Minus size={14} />
                </button>
                <span className="px-4 font-mono text-sm text-cream">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 py-3 text-ash hover:text-cream transition-colors">
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-vital hover:bg-vital-bright text-cream font-mono text-xs tracking-widest uppercase px-6 py-3 rounded-sm transition-colors flex items-center justify-center gap-2">
                
                <ShoppingBag size={14} /> {product.cta_text}
              </button>
            </div>
            <p className="font-mono text-[10px] tracking-widest uppercase text-ash">
              {product.made_in && `Made in ${product.made_in} · `}Free shipping over NZ$50
            </p>

            {/* Transparency Panel */}
            <div className="mt-12">
              <TransparencyPanel product={product} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick-buy bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-ink-deep/95 backdrop-blur-md border-t border-line transition-transform duration-400 ${
        showQuickBuy ? 'translate-y-0' : 'translate-y-full'}`
        }>
        
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            {product.image_url &&
            <img src={product.image_url} alt="" className="w-10 h-12 object-cover rounded-sm flex-shrink-0" />
            }
            <div className="min-w-0">
              <div className="font-display text-sm text-cream truncate">{product.name}</div>
              <div className="font-mono text-xs text-ash">{formatPrice(product.price)}</div>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-vital hover:bg-vital-bright text-cream font-mono text-[10px] md:text-xs tracking-widest uppercase px-4 md:px-6 py-3 rounded-sm transition-colors flex items-center gap-2 flex-shrink-0">
            
            <ShoppingBag size={14} /> <span className="hidden md:inline">{product.cta_text}</span><span className="md:hidden">Add</span>
          </button>
        </div>
      </div>
    </div>);

}
