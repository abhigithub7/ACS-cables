import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectDB } from '../Config/db.js'
import Product from '../Model/Product.js'

dotenv.config()

const sampleProducts = [
  {
    name: 'Mechanical Gaming Keyboard',
    category: 'Keyboards',
    description: 'RGB backlit mechanical keyboard with blue switches',
    fullDescription: 'A durable mechanical keyboard with premium switches, customizable RGB lighting, and programmable macro keys for gamers and typists.',
    price: 89.99,
    imageUrl: '',
    featured: true,
    stock: 50
  },
  {
    name: 'Wireless Optical Mouse',
    category: 'Mice',
    description: 'Ergonomic wireless mouse with 1000 DPI',
    fullDescription: 'Compact wireless mouse with smooth optical tracking, long battery life, and comfortable shape for all-day use.',
    price: 29.99,
    imageUrl: '',
    featured: true,
    stock: 100
  }
]

const seed = async () => {
  try {
    await connectDB()
    await Product.deleteMany({})
    await Product.insertMany(sampleProducts)
    console.log('Seeded products')
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

seed()
