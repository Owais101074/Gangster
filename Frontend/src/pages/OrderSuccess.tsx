import { Link } from "react-router-dom";
import { Button } from "../components/Layout";

export default function OrderSuccess() {
  const orderNumber = `GF-${Math.floor(Math.random() * 900000 + 100000)}`;
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
      <div className="relative w-24 h-24 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full luxury-gradient animate-pulse-gold" />
        <div className="relative w-full h-full rounded-full luxury-gradient flex items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
      </div>

      <div className="text-xs tracking-[0.35em] text-brand-red font-semibold mb-3 uppercase">Order Confirmed</div>
      <h1 className="font-display text-5xl sm:text-6xl font-bold text-charcoal leading-tight">
        Thank <span className="gold-text italic">You</span>
      </h1>
      <p className="mt-6 text-charcoal/70 text-lg">Your order has been placed successfully. We're preparing something premium for you.</p>

      <div className="mt-10 bg-cream rounded-3xl p-8 border border-beige text-left max-w-md mx-auto">
        <div className="text-xs tracking-[0.25em] text-charcoal/50 uppercase mb-2">Order Number</div>
        <div className="font-display text-2xl font-bold text-brand-red">{orderNumber}</div>
        <div className="gold-divider my-5" />
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-charcoal/60">Status</span><span className="text-charcoal font-semibold">Confirmed ✓</span></div>
          <div className="flex justify-between"><span className="text-charcoal/60">Estimated Delivery</span><span className="text-charcoal font-semibold">3-5 Business Days</span></div>
          <div className="flex justify-between"><span className="text-charcoal/60">Tracking</span><span className="text-brand-red font-semibold">Sent via SMS</span></div>
        </div>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/shop"><Button variant="primary">Continue Shopping</Button></Link>
        <Link to="/profile"><Button variant="outline">View My Orders</Button></Link>
      </div>

      <p className="mt-10 text-xs text-charcoal/50">Questions about your order? <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="text-brand-red hover:underline">Chat on WhatsApp</a></p>
    </div>
  );
}
