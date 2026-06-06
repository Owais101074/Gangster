import { useEffect, useState } from "react";
import {
  getDashboardStats,
  getOrders,
  getProducts,
  updateOrderStatus,
  createProduct,
  uploadProductImages,
} from "../api/api";

type Section = "overview" | "products" | "orders" | "inventory" | "customers";

export default function Admin() {
  const [section, setSection] = useState<Section>("overview");
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [dashboard, setDashboard] = useState<any>(null);

  const [files, setFiles] = useState<FileList | null>(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });

  const token = localStorage.getItem("adminToken") || "";

  const fetchAdminData = async () => {
    const productData = await getProducts();

    if (productData.success) {
      setProducts(productData.products);
    }

    if (token) {
      const orderData = await getOrders(token);
      if (orderData.success) {
        setOrders(orderData.orders);
      }

      const statsData = await getDashboardStats(token);
      if (statsData.success) {
        setDashboard(statsData);
      }
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    const data = await updateOrderStatus(id, status, token);

    if (data.success) {
      fetchAdminData();
    } else {
      alert(data.message || "Failed to update status");
    }
  };

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0,
  );

  const customers = orders.map((order) => ({
    name: order.customerName,
    phone: order.phone,
    orders: 1,
    spent: order.totalAmount,
  }));

  const stats = [
    {
      label: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      change: "Live",
      up: true,
    },
    {
      label: "Total Products",
      value: dashboard?.totalProducts || products.length,
      change: "Live",
      up: true,
    },
    {
      label: "Pending Orders",
      value: dashboard?.pendingOrders || 0,
      change: "Live",
      up: true,
    },
    {
      label: "Completed Orders",
      value: dashboard?.completedOrders || 0,
      change: "Live",
      up: true,
    },
  ];

  return (
    <div className="min-h-screen bg-beige/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <div className="text-xs tracking-[0.35em] text-brand-red font-semibold mb-2 uppercase">
              Admin Dashboard
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-charcoal">
              Gangster <span className="gold-text italic">Control</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right text-sm">
              <div className="font-semibold text-charcoal">Admin</div>
              <div className="text-xs text-charcoal/50">Super User</div>
            </div>
            <div className="w-11 h-11 rounded-full luxury-gradient flex items-center justify-center text-gold font-display font-bold">
              A
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto bg-cream rounded-full p-1.5 border border-beige">
          {(
            [
              "overview",
              "products",
              "orders",
              "inventory",
              "customers",
            ] as const
          ).map((s) => (
            <button
              key={s}
              onClick={() => setSection(s)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap ${
                section === s
                  ? "luxury-gradient text-cream"
                  : "text-charcoal/60 hover:text-charcoal"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {section === "overview" && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-cream rounded-2xl p-5 border border-beige card-lift"
                >
                  <div className="text-xs tracking-wider uppercase text-charcoal/50 font-semibold">
                    {s.label}
                  </div>
                  <div className="font-display text-3xl font-bold text-charcoal mt-2">
                    {s.value}
                  </div>
                  <div
                    className={`text-xs font-semibold mt-2 ${
                      s.up ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {s.change}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-cream rounded-2xl border border-beige p-6">
              <h3 className="font-display text-xl font-bold text-charcoal mb-5">
                Recent Orders
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs tracking-wider uppercase text-charcoal/50 border-b border-beige">
                      <th className="text-left py-3">Order</th>
                      <th className="text-left py-3">Customer</th>
                      <th className="text-left py-3 hidden sm:table-cell">
                        Items
                      </th>
                      <th className="text-left py-3">Total</th>
                      <th className="text-left py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.slice(0, 5).map((o) => (
                      <tr
                        key={o._id}
                        className="border-b border-beige/60 last:border-0 hover:bg-beige/30"
                      >
                        <td className="py-3 font-mono text-xs text-charcoal">
                          {o._id.slice(-8)}
                        </td>
                        <td className="py-3 text-charcoal font-semibold">
                          {o.customerName}
                        </td>
                        <td className="py-3 text-charcoal/60 hidden sm:table-cell">
                          {o.products?.length || 0}
                        </td>
                        <td className="py-3 font-bold text-charcoal">
                          ₹{o.totalAmount?.toLocaleString()}
                        </td>
                        <td className="py-3">
                          <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-gray-100 text-gray-700">
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {section === "products" && (
          <div className="bg-cream rounded-2xl border border-beige p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-display text-xl font-bold text-charcoal">
                Product Management
              </h3>
            </div>
            <div className="bg-white border border-beige rounded-xl p-4 mb-6">
              <h4 className="font-semibold mb-4">Add New Product</h4>

              <input
                placeholder="Product Name"
                className="border p-2 w-full mb-2 rounded"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    name: e.target.value,
                  })
                }
              />

              <input
                placeholder="Category"
                className="border p-2 w-full mb-2 rounded"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    category: e.target.value,
                  })
                }
              />

              <input
                placeholder="Price"
                className="border p-2 w-full mb-2 rounded"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Description"
                className="border p-2 w-full mb-2 rounded"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    description: e.target.value,
                  })
                }
              />

              <input
                type="file"
                multiple
                className="mb-3"
                onChange={(e) => setFiles(e.target.files)}
              />

              <button
                className="luxury-gradient text-white px-4 py-2 rounded-full"
                onClick={async () => {
                  try {
                    if (!files) {
                      alert("Select image first");
                      return;
                    }

                    const uploaded = await uploadProductImages(files, token);

                    const result = await createProduct(
                      {
                        ...newProduct,
                        price: Number(newProduct.price),
                        images: uploaded.images,
                        sizes: ["S", "M", "L", "XL"],
                        colors: [
                          {
                            name: "Black",
                            hex: "#000000",
                          },
                        ],
                        inStock: 20,
                      },
                      token,
                    );

                    if (result.success) {
                      alert("Product Created");
                      fetchAdminData();
                    } else {
                      alert(result.message);
                    }
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                Create Product
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <div
                  key={p._id}
                  className="border border-beige rounded-xl overflow-hidden"
                >
                  <div className="aspect-square overflow-hidden bg-beige/50">
                    <img
                      src={p.images?.[0]}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <div className="text-[10px] tracking-wider uppercase text-brand-red font-semibold">
                      {p.subcategory}
                    </div>
                    <div className="font-semibold text-charcoal truncate">
                      {p.name}
                    </div>

                    <div className="flex justify-between items-center mt-2 text-sm">
                      <span className="font-bold">
                        ₹{p.price?.toLocaleString()}
                      </span>
                      <span className="text-xs text-charcoal/50">
                        Stock: {p.inStock || 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {section === "orders" && (
          <div className="bg-cream rounded-2xl border border-beige p-6">
            <h3 className="font-display text-xl font-bold text-charcoal mb-5">
              Order Management
            </h3>

            <div className="space-y-3">
              {orders.map((o) => (
                <div
                  key={o._id}
                  className="flex items-center gap-4 p-4 border border-beige rounded-xl hover:bg-beige/30"
                >
                  <div className="flex-1">
                    <div className="font-mono text-xs text-brand-red">
                      #{o._id.slice(-8)}
                    </div>
                    <div className="font-semibold text-charcoal">
                      {o.customerName}
                    </div>
                    <div className="text-xs text-charcoal/50">
                      {o.phone} · {o.products?.length || 0} items
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-display text-lg font-bold">
                      ₹{o.totalAmount?.toLocaleString()}
                    </div>

                    <select
                      value={o.status}
                      onChange={(e) =>
                        handleStatusChange(o._id, e.target.value)
                      }
                      className="text-xs px-2 py-1 rounded-full border border-beige bg-white"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>

                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {section === "inventory" && (
          <div className="bg-cream rounded-2xl border border-beige p-6">
            <h3 className="font-display text-xl font-bold text-charcoal mb-5">
              Inventory Overview
            </h3>

            <div className="space-y-2">
              {products.map((p) => (
                <div
                  key={p._id}
                  className="flex items-center gap-4 p-3 border border-beige rounded-xl"
                >
                  <img
                    src={p.images?.[0]}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-charcoal text-sm">
                      {p.name}
                    </div>
                    <div className="text-xs text-charcoal/50">
                      {p.subcategory}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-bold text-sm ${
                        p.inStock < 20 ? "text-red-700" : "text-green-700"
                      }`}
                    >
                      {p.inStock || 0} units
                    </div>
                    <div className="text-[10px] tracking-wider uppercase text-charcoal/40">
                      {(p.inStock || 0) < 20 ? "Low Stock" : "In Stock"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {section === "customers" && (
          <div className="bg-cream rounded-2xl border border-beige p-6">
            <h3 className="font-display text-xl font-bold text-charcoal mb-5">
              Customer Management
            </h3>

            <div className="space-y-3">
              {customers.map((c, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 border border-beige rounded-xl hover:bg-beige/30"
                >
                  <div className="w-12 h-12 rounded-full luxury-gradient flex items-center justify-center text-gold font-display font-bold">
                    {c.name?.[0]}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-charcoal">{c.name}</div>
                    <div className="text-xs text-charcoal/50">{c.phone}</div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="text-xs tracking-wider uppercase text-charcoal/50">
                      {c.orders} order
                    </div>
                    <div className="font-bold text-brand-red">
                      ₹{c.spent?.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!token && (
          <div className="mt-6 bg-red-100 text-red-800 p-4 rounded-xl text-sm">
            Admin token missing. Add token using browser console:
            localStorage.setItem("adminToken", "YOUR_TOKEN")
          </div>
        )}
      </div>
    </div>
  );
}
