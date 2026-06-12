import Order from '../Model/Order.js'
import Product from '../Model/Product.js'
import Payment from '../Model/Payment.js'

export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body
    
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No order items' })
    }

    // Validate shipping address
    if (!shippingAddress || !shippingAddress.street || !shippingAddress.city || 
        !shippingAddress.state || !shippingAddress.zipCode) {
      return res.status(400).json({ success: false, message: 'Invalid shipping address' })
    }

    // Populate name/price for each item from DB to avoid trusting client prices
    const populatedItems = await Promise.all(items.map(async (it) => {
      const product = await Product.findById(it.product)
      if (!product) throw new Error('Product not found: ' + it.product)
      return { 
        product: product._id, 
        name: product.name, 
        price: product.price, 
        quantity: it.quantity 
      }
    }))

    const totalPrice = populatedItems.reduce((sum, it) => sum + it.price * it.quantity, 0)

    // Determine initial payment status based on payment method
    const paymentStatus = paymentMethod === 'cod' ? 'pending' : 'pending'
    const initialStatus = paymentMethod === 'cod' ? 'confirmed' : 'pending'

    const order = await Order.create({ 
      user: req.user.id, 
      items: populatedItems, 
      shippingAddress, 
      paymentMethod: paymentMethod || 'cod',
      paymentStatus,
      status: initialStatus,
      totalPrice 
    })

    // Populate for response
    const populatedOrder = await Order.findById(order._id)
      .populate('items.product')
      .populate('user', 'firstName lastName email')

    res.status(201).json({ success: true, order: populatedOrder })
  } catch (error) {
    console.error('Create Order Error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('items.product')
      .populate('user', 'firstName lastName email')
      .populate('payment')

    res.status(200).json({ success: true, count: orders.length, orders })
  } catch (error) {
    console.error('Get All Orders Error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' })
    }

    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' })
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }

    // Populate the updated order
    const populatedOrder = await Order.findById(order._id)
      .populate('items.product')
      .populate('user', 'firstName lastName email')
      .populate('payment')

    res.status(200).json({ success: true, order: populatedOrder })
  } catch (error) {
    console.error('Update Order Status Error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('items.product')
      .populate('payment')

    res.status(200).json({ success: true, count: orders.length, orders })
  } catch (error) {
    console.error('Get User Orders Error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product')
      .populate('user', 'firstName lastName email')
      .populate('payment')

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }

    // Ensure user owns order or is admin
    if (order.user._id.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' })
    }

    res.status(200).json({ success: true, order })
  } catch (error) {
    console.error('Get Order Error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' })
    }

    if (order.status === 'shipped' || order.status === 'delivered') {
      return res.status(400).json({ success: false, message: 'Cannot cancel shipped or delivered orders' })
    }

    // If payment was made, mark as refunded
    if (order.paymentStatus === 'completed' && order.payment) {
      await Payment.findByIdAndUpdate(order.payment, { status: 'refunded' })
      order.paymentStatus = 'refunded'
    }

    order.status = 'cancelled'
    await order.save()

    res.status(200).json({ success: true, message: 'Order cancelled successfully', order })
  } catch (error) {
    console.error('Cancel Order Error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}
