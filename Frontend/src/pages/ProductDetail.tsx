import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById, getProducts } from "../api/api";
import { ProductCard, Button } from "../components/Layout";
import { useStore } from "../context/StoreContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist, trackView } = useStore();

  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      const data = await getProductById(id);

      if (data.success) {
        const fixedProduct = { ...data.product, id: data.product._id };
        setProduct(fixedProduct);

        trackView(fixedProduct.id);
        setSize(fixedProduct.sizes?.[0] || "");
        setColor(fixedProduct.colors?.[0]?.name || "");
        setActiveImg(0);
        setQty(1);

        const allData = await getProducts();

        if (allData.success) {
          const relatedProducts = allData.products
            .filter(
              (p: any) =>
                p.category === fixedProduct.category &&
                p._id !== fixedProduct._id
            )
            .slice(0, 4)
            .map((p: any) => ({ ...p, id: p._id }));

          setRelated(relatedProducts);
        }
      }

      setLoading(false);
      window.scrollTo(0, 0);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center">Loading product...</div>;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-4xl text-charcoal">
          Product not found
        </h1>
        <Link to="/shop" className="mt-6 inline-block text-brand-red underline">
          Back to shop
        </Link>
      </div>
    );
  }

  const inWishlist = wishlist.includes(product.id);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAdd = () => {
    if (!size || !color) {
      setToast("Please select size and color");
      return;
    }

    addToCart(product, size, color, qty);
    setToast("Added to cart ✓");
    setTimeout(() => setToast(""), 2500);
  };

  const handleBuyNow = () => {
    if (!size || !color) {
      setToast("Please select size and color");
      return;
    }

    addToCart(product, size, color, qty);
    navigate("/checkout");
  };

  const waMessage = encodeURIComponent(
    `Hi Gangster Fashion, I'd like to order:\n\n${product.name}\nSize: ${size}\nColor: ${color}\nQty: ${qty}\nPrice: ₹${product.price}`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
      <nav className="text-xs tracking-wider text-charcoal/60 mb-8 flex items-center gap-2">
        <Link to="/" className="hover:text-brand-red">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-brand-red">Shop</Link>
        <span>/</span>
        <span className="text-charcoal">{product.name}</span>
      </nav>

      {toast && (
        <div className="fixed top-28 right-6 z-50 bg-charcoal text-cream px-6 py-3 rounded-full shadow-2xl text-sm animate-fade-in">
          {toast}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div>
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-beige/50 mb-4">
            <img
              src={product.images?.[activeImg]}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {product.badge && (
              <span
                className={`absolute top-5 left-5 text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full ${
                  product.badge === "Sale"
                    ? "bg-brand-red text-cream"
                    : product.badge === "Limited"
                    ? "bg-charcoal text-gold"
                    : "bg-gold text-charcoal"
                }`}
              >
                {product.badge}
              </span>
            )}
          </div>

          {product.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((src: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    activeImg === i
                      ? "border-brand-red"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="text-[10px] tracking-[0.3em] text-brand-red font-semibold mb-3 uppercase">
            {product.subcategory}
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-charcoal leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mt-4">
            <div className="flex text-gold">
              {"★".repeat(Math.round(product.rating || 0))}
            </div>
            <span className="text-sm text-charcoal/70">
              {product.rating || 0} · {product.reviews || 0} reviews
            </span>
          </div>

          <div className="flex items-baseline gap-4 mt-6 pb-6 border-b border-beige">
            <span className="font-display text-4xl font-bold text-charcoal">
              ₹{product.price.toLocaleString()}
            </span>

            {product.originalPrice && (
              <>
                <span className="text-xl text-charcoal/40 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="text-sm font-bold text-brand-red">
                  Save {discount}%
                </span>
              </>
            )}
          </div>

          <p className="text-charcoal/70 leading-relaxed mt-6">
            {product.description}
          </p>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs tracking-[0.2em] font-semibold uppercase text-charcoal">
                Color
              </h3>
              <span className="text-xs text-charcoal/60">{color}</span>
            </div>

            <div className="flex gap-3">
              {product.colors?.map((c: any) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  className={`w-11 h-11 rounded-full border-2 transition-all ${
                    color === c.name
                      ? "border-brand-red ring-2 ring-brand-red/30 ring-offset-2"
                      : "border-beige hover:border-charcoal"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs tracking-[0.2em] font-semibold uppercase text-charcoal">
                Size
              </h3>
              <a href="#" className="text-xs text-brand-red hover:underline">
                Size Guide
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.sizes?.map((s: string) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-[3.5rem] px-4 py-3 rounded-lg text-sm font-semibold border transition-all ${
                    size === s
                      ? "bg-charcoal text-cream border-charcoal"
                      : "border-beige text-charcoal hover:border-charcoal"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xs tracking-[0.2em] font-semibold uppercase text-charcoal mb-3">
              Quantity
            </h3>

            <div className="inline-flex items-center border border-beige rounded-full">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-11 h-11 hover:bg-beige/50 rounded-l-full transition-colors"
              >
                −
              </button>

              <span className="w-12 text-center font-semibold">{qty}</span>

              <button
                onClick={() => setQty(qty + 1)}
                className="w-11 h-11 hover:bg-beige/50 rounded-r-full transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-10 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button variant="primary" onClick={handleAdd} className="!py-4">
                Add to Cart
              </Button>

              <Button variant="gold" onClick={handleBuyNow} className="!py-4">
                Buy Now
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={`https://wa.me/919999999999?text=${waMessage}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-full border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all text-sm font-semibold"
              >
                WhatsApp Order
              </a>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`flex items-center justify-center gap-2 py-3 rounded-full border-2 transition-all text-sm font-semibold ${
                  inWishlist
                    ? "bg-brand-red text-cream border-brand-red"
                    : "border-charcoal text-charcoal hover:bg-charcoal hover:text-cream"
                }`}
              >
                {inWishlist ? "Saved" : "Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-xs tracking-[0.35em] text-brand-red font-semibold mb-2 uppercase">
                You May Also Like
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">
                Related Products
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}