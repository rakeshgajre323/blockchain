// backend/server.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// --- Serve frontend build files ---
const buildPath = path.join(__dirname, "../build");
app.use(express.static(buildPath));

// Example API route (for your backend endpoints)
app.get("/api", (req, res) => {
  res.json({ message: "✅ API working fine" });
});

// Catch-all route for React (handles client-side routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
