import User from '../Model/User.js'
import generateToken from '../Config/jwt/AuthToken.js'
import bcrypt from 'bcrypt'
import Admin from '../Model/Admin.js'
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, phone, address } = req.body

    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword || !phone || !address) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' })
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' })
    }

    // Validate address
    if (!address.street || !address.city || !address.state || !address.zipCode) {
      return res.status(400).json({ success: false, message: 'Please provide complete address' })
    }

    // Create user (password will be hashed in pre-save middleware)
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      address
    })

    // Generate token
    const token = generateToken({ id: user._id, role: 'user' })
    const userData = user.getPublicData()

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: userData
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error registering user'
    })
  }
}


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' })
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ success: false, message: 'Account is deactivated' })
    }

    // Check password
    const isPasswordCorrect = await user.matchPassword(password)

    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    // Generate token
    const token = generateToken({ id: user._id, role: user.isAdmin ? 'admin' : 'user' })
    const userData = user.getPublicData()

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: userData
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error logging in'
    })
  }
}

export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // ✅ Validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide username and password",
      });
    }

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken({
      id: admin._id,
      role: "admin",
    });

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user data'
    })
  }
}


export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, address } = req.body

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, phone, address },
      { new: true, runValidators: true }
    )

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating profile'
    })
  }
}

// @desc    Change Password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'Please provide all password fields' })
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'New passwords do not match' })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' })
    }

    const user = await User.findById(req.user.id).select('+password')

    const isPasswordCorrect = await user.matchPassword(currentPassword)

    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' })
    }

    user.password = newPassword
    await user.save()

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error changing password'
    })
  }
}

// @desc    Logout User
// @route   POST /api/auth/logout
// @access  Private
export const logoutUser = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  })
}
