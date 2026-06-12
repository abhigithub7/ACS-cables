import express from 'express'
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../Controllers/productController.js'
import { protect } from '../Middleware/auth.js'

const router = express.Router()

// Public routes
router.get('/', getProducts)
router.get('/:id', getProductById)

// Admin routes - require authentication
router.post('/', protect, createProduct)
router.put('/:id', protect, updateProduct)
router.delete('/:id', protect, deleteProduct)

export default router
