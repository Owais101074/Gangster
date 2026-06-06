// Curated product catalog with Unsplash fashion imagery
export type Product = {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  rating: number;
  reviews: number;
  badge?: "New" | "Bestseller" | "Sale" | "Trending" | "Limited";
  description: string;
  inStock: number;
};

export const categories = [
  { id: "shirts", name: "Shirts", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&q=80", count: 48 },
  { id: "tshirts", name: "T-Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80", count: 72 },
  { id: "jeans", name: "Jeans & Pants", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=900&q=80", count: 36 },
  { id: "cargo", name: "Cargo Pants", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=900&q=80", count: 18 },
  { id: "joggers", name: "Joggers & Lowers", image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=900&q=80", count: 24 },
  { id: "shoes", name: "Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80", count: 40 },
  { id: "watches", name: "Watches", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=900&q=80", count: 22 },
  { id: "perfumes", name: "Perfumes", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=900&q=80", count: 16 },
  { id: "caps", name: "Caps", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=900&q=80", count: 14 },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Midnight Oxford Shirt",
    category: "shirts",
    subcategory: "Formal Shirts",
    price: 1899,
    originalPrice: 2499,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1200&q=80",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=1200&q=80",
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=1200&q=80",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Maroon", hex: "#5A0F1C" }, { name: "Black", hex: "#1A1A1A" }, { name: "Cream", hex: "#F8F4EC" }],
    rating: 4.8,
    reviews: 234,
    badge: "Bestseller",
    description: "A refined oxford shirt crafted from premium cotton. Tailored for the modern gentleman who appreciates timeless style with a contemporary fit.",
    inStock: 42,
  },
  {
    id: "p2",
    name: "Signature Oversized Tee",
    category: "tshirts",
    subcategory: "Oversized T-Shirts",
    price: 999,
    originalPrice: 1499,
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1200&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Charcoal", hex: "#1A1A1A" }, { name: "Cream", hex: "#F8F4EC" }],
    rating: 4.9,
    reviews: 512,
    badge: "Trending",
    description: "Street-luxe oversized tee with premium heavyweight cotton. Drop-shoulder silhouette for an effortlessly cool look.",
    inStock: 78,
  },
  {
    id: "p3",
    name: "Heritage Slim Denim",
    category: "jeans",
    subcategory: "Jeans",
    price: 2499,
    originalPrice: 3299,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=80",
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=1200&q=80",
    ],
    sizes: ["28", "30", "32", "34", "36"],
    colors: [{ name: "Indigo", hex: "#1e3a5f" }, { name: "Black", hex: "#1A1A1A" }],
    rating: 4.7,
    reviews: 189,
    badge: "Bestseller",
    description: "Crafted from premium Japanese denim with a tailored slim fit. Classic wash with refined distressing.",
    inStock: 35,
  },
  {
    id: "p4",
    name: "Tactical Cargo Pants",
    category: "cargo",
    subcategory: "Cargo Pants",
    price: 1799,
    originalPrice: 2299,
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=1200&q=80",
      "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=1200&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Olive", hex: "#556B2F" }, { name: "Khaki", hex: "#C3B091" }],
    rating: 4.6,
    reviews: 156,
    badge: "New",
    description: "Utility-inspired cargo pants with multiple pockets and a relaxed tapered fit. Built for the streets.",
    inStock: 28,
  },
  {
    id: "p5",
    name: "Urban Runner Joggers",
    category: "joggers",
    subcategory: "Joggers",
    price: 1299,
    images: [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=1200&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#1A1A1A" }, { name: "Grey", hex: "#4a4a4a" }],
    rating: 4.8,
    reviews: 298,
    badge: "Bestseller",
    description: "Premium french terry joggers with tapered cuffs. Comfort meets luxury.",
    inStock: 62,
  },
  {
    id: "p6",
    name: "Crimson Runner Sneakers",
    category: "shoes",
    subcategory: "Sneakers",
    price: 3499,
    originalPrice: 4499,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=1200&q=80",
    ],
    sizes: ["7", "8", "9", "10", "11"],
    colors: [{ name: "Red", hex: "#9E1B32" }, { name: "Black", hex: "#1A1A1A" }],
    rating: 4.9,
    reviews: 421,
    badge: "Trending",
    description: "Premium leather sneakers with signature red accents. Handcrafted for lasting comfort and unmistakable style.",
    inStock: 19,
  },
  {
    id: "p7",
    name: "Chronos Gold Watch",
    category: "watches",
    subcategory: "Watches",
    price: 4999,
    originalPrice: 6999,
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1200&q=80",
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1200&q=80",
    ],
    sizes: ["One Size"],
    colors: [{ name: "Gold", hex: "#D4AF37" }, { name: "Black", hex: "#1A1A1A" }],
    rating: 4.9,
    reviews: 167,
    badge: "Limited",
    description: "Luxury chronograph with 18k gold plating and sapphire crystal. A statement piece for the distinguished.",
    inStock: 8,
  },
  {
    id: "p8",
    name: "Noir Eau de Parfum",
    category: "perfumes",
    subcategory: "Perfumes",
    price: 2199,
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&q=80",
    ],
    sizes: ["50ml", "100ml"],
    colors: [{ name: "Noir", hex: "#1A1A1A" }],
    rating: 4.7,
    reviews: 342,
    badge: "Bestseller",
    description: "A sophisticated blend of bergamot, leather, and amberwood. Bold, magnetic, unforgettable.",
    inStock: 54,
  },
  {
    id: "p9",
    name: "Classic Snapback Cap",
    category: "caps",
    subcategory: "Caps",
    price: 699,
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=1200&q=80",
    ],
    sizes: ["One Size"],
    colors: [{ name: "Black", hex: "#1A1A1A" }, { name: "Maroon", hex: "#5A0F1C" }],
    rating: 4.5,
    reviews: 178,
    badge: "New",
    description: "Premium embroidered snapback with structured crown. Effortless streetwear essential.",
    inStock: 91,
  },
  {
    id: "p10",
    name: "Monaco Polo Shirt",
    category: "tshirts",
    subcategory: "Casual Shirts",
    price: 1499,
    images: [
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=1200&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Navy", hex: "#1e3a5f" }, { name: "White", hex: "#F8F4EC" }],
    rating: 4.6,
    reviews: 134,
    description: "Pique cotton polo with signature crest embroidery. Riviera style, refined.",
    inStock: 47,
  },
  {
    id: "p11",
    name: "Executive Formal Shirt",
    category: "shirts",
    subcategory: "Formal Shirts",
    price: 2299,
    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=1200&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "White", hex: "#F8F4EC" }, { name: "Sky", hex: "#b3d4e6" }],
    rating: 4.8,
    reviews: 203,
    badge: "Bestseller",
    description: "Impeccable tailoring in pure Egyptian cotton. The power shirt for the boardroom.",
    inStock: 31,
  },
  {
    id: "p12",
    name: "Desert Sports Tee",
    category: "tshirts",
    subcategory: "Sports T-Shirts",
    price: 899,
    originalPrice: 1299,
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1200&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#1A1A1A" }, { name: "Red", hex: "#9E1B32" }],
    rating: 4.5,
    reviews: 276,
    badge: "Sale",
    description: "Moisture-wicking performance tee engineered for movement. Gym-ready, street-proven.",
    inStock: 84,
  },
];

export const testimonials = [
  { name: "Arjun Mehta", role: "Verified Buyer", text: "The quality is insane for the price. My go-to brand for weekend fits.", rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
  { name: "Rohan Kapoor", role: "Verified Buyer", text: "Ordered twice already. The oversized tee and cargos are chef's kiss.", rating: 5, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" },
  { name: "Vikram Singh", role: "Verified Buyer", text: "Premium feel, perfect fit. Gangster Fashion is redefining men's style in our city.", rating: 5, avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80" },
  { name: "Aditya Sharma", role: "Verified Buyer", text: "Fast delivery, great packaging, and the watch exceeded expectations.", rating: 5, avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&q=80" },
];

export const instagramPosts = [
  "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80",
  "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&q=80",
  "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=600&q=80",
  "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=600&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
];

export const storeGallery = [
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
  "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200&q=80",
  "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&q=80",
  "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=1200&q=80",
];
