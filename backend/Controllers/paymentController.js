import Razorpay from 'razorpay'
import crypto from 'crypto'
import Payment from '../Model/Payment.js'
import Order from '../Model/Order.js'

let razorpayInstance = null

const getRazorpayConfig = () => ({
  keyId: process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_API_KEY,
  keySecret: process.env.RAZORPAY_SECRET || process.env.RAZORPAY_SECRET_API_KEY
})

// Initialize Razorpay only if keys are configured
const initializeRazorpay = () => {
  if (razorpayInstance) return razorpayInstance
  
  const { keyId, keySecret } = getRazorpayConfig()

  if (!keyId || !keySecret) {
    return null
  }

  try {
    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    })
    return razorpayInstance
  } catch (error) {
    console.error('Failed to initialize Razorpay:', error.message)
    return null
  }
}

/**
 * Create Razorpay Order
 * POST /api/v1/payments/create-order
 */
export const createRazorpayOrder = async (req, res) => {
  try {
    const razorpay = initializeRazorpay()
    if (!razorpay) {
      return res.status(500).json({
        success: false,
        message: 'Payment service not configured. Please contact support.'
      })
    }

    const { amount, orderId } = req.body

    if (!amount || !orderId) {
      return res.status(400).json({
        success: false,
        message: 'Amount and orderId are required'
      })
    }

    // Validate order exists and belongs to user
    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      })
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to pay for this order'
      })
    }

    // Create Razorpay order
    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      receipt: orderId.toString(),
      notes: {
        orderId: orderId,
        userId: req.user.id
      }
    }

    razorpay.orders.create(options, async (err, razorpayOrder) => {
      if (err) {
        console.error('Razorpay Order Creation Error:', err)
        return res.status(500).json({
          success: false,
          message: 'Failed to create Razorpay order',
          error: err.message
        })
      }

      try {
        // Save payment record
        const payment = await Payment.create({
          order: orderId,
          user: req.user.id,
          razorpay_order_id: razorpayOrder.id,
          amount: amount,
          currency: 'INR',
          status: 'created',
          method: 'razorpay'
        })

        // Update order with payment reference
        await Order.findByIdAndUpdate(orderId, {
          payment: payment._id
        })

        res.status(200).json({
          success: true,
          data: {
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            paymentId: payment._id
          }
        })
      } catch (dbErr) {
        console.error('Database Error:', dbErr)
        res.status(500).json({
          success: false,
          message: 'Failed to save payment record',
          error: dbErr.message
        })
      }
    })
  } catch (error) {
    console.error('Create Order Error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order',
      error: error.message
    })
  }
}

/**
 * Verify Payment Signature
 * POST /api/v1/payments/verify-signature
 */
export const verifyPaymentSignature = async (req, res) => {
  try {
    const { keySecret } = getRazorpayConfig()

    if (!keySecret) {
      return res.status(500).json({
        success: false,
        message: 'Payment service not configured. Please contact support.'
      })
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId
    } = req.body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment details'
      })
    }

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(sign)
      .digest('hex')

    const isSignatureValid = expectedSignature === razorpay_signature

    if (!isSignatureValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      })
    }

    // Update payment record
    const payment = await Payment.findOne({ razorpay_order_id })

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment record not found'
      })
    }

    // Verify payment belongs to user
    if (payment.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      })
    }

    // Update payment status
    payment.razorpay_payment_id = razorpay_payment_id
    payment.razorpay_signature = razorpay_signature
    payment.status = 'captured'
    await payment.save()

    // Update order status
    const order = await Order.findByIdAndUpdate(
      payment.order,
      {
        paymentStatus: 'completed',
        status: 'confirmed'
      },
      { new: true }
    ).populate('items.product')
     .populate('user', 'firstName lastName email')

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        payment: {
          id: payment._id,
          status: payment.status
        },
        order: order
      }
    })
  } catch (error) {
    console.error('Verify Signature Error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to verify payment',
      error: error.message
    })
  }
}

/**
 * Get Payment Details
 * GET /api/v1/payments/:paymentId
 */
export const getPaymentDetails = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.paymentId)
      .populate('order')
      .populate('user', 'firstName lastName email')

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      })
    }

    if (payment.user._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      })
    }

    res.status(200).json({
      success: true,
      data: payment
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment details',
      error: error.message
    })
  }
}

/**
 * Get Payment by Order ID
 * GET /api/v1/payments/order/:orderId
 */
export const getPaymentByOrderId = async (req, res) => {
  try {
    const payment = await Payment.findOne({ order: req.params.orderId })
      .populate('order')
      .populate('user', 'firstName lastName email')

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found for this order'
      })
    }

    if (payment.user._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      })
    }

    res.status(200).json({
      success: true,
      data: payment
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment',
      error: error.message
    })
  }
}
