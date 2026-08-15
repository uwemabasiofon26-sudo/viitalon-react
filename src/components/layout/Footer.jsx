import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';
import TikTokIcon from '@/components/icons/TikTokIcon';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { LOGO_URL } from '@/lib/productData';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/newsletter-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      toast({ title: "Subscribed", description: "Check your inbox — you're on the list. Live stronger." });
      setEmail('');
    } catch (err) {
      toast({ title: "Couldn't subscribe", description: err.message, variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-ink-deep border-t border-line">
      {/* Newsletter band */}
      <div className="border-b border-line">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="eyebrow mb-4">Biological Newsletter</div>
            <h3 className="font-display text-3xl md:text-4xl text-cream leading-tight">
              Get the signal.<br />Not the noise.
            </h3>
            <p className="text-ash mt-4 max-w-md">
              Training protocols, ingredient breakdowns, and product updates — no filler, sent monthly.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 min-w-0 bg-transparent border border-line rounded-sm px-4 py-3 text-cream font-body placeholder:text-ash focus:outline-none focus:border-vital transition-colors" />
              
              <Button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto bg-vital hover:bg-vital-bright text-cream tracking-widest uppercase px-6 rounded-[40px] text-sm [font-family:'Inter',_ui-sans-serif,_system-ui,_sans-serif] font-semibold">
                
                {submitting ? '...' : 'Subscribe'}
              </Button>
            </form>
            <p className="tracking-wider uppercase text-ash mt-3 text-xs [font-family:'Inter',_ui-sans-serif,_system-ui,_sans-serif] font-medium">NO SPAM. UNSUBSCRIBE ANYTIME.

            </p>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <img src={LOGO_URL} alt="VIITALON" className="h-14 md:h-16 w-auto mb-4" />
            <p className="text-ash text-sm leading-relaxed">
              Fully disclosed, high-strength supplements for training, strength, recovery, and everyday vitality.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://www.facebook.com/share/1CwX9phcTh/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-ash hover:text-vital-bright transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-ash hover:text-vital-bright transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-ash hover:text-vital-bright transition-colors">
                <TikTokIcon size={18} />
              </a>
            </div>
          </div>

          <div>
            <div className="font-mono text-[10px] tracking-widest uppercase text-ash mb-4">Products</div>
            <ul className="space-y-3">
              {[
              { name: 'Vortex', slug: 'vortex' },
              { name: 'Creatine Monohydrate', slug: 'creatine-monohydrate' },
              { name: 'Somnus', slug: 'somnus' },
              { name: 'Magnesium Glycinate', slug: 'magnesium-glycinate' },
              { name: 'Vigor', slug: 'vigor' },
              { name: 'Rise', slug: 'rise' },
              { name: 'The Stack', slug: 'the-stack' },
              { name: 'Redline Stack', slug: 'redline-stack' }].
              map((p) =>
              <li key={p.slug}>
                  <Link to={`/products/${p.slug}`} className="text-cream-dim hover:text-vital-bright transition-colors text-sm">
                    {p.name}
                  </Link>
                </li>
              )}
              <li>
                <Link to="/shop" className="text-cream-dim hover:text-vital-bright transition-colors text-sm">
                  Single Ingredients
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[10px] tracking-widest uppercase text-ash mb-4">Company</div>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-cream-dim hover:text-vital-bright transition-colors text-sm">About Us</Link></li>
              <li><Link to="/blog" className="text-cream-dim hover:text-vital-bright transition-colors text-sm">Journal</Link></li>
              <li><Link to="/contact" className="text-cream-dim hover:text-vital-bright transition-colors text-sm">Contact</Link></li>
              <li><Link to="/shop" className="text-cream-dim hover:text-vital-bright transition-colors text-sm">Shop All</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[10px] tracking-widest uppercase text-ash mb-4">Legal</div>
            <ul className="space-y-3">
              <li><Link to="/privacy-policy" className="text-cream-dim hover:text-vital-bright transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-cream-dim hover:text-vital-bright transition-colors text-sm">Terms of Service</Link></li>
              <li><Link to="/shipping-returns" className="text-cream-dim hover:text-vital-bright transition-colors text-sm">Shipping & Returns</Link></li>
              <li><Link to="/disclaimer" className="text-cream-dim hover:text-vital-bright transition-colors text-sm">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-line">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-6">
            <p className="tracking-widest uppercase text-ash [font-family:'Inter',_ui-sans-serif,_system-ui,_sans-serif] font-normal text-xs">
              © {new Date().getFullYear()} VIITALON. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>);

}
