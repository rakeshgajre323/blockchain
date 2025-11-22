import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api";

const handleSubmit = async () => {
  const data = await signupUser({ ...formData, role });
  if (data.success) navigate("/login");
  else alert(data.message);
};


const SignupPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, role }),
    });

    const data = await res.json();
    if (data.success) navigate("/login");
    else alert(data.message);
  };

  return (
    <div className="container-box mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Create Account</h2>

      {/* ROLE SELECT */}
      <select className="input-field" onChange={(e) => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="institute">Institute</option>
        <option value="company">Company</option>
      </select>

      {/* COMMON FIELDS */}
      <input className="input-field" name="name" placeholder="Name" onChange={handleChange} />
      <input className="input-field" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" className="input-field" name="password" placeholder="Password" onChange={handleChange} />

      {/* ROLE SPECIFIC */}
      {role === "student" && (
        <>
          <input className="input-field" name="apparId" placeholder="APPAR ID" onChange={handleChange} />
          <input className="input-field" name="dob" type="date" placeholder="Date of Birth" onChange={handleChange} />
          <input className="input-field" name="phone" placeholder="Phone Number" onChange={handleChange} />
        </>
      )}

      {role === "institute" && (
        <input className="input-field" name="recognitionNumber" placeholder="Recognition Number" onChange={handleChange} />
      )}

      <button className="btn-primary w-full mt-3" onClick={handleSubmit}>
        Register
      </button>

      <p className="text-center mt-3 text-sm underline cursor-pointer" onClick={() => navigate("/login")}>
        Already have an account? Login
      </p>
    </div>
  );
};

export default SignupPage;
