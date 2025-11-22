// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

// --------- MIDDLEWARE ----------
app.use(cors());
app.use(express.json());

// --------- DB CONNECTION ----------
mongoose
  .connect(process.env.MONGO_URI, { })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// --------- USER MODEL ----------
const certificateSchema = new mongoose.Schema({
  title: String,
  issuedBy: String,
  issueDate: String, // "YYYY-MM-DD"
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["student", "institute", "company"], required: true },

  // student fields
  apparId: { type: String },
  dob: { type: String },   // store "YYYY-MM-DD"
  phone: { type: String },
  certificates: [certificateSchema],

  // institute fields
  recognitionNumber: { type: String },

  // company fields
  companyName: { type: String },
});

const User = mongoose.model("User", userSchema);

// --------- AUTH MIDDLEWARE ----------
const auth = (roles = []) => {
  // roles can be string or array
  if (typeof roles === "string") roles = [roles];

  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ success: false, message: "No token" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Invalid token format" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // { id, role }
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ success: false, message: "Forbidden" });
      }
      next();
    } catch (err) {
      return res.status(401).json({ success: false, message: "Token invalid" });
    }
  };
};

// --------- HEALTH CHECK ----------
app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is working 🚀" });
});

// --------- AUTH ROUTES ----------

// SIGNUP
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password, role, apparId, dob, phone, recognitionNumber, companyName } = req.body;

    if (!name || !email || !password || !role) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email,
      passwordHash,
      role,
    };

    if (role === "student") {
      userData.apparId = apparId;
      userData.dob = dob;
      userData.phone = phone;
      userData.certificates = [];
    }

    if (role === "institute") {
      userData.recognitionNumber = recognitionNumber;
    }

    if (role === "company") {
      userData.companyName = companyName || name;
    }

    const user = new User(userData);
    await user.save();

    res.json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Server error during signup" });
  }
});

// LOGIN
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
});

// --------- STUDENT ROUTES ----------

// Get student's certificates
app.get("/api/student/certificates", auth("student"), async (req, res) => {
  try {
    const student = await User.findById(req.user.id);
    if (!student) return res.json({ success: false, message: "Student not found" });

    res.json({
      success: true,
      certificates: student.certificates || [],
    });
  } catch (err) {
    console.error("Student cert error:", err);
    res.status(500).json({ success: false, message: "Error fetching certificates" });
  }
});

// --------- INSTITUTE ROUTES ----------

// Issue certificate to student
app.post("/api/institute/issue", auth("institute"), async (req, res) => {
  try {
    const { studentApparId, certificate } = req.body;

    if (!studentApparId || !certificate) {
      return res.json({ success: false, message: "Missing data" });
    }

    const institute = await User.findById(req.user.id);
    if (!institute) return res.json({ success: false, message: "Institute not found" });

    const student = await User.findOne({ apparId: studentApparId, role: "student" });
    if (!student) {
      return res.json({ success: false, message: "Student with this APPAR ID not found" });
    }

    const certObj = {
      title: certificate,
      issuedBy: institute.name,
      issueDate: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    };

    student.certificates.push(certObj);
    await student.save();

    res.json({ success: true, message: "Certificate issued successfully" });
  } catch (err) {
    console.error("Issue cert error:", err);
    res.status(500).json({ success: false, message: "Error issuing certificate" });
  }
});

// --------- COMPANY ROUTES ----------

// Verify student by APPAR ID
app.get("/api/company/check/:apparId", auth("company"), async (req, res) => {
  try {
    const { apparId } = req.params;

    const student = await User.findOne({ apparId, role: "student" });
    if (!student) {
      return res.json({ success: false, message: "Student not found" });
    }

    res.json({
      success: true,
      name: student.name,
      apparId: student.apparId,
      certificates: student.certificates || [],
    });
  } catch (err) {
    console.error("Company check error:", err);
    res.status(500).json({ success: false, message: "Error fetching student" });
  }
});

// --------- START SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
