import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { Button } from "../components/Layout";

export default function Cart() {
  const { cart, updateQty, removeFromCart, cartTotal, cartCount } = useStore();
  const navigate = useNavigate();
  const shipping = cartTotal >= 1999 ? 0 : 99;
  const tax = Math.round(cartTotal * 0.05);
  const total = cartTotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-beige/50 flex items-center justify-center text-3xl mb-6">🛍</div>
        <h1 className="font-display text-4xl font-bold text-charcoal">Your Cart is Empty</h1>
        <p className="mt-4 text-charcoal/60">Time to treat yourself to something premium.</p>
        <Link to="/shop"><Button variant="primary" className="mt-8">Start Shopping</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
      <div className="text-xs tracking-[0.35em] text-brand-red font-semibold mb-3 uppercase text-center">Your Selection</div>
      <h1 className="font-display text-5xl sm:text-6xl font-bold text-charcoal text-center">The <span className="gold-text italic">Cart</span></h1>
      <div className="gold-divider w-24 mx-auto mt-5 mb-12" />

      <div className="grid lg:grid-cols-[1fr_400px] gap-10">
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4 sm:gap-6 p-4 sm:p-6 bg-cream rounded-2xl border border-beige">
              <Link to={`/product/${item.product.id}`} className="w-24 sm:w-32 aspect-square rounded-xl overflow-hidden bg-beige/50 shrink-0">
                <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[10px] tracking-[0.2em] text-brand-red font-semibold mb-1 uppercase">{item.product.subcategory}</div>
                    <h3 className="font-display text-lg font-bold text-charcoal truncate">{item.product.name}</h3>
                    <div className="text-xs text-charcoal/60 mt-1">Size: <span className="text-charcoal font-semibold">{item.size}</span> · Color: <span className="text-charcoal font-semibold">{item.color}</span></div>
                  </div>
                  <button onClick={() => removeFromCart(item.product.id, item.size, item.color)} className="text-charcoal/40 hover:text-brand-red transition-colors shrink-0" aria-label="Remove">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14" /></svg>
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="inline-flex items-center border border-beige rounded-full bg-white">
                    <button onClick={() => updateQty(item.product.id, item.size, item.color, item.qty - 1)} className="w-9 h-9 hover:bg-beige/50 rounded-l-full">−</button>
                    <span className="w-10 text-center text-sm font-semibold">{item.qty}</span>
                    <button onClick={() => updateQty(item.product.id, item.size, item.color, item.qty + 1)} className="w-9 h-9 hover:bg-beige/50 rounded-r-full">+</button>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-xl font-bold text-charcoal">₹{(item.product.price * item.qty).toLocaleString()}</div>
                    {item.qty > 1 && <div className="text-xs text-charcoal/50">₹{item.product.price.toLocaleString()} each</div>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="lg:sticky lg:top-40 self-start">
          <div className="bg-charcoal text-cream rounded-3xl p-8">
            <h3 className="font-display text-2xl font-bold mb-6">Order Summary</h3>
            <div className="space-y-3 text-sm pb-6 border-b border-cream/20">
              <div className="flex justify-between"><span className="text-cream/70">Subtotal ({cartCount} items)</span><span>₹{cartTotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-cream/70">Shipping</span><span>{shipping === 0 ? <span className="text-gold">FREE</span> : `₹${shipping}`}</span></div>
              <div className="flex justify-between"><span className="text-cream/70">Estimated Tax</span><span>₹{tax.toLocaleString()}</span></div>
            </div>
            <div className="flex justify-between items-baseline py-5">
              <span className="font-display text-lg">Total</span>
              <span className="font-display text-3xl font-bold gold-text">₹{total.toLocaleString()}</span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-cream/60 mb-5">Add ₹{(1999 - cartTotal).toLocaleString()} more for free shipping.</p>
            )}
            <Button variant="gold" onClick={() => navigate("/checkout")} className="w-full !py-4">Proceed to Checkout</Button>
            <Link to="/shop" className="block text-center text-xs tracking-wider uppercase text-cream/70 hover:text-gold mt-5">Continue Shopping</Link>
          </div>

          <div className="mt-6 p-6 bg-cream rounded-2xl border border-beige">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💬</div>
              <div>
                <div className="font-semibold text-charcoal text-sm">Prefer to order via WhatsApp?</div>
                <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="text-xs text-brand-red hover:underline">Chat with us →</a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
