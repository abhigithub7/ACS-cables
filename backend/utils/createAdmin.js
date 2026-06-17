import Admin from "../Model/Admin.js";
import mongoose from "mongoose";
const createAdmin = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error("MongoDB not connected yet");
    }

    const existingAdmin = await Admin.findOne({
      username: process.env.ADMIN_USERNAME,
    });

    if (!existingAdmin) {
      await Admin.create({
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
      });

      console.log("✅ Admin created");
    } else {
      console.log("ℹ️ Admin already exists");
    }
  } catch (err) {
    console.log("createAdmin error:", err);
  }
};

export default createAdmin;