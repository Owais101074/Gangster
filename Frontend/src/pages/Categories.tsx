import { Link } from "react-router-dom";
import { categories } from "../data/products";

export default function Categories() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
      <div className="text-center mb-16">
        <div className="text-xs tracking-[0.35em] text-brand-red font-semibold mb-3 uppercase">Explore</div>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-charcoal leading-tight">
          The <span className="gold-text italic">Categories</span>
        </h1>
        <p className="mt-6 text-charcoal/60 max-w-2xl mx-auto">Curated edits for every mood, moment, and milestone. Find your signature.</p>
        <div className="gold-divider w-24 mx-auto mt-6" />
      </div>

      {/* Featured hero category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {[categories[0], categories[5]].map((cat) => (
          <Link key={cat.id} to={`/shop?category=${cat.id}`} className="group relative aspect-[4/3] rounded-3xl overflow-hidden">
            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover img-zoom" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="text-[10px] tracking-[0.3em] text-gold font-semibold mb-2">FEATURED · {cat.count} ITEMS</div>
              <h3 className="font-display text-4xl font-bold text-cream">{cat.name}</h3>
              <div className="mt-3 inline-flex items-center gap-2 text-cream group-hover:text-gold transition-colors text-sm font-semibold tracking-wider uppercase">
                Shop Collection <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.slice(2).map((cat) => (
          <Link key={cat.id} to={`/shop?category=${cat.id}`} className="group relative aspect-[3/4] rounded-2xl overflow-hidden card-lift">
            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover img-zoom" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="text-[10px] tracking-[0.3em] text-gold font-semibold mb-1">{cat.count} ITEMS</div>
              <h3 className="font-display text-2xl font-bold text-cream">{cat.name}</h3>
              <div className="flex items-center gap-2 mt-2 text-cream/80 text-sm group-hover:text-gold transition-colors">
                <span>Shop Now</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
