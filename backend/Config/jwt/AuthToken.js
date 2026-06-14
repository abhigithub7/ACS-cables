import jwt from 'jsonwebtoken'


// Generate JWT Token
const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET || 'your_jwt_secret'
  const tokenPayload = typeof payload === 'object' && payload !== null
    ? payload
    : { id: payload }

  return jwt.sign(tokenPayload, secret, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  })
}



export default generateToken
