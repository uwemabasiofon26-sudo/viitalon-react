import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, ChevronDown } from 'lucide-react';
import { useCart } from '../CartContext';
import { LOGO_URL } from '@/lib/productData';

const productLinks = [
{ name: 'Vortex', slug: 'vortex', goal: 'Peak — Energy & Focus' },
{ name: 'Creatine Monohydrate', slug: 'creatine-monohydrate', goal: 'Peak — Strength & Power' },
{ name: 'Somnus', slug: 'somnus', goal: 'Rest — Sleep & Recovery' },
{ name: 'Magnesium Glycinate', slug: 'magnesium-glycinate', goal: 'Clarity — Calm & Wellness' },
{ name: 'Vigor', slug: 'vigor', goal: "Drive — Men's Vitality" },
{ name: 'Rise', slug: 'rise', goal: 'Breakfast & Anytime Fuel' },
{ name: 'The Stack', slug: 'the-stack', goal: 'Complete — All Five Formulas' },
{ name: 'Redline Stack', slug: 'redline-stack', goal: "Total — Men's Performance System" }];


const navLinks = [
{ label: 'Shop', path: '/shop' },
{ label: 'About', path: '/about' },
{ label: 'Journal', path: '/blog' },
{ label: 'Contact', path: '/contact' }];


const navBase = "text-[15.5px] transition-colors";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const { count, setIsOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProductsOpen(false);
    setMobileProductsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {document.body.style.overflow = '';};
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-9 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ?
        'bg-ink/95 backdrop-blur-md border-b border-line py-4' :
        'bg-transparent py-6'}`
        }>
        
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={LOGO_URL} alt="VIITALON" className="h-[58px] md:h-[66px] w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={`${navBase} ${location.pathname === '/' ? "text-vital-bright [font-family:'Montserrat',_sans-serif] font-bold" : 'text-cream hover:text-vital-bright'}`}>
              Home
            </Link>

            {/* Products dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}>
              
              <button
                onClick={() => setProductsOpen((o) => !o)}
                className={`flex items-center gap-1 ${navBase} ${
                location.pathname.startsWith('/products') || location.pathname === '/shop' ? 'text-vital-bright' : 'text-cream hover:text-vital-bright'}`
                }>
                
                Products
                <ChevronDown size={14} className={`transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown panel */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-ink-surface border border-line rounded-sm overflow-hidden transition-all duration-200 ${
                productsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`
                }>
                
                <Link
                  to="/shop"
                  className="block px-5 py-3 border-b border-line hover:bg-ink transition-colors">
                  
                  <div className="font-mono text-[10px] tracking-widest uppercase text-vital-bright">View All</div>
                  <div className="font-body font-medium text-sm text-cream">Shop the Range</div>
                </Link>
                {productLinks.map((p) =>
                <Link
                  key={p.slug}
                  to={`/products/${p.slug}`}
                  className="block px-5 py-3 border-b border-line last:border-b-0 hover:bg-ink transition-colors group">
                  
                    <div className="font-body font-medium text-sm text-cream group-hover:text-vital-bright transition-colors">{p.name}</div>
                    <div className="font-mono text-[10px] tracking-widest uppercase text-ash mt-0.5">{p.goal}</div>
                  </Link>
                )}
                <Link
                  to="/shop"
                  className="block px-5 py-3 border-t border-line hover:bg-ink transition-colors group">
                  <div className="font-body font-medium text-sm text-cream group-hover:text-vital-bright transition-colors">Single Ingredients</div>
                  <div className="font-mono text-[10px] tracking-widest uppercase text-ash mt-0.5">NMN, Tongkat Ali, Berberine &amp; more</div>
                </Link>
              </div>
            </div>

            {navLinks.map((link) =>
            <Link
              key={link.path}
              to={link.path}
              className={`${navBase} ${location.pathname === link.path ? 'text-vital-bright' : 'text-cream hover:text-vital-bright'}`}>
              
                {link.label}
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="relative text-cream hover:text-vital-bright transition-colors"
              aria-label="Open cart">
              
              <ShoppingBag size={20} />
              {count > 0 &&
              <span className="absolute -top-2 -right-2 bg-vital-bright text-cream text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              }
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="text-cream hover:text-vital-bright transition-colors md:hidden"
              aria-label="Open menu">
              
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen overlay menu (mobile) */}
      <div
        className={`fixed inset-0 z-[60] bg-ink-deep transition-all duration-500 ${
        menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`
        }>
        
        <div className="absolute inset-0 glow-red animate-breathe" />
        <div className="relative h-full flex flex-col">
          <div className="flex items-center justify-between px-6 py-6">
            <Link to="/" className="flex items-center">
              <img src={LOGO_URL} alt="VIITALON" className="h-[58px] w-auto" />
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-cream hover:text-vital-bright transition-colors"
              aria-label="Close menu">
              
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center px-6 max-w-7xl mx-auto w-full">
            <div className="space-y-1">
              <Link to="/" className={`block ${navBase} text-lg py-2.5 ${location.pathname === '/' ? 'text-vital-bright' : 'text-cream hover:text-vital-bright'}`}>
                Home
              </Link>

              {/* Products expandable */}
              <div>
                <button
                  onClick={() => setMobileProductsOpen((o) => !o)}
                  className={`flex items-center gap-1 ${navBase} text-lg py-2.5 w-full ${
                  location.pathname.startsWith('/products') || location.pathname === '/shop' ? 'text-vital-bright' : 'text-cream hover:text-vital-bright'}`
                  }>
                  
                  Products
                  <ChevronDown size={14} className={`transition-transform duration-200 ${mobileProductsOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${mobileProductsOpen ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="pl-4 space-y-0.5 mt-1">
                    <Link to="/shop" className="block font-body text-sm text-ash hover:text-vital-bright transition-colors py-2">
                      Shop the Range
                    </Link>
                    {productLinks.map((p) =>
                    <Link key={p.slug} to={`/products/${p.slug}`} className="block font-body text-sm text-cream hover:text-vital-bright transition-colors py-2">
                        {p.name}
                      </Link>
                    )}
                    <Link to="/shop" className="block font-body text-sm text-cream hover:text-vital-bright transition-colors py-2">
                      Single Ingredients
                    </Link>
                  </div>
                </div>
              </div>

              {navLinks.map((link) =>
              <Link key={link.path} to={link.path} className={`block ${navBase} text-lg py-2.5 ${location.pathname === link.path ? 'text-vital-bright' : 'text-cream hover:text-vital-bright'}`}>
                  {link.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>);

}
