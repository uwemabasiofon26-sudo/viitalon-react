import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useSEO } from "@/hooks/useSEO";

const SECTIONS = [
  {
    title: "Shipping & Delivery",
    body: "We currently ship within New Zealand. Orders are dispatched within 1–2 business days. Standard delivery takes 2–5 business days. Free shipping is offered on orders over $100 NZD. Shipping fees for orders under that threshold are calculated at checkout.",
  },
  {
    title: "Returns & Refunds",
    body: "Unopened supplements and unworn apparel may be returned within 30 days of delivery for a full refund, excluding return shipping. To initiate a return, contact our support team with your order number. Refunds are processed within 5 business days of receiving the returned items.",
  },
  {
    title: "Privacy Policy",
    body: "We collect only the information necessary to process your orders and provide support — contact details, shipping address and payment authorization. We never sell your personal data. Payment is processed through secure, encrypted third-party providers; we do not store full card details.",
  },
  {
    title: "Terms of Service",
    body: "By placing an order you agree to the listed prices. Product information and supplement facts are provided for reference; final specifications are confirmed by the manufacturer. Statements about products have not been evaluated by regulatory authorities and products are not intended to diagnose, treat, cure or prevent any disease.",
  },
  {
    title: "Product Disclaimer",
    body: "Always read the label and use only as directed. Supplements are intended for healthy adults. If you are pregnant, nursing, taking medication or have a medical condition, consult a healthcare professional before use. Keep out of reach of children.",
  },
];

function Item({ s, i }) {
  const [open, setOpen] = useState(i === 0);
  return (
    <div className="border-b border-av-teal/40">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between gap-6 py-6 text-left">
        <span className="flex items-center gap-4">
          <span className="font-mono text-av-gold/50 text-sm">0{i + 1}</span>
          <span className="font-display text-lg md:text-xl font-semibold text-av-alloy">{s.title}</span>
        </span>
        <span className="shrink-0 text-av-gold">{open ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-10 text-av-alloy/70 leading-relaxed max-w-3xl">{s.body}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Policy() {
  useSEO({
    title: "Shipping, Returns & Privacy Policy",
    description: "Korzavo's shipping, returns, refunds, privacy and terms of service policies.",
    path: "/policy",
  });

  return (
    <div className="bg-av-deep pt-28 md:pt-36 pb-24">
      <section className="mx-auto max-w-[1400px] px-5 md:px-10">
        <ScrollReveal>
          <p className="text-[11px] uppercase tracking-[0.3em] text-av-gold mb-3">Policies</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-av-alloy">
            Terms, shipping & policies
          </h1>
        </ScrollReveal>
        <div className="mt-12 border-t border-av-teal/40">
          {SECTIONS.map((s, i) => (
            <Item key={i} s={s} i={i} />
          ))}
        </div>
        <ScrollReveal className="mt-12">
          <p className="text-av-alloy/60">
            Questions about these policies?{" "}
            <Link to="/contact" className="text-av-gold underline underline-offset-4 hover:text-av-alloy">Contact us</Link>.
          </p>
        </ScrollReveal>
      </section>
    </div>
  );
}
