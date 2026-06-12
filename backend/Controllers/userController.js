import User from '../Model/User.js'

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).select('-password')
    res.status(200).json({ success: true, count: users.length, users })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
