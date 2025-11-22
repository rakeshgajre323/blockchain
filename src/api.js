// src/api.js

const API_BASE = "http://localhost:5000/api"; 
// 🚀 When deploying on Render, change to: https://yourappname.onrender.com/api

// Health check
export const getHealth = async () => {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
};

// Signup API
export const signupUser = async (formData) => {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return res.json();
};

// Login API
export const loginUser = async (email, password) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

// Get student certificates
export const getCertificates = async (token) => {
  const res = await fetch(`${API_BASE}/student/certificates`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

// Issue certificate (Institute)
export const issueCertificate = async (data, token) => {
  const res = await fetch(`${API_BASE}/institute/issue`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Company verify student
export const verifyStudent = async (apparId, token) => {
  const res = await fetch(`${API_BASE}/company/check/${apparId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
