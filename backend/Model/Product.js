import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    fullDescription: { type: String },
    price: { type: Number, required: true },
    category: { type: String, default: 'General' },
    imageUrl: { type: String },
    featured: { type: Boolean, default: false },
    stock: { type: Number, default: 0 }
  },
  { timestamps: true }
)

export default mongoose.model('Product', productSchema)
