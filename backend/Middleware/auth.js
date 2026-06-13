import jwt from 'jsonwebtoken'

// Protect routes - verify JWT token
export const protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  // Make sure token exists
  if (!token) {
    const adminUsername = process.env.ADMIN_USERNAME
    const adminPassword = process.env.ADMIN_PASSWORD
    const username = req.headers['x-admin-username']
    const password = req.headers['x-admin-password']

    if (username && password && username === adminUsername && password === adminPassword) {
      req.user = { id: 'admin', isAdmin: true }
      return next()
    }

    return res.status(401).json({ success: false, message: 'Not authorized to access this route' })
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { id: decoded.id }
    next()
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' })
  }
}

// Optional auth - doesn't block if no token
export const optionalAuth = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = { id: decoded.id }
    } catch (error) {
      console.log('Invalid token in optional auth')
    }
  }

  next()
}
