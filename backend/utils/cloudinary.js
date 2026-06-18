import { v2 as cloudinary } from 'cloudinary'

const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

if (!cloudName || !apiKey || !apiSecret) {
  console.error('❌ Cloudinary configuration is incomplete!')
  console.error(`  CLOUDINARY_CLOUD_NAME: ${cloudName ? '✓' : '✗'}`)
  console.error(`  CLOUDINARY_API_KEY: ${apiKey ? '✓' : '✗'}`)
  console.error(`  CLOUDINARY_API_SECRET: ${apiSecret ? '✓' : '✗'}`)
} else {
  console.log('✅ Cloudinary configured successfully')
  console.log(`   Cloud Name: ${cloudName}`)
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
})

export default cloudinary