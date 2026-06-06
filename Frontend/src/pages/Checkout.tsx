import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { Button } from "../components/Layout";
import { createOrder } from "../api/api";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useStore();
  const navigate = useNavigate();

  const [payment, setPayment] = useState("cod");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    address: "",
    apartment: "",
    city: "",
    pincode: "",
    state: "",
  });

  const shipping = cartTotal >= 1999 ? 0 : 99;
  const tax = Math.round(cartTotal * 0.05);
  const total = cartTotal + shipping + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-3xl text-charcoal">
          Your cart is empty
        </h1>
        <Link to="/shop" className="mt-4 inline-block text-brand-red underline">
          Start shopping
        </Link>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      customerName: form.customerName,
      phone: form.phone,
      email: form.email,
      address: form.address,
      apartment: form.apartment,
      city: form.city,
      pincode: form.pincode,
      state: form.state,
      paymentMethod: payment,
      products: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        size: item.size,
        color: item.color,
        quantity: item.qty,
        price: item.product.price,
      })),
      subtotal: cartTotal,
      shipping,
      tax,
      totalAmount: total,
    };

    setLoading(true);

    const data = await createOrder(orderData);

    setLoading(false);

    if (data.success) {
      clearCart();
      navigate("/order-success");
    } else {
      alert(data.message || "Order failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
      <h1 className="font-display text-5xl font-bold text-charcoal text-center">
        Secure <span className="gold-text italic">Checkout</span>
      </h1>
      <div className="gold-divider w-24 mx-auto mt-5 mb-12" />

      <form onSubmit={submit} className="grid lg:grid-cols-[1fr_420px] gap-10">
        <div className="space-y-8">
          <section className="bg-cream rounded-2xl border border-beige p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-charcoal mb-5">
              1. Contact
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="customerName"
                value={form.customerName}
                onChange={handleChange}
                required
              />
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="sm:col-span-2"
              />
            </div>
          </section>

          <section className="bg-cream rounded-2xl border border-beige p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-charcoal mb-5">
              2. Delivery Address
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Street Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                className="sm:col-span-2"
              />
              <Input
                label="Apartment, Suite (optional)"
                name="apartment"
                value={form.apartment}
                onChange={handleChange}
                className="sm:col-span-2"
              />
              <Input
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />
              <Input
                label="Pincode"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                required
              />
              <Input
                label="State"
                name="state"
                value={form.state}
                onChange={handleChange}
                required
                className="sm:col-span-2"
              />
            </div>
          </section>

          <section className="bg-cream rounded-2xl border border-beige p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-charcoal mb-5">
              3. Payment Method
            </h2>

            <div className="space-y-3">
              {[
                {
                  id: "cod",
                  title: "Cash on Delivery",
                  sub: "Pay when your order arrives",
                  icon: "💵",
                },
                {
                  id: "upi",
                  title: "UPI / GPay / PhonePe",
                  sub: "Instant payment",
                  icon: "📱",
                },
                {
                  id: "card",
                  title: "Credit / Debit Card",
                  sub: "Visa, Mastercard, Rupay",
                  icon: "💳",
                },
                {
                  id: "wa",
                  title: "Confirm via WhatsApp",
                  sub: "We'll reach out to finalize",
                  icon: "💬",
                },
              ].map((p) => (
                <label
                  key={p.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    payment === p.id
                      ? "border-brand-red bg-white"
                      : "border-beige hover:border-charcoal/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={p.id}
                    checked={payment === p.id}
                    onChange={() => setPayment(p.id)}
                    className="accent-brand-red"
                  />
                  <div className="text-2xl">{p.icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-charcoal text-sm">
                      {p.title}
                    </div>
                    <div className="text-xs text-charcoal/60">{p.sub}</div>
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-40 self-start">
          <div className="bg-charcoal text-cream rounded-3xl p-8">
            <h3 className="font-display text-2xl font-bold mb-6">
              Your Order
            </h3>

            <div className="space-y-4 max-h-72 overflow-y-auto mb-5 pr-2">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex gap-3"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-beige/10 shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute -top-1 -right-1 bg-gold text-charcoal text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {item.qty}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">
                      {item.product.name}
                    </div>
                    <div className="text-xs text-cream/60">
                      {item.size} · {item.color}
                    </div>
                  </div>

                  <div className="text-sm font-semibold shrink-0">
                    ₹{(item.product.price * item.qty).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm py-5 border-y border-cream/20">
              <div className="flex justify-between">
                <span className="text-cream/70">Subtotal</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-cream/70">Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-gold">FREE</span>
                  ) : (
                    `₹${shipping}`
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-cream/70">Tax</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline py-4">
              <span className="font-display text-lg">Total</span>
              <span className="font-display text-3xl font-bold gold-text">
                ₹{total.toLocaleString()}
              </span>
            </div>

            <Button
              variant="gold"
              type="submit"
              className="w-full !py-4"
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </Button>

            <p className="text-center text-[11px] text-cream/50 mt-4">
              🔒 Your information is secure and encrypted
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Input({
  label,
  className = "",
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
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