import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStore } from "../context/StoreContext";
import type { Product } from "../data/products";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const { cartCount, wishlist } = useStore();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "bg-cream/95 backdrop-blur-md shadow-[0_4px_30px_rgba(90,15,28,0.08)]" : "bg-cream/70 backdrop-blur-sm"}`}>
      {/* Announcement bar */}
      <div className="luxury-gradient text-cream text-[11px] sm:text-xs py-2 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-12 px-6 shrink-0">
              <span>✦ FREE SHIPPING OVER ₹1999</span>
              <span>✦ FESTIVAL SALE — UP TO 40% OFF</span>
              <span>✦ WHATSAPP ORDERS AVAILABLE</span>
              <span>✦ NEW COLLECTION LIVE</span>
              <span>✦ FREE SHIPPING OVER ₹1999</span>
              <span>✦ FESTIVAL SALE — UP TO 40% OFF</span>
            </div>
          ))}
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          <button className="lg:hidden p-2 -ml-2" onClick={() => setOpen(!open)} aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>}
            </svg>
          </button>

          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full luxury-gradient flex items-center justify-center ring-2 ring-gold/40 group-hover:ring-gold transition-all">
              <span className="font-display font-bold text-gold text-xl">G</span>
            </div>
            <div className="leading-none hidden sm:block">
              <div className="font-display text-xl sm:text-2xl font-bold text-charcoal tracking-wide">Gangster</div>
              <div className="text-[10px] sm:text-xs tracking-[0.3em] text-brand-red font-medium mt-0.5">FASHION</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} className={({ isActive }) =>
                `relative text-sm font-medium tracking-wide transition-colors ${isActive ? "text-brand-red" : "text-charcoal hover:text-brand-red"}`
              }>
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gold" />}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 hover:text-brand-red transition-colors hidden sm:block" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <Link to="/profile" className="p-2 hover:text-brand-red transition-colors hidden sm:block" aria-label="Profile">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" />
              </svg>
            </Link>
            <Link to="/wishlist" className="p-2 hover:text-brand-red transition-colors relative" aria-label="Wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist.length ? "#9E1B32" : "none"} stroke="currentColor" strokeWidth="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlist.length > 0 && <span className="absolute -top-0.5 -right-0.5 bg-brand-red text-cream text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{wishlist.length}</span>}
            </Link>
            <Link to="/cart" className="p-2 hover:text-brand-red transition-colors relative" aria-label="Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 bg-brand-red text-cream text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
            </Link>
          </div>
        </div>

        {open && (
          <div className="lg:hidden pb-6 animate-fade-in">
            <div className="flex flex-col gap-1 pt-2 border-t border-beige">
              {navLinks.map((l) => (
                <NavLink key={l.to} to={l.to} end={l.to === "/"} className={({ isActive }) =>
                  `px-4 py-3 text-sm font-medium tracking-wide rounded-lg ${isActive ? "bg-brand-red text-cream" : "text-charcoal hover:bg-beige"}`
                }>{l.label}</NavLink>
              ))}
              <Link to="/profile" className="px-4 py-3 text-sm font-medium text-charcoal hover:bg-beige rounded-lg">My Profile</Link>
              <Link to="/admin" className="px-4 py-3 text-sm font-medium text-charcoal hover:bg-beige rounded-lg">Admin</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full luxury-gradient flex items-center justify-center ring-2 ring-gold/40">
                <span className="font-display font-bold text-gold text-xl">G</span>
              </div>
              <div>
                <div className="font-display text-xl font-bold">Gangster</div>
                <div className="text-[10px] tracking-[0.3em] text-gold">FASHION</div>
              </div>
            </div>
            <p className="text-sm text-cream/60 leading-relaxed">Premium men's fashion, crafted for the modern gentleman. From our flagship store to your doorstep.</p>
            <div className="flex gap-3 mt-6">
              {["instagram", "facebook", "twitter", "youtube"].map((s) => (
                <a key={s} href="#" aria-label={s} className="w-9 h-9 rounded-full border border-cream/20 hover:border-gold hover:text-gold flex items-center justify-center transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="4" /></svg>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-lg mb-5 text-gold">Shop</h4>
            <ul className="space-y-3 text-sm text-cream/70">
              {["Shirts", "T-Shirts", "Jeans", "Shoes", "Watches", "Perfumes"].map((x) => (
                <li key={x}><Link to="/shop" className="hover:text-gold transition-colors">{x}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg mb-5 text-gold">Help</h4>
            <ul className="space-y-3 text-sm text-cream/70">
              {[["Contact", "/contact"], ["About Us", "/about"], ["Size Guide", "/shop"], ["Shipping", "/"], ["Returns", "/"], ["Track Order", "/profile"]].map(([l, to]) => (
                <li key={l}><Link to={to} className="hover:text-gold transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg mb-5 text-gold">Stay Connected</h4>
            <p className="text-sm text-cream/60 mb-4">Get exclusive offers and new arrivals straight to your inbox.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex border border-cream/20 rounded-full overflow-hidden focus-within:border-gold transition-colors">
              <input type="email" placeholder="Your email" className="bg-transparent px-4 py-2.5 text-sm flex-1 outline-none placeholder:text-cream/40" />
              <button className="bg-gold text-charcoal px-5 text-xs font-bold tracking-wider hover:bg-gold-light transition-colors">JOIN</button>
            </form>
            <p className="text-xs text-cream/40 mt-4">Visit our store:<br />123 Fashion Street, MG Road<br />Mon–Sun · 11 AM – 10 PM</p>
          </div>
        </div>
        <div className="gold-divider mt-12 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/40">
          <p>© 2026 Gangster Fashion. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">Privacy</a>
            <a href="#" className="hover:text-gold">Terms</a>
            <a href="#" className="hover:text-gold">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919999999999?text=Hi%20Gangster%20Fashion%2C%20I%27d%20like%20to%20place%20an%20order"
      target="_blank" rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-2xl hover:scale-105 transition-all animate-pulse-gold group"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1-1.1 2.5s1.1 2.9 1.3 3.1c.2.2 2.2 3.4 5.4 4.7.8.3 1.4.5 1.8.7.8.2 1.5.2 2 .1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.3c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3C4 15 3.6 13.5 3.6 12c0-4.6 3.8-8.4 8.4-8.4s8.4 3.8 8.4 8.4-3.8 8.3-8.4 8.3z"/>
      </svg>
      <span className="text-sm font-semibold tracking-wide">Order on WhatsApp</span>
    </a>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist } = useStore();
  const inWishlist = wishlist.includes(product.id);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-beige/50 aspect-[3/4] mb-4">
        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover img-zoom" loading="lazy" />
        {product.badge && (
          <span className={`absolute top-3 left-3 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full ${
            product.badge === "Sale" ? "bg-brand-red text-cream" :
            product.badge === "New" ? "bg-gold text-charcoal" :
            product.badge === "Limited" ? "bg-charcoal text-gold" :
            "bg-charcoal text-cream"
          }`}>{product.badge}</span>
        )}
        {discount > 0 && <span className="absolute top-3 right-3 bg-brand-red text-cream text-[10px] font-bold px-2 py-1 rounded-full">-{discount}%</span>}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className={`absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all ${inWishlist ? "bg-brand-red text-cream" : "bg-cream/90 backdrop-blur text-charcoal hover:bg-brand-red hover:text-cream"}`}
          aria-label="Wishlist"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
      <div className="px-1">
        <div className="text-[10px] tracking-[0.2em] text-brand-red font-semibold mb-1 uppercase">{product.subcategory}</div>
        <h3 className="font-display text-lg text-charcoal group-hover:text-brand-red transition-colors leading-tight">{product.name}</h3>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="font-semibold text-charcoal">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && <span className="text-sm text-charcoal/40 line-through">₹{product.originalPrice.toLocaleString()}</span>}
        </div>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-gold">★</span>
          <span className="text-xs text-charcoal/70">{product.rating} ({product.reviews})</span>
        </div>
      </div>
    </Link>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, center = true }: { eyebrow?: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      {eyebrow && <div className="text-xs tracking-[0.35em] text-brand-red font-semibold mb-3 uppercase">{eyebrow}</div>}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal leading-tight">{title}</h2>
      {subtitle && <p className={`mt-4 text-charcoal/60 max-w-2xl ${center ? "mx-auto" : ""}`}>{subtitle}</p>}
      <div className={`gold-divider w-24 mt-5 ${center ? "mx-auto" : ""}`} />
    </div>
  );
}

export function Button({ children, variant = "primary", ...props }: { children: React.ReactNode; variant?: "primary" | "gold" | "outline" | "dark" } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const styles = {
    primary: "luxury-gradient text-cream hover:shadow-[0_10px_30px_rgba(158,27,50,0.4)]",
    gold: "bg-gold text-charcoal hover:bg-gold-light",
    outline: "border border-charcoal text-charcoal hover:bg-charcoal hover:text-cream",
    dark: "bg-charcoal text-cream hover:bg-maroon",
  };
  return (
    <button {...props} className={`px-7 py-3.5 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${styles[variant]} ${props.className || ""}`}>
      {children}
    </button>
  );
}
