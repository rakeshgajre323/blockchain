// src/api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getHealth() {
  const res = await fetch(`${API_BASE_URL}/api/health`);
  if (!res.ok) throw new Error("API error");
  return res.json();
}
