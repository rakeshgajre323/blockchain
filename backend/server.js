// backend/server.js
import express from "express";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(compression());

// Simple test route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is working 🚀" });
});

// Use PORT from Render or default to 10000
const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
