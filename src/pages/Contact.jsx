import React, { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast({ title: "Message sent", description: "We'll get back to you within 24 hours." });
      setForm({ name: '', email: '', subject: '', message: '' });
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="pt-40 md:pt-48">
      {/* Header */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="eyebrow mb-3">Contact</div>
          <h1 className="font-display font-light text-5xl md:text-7xl text-cream leading-tight">Get in touch.

          </h1>
          <p className="text-ash mt-6 max-w-xl text-base md:text-lg">Questions about a product, an order, or a formula? We respond to every message — usually within 24 hours.

          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 pb-20 md:pb-28 border-t border-line">
        <div className="max-w-7xl mx-auto pt-16 grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-[10px] tracking-widest uppercase text-ash block mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border border-line rounded-sm px-4 py-3 text-cream placeholder:text-ash focus:outline-none focus:border-vital transition-colors"
                    placeholder="Your name" />
                  
                </div>
                <div>
                  <label className="font-mono text-[10px] tracking-widest uppercase text-ash block mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border border-line rounded-sm px-4 py-3 text-cream placeholder:text-ash focus:outline-none focus:border-vital transition-colors"
                    placeholder="your@email.com" />
                  
                </div>
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-widest uppercase text-ash block mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-line rounded-sm px-4 py-3 text-cream placeholder:text-ash focus:outline-none focus:border-vital transition-colors"
                  placeholder="How can we help?" />
                
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-widest uppercase text-ash block mb-2">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-transparent border border-line rounded-sm px-4 py-3 text-cream placeholder:text-ash focus:outline-none focus:border-vital transition-colors resize-none"
                  placeholder="Your message..." />
                
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-vital hover:bg-vital-bright text-cream font-mono text-xs tracking-widest uppercase px-8 py-4">
                
                {submitting ? 'Sending...' : 'Send Message'}
                {!submitting && <Send size={14} className="ml-2" />}
              </Button>
            </form>
          </div>

          {/* Info */}
          <div className="lg:pl-8">
            <div className="eyebrow mb-6">Other Ways to Reach Us</div>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 border border-line rounded-sm flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-vital-bright" />
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-widest uppercase text-ash mb-1">General Enquiries</div>
                  <a href="mailto:info@viitalon.com" className="text-cream hover:text-vital-bright transition-colors font-body text-base font-medium">info@viitalon.com</a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 border border-line rounded-sm flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-vital-bright" />
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-widest uppercase text-ash mb-1">Customer Support</div>
                  <a href="mailto:support@viitalon.com" className="text-cream hover:text-vital-bright transition-colors font-body text-base font-medium">support@viitalon.com</a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 border border-line rounded-sm flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-vital-bright" />
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-widest uppercase text-ash mb-1">Wholesale Enquiries</div>
                  <a href="mailto:wholesale@viitalon.com" className="text-cream hover:text-vital-bright transition-colors font-body text-base font-medium">wholesale@viitalon.com</a>
                  <p className="text-ash text-sm leading-relaxed mt-1">Interested in stocking VIITALON products? Contact us for wholesale pricing and partnership opportunities.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 border border-line rounded-sm flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-vital-bright" />
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-widest uppercase text-ash mb-1">Purchasing & Supplier Enquiries</div>
                  <a href="mailto:purchasing@viitalon.com" className="text-cream hover:text-vital-bright transition-colors font-body text-base font-medium">purchasing@viitalon.com</a>
                  <p className="text-ash text-sm leading-relaxed mt-1">Suppliers and manufacturers can contact our purchasing team regarding ingredients, packaging and production opportunities.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 border border-line rounded-sm flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-vital-bright" />
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-widest uppercase text-ash mb-1">Location</div>
                  <p className="text-cream font-body text-base font-medium">Auckland, New Zealand</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-ink-surface border-l-2 border-vital rounded-sm">
              <div className="font-mono text-[10px] tracking-widest uppercase text-ash mb-2">Response Time</div>
              <p className="text-cream-dim text-sm leading-relaxed">
                We aim to respond to all enquiries within 24 hours, Monday through Friday. For order-specific questions, please include your order number.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>);

}
