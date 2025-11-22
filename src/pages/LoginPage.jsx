import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

const handleLogin = async () => {
  const res = await loginUser(email, password);

  if (res.success) {
    localStorage.setItem("token", res.token);
    localStorage.setItem("role", res.role);
    localStorage.setItem("name", res.name);
    navigate("/dashboard");
  } else {
    alert(res.message);
  }
};


const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      navigate("/dashboard");
    } else alert(data.message);
  };

  return (
    <div className="container-box mt-10">
      <h2 className="text-xl font-bold text-center mb-4">Login</h2>

      <input className="input-field" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="input-field" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button className="btn-primary w-full mt-3" onClick={handleLogin}>Login</button>
      <p className="text-center text-sm underline cursor-pointer mt-2" onClick={() => navigate("/signup")}>
        Create a new account
      </p>
    </div>
  );
};

export default LoginPage;
