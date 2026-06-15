import express from 'express'
import {
  registerUser,
  loginUser,
  adminLogin,
  getMe,
  updateProfile,
  changePassword,
  logoutUser
} from '../Controllers/authController.js'
import { authorizeAdmin, protect } from '../Middleware/auth.js'

const router = express.Router()

// Public routes
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get(
  "/verify-admin",
  protect,
  authorizeAdmin
);
router.post('/logout', logoutUser)

// Private routes
router.get('/me', protect, getMe)
router.put('/update-profile', protect, updateProfile)
router.put('/change-password', protect, changePassword)

export default router
