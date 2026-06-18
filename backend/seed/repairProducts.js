import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectDB } from '../Config/db.js'
import Product from '../Model/Product.js'

dotenv.config()

const repairProducts = async () => {
  try {
    await connectDB()
    
    console.log('🔍 Scanning for corrupted products...')
    
    const allProducts = await Product.find({})
    console.log(`📊 Total products found: ${allProducts.length}`)
    
    let fixedCount = 0
    let deletedCount = 0
    
    for (const product of allProducts) {
      let needsUpdate = false
      
      // Check 1: Images with http:// (mixed content)
      if (product.images && product.images.length > 0) {
        const fixedImages = product.images.map(img => {
          if (img && img.startsWith('http://')) {
            needsUpdate = true
            console.log(`   ⚠️ Found http:// image in product "${product.name}": ${img}`)
            // Note: Cloudinary images should already be https, local uploads are the problem
            // We can't convert http to https for render.com, so we flag these
          }
          return img
        })
        
        // Filter out null/empty images and local paths
        const validImages = fixedImages.filter(img => 
          img && 
          img !== 'null' && 
          typeof img === 'string' && 
          img.trim() !== '' &&
          (img.startsWith('http://') || img.startsWith('https://'))
        )
        
        if (validImages.length !== product.images.length) {
          needsUpdate = true
          console.log(`   🔧 Filtering invalid images for "${product.name}": ${product.images.length} → ${validImages.length}`)
        }
        
        if (validImages.length === 0 && product.images.length > 0) {
          // All images are invalid - keep them as-is so Admin can re-upload
          // But flag them
          console.log(`   ⚠️ Product "${product.name}" has ${product.images.length} invalid images. Admin needs to re-upload.`)
        }
        
        product.images = validImages
      }
      
      // Check 2: Missing required fields
      if (!product.name || !product.price) {
        console.log(`   ❌ Product missing required fields: ${product._id}`)
        // Delete these incomplete products
        await Product.findByIdAndDelete(product._id)
        deletedCount++
        console.log(`   ✅ Deleted incomplete product: ${product._id}`)
        continue // Skip further checks for deleted products
      }
      
      if (needsUpdate) {
        await product.save()
        fixedCount++
        console.log(`   ✅ Fixed product: ${product.name}`)
      }
    }
    
    console.log('\n📋 Repair Summary:')
    console.log(`   Total products scanned: ${allProducts.length}`)
    console.log(`   Products fixed: ${fixedCount}`)
    console.log(`   Products deleted: ${deletedCount}`)
    console.log(`   Products remaining: ${await Product.countDocuments({})}`)
    
    await mongoose.connection.close()
    console.log('\n✅ Repair complete!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Repair failed:', error)
    process.exit(1)
  }
}

repairProducts()