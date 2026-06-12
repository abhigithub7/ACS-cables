import React, { useState } from 'react'

const ProductCatalog = ({ products = [], onDeleteProduct, onUpdateProduct }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [editingId, setEditingId] = useState(null)
  const [editValues, setEditValues] = useState({})

  const filteredProducts = products
    .filter(
      (product) =>
        (product.name || '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (product.category || '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '')
      if (sortBy === 'price') return (a.price || 0) - (b.price || 0)
      if (sortBy === 'stock') return (a.stock || 0) - (b.stock || 0)
      return 0
    })

  const handleEditClick = (product) => {
    setEditingId(product._id || product.id)
    setEditValues({ ...product })
  }

  const handleSave = () => {
    if (onUpdateProduct) {
      onUpdateProduct(editValues)
      setEditingId(null)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditValues({})
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Product Catalog</h2>
          <p className="mt-1 text-sm text-slate-600">Manage your product inventory</p>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-900 placeholder-slate-500 focus:border-purple-900 focus:outline-none"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-purple-900 focus:outline-none"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="stock">Sort by Stock</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Product Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Category</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Price</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Stock</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Featured</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-slate-600">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => {
                const isEditing = editingId === (product._id || product.id)
                return (
                  <tr key={product._id || product.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-900">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editValues.name}
                          onChange={(e) =>
                            setEditValues((prev) => ({ ...prev, name: e.target.value }))
                          }
                          className="w-full rounded border border-slate-200 px-2 py-1"
                        />
                      ) : (
                        product.name
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editValues.category}
                          onChange={(e) =>
                            setEditValues((prev) => ({ ...prev, category: e.target.value }))
                          }
                          className="w-full rounded border border-slate-200 px-2 py-1"
                        />
                      ) : (
                        product.category
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-900">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editValues.price}
                          onChange={(e) =>
                            setEditValues((prev) => ({ ...prev, price: e.target.value }))
                          }
                          className="w-full rounded border border-slate-200 px-2 py-1"
                        />
                      ) : (
                        `₹${product.price?.toFixed(2) || 0}`
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-900">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editValues.stock}
                          onChange={(e) =>
                            setEditValues((prev) => ({ ...prev, stock: e.target.value }))
                          }
                          className="w-full rounded border border-slate-200 px-2 py-1"
                        />
                      ) : (
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            (product.stock || 0) > 10
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {product.stock || 0}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {isEditing ? (
                        <input
                          type="checkbox"
                          checked={editValues.featured}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              featured: e.target.checked,
                            }))
                          }
                          className="h-4 w-4 rounded border-slate-300"
                        />
                      ) : (
                        <span className={product.featured ? 'text-green-600' : 'text-slate-400'}>
                          {product.featured ? '✓ Featured' : '—'}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {isEditing ? (
                        <div className="flex gap-2">
                          <button
                            onClick={handleSave}
                            className="rounded bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="rounded bg-slate-300 px-3 py-1 text-xs font-medium text-slate-900 hover:bg-slate-400"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditClick(product)}
                            className="rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onDeleteProduct?.(product._id || product.id)}
                            className="rounded bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-slate-600">
        Showing {filteredProducts.length} of {products.length} products
      </div>
    </div>
  )
}

export default ProductCatalog
