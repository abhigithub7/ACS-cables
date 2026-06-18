import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from './cloudinary.js'

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'a-computers/products',
    allowed_formats: ['jpeg', 'jpg', 'png', 'gif', 'webp', 'svg'],
    transformation: [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto' }],
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
})

export default upload