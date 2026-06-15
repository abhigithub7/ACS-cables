import jwt from 'jsonwebtoken'
import Admin from '../Model/Admin.js'
const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}

// Protect Routes
export const protect = async (req, res, next) => {
  try {
    const token = extractToken(req)

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized. No token provided.'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = {
      id: decoded.id,
      role: decoded.role
    }

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    })
  }
}

// Admin Authorization
export const authorizeAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      })
    }

    // Admin exists in DB?
    const admin = await Admin.findById(req.user.id).select('_id role')

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin account not found'
      })
    }

    if (admin.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      })
    }

    req.admin = admin
    next()
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Authorization error'
    })
  }
}

// Optional Auth
export const optionalAuth = async (req, res, next) => {
  try {
    const token = extractToken(req)

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = {
        id: decoded.id,
        role: decoded.role
      }
    }
  } catch (error) {
    console.log('Optional auth: invalid token')
  }

  next()
}