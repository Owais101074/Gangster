import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await adminLogin(form);

    if (data.success) {
      localStorage.setItem("adminToken", data.token);
      navigate("/admin");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <h1 className="font-display text-4xl font-bold text-center mb-8">
        Admin Login
      </h1>

      <form onSubmit={submit} className="space-y-4">
        <input
          placeholder="Admin Email"
          type="email"
          className="w-full border p-3 rounded-xl"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          placeholder="Admin Password"
          type="password"
          className="w-full border p-3 rounded-xl"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button className="w-full luxury-gradient text-white py-3 rounded-full">
          Login as Admin
        </button>
      </form>
    </div>
  );
}