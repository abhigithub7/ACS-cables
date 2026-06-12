import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './Routes/authRoutes.js'
import productRoutes from './Routes/productRoutes.js'
import orderRoutes from './Routes/orderRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import { connectDB } from './Config/db.js'
import payment from './Routes/payment.js'

// Load environment variables
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))




// Connect to database
connectDB()


// Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/orders', orderRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/payments',payment)

// Health check route
app.get('/', (req, res) => {
  res.send('Ashish Computer Store Backend API is running')
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  })
})

app.listen(port, () => {
  console.log(`🚀 Backend Server is running on port ${port}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})
