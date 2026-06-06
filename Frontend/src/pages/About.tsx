import { Link } from "react-router-dom";
import { Button } from "../components/Layout";
import { storeGallery } from "../data/products";

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=2000&q=85" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full text-center">
          <div className="text-xs tracking-[0.4em] text-gold font-semibold mb-5">OUR STORY</div>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-cream leading-[1.05]">
            Style, Crafted <br /><span className="gold-text italic">Since Day One.</span>
          </h1>
          <p className="mt-6 text-cream/80 max-w-2xl mx-auto">From a single storefront to a movement of 22,000+ followers — we've been dressing men who take their style seriously.</p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs tracking-[0.35em] text-brand-red font-semibold mb-3 uppercase">The Beginning</div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-charcoal leading-tight">A Store, A <span className="gold-text italic">Community</span></h2>
            <p className="mt-5 text-charcoal/70 leading-relaxed">Gangster Fashion started with a simple belief: every man deserves clothes that fit right, feel premium, and don't break the bank. What began as a single store in the heart of the city has grown into a loyal community of thousands.</p>
            <p className="mt-4 text-charcoal/70 leading-relaxed">Today, we bring the same curated collection, the same attention to detail, and the same Gangster attitude — straight to your doorstep, anywhere in India.</p>
          </div>
          <div className="aspect-[4/5] rounded-3xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1200&q=85" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-charcoal text-cream py-20 noise relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[["15+", "Years of Style"], ["22K+", "Instagram Followers"], ["50K+", "Happy Customers"], ["500+", "Cities Served"]].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-5xl sm:text-6xl font-bold gold-text">{n}</div>
                <div className="text-xs tracking-[0.25em] text-cream/60 mt-2 uppercase">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-24">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-cream p-10 rounded-3xl border border-beige">
            <div className="w-14 h-14 rounded-full luxury-gradient flex items-center justify-center text-gold font-display text-2xl mb-6">✦</div>
            <h3 className="font-display text-3xl font-bold text-charcoal mb-3">Our Mission</h3>
            <p className="text-charcoal/70 leading-relaxed">To make premium, well-crafted menswear accessible to every man who wants to look and feel his best — without compromising on quality, fit, or style.</p>
          </div>
          <div className="luxury-gradient text-cream p-10 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gold/10 blur-3xl" />
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center text-charcoal font-display text-2xl mb-6">◆</div>
              <h3 className="font-display text-3xl font-bold mb-3">Our Vision</h3>
              <p className="text-cream/80 leading-relaxed">To become India's most loved men's fashion brand — trusted offline, celebrated online — building a crew of men who dress with confidence and character.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Store photos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-24">
        <div className="text-center mb-10">
          <div className="text-xs tracking-[0.35em] text-brand-red font-semibold mb-3 uppercase">Visit Us</div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-charcoal">The <span className="gold-text italic">Flagship</span> Store</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {storeGallery.map((src, i) => (
            <div key={i} className="aspect-square rounded-2xl overflow-hidden group">
              <img src={src} alt="" className="w-full h-full object-cover img-zoom" />
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/contact"><Button variant="primary">Find Our Store</Button></Link>
        </div>
      </section>
    </div>
  );
}
