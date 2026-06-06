import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userSignup } from "../api/api";

export default function UserSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await userSignup(form);

    if (data.success) {
      alert("Signup successful. Please login.");
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <h1 className="font-display text-4xl font-bold text-center mb-8">
        Create Account
      </h1>

      <form onSubmit={submit} className="space-y-4">
        <input
          placeholder="Full Name"
          className="w-full border p-3 rounded-xl"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Email"
          type="email"
          className="w-full border p-3 rounded-xl"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full border p-3 rounded-xl"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button className="w-full luxury-gradient text-white py-3 rounded-full">
          Sign Up
        </button>
      </form>

      <p className="text-center mt-5 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-brand-red underline">
          Login
        </Link>
      </p>
    </div>
  );
}