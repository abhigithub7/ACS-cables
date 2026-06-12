import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    razorpay_order_id: {
      type: String,
      required: true,
      unique: true
    },
    razorpay_payment_id: {
      type: String,
      sparse: true
    },
    razorpay_signature: {
      type: String,
      sparse: true
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: "INR"
    },
    status: {
      type: String,
      enum: ["created", "captured", "failed", "refunded"],
      default: "created"
    },
    method: {
      type: String,
      enum: ["razorpay", "cod", "upi"],
      default: "razorpay"
    },
    error: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);