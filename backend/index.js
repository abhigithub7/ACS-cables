import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import authRoutes from "./Routes/authRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import payment from "./Routes/payment.js";

import { connectDB } from "./Config/db.js";
import createAdmin from "./utils/createAdmin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// ---------------- MIDDLEWARE ----------------
app.use(
  cors({
    origin: true,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("📁 Created uploads directory");
}

// Serve uploaded files statically
app.use("/uploads", express.static(uploadsDir));

// ---------------- ROUTES ----------------
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/payments", payment);

// ---------------- HEALTH CHECK ----------------
app.get("/", (req, res) => {
  res.send("Ashish Computer Store Backend API is running 🚀");
});

// ---------------- 404 HANDLER ----------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ---------------- ERROR HANDLER ----------------
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ---------------- START SERVER ----------------
const startServer = async () => {
  try {
    console.log("🚀 Starting server...");

    console.log("🔌 Connecting to MongoDB...");
    await connectDB();
    console.log("✅ MongoDB connected");

    await createAdmin();
    console.log("✅ Admin setup completed");

    app.listen(port, () => {
      console.log(`🔥 Server running on port ${port}`);
    });

  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
};

startServer();

export default app;
