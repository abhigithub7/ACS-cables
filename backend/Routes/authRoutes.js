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
router.post('/admin',adminLogin)
router.get(
  '/verify-admin',
  protect,
  authorizeAdmin,
  (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Admin verified'
    })
  }
)

router.post('/logout', logoutUser)

// Private routes
router.get('/me', protect, getMe)
router.put('/update-profile', protect, updateProfile)
router.put('/change-password', protect, changePassword)

export default router
