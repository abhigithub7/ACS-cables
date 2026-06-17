import React, { useEffect, useState } from 'react'

const ProductPage = ({ products, categories, onAddProduct, onUpdateProduct, onDeleteProduct }) => {
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: categories[0] ?? '',
    featured: false,
  })
  const [imageFiles, setImageFiles] = useState([null, null, null, null])
  const [imagePreviews, setImagePreviews] = useState([null, null, null, null])
  const [existingImages, setExistingImages] = useState([])
  const [editingProductId, setEditingProductId] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (products.length === 0) {
      setFormState((prev) => ({ ...prev, category: categories[0] ?? '' }))
    }
  }, [categories, products.length])

  const resetForm = () => {
    setFormState({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: categories[0] ?? '',
      featured: false,
    })
    setImageFiles([null, null, null, null])
    setImagePreviews([null, null, null, null])
    setExistingImages([])
    setEditingProductId(null)
    setMessage('')
  }

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageChange = (index, file) => {
    const newFiles = [...imageFiles]
    const newPreviews = [...imagePreviews]
    newFiles[index] = file
    if (file) {
      newPreviews[index] = URL.createObjectURL(file)
    } else {
      newPreviews[index] = null
    }
    setImageFiles(newFiles)
    setImagePreviews(newPreviews)
  }

  const removeImage = (index) => {
    handleImageChange(index, null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const name = formState.name.trim()
    const description = formState.description.trim()
    const price = parseFloat(formState.price)
    const stock = parseInt(formState.stock, 10)

    if (!name || !description || Number.isNaN(price) || Number.isNaN(stock) || !formState.category) {
      setMessage('Please fill in all required fields with valid values.')
      return
    }

    // Check if editing: no new files selected AND no existing images
    if (editingProductId && existingImages.length === 0 && !imageFiles.some(f => f !== null)) {
      setMessage('Please upload at least one product image.')
      return
    }

    // Check if creating: need at least one image
    if (!editingProductId && !imageFiles.some(f => f !== null)) {
      setMessage('Please upload at least one product image.')
      return
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('stock', stock)
    formData.append('category', formState.category)
    formData.append('featured', formState.featured)

    // Append new image files
    imageFiles.forEach((file) => {
      if (file) {
        formData.append('images', file)
      }
    })

    // For editing, also send existing images as JSON string
    if (editingProductId && existingImages.length > 0) {
      formData.append('existingImages', JSON.stringify(existingImages))
    }

    if (editingProductId) {
      onUpdateProduct(formData, editingProductId)
      setMessage('Product updated successfully.')
    } else {
      onAddProduct(formData)
      setMessage('Product added successfully.')
    }

    resetForm()
  }

  const handleEdit = (product) => {
    const productId = product._id || product.id
    setEditingProductId(productId)
    setFormState({
      name: product.name,
      description: product.description,
      price: (product.price ?? '').toString(),
      stock: (product.stock ?? '').toString(),
      category: product.category,
      featured: !!product.featured,
    })
    // Show existing images as previews
    const existingImgs = product.images || []
    setExistingImages(existingImgs)
    setImageFiles([null, null, null, null])
    setImagePreviews([null, null, null, null])
    setMessage('Editing product. Upload new images to replace or keep existing ones.')
  }

  const getImagePreview = (index) => {
    // Show newly selected file preview first
    if (imagePreviews[index]) return imagePreviews[index]
    // Then show existing image if editing
    if (editingProductId && existingImages[index]) return existingImages[index]
    return null
  }

  return (
    <div className="space-y-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Product Management</h2>
          <p className="mt-1 text-sm text-slate-500">Create, edit, delete and feature products with rich details.</p>
        </div>
        <button
          type="button"
          onClick={resetForm}
          className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
        >
          New Product
        </button>
      </div>

      {message && <div className="rounded-3xl border border-slate-200 bg-slate-100 p-4 text-sm text-slate-700">{message}</div>}

      <div className="grid gap-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Add / Edit Product</h3>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Image Uploads - 4 Images */}
            <div>
              <span className="text-sm text-slate-500">Product Images (Upload up to 4)</span>
              <div className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-4">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="relative">
                    {getImagePreview(index) ? (
                      <div className="relative h-32 w-full overflow-hidden rounded-2xl border border-slate-200">
                        <img
                          src={getImagePreview(index)}
                          alt={`Product ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            removeImage(index)
                            // If it was an existing image, remove from existingImages too
                            if (editingProductId && existingImages[index]) {
                              const newExisting = [...existingImages]
                              newExisting[index] = null
                              setExistingImages(newExisting)
                            }
                          }}
                          className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 hover:border-sky-500 hover:bg-sky-50">
                        <svg className="mb-2 h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338-2.219 3.75 3.75 0 013.822 4.214A4.001 4.001 0 0117.25 19.5H6.75z" />
                        </svg>
                        <span className="text-xs text-slate-500">Image {index + 1}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files[0]) handleImageChange(index, e.target.files[0])
                          }}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <label className="block">
                <span className="text-sm text-slate-500">Product Name</span>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(event) => handleChange('name', event.target.value)}
                  placeholder="Gaming Laptop"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm text-slate-500">Description</span>
              <textarea
                value={formState.description}
                onChange={(event) => handleChange('description', event.target.value)}
                placeholder="Add a short description for the product"
                rows="4"
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </label>

            <div className="grid gap-4 lg:grid-cols-3">
              <label className="block">
                <span className="text-sm text-slate-500">Price</span>
                <input
                  type="text"
                  min="0"
                  step="0.01"
                  value={formState.price}
                  onChange={(event) => handleChange('price', event.target.value)}
                  placeholder="299.99"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </label>
              <label className="block">
                <span className="text-sm text-slate-500">Stock</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={formState.stock}
                  onChange={(event) => handleChange('stock', event.target.value)}
                  placeholder="25"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </label>
              <label className="block">
                <span className="text-sm text-slate-500">Category</span>
                <select
                  value={formState.category}
                  onChange={(event) => handleChange('category', event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="inline-flex items-center gap-3 text-sm text-slate-500">
              <input
                type="checkbox"
                checked={formState.featured}
                onChange={(event) => handleChange('featured', event.target.checked)}
                className="h-5 w-5 rounded border-slate-300 bg-slate-50 text-sky-500 focus:ring-sky-500"
              />
              Mark as featured
            </label>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-3xl md:ml-4 ml-1 bg-purple-950 px-6 py-4 text-base font-semibold text-white transition hover:bg-sky-500"
            >
              {editingProductId ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Product Catalog</h3>
              <p className="mt-1 text-sm text-slate-500">Inventory list with edit and delete actions.</p>
            </div>
            <span className="rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-600">{products.length} items</span>
          </div>

          <div className="space-y-4">
            {products.map((product) => (
              <div key={product._id || product.id} className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[96px_1fr_auto]">
                <img
                  src={product.images?.[0] || product.imageUrl || 'https://via.placeholder.com/96?text=No+Image'}
                  alt={product.name}
                  className="h-24 w-full rounded-3xl object-cover md:h-24 md:w-24"
                />
                <div>
                  <p className="font-semibold text-slate-900">{product.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{product.description}</p>
                  <p className="mt-3 text-sm text-slate-500">Category: <span className="text-slate-900">{product.category}</span></p>
                  <p className="mt-1 text-sm text-slate-500">Price: <span className="text-slate-900">₹{product.price?.toFixed(2)}</span></p>
                  <p className="mt-1 text-sm text-slate-500">Stock: <span className="text-slate-900">{product.stock}</span></p>
                  {product.images && product.images.length > 0 && (
                    <p className="mt-1 text-xs text-slate-400">{product.images.length} image(s)</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(product)}
                    className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteProduct(product._id || product.id)}
                    className="rounded-2xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400"
                  >
                    Delete
                  </button>
                  {product.featured && (
                    <span className="mt-2 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-700">
                      Featured
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProductPage