import express from 'express'
import { getAllUsers } from '../Controllers/userController.js'
import { protect, authorizeAdmin } from '../Middleware/auth.js'

const router = express.Router()

// Admin only - get all users
router.get('/', protect, authorizeAdmin, getAllUsers)

export default router
