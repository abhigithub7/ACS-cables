import express from 'express'
import { createOrder, getUserOrders, getOrderById, getAllOrders, updateOrderStatus } from '../Controllers/orderController.js'
import { protect } from '../Middleware/auth.js'

const router = express.Router()

router.post('/', protect, createOrder)
router.get('/', protect, getUserOrders)
router.get('/admin', getAllOrders)
router.get('/:id', protect, getOrderById)
router.put('/:id/status', protect, updateOrderStatus)

export default router
