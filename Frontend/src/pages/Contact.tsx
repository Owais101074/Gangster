import { useState } from "react";
import { Button } from "../components/Layout";

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
      <div className="text-center mb-16">
        <div className="text-xs tracking-[0.35em] text-brand-red font-semibold mb-3 uppercase">Get In Touch</div>
        <h1 className="font-display text-5xl sm:text-6xl font-bold text-charcoal leading-tight">
          We'd Love to <span className="gold-text italic">Hear</span> From You
        </h1>
        <p className="mt-6 text-charcoal/60 max-w-2xl mx-auto">Questions, feedback, or custom requests — reach out any time.</p>
        <div className="gold-divider w-24 mx-auto mt-6" />
      </div>

      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10">
        {/* Info */}
        <div className="space-y-6">
          <div className="bg-charcoal text-cream rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gold/10 blur-3xl" />
            <div className="relative">
              <div className="text-xs tracking-[0.3em] text-gold font-semibold mb-2">FLAGSHIP STORE</div>
              <h3 className="font-display text-2xl font-bold mb-6">Visit Us</h3>
              <div className="space-y-5 text-sm">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold shrink-0">📍</div>
                  <div>
                    <div className="text-cream/60 text-xs uppercase tracking-wider mb-1">Address</div>
                    <div>123 Fashion Street, MG Road<br />City Center · 400001</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold shrink-0">📞</div>
                  <div>
                    <div className="text-cream/60 text-xs uppercase tracking-wider mb-1">Phone</div>
                    <a href="tel:+919999999999" className="hover:text-gold">+91 99999 99999</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold shrink-0">✉</div>
                  <div>
                    <div className="text-cream/60 text-xs uppercase tracking-wider mb-1">Email</div>
                    <a href="mailto:hello@gangsterfashion.com" className="hover:text-gold">hello@gangsterfashion.com</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold shrink-0">🕐</div>
                  <div>
                    <div className="text-cream/60 text-xs uppercase tracking-wider mb-1">Business Hours</div>
                    <div>Mon – Sun · 11 AM – 10 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-[#25D366] text-white rounded-3xl p-6 hover:scale-[1.02] transition-all">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
              <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1-1.1 2.5s1.1 2.9 1.3 3.1c.2.2 2.2 3.4 5.4 4.7.8.3 1.4.5 1.8.7.8.2 1.5.2 2 .1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z"/>
            </svg>
            <div>
              <div className="text-xs uppercase tracking-wider opacity-80">Fastest Response</div>
              <div className="text-lg font-bold">Chat on WhatsApp</div>
            </div>
          </a>
        </div>

        {/* Form */}
        <div className="bg-cream rounded-3xl p-8 sm:p-10 border border-beige">
          <h3 className="font-display text-2xl font-bold text-charcoal mb-2">Send us a Message</h3>
          <p className="text-charcoal/60 text-sm mb-8">We typically reply within a few hours.</p>
          {sent ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 mx-auto rounded-full luxury-gradient flex items-center justify-center text-gold text-3xl mb-4">✓</div>
              <h4 className="font-display text-2xl font-bold text-charcoal">Message Sent</h4>
              <p className="text-charcoal/60 mt-2">We'll get back to you shortly.</p>
              <button onClick={() => setSent(false)} className="mt-6 text-brand-red underline text-sm">Send another</button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs tracking-wider uppercase text-charcoal font-semibold">Name</label>
                  <input required className="mt-2 w-full px-4 py-3 rounded-xl border border-beige bg-white focus:border-brand-red outline-none" />
                </div>
                <div>
                  <label className="text-xs tracking-wider uppercase text-charcoal font-semibold">Email</label>
                  <input required type="email" className="mt-2 w-full px-4 py-3 rounded-xl border border-beige bg-white focus:border-brand-red outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs tracking-wider uppercase text-charcoal font-semibold">Phone</label>
                <input type="tel" className="mt-2 w-full px-4 py-3 rounded-xl border border-beige bg-white focus:border-brand-red outline-none" />
              </div>
              <div>
                <label className="text-xs tracking-wider uppercase text-charcoal font-semibold">Subject</label>
                <input required className="mt-2 w-full px-4 py-3 rounded-xl border border-beige bg-white focus:border-brand-red outline-none" />
              </div>
              <div>
                <label className="text-xs tracking-wider uppercase text-charcoal font-semibold">Message</label>
                <textarea required rows={5} className="mt-2 w-full px-4 py-3 rounded-xl border border-beige bg-white focus:border-brand-red outline-none resize-none" />
              </div>
              <Button variant="primary" type="submit" className="w-full !py-4">Send Message</Button>
            </form>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="mt-16 rounded-3xl overflow-hidden h-[450px] border border-beige">
        <iframe
          title="Store location"
          src="https://www.openstreetmap.org/export/embed.html?bbox=72.87%2C19.07%2C72.89%2C19.09&layer=mapnik"
          className="w-full h-full"
          loading="lazy"
        />
      </div>
    </div>
  );
}
