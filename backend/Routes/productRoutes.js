import express from 'express'
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../Controllers/productController.js'
import { protect, authorizeAdmin } from '../Middleware/auth.js'

const router = express.Router()

// Public routes
router.get('/', getProducts)
router.get('/:id', getProductById)

// Admin routes - require admin authentication
router.post('/', protect, authorizeAdmin, createProduct)
router.put('/:id', protect, authorizeAdmin, updateProduct)
router.delete('/:id', protect, authorizeAdmin, deleteProduct)

export default router
