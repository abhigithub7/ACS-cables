import React, { useEffect, useState } from 'react'

const ProductPage = ({ products, categories, onAddProduct, onUpdateProduct, onDeleteProduct }) => {
  const [formState, setFormState] = useState({
    imageUrl: '',
    name: '',
    description: '',
    price: '',
    stock: '',
    category: categories[0] ?? '',
    featured: false,
  })
  const [editingProductId, setEditingProductId] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (products.length === 0) {
      setFormState((prev) => ({ ...prev, category: categories[0] ?? '' }))
    }
  }, [categories, products.length])

  const resetForm = () => {
    setFormState({
      imageUrl: '',
      name: '',
      description: '',
      price: '',
      stock: '',
      category: categories[0] ?? '',
      featured: false,
    })
    setEditingProductId(null)
    setMessage('')
  }

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const name = formState.name.trim()
    const description = formState.description.trim()
    const imageUrl = formState.imageUrl.trim()
    const price = parseFloat(formState.price)
    const stock = parseInt(formState.stock, 10)

    if (!name || !description || !imageUrl || Number.isNaN(price) || Number.isNaN(stock) || !formState.category) {
      setMessage('Please fill in all fields with valid values.')
      return
    }

    const productPayload = {
      name,
      description,
      imageUrl,
      price,
      stock,
      category: formState.category,
      featured: !!formState.featured,
    }

    if (editingProductId) {
      onUpdateProduct({ ...productPayload, _id: editingProductId })
      setMessage('Product updated successfully.')
    } else {
      onAddProduct(productPayload)
      setMessage('Product added successfully.')
    }

    resetForm()
  }

  const handleEdit = (product) => {
    const productId = product._id || product.id
    setEditingProductId(productId)
    setFormState({
      imageUrl: product.imageUrl || '',
      name: product.name,
      description: product.description,
      price: (product.price ?? '').toString(),
      stock: (product.stock ?? '').toString(),
      category: product.category,
      featured: !!product.featured,
    })
    setMessage('Editing product. Update the fields then submit to save.')
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
            <div className="grid gap-4 lg:grid-cols-2">
              <label className="block">
                <span className="text-sm text-slate-500">Image URL</span>
                <input
                  type="url"
                  value={formState.imageUrl}
                  onChange={(event) => handleChange('imageUrl', event.target.value)}
                  placeholder="https://..."
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </label>
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
                  type="number"
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
              className="inline-flex items-center justify-center rounded-3xl bg-sky-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-sky-500"
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
                <img src={product.imageUrl} alt={product.name} className="h-24 w-full rounded-3xl object-cover md:h-24 md:w-24" />
                <div>
                  <p className="font-semibold text-slate-900">{product.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{product.description}</p>
                  <p className="mt-3 text-sm text-slate-500">Category: <span className="text-slate-900">{product.category}</span></p>
                  <p className="mt-1 text-sm text-slate-500">Price: <span className="text-slate-900">${product.price.toFixed(2)}</span></p>
                  <p className="mt-1 text-sm text-slate-500">Stock: <span className="text-slate-900">{product.stock}</span></p>
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
