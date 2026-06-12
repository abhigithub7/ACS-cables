import jwt from 'jsonwebtoken'


// Generate JWT Token
const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'your_jwt_secret'
  return jwt.sign({ id }, secret, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  })
}



export default generateToken