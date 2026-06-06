import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { products } from "../data/products";
import { Button } from "../components/Layout";

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-beige/50 flex items-center justify-center text-3xl mb-6">♥</div>
        <h1 className="font-display text-4xl font-bold text-charcoal">Your Wishlist is Empty</h1>
        <p className="mt-4 text-charcoal/60">Save your favorite pieces for later.</p>
        <Link to="/shop"><Button variant="primary" className="mt-8">Explore Collection</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
      <div className="text-xs tracking-[0.35em] text-brand-red font-semibold mb-3 uppercase text-center">Saved for Later</div>
      <h1 className="font-display text-5xl sm:text-6xl font-bold text-charcoal text-center">Your <span className="gold-text italic">Wishlist</span></h1>
      <div className="gold-divider w-24 mx-auto mt-5 mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <div key={p.id} className="flex gap-4 bg-cream rounded-2xl border border-beige p-4 card-lift">
            <Link to={`/product/${p.id}`} className="w-28 aspect-square rounded-xl overflow-hidden bg-beige/50 shrink-0">
              <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
            </Link>
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="text-[10px] tracking-[0.2em] text-brand-red font-semibold mb-1 uppercase">{p.subcategory}</div>
                <Link to={`/product/${p.id}`} className="font-display font-bold text-charcoal hover:text-brand-red transition-colors line-clamp-2">{p.name}</Link>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-gold text-xs">★</span>
                  <span className="text-xs text-charcoal/60">{p.rating}</span>
                </div>
                <div className="font-display text-lg font-bold text-charcoal mt-1">₹{p.price.toLocaleString()}</div>
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => { addToCart(p, p.sizes[0], p.colors[0].name); }} className="flex-1 text-xs font-semibold tracking-wider uppercase bg-charcoal text-cream rounded-full py-2 hover:bg-brand-red transition-colors">Add to Cart</button>
                <button onClick={() => toggleWishlist(p.id)} aria-label="Remove" className="w-9 h-9 rounded-full border border-beige hover:border-brand-red hover:text-brand-red flex items-center justify-center transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
