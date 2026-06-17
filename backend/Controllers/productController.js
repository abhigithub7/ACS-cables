import Product from '../Model/Product.js'

export const getProducts = async (req, res) => {
  try {
    const { search, category, maxPrice } = req.query
    const filter = {}
    if (category && category !== 'All') filter.category = category
    if (search) filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { fullDescription: { $regex: search, $options: 'i' } }
    ]
    if (maxPrice) filter.price = { $lte: Number(maxPrice) }

    const products = await Product.find(filter).sort({ createdAt: -1 })

    // Construct full image URLs using the backend origin
    const baseUrl = `${req.protocol}://${req.get('host')}`
    const productsWithFullUrls = products.map(product => {
      const productObj = product.toObject()
      if (productObj.images && productObj.images.length > 0) {
        productObj.images = productObj.images.map(img => {
          if (img && img.startsWith('/')) {
            return `${baseUrl}${img}`
          }
          return img
        })
      }
      return productObj
    })

    res.status(200).json({ success: true, count: productsWithFullUrls.length, products: productsWithFullUrls })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' })

    const productObj = product.toObject()
    const baseUrl = `${req.protocol}://${req.get('host')}`
    if (productObj.images && productObj.images.length > 0) {
      productObj.images = productObj.images.map(img => {
        if (img && img.startsWith('/')) {
          return `${baseUrl}${img}`
        }
        return img
      })
    }

    res.status(200).json({ success: true, product: productObj })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const createProduct = async (req, res) => {
  try {
    const productData = { ...req.body }

    // If files were uploaded, store relative paths (portable across environments)
    if (req.files && req.files.length > 0) {
      productData.images = req.files.map(file => `/uploads/${file.filename}`)
    }

    // Parse numeric fields
    if (productData.price) productData.price = parseFloat(productData.price)
    if (productData.stock) productData.stock = parseInt(productData.stock, 10)
    if (productData.featured === 'true' || productData.featured === true) {
      productData.featured = true
    } else {
      productData.featured = false
    }

    const product = await Product.create(productData)

    // Convert relative image paths to absolute URLs for the response
    const productObj = product.toObject()
    const baseUrl = `${req.protocol}://${req.get('host')}`
    if (productObj.images && productObj.images.length > 0) {
      productObj.images = productObj.images.map(img => {
        if (img && img.startsWith('/')) {
          return `${baseUrl}${img}`
        }
        return img
      })
    }

    res.status(201).json({ success: true, product: productObj })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const productData = { ...req.body }

    // If files were uploaded, store relative paths (portable across environments)
    if (req.files && req.files.length > 0) {
      productData.images = req.files.map(file => `/uploads/${file.filename}`)
    }

    // If existingImages provided (from FormData), merge them with new uploads
    if (req.body.existingImages) {
      let existingImages
      try {
        existingImages = JSON.parse(req.body.existingImages)
      } catch {
        existingImages = []
      }
      // Filter out nulls and combine with new uploads
      const filteredExisting = (existingImages || []).filter(img => img !== null)
      // Convert any full URLs back to relative paths
      const normalizedExisting = filteredExisting.map(img => {
        try {
          const url = new URL(img)
          return url.pathname
        } catch {
          return img
        }
      })
      if (req.files && req.files.length > 0) {
        productData.images = [...normalizedExisting, ...productData.images]
      } else {
        productData.images = normalizedExisting
      }
    }

    // Parse numeric fields
    if (productData.price) productData.price = parseFloat(productData.price)
    if (productData.stock) productData.stock = parseInt(productData.stock, 10)
    if (productData.featured === 'true' || productData.featured === true) {
      productData.featured = true
    } else {
      productData.featured = false
    }

    const product = await Product.findByIdAndUpdate(req.params.id, productData, { new: true, runValidators: true })
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' })

    // Convert relative image paths to absolute URLs for the response
    const productObj = product.toObject()
    const baseUrl = `${req.protocol}://${req.get('host')}`
    if (productObj.images && productObj.images.length > 0) {
      productObj.images = productObj.images.map(img => {
        if (img && img.startsWith('/')) {
          return `${baseUrl}${img}`
        }
        return img
      })
    }

    res.status(200).json({ success: true, product: productObj })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' })
    res.status(200).json({ success: true, message: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}