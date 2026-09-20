import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, ChevronDown, Plus, Minus } from "lucide-react";
import Logo from "@/components/Logo";
import { NAV_LINKS } from "@/lib/brand";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/hooks/useProducts";
import { cn } from "@/lib/utils";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(false);
  const { count } = useCart();
  const { data: products } = useProducts();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  const productLinks = (products || []).filter((p) => p.category !== "stack");

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled ? "bg-av-deep/85 backdrop-blur-xl border-b border-av-teal/40" : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <Link to="/" className="z-50">
            <Logo />
          </Link>

          <nav className="hidden xl:flex items-center gap-5 xl:gap-6">
            {/* Home */}
            <NavLink to="/" label="Home" active={location.pathname === "/"} />

            {/* Products dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button className="group relative flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.15em] text-av-alloy/80 hover:text-av-alloy transition-colors">
                Products
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", productsOpen && "rotate-180")} />
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-av-gold transition-all duration-300 group-hover:w-full" />
              </button>
              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-av-deep border border-av-teal/50 rounded-lg overflow-hidden shadow-2xl"
                  >
                    {productLinks.map((p) => (
                      <Link
                        key={p.id}
                        to={`/product/${p.slug}`}
                        className="flex items-center justify-between px-5 py-3 text-sm text-av-alloy/80 hover:bg-av-teal/40 hover:text-av-gold transition-colors border-b border-av-teal/20 last:border-0"
                      >
                        <span>{p.name}</span>
                        <span className="text-[10px] uppercase tracking-[0.15em] text-av-alloy/70">{p.category}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_LINKS.filter((l) => l.label === "Shop" || l.label === "Performance Nutrition" || l.label === "The Stack" || l.label === "About" || l.label === "Contact").map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                label={l.label === "About" ? "About Us" : l.label}
                active={location.pathname === l.to}
              />
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative z-50 text-av-alloy hover:text-av-gold transition-colors">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 grid place-items-center h-4 w-4 rounded-full bg-av-gold text-[10px] font-bold text-av-deep">
                  {count}
                </span>
              )}
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="xl:hidden z-50 text-av-alloy"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-av-deep/97 backdrop-blur-2xl xl:hidden overflow-y-auto"
          >
            <div className="h-16 px-5 flex items-center justify-between">
              <Logo />
              <button onClick={() => setOpen(false)} className="text-av-alloy" aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="px-5 pt-6 flex flex-col">
              <Link to="/" className="py-3 border-b border-av-teal/30 font-display text-base font-semibold tracking-tight text-av-alloy hover:text-av-gold transition-colors">
                Home
              </Link>

              {/* Products expandable */}
              <button
                onClick={() => setMobileProducts((v) => !v)}
                className="py-3 border-b border-av-teal/30 font-display text-base font-semibold tracking-tight text-av-alloy hover:text-av-gold transition-colors flex items-center justify-between"
              >
                Products
                {mobileProducts ? <Minus className="h-5 w-5 text-av-gold" /> : <Plus className="h-5 w-5 text-av-gold" />}
              </button>
              <AnimatePresence initial={false}>
                {mobileProducts && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {productLinks.map((p) => (
                      <Link
                        key={p.id}
                        to={`/product/${p.slug}`}
                        className="block py-3 pl-4 text-sm text-av-alloy/70 hover:text-av-gold transition-colors border-b border-av-teal/20"
                      >
                        {p.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {[
                { label: "Shop", to: "/shop" },
                { label: "Performance Nutrition", to: "/performance-nutrition" },
                { label: "The Stack", to: "/stack" },
                { label: "About Us", to: "/about" },
                { label: "Contact", to: "/contact" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="py-3 border-b border-av-teal/30 font-display text-base font-semibold tracking-tight text-av-alloy hover:text-av-gold transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="px-5 mt-10 text-[10px] uppercase tracking-[0.3em] text-av-alloy/40">
              Fuel Your Strength. Elevate Your Performance.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ to, label, active }) {
  return (
    <Link
      to={to}
      className={cn(
        "group relative text-[10px] font-bold uppercase tracking-[0.15em] transition-colors",
        active ? "text-av-gold" : "text-av-alloy/80 hover:text-av-alloy"
      )}
    >
      {label}
      <span className="absolute -bottom-1 left-0 h-px w-0 bg-av-gold transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
