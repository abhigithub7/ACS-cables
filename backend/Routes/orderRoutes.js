import express from 'express'
import { createOrder, getUserOrders, getOrderById, getAllOrders, updateOrderStatus } from '../Controllers/orderController.js'
import { protect, authorizeAdmin } from '../Middleware/auth.js'

const router = express.Router()

router.post('/', protect, createOrder)
router.get('/', protect, getUserOrders)
router.get('/admin', protect, authorizeAdmin, getAllOrders)
router.get('/:id', protect, getOrderById)
router.put('/:id/status', protect, authorizeAdmin, updateOrderStatus)

export default router
