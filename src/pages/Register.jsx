// src/pages/Register.jsx
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const Register = () => {
  const { role } = useParams(); // student / institute / company
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/signup`,
        { ...form, role } // send role to backend!
      );
      alert("Account created! Please login.");
      window.location.href = `/login/${role}`;
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Server error"));
    }
  };

  return (
    <div className="container-box">
      <h2 className="text-xl font-semibold mb-4">
        Create {role} Account
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          className="input-field"
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="input-field"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="input-field"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="btn-primary w-full mt-3">
          Register as {role}
        </button>
      </form>
    </div>
  );
};

export default Register;
