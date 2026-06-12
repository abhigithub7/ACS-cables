import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide first name'],
      trim: true,
      maxlength: [50, 'First name cannot be more than 50 characters']
    },
    lastName: {
      type: String,
      required: [true, 'Please provide last name'],
      trim: true,
      maxlength: [50, 'Last name cannot be more than 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6,
      select: false
    },
    phone: {
      type: String,
      required: [true, 'Please provide phone number'],
      match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
    },
    address: {
      street: {
        type: String,
        required: [true, 'Please provide street address']
      },
      city: {
        type: String,
        required: [true, 'Please provide city']
      },
      state: {
        type: String,
        required: [true, 'Please provide state']
      },
      zipCode: {
        type: String,
        required: [true, 'Please provide zip code'],
        match: [/^[0-9]{6}$/, 'Please provide a valid 6-digit zip code']
      },
      country: {
        type: String,
        required: [true, 'Please provide country'],
        default: 'India'
      }
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getPublicData = function () {
  const { _id, firstName, lastName, email, phone, address, isActive, isAdmin, createdAt } = this.toObject()
  return { _id, firstName, lastName, email, phone, address, isActive, isAdmin, createdAt }
}

export default mongoose.model('User', userSchema)
