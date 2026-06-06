import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Product } from "../data/products";

export type CartItem = {
  product: Product;
  qty: number;
  size: string;
  color: string;
};

type StoreCtx = {
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  addToCart: (p: Product, size: string, color: string, qty?: number) => void;
  removeFromCart: (id: string, size: string, color: string) => void;
  updateQty: (id: string, size: string, color: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  trackView: (id: string) => void;
  cartTotal: number;
  cartCount: number;
};

const Ctx = createContext<StoreCtx | null>(null);

const load = <T,>(key: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => load("gf_cart", []));
  const [wishlist, setWishlist] = useState<string[]>(() => load("gf_wishlist", []));
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => load("gf_recent", []));

  useEffect(() => { localStorage.setItem("gf_cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("gf_wishlist", JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem("gf_recent", JSON.stringify(recentlyViewed)); }, [recentlyViewed]);

  const addToCart: StoreCtx["addToCart"] = (product, size, color, qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id && i.size === size && i.color === color);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [...prev, { product, size, color, qty }];
    });
  };

  const removeFromCart: StoreCtx["removeFromCart"] = (id, size, color) => {
    setCart((prev) => prev.filter((i) => !(i.product.id === id && i.size === size && i.color === color)));
  };

  const updateQty: StoreCtx["updateQty"] = (id, size, color, qty) => {
    setCart((prev) => prev.map((i) =>
      i.product.id === id && i.size === size && i.color === color ? { ...i, qty: Math.max(1, qty) } : i
    ));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist: StoreCtx["toggleWishlist"] = (id) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const trackView: StoreCtx["trackView"] = (id) => {
    setRecentlyViewed((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 6));
  };

  const cartTotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <Ctx.Provider value={{ cart, wishlist, recentlyViewed, addToCart, removeFromCart, updateQty, clearCart, toggleWishlist, trackView, cartTotal, cartCount }}>
      {children}
    </Ctx.Provider>
  );
}

export const useStore = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore must be inside StoreProvider");
  return c;
};
