import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { StoreProvider } from "./context/StoreContext";
import { Navbar, Footer, WhatsAppButton } from "./components/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Admin from "./pages/Admin";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import AdminLogin from "./pages/AdminLogin";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function AppShell() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<UserLogin />} />

          <Route path="/signup" element={<UserSignup />} />

          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="*"
            element={
              <div className="max-w-2xl mx-auto px-4 py-24 text-center">
                <div className="font-display text-9xl font-bold gold-text">
                  404
                </div>
                <h1 className="font-display text-3xl text-charcoal mt-4">
                  Page Not Found
                </h1>
                <p className="mt-3 text-charcoal/60">
                  The page you're looking for doesn't exist.
                </p>
                <a
                  href="/"
                  className="inline-block mt-6 luxury-gradient text-cream px-8 py-3 rounded-full text-sm font-semibold tracking-wider uppercase"
                >
                  Back Home
                </a>
              </div>
            }
          />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </StoreProvider>
  );
}
