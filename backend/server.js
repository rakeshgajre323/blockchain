import express from "express";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// PORT FIX FOR RENDER
const PORT = process.env.PORT || 5000;

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(compression());

// Correct path for React build (Render expects this)
const buildPath = path.join(__dirname, "../build");

// Serve static files
app.use(express.static(buildPath));

// Example backend API route
app.get("/api", (req, res) => {
  res.json({ message: "Backend API working successfully!" });
});

// Catch-all route for SPA (React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Render requires binding to 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
