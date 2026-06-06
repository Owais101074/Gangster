import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../api/api";
import { categories } from "../data/products";
import { ProductCard } from "../components/Layout";

const priceRanges = [
  { label: "Under ₹999", min: 0, max: 999 },
  { label: "₹999 – ₹1999", min: 999, max: 1999 },
  { label: "₹1999 – ₹3499", min: 1999, max: 3499 },
  { label: "Above ₹3499", min: 3499, max: 999999 },
];

export default function Shop() {
  const [params] = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(
    params.get("category") || "all"
  );
  const [sizeFilter, setSizeFilter] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setCategory(params.get("category") || "all");
  }, [params]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();

      if (data.success) {
        setProducts(data.products);
      }
    };

    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];

    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    if (query.trim()) {
      list = list.filter((p) =>
        (p.name + p.subcategory)
          .toLowerCase()
          .includes(query.toLowerCase())
      );
    }

    if (sizeFilter.length) {
      list = list.filter((p) =>
        p.sizes?.some((s: string) => sizeFilter.includes(s))
      );
    }

    if (priceFilter !== null) {
      const r = priceRanges[priceFilter];
      list = list.filter((p) => p.price >= r.min && p.price <= r.max);
    }

    if (sort === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sort === "newest") {
      list.sort(
        (a, b) =>
          (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0)
      );
    }

    return list;
  }, [products, query, category, sizeFilter, priceFilter, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
      <div className="text-center mb-10">
        <div className="text-xs tracking-[0.35em] text-brand-red font-semibold mb-3 uppercase">
          Collection
        </div>
        <h1 className="font-display text-5xl sm:text-6xl font-bold text-charcoal">
          The <span className="gold-text italic">Shop</span>
        </h1>
        <div className="gold-divider w-24 mx-auto mt-5" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8 sticky top-[7.5rem] z-30 bg-cream/95 backdrop-blur py-4 rounded-2xl border border-beige px-4">
        <div className="flex-1 relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the collection..."
            className="w-full pl-12 pr-4 py-3 rounded-full bg-beige/40 border border-beige focus:border-brand-red focus:bg-cream outline-none transition-all text-sm"
          />
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-5 py-3 rounded-full bg-beige/40 border border-beige focus:border-brand-red outline-none text-sm cursor-pointer"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>

        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="lg:hidden px-5 py-3 rounded-full bg-charcoal text-cream text-sm font-semibold"
        >
          Filters {filtersOpen ? "✕" : "≡"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
        <aside className={`${filtersOpen ? "block" : "hidden"} lg:block`}>
          <div className="space-y-8 lg:sticky lg:top-40">
            <div>
              <h3 className="font-display text-lg font-bold mb-4 text-charcoal">
                Category
              </h3>

              <div className="space-y-2">
                <button
                  onClick={() => setCategory("all")}
                  className={`block text-sm transition-colors ${
                    category === "all"
                      ? "text-brand-red font-semibold"
                      : "text-charcoal/70 hover:text-brand-red"
                  }`}
                >
                  All Products
                </button>

                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={`block text-sm transition-colors ${
                      category === c.id
                        ? "text-brand-red font-semibold"
                        : "text-charcoal/70 hover:text-brand-red"
                    }`}
                  >
                    {c.name}{" "}
                    <span className="text-xs text-charcoal/40">
                      ({c.count})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="gold-divider" />

            <div>
              <h3 className="font-display text-lg font-bold mb-4 text-charcoal">
                Size
              </h3>

              <div className="flex flex-wrap gap-2">
                {["S", "M", "L", "XL", "XXL", "30", "32", "34", "8", "9", "10"].map(
                  (s) => (
                    <button
                      key={s}
                      onClick={() =>
                        setSizeFilter((p) =>
                          p.includes(s)
                            ? p.filter((x) => x !== s)
                            : [...p, s]
                        )
                      }
                      className={`min-w-[3rem] px-3 py-2 rounded-full text-xs font-semibold border transition-all ${
                        sizeFilter.includes(s)
                          ? "bg-charcoal text-cream border-charcoal"
                          : "border-beige text-charcoal/70 hover:border-charcoal"
                      }`}
                    >
                      {s}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="gold-divider" />

            <div>
              <h3 className="font-display text-lg font-bold mb-4 text-charcoal">
                Price
              </h3>

              <div className="space-y-2">
                {priceRanges.map((r, i) => (
                  <button
                    key={r.label}
                    onClick={() =>
                      setPriceFilter(priceFilter === i ? null : i)
                    }
                    className={`block text-sm transition-colors ${
                      priceFilter === i
                        ? "text-brand-red font-semibold"
                        : "text-charcoal/70 hover:text-brand-red"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {(category !== "all" ||
              sizeFilter.length ||
              priceFilter !== null) && (
              <button
                onClick={() => {
                  setCategory("all");
                  setSizeFilter([]);
                  setPriceFilter(null);
                }}
                className="text-xs tracking-wider uppercase text-brand-red font-semibold hover:underline"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </aside>

        <main>
          <div className="text-xs tracking-wider text-charcoal/50 mb-6 uppercase">
            {filtered.length} products
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 rounded-2xl bg-beige/30">
              <div className="text-5xl mb-4">✦</div>
              <h3 className="font-display text-2xl text-charcoal">
                No products found
              </h3>
              <p className="text-charcoal/60 mt-2">
                Try adjusting your filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
              {filtered.map((p) => (
                <ProductCard key={p._id} product={{ ...p, id: p._id }} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}