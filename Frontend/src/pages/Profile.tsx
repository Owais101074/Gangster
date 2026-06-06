import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Tab = "profile" | "orders" | "addresses";

export default function Profile() {
  const [tab, setTab] = useState<Tab>("profile");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userToken = localStorage.getItem("userToken");

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!userToken) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-4xl text-charcoal">
          Please login first
        </h1>
        <Link
          to="/login"
          className="mt-6 inline-block luxury-gradient text-cream px-8 py-3 rounded-full"
        >
          Login
        </Link>
      </div>
    );
  }

  const orders: any[] = [];
  const addresses: any[] = [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
      <div className="luxury-gradient text-cream rounded-3xl p-8 sm:p-10 mb-10 relative overflow-hidden noise">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center font-display text-4xl font-bold text-charcoal">
            {user.name?.[0]?.toUpperCase() || "U"}
          </div>

          <div className="flex-1">
            <div className="text-xs tracking-[0.3em] text-gold font-semibold mb-1">
              CUSTOMER ACCOUNT
            </div>

            <h1 className="font-display text-4xl font-bold">
              Welcome back, {user.name || "User"}
            </h1>

            <p className="text-cream/70 mt-1 text-sm">
              {user.email}
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              to="/wishlist"
              className="text-sm text-gold hover:text-gold-light font-semibold"
            >
              View Wishlist →
            </Link>

            <button
              onClick={handleLogout}
              className="text-sm text-cream hover:text-gold font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-8 border-b border-beige overflow-x-auto">
        {(["profile", "orders", "addresses"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-3 text-sm font-semibold tracking-wider uppercase transition-all whitespace-nowrap ${
              tab === t
                ? "text-brand-red border-b-2 border-brand-red"
                : "text-charcoal/50 hover:text-charcoal"
            }`}
          >
            {t === "profile"
              ? "Personal Info"
              : t === "orders"
              ? "Order History"
              : "Addresses"}
          </button>
        ))}
      </div>

      {tab === "profile" && (
        <div className="bg-cream rounded-3xl border border-beige p-8">
          <h2 className="font-display text-2xl font-bold text-charcoal mb-6">
            Personal Information
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Name" defaultValue={user.name || ""} />
            <Field label="Email" type="email" defaultValue={user.email || ""} />
          </div>

          <button className="mt-8 luxury-gradient text-cream px-8 py-3 rounded-full text-sm font-semibold tracking-wider uppercase hover:shadow-lg transition-all">
            Save Changes
          </button>
        </div>
      )}

      {tab === "orders" && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-cream rounded-2xl border border-beige p-8 text-center">
              <h3 className="font-display text-2xl text-charcoal">
                No orders yet
              </h3>
              <Link
                to="/shop"
                className="mt-4 inline-block text-brand-red underline"
              >
                Start shopping
              </Link>
            </div>
          ) : (
            orders.map((o) => (
              <div
                key={o.id}
                className="bg-cream rounded-2xl border border-beige p-6"
              >
                <div>{o.id}</div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === "addresses" && (
        <div className="grid md:grid-cols-2 gap-4">
          {addresses.length === 0 ? (
            <div className="bg-cream rounded-2xl border border-beige p-8">
              No saved addresses yet.
            </div>
          ) : (
            addresses.map((a) => (
              <div
                key={a.id}
                className="bg-cream rounded-2xl border border-beige p-6"
              >
                {a.street}
              </div>
            ))
          )}

          <button className="bg-beige/30 rounded-2xl border-2 border-dashed border-beige p-6 hover:border-brand-red hover:bg-cream transition-all text-charcoal/50 hover:text-brand-red">
            <div className="text-4xl mb-2">+</div>
            <div className="text-sm font-semibold tracking-wider uppercase">
              Add New Address
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs tracking-wider uppercase text-charcoal font-semibold">
        {label}
      </label>
      <input
        {...props}
        className="mt-2 w-full px-4 py-3 rounded-xl border border-beige bg-white focus:border-brand-red outline-none"
      />
    </div>
  );
}