import { Link } from "react-router-dom";
import { products, categories, testimonials, instagramPosts, storeGallery } from "../data/products";
import { ProductCard, SectionHeading, Button } from "../components/Layout";

export default function Home() {
  const newArrivals = products.filter((p) => p.badge === "New" || p.badge === "Trending").slice(0, 4);
  const bestSellers = products.filter((p) => p.badge === "Bestseller").slice(0, 4);

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=2000&q=85" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 backdrop-blur border border-gold/40 mb-6 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-xs tracking-[0.3em] font-semibold">AUTUMN/WINTER 2026</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-cream leading-[0.95] animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Redefine <br />
              <span className="gold-text italic">Your Style.</span>
            </h1>
            <p className="mt-8 text-lg text-cream/80 max-w-lg animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Curated premium menswear crafted for the modern gentleman. From our flagship store to your wardrobe.
            </p>
            <div className="flex flex-wrap gap-4 mt-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/shop"><Button variant="gold">Shop Collection</Button></Link>
              <Link to="/categories"><Button variant="outline" className="!border-cream !text-cream hover:!bg-cream hover:!text-charcoal">Explore Lookbook</Button></Link>
            </div>
            <div className="flex items-center gap-8 mt-14 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div>
                <div className="font-display text-3xl font-bold gold-text">22K+</div>
                <div className="text-xs text-cream/60 tracking-wider uppercase">Instagram</div>
              </div>
              <div className="w-px h-12 bg-cream/20" />
              <div>
                <div className="font-display text-3xl font-bold gold-text">15+</div>
                <div className="text-xs text-cream/60 tracking-wider uppercase">Years Offline</div>
              </div>
              <div className="w-px h-12 bg-cream/20" />
              <div>
                <div className="font-display text-3xl font-bold gold-text">4.9★</div>
                <div className="text-xs text-cream/60 tracking-wider uppercase">Rating</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/60 text-xs tracking-[0.3em] hidden md:flex flex-col items-center gap-2 animate-float">
          <span>SCROLL</span>
          <div className="w-px h-10 bg-cream/40" />
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-charcoal text-cream py-5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-14 px-6 shrink-0">
              {["FREE SHIPPING ABOVE ₹1999", "★ PREMIUM QUALITY GUARANTEED", "✦ 7-DAY EASY RETURNS", "★ WHATSAPP SUPPORT 24/7", "✦ COD AVAILABLE NATIONWIDE"].map((t, idx) => (
                <span key={idx} className="text-xs tracking-[0.3em] font-medium">{t}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-24">
        <SectionHeading eyebrow="Shop by Category" title="The Edit" subtitle="From sharp formal to effortless streetwear — curated for every moment." />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.slice(0, 8).map((cat, i) => (
            <Link key={cat.id} to={`/shop?category=${cat.id}`} className="group relative aspect-[3/4] rounded-2xl overflow-hidden card-lift" style={{ animationDelay: `${i * 0.05}s` }}>
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover img-zoom" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
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
      </section>

      {/* NEW ARRIVALS */}
      <section className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="text-xs tracking-[0.35em] text-brand-red font-semibold mb-3 uppercase">Just Dropped</div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-charcoal">New Arrivals</h2>
            </div>
            <Link to="/shop" className="text-sm font-semibold tracking-wider uppercase text-charcoal hover:text-brand-red transition-colors flex items-center gap-2">
              View All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* FESTIVAL BANNER */}
      <section className="relative my-24 overflow-hidden">
        <div className="luxury-gradient py-20 px-6 relative noise">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gold blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-brand-red blur-3xl" />
          </div>
          <div className="max-w-5xl mx-auto text-center relative">
            <div className="text-xs tracking-[0.4em] text-gold font-semibold mb-4">✦ LIMITED EDITION ✦</div>
            <h2 className="font-display text-5xl sm:text-7xl font-bold text-cream leading-tight">
              Festival <span className="gold-text italic">Sale</span>
            </h2>
            <p className="mt-6 text-cream/80 text-lg">Up to 40% off across the entire collection. While stocks last.</p>
            <div className="flex items-center justify-center gap-6 mt-10">
              {["Days", "Hours", "Mins"].map((l, i) => (
                <div key={l} className="text-center">
                  <div className="font-display text-5xl font-bold gold-text">{["12", "08", "45"][i]}</div>
                  <div className="text-[10px] tracking-[0.3em] text-cream/60 mt-1">{l}</div>
                </div>
              ))}
            </div>
            <Link to="/shop"><Button variant="gold" className="mt-10">Shop the Sale</Button></Link>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="bg-beige/40 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="text-xs tracking-[0.35em] text-brand-red font-semibold mb-3 uppercase">Customer Favorites</div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-charcoal">Best Sellers</h2>
            </div>
            <Link to="/shop" className="text-sm font-semibold tracking-wider uppercase text-charcoal hover:text-brand-red transition-colors flex items-center gap-2">
              View All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* LOOKBOOK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-24">
        <SectionHeading eyebrow="Lookbook" title="Style the Moment" subtitle="Editorial looks shot for the AW26 campaign." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px]">
          <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1200&q=85" alt="" className="w-full h-full object-cover img-zoom" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-cream">
              <div className="text-[10px] tracking-[0.3em] text-gold">LOOK 01</div>
              <div className="font-display text-2xl font-bold">Midnight Noir</div>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=85" alt="" className="w-full h-full object-cover img-zoom" />
            <div className="absolute bottom-4 left-4 text-cream text-xs tracking-wider">LOOK 02</div>
          </div>
          <div className="relative rounded-2xl overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800&q=85" alt="" className="w-full h-full object-cover img-zoom" />
            <div className="absolute bottom-4 left-4 text-cream text-xs tracking-wider">LOOK 03</div>
          </div>
          <div className="relative rounded-2xl overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=85" alt="" className="w-full h-full object-cover img-zoom" />
            <div className="absolute bottom-4 left-4 text-cream text-xs tracking-wider">LOOK 04</div>
          </div>
          <div className="relative rounded-2xl overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&q=85" alt="" className="w-full h-full object-cover img-zoom" />
            <div className="absolute bottom-4 left-4 text-cream text-xs tracking-wider">LOOK 05</div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-charcoal text-cream py-24 relative noise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.35em] text-gold font-semibold mb-3 uppercase">Why Gangster</div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold">The <span className="gold-text italic">Gangster</span> Difference</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "✦", title: "Premium Craft", text: "Hand-picked fabrics, quality stitching built to last." },
              { icon: "◆", title: "Trusted Offline", text: "15+ years serving customers at our flagship store." },
              { icon: "★", title: "Nationwide Delivery", text: "Fast shipping with secure packaging across India." },
              { icon: "♥", title: "Easy Returns", text: "7-day hassle-free returns on every order." },
            ].map((f) => (
              <div key={f.title} className="text-center group">
                <div className="w-16 h-16 mx-auto rounded-full border-2 border-gold/40 flex items-center justify-center text-gold text-2xl mb-5 group-hover:border-gold group-hover:bg-gold/10 transition-all">
                  {f.icon}
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-cream/60 text-sm leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-24">
        <SectionHeading eyebrow="Reviews" title="What Our Customers Say" subtitle="Real stories from the Gangster community." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-cream rounded-2xl p-8 border border-beige card-lift">
              <div className="flex gap-1 text-gold mb-4">{"★".repeat(t.rating)}</div>
              <p className="text-charcoal/80 leading-relaxed mb-6 font-serif text-lg italic">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-5 border-t border-beige">
                <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-charcoal text-sm">{t.name}</div>
                  <div className="text-xs text-brand-red">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="bg-beige/30 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-10">
            <div className="text-xs tracking-[0.35em] text-brand-red font-semibold mb-3 uppercase">@gangsterfashion</div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-charcoal">Join the Crew</h2>
            <p className="mt-3 text-charcoal/60">22,000+ followers · Tag us for a chance to be featured</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3">
            {instagramPosts.map((src, i) => (
              <a key={i} href="#" className="group relative aspect-square overflow-hidden rounded-xl">
                <img src={src} alt="" className="w-full h-full object-cover img-zoom" />
                <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/60 transition-all flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="white" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* STORE GALLERY + DELIVERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs tracking-[0.35em] text-brand-red font-semibold mb-3 uppercase">Visit Our Store</div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-charcoal leading-tight">Step Into the <span className="gold-text italic">Flagship</span></h2>
            <p className="mt-5 text-charcoal/70 leading-relaxed">Our flagship store has been the destination for men who take style seriously. Come experience the collection in person — or order online and we'll bring the boutique to your door.</p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="p-5 rounded-2xl bg-cream border border-beige">
                <div className="font-display text-3xl font-bold text-brand-red">24hr</div>
                <div className="text-xs tracking-wider text-charcoal/60 uppercase mt-1">Fast Dispatch</div>
              </div>
              <div className="p-5 rounded-2xl bg-cream border border-beige">
                <div className="font-display text-3xl font-bold text-brand-red">COD</div>
                <div className="text-xs tracking-wider text-charcoal/60 uppercase mt-1">Available</div>
              </div>
              <div className="p-5 rounded-2xl bg-cream border border-beige">
                <div className="font-display text-3xl font-bold text-brand-red">500+</div>
                <div className="text-xs tracking-wider text-charcoal/60 uppercase mt-1">Cities Covered</div>
              </div>
              <div className="p-5 rounded-2xl bg-cream border border-beige">
                <div className="font-display text-3xl font-bold text-brand-red">7 Days</div>
                <div className="text-xs tracking-wider text-charcoal/60 uppercase mt-1">Easy Returns</div>
              </div>
            </div>
            <div className="mt-8 flex gap-4">
              <Link to="/contact"><Button variant="primary">Visit Store</Button></Link>
              <Link to="/shop"><Button variant="outline">Shop Online</Button></Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 h-[500px]">
            <div className="space-y-4">
              {storeGallery.slice(0, 2).map((src, i) => (
                <div key={i} className="rounded-2xl overflow-hidden h-[calc(50%-8px)]">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src={storeGallery[2]} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 luxury-gradient" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gold blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-brand-red blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <div className="text-xs tracking-[0.4em] text-gold font-semibold mb-4">✦ INSIDER ACCESS ✦</div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-cream leading-tight">Join the <span className="gold-text italic">Inner Circle</span></h2>
          <p className="mt-5 text-cream/70">Early access to new drops, private sales, and style guides — delivered weekly.</p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-4 rounded-full bg-cream/10 border border-cream/20 text-cream placeholder:text-cream/50 focus:border-gold outline-none transition-colors" />
            <Button variant="gold" type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
