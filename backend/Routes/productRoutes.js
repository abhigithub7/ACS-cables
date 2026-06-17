import express from 'express'
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../Controllers/productController.js'
import { protect, authorizeAdmin } from '../Middleware/auth.js'
import upload from '../utils/upload.js'

const router = express.Router()

// Public routes
router.get('/', getProducts)
router.get('/:id', getProductById)

// Admin routes - require admin authentication
// Multer handles up to 4 image files with field name "images"
router.post('/', protect, authorizeAdmin, upload.array('images', 4), createProduct)
router.put('/:id', protect, authorizeAdmin, upload.array('images', 4), updateProduct)
router.delete('/:id', protect, authorizeAdmin, deleteProduct)

export default router
