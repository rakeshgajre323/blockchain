import express from "express";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(compression());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is working 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
