import express from 'express'
import { protect } from '../Middleware/auth.js'
import {
  createRazorpayOrder,
  verifyPaymentSignature,
  getPaymentDetails,
  getPaymentByOrderId
} from '../Controllers/paymentController.js'

const router = express.Router()

// Create Razorpay order (requires authentication)
router.post('/create-order', protect, createRazorpayOrder)

// Verify payment signature (requires authentication)
router.post('/verify-signature', protect, verifyPaymentSignature)

// Get payment details (requires authentication)
router.get('/:paymentId', protect, getPaymentDetails)

// Get payment by order ID (requires authentication)
router.get('/order/:orderId', protect, getPaymentByOrderId)

export default router
