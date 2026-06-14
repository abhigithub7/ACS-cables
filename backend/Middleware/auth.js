import jwt from 'jsonwebtoken'

const extractToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}

export const protect = async (req, res, next) => {
  const token = extractToken(req)

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = {
      id: decoded.id,
      role: decoded.role || 'user'
    }
    next()
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' })
  }
}

export const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' })
  }
  next()
}

// Optional auth - doesn't block if no token
export const optionalAuth = async (req, res, next) => {
  const token = extractToken(req)

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = {
        id: decoded.id,
        role: decoded.role || 'user'
      }
    } catch (error) {
      console.log('Invalid token in optional auth')
    }
  }

  next()
}
