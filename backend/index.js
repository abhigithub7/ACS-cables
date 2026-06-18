import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

import authRoutes from "./Routes/authRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import payment from "./Routes/payment.js";

import { connectDB } from "./Config/db.js";
import createAdmin from "./utils/createAdmin.js";

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

// Cloudinary handles file storage — no local uploads dir needed

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

// ---------------- MULTER ERROR HANDLER ----------------
app.use((err, req, res, next) => {
  // Multer errors (file too large, wrong type, etc.)
  if (err instanceof multer.MulterError) {
    console.error('❌ Multer error:', err)
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB.',
      })
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum is 4 images.',
      })
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Unexpected file field.',
      })
    }
    return res.status(400).json({
      success: false,
      message: err.message,
    })
  }

  // Cloudinary/multer-storage-cloudinary errors
  if (err.message && err.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      message: err.message,
    })
  }

  // Pass to next error handler
  next(err)
})

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
