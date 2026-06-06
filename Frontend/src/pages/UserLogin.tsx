import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../api/api";

export default function UserLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await userLogin(form);

    if (data.success) {
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/profile");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <h1 className="font-display text-4xl font-bold text-center mb-8">
        Login
      </h1>

      <form onSubmit={submit} className="space-y-4">
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
          Login
        </button>
      </form>

      <p className="text-center mt-5 text-sm">
        New customer?{" "}
        <Link to="/signup" className="text-brand-red underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}