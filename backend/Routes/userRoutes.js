import express from 'express'
import { getAllUsers } from '../Controllers/userController.js'
import { protect } from '../Middleware/auth.js'

const router = express.Router()

// Admin only - get all users (requires authentication for now)
router.get('/', protect, getAllUsers)

export default router
