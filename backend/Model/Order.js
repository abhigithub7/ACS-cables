import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  price: Number,
  quantity: { type: Number, default: 1 }
})

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    paymentMethod: { type: String, enum: ['razorpay', 'cod', 'upi'], default: 'cod' },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', sparse: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    notes: String
  },
  { timestamps: true }
)

export default mongoose.model('Order', orderSchema)
