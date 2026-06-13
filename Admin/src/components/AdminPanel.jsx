import React, { useEffect, useMemo, useState } from 'react'
import logo from '../assets/logo.svg'
import Dashboard from './Dashboard'
import ProductPage from './ProductPage'
import ProductCatalog from './ProductCatalog'
import UserManagement from './UserManagement'
import AllOrders from './AllOrders'
import {
  fetchProducts as apiFetchProducts,
  createProduct as apiCreateProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct,
  fetchOrders as apiFetchOrders,
  updateOrderStatus as apiUpdateOrderStatus,
  fetchUsers as apiFetchUsers
} from '../api'

const pageItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'orders', label: 'Orders' },
  { id: 'products', label: 'Products' },
  { id: 'catalog', label: 'Product Catalog' },
  { id: 'users', label: 'User Management' },
]

const initialOrders = [
  { id: '#AC-1024', customer: 'Priya Sharma', total: 549, status: 'Delivered' },
  { id: '#AC-1025', customer: 'John Doe', total: 199, status: 'Processing' },
  { id: '#AC-1026', customer: 'Ayesha Khan', total: 78, status: 'Pending' },
  { id: '#AC-1027', customer: 'Mark Taylor', total: 1249, status: 'Delivered' },
]

const initialProducts = [
  {
    id: 1,
    name: 'Gaming Laptop',
    description: 'High-performance laptop built for gaming and content creation.',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=60',
    price: 1499.99,
    stock: 12,
    category: 'Laptops',
    featured: true,
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    description: 'RGB backlit keyboard with tactile switches and premium build.',
    imageUrl: 'https://images.unsplash.com/photo-1512499617640-c2f999b8d33f?auto=format&fit=crop&w=500&q=60',
    price: 129.99,
    stock: 42,
    category: 'Accessories',
    featured: false,
  },
  {
    id: 3,
    name: 'Gaming Mouse',
    description: 'Ergonomic mouse with adjustable DPI and programmable buttons.',
    imageUrl: 'https://images.unsplash.com/photo-1514704864467-7acdb2e7cbf0?auto=format&fit=crop&w=500&q=60',
    price: 69.99,
    stock: 58,
    category: 'Accessories',
    featured: true,
  },
]

const categories = ['CAT-6 Cables', '3+1 CCTV Cables', 'Printer Cables', 'Mobile Data Cables', 'Cables','Networking Cables']

const AdminPanel = ({ onSignOut }) => {
  const [activePage, setActivePage] = useState('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [products, setProducts] = useState(initialProducts)
  const [orders, setOrders] = useState(initialOrders)
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    const loadProducts = async () => {
      try {
        const response = await apiFetchProducts()
        if (mounted && response?.success) {
          setProducts(response.products)
        }
      } catch (err) {
        if (mounted) {
          setError((prev) => prev || `Failed to load products: ${err.message}`)
        }
      }
    }

    const loadOrders = async () => {
      try {
        const response = await apiFetchOrders()
        if (mounted && response?.success) {
          setOrders(response.orders)
        }
      } catch (err) {
        if (mounted) {
          setError((prev) => prev || `Failed to load orders: ${err.message}`)
        }
      }
    }

    const loadUsers = async () => {
      try {
        const response = await apiFetchUsers()
        if (mounted && response?.success) {
          setUsers(response.users)
        }
      } catch (err) {
        if (mounted) {
          setError((prev) => prev || `Failed to load users: ${err.message}`)
        }
      }
    }

    const loadData = async () => {
      await Promise.all([loadProducts(), loadOrders(), loadUsers()])
      if (mounted) setIsLoading(false)
    }

    loadData()
    return () => {
      mounted = false
    }
  }, [])

  const summary = useMemo(() => {
    const totalSales = orders.reduce((sum, order) => sum + (order.totalPrice || order.total || 0), 0)
    const totalCustomers = new Set(orders.map((order) => order.user?.email || order.customer)).size
    const totalUsers = users.length
    return {
      totalSales,
      totalOrders: orders.length,
      totalCustomers,
      totalProducts: products.length,
      totalUsers
    }
  }, [orders, products, users])

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await apiUpdateOrderStatus(orderId, newStatus)
      if (response.success) {
        setOrders((prev) => prev.map((order) => {
          const normalizedId = order._id || order.id
          return normalizedId === orderId ? response.order : order
        }))
      }
    } catch (err) {
      setError(`Order update failed: ${err.message}`)
    }
  }

  const handleAddProduct = async (product) => {
    try {
      const response = await apiCreateProduct(product)
      if (response.success) {
        setProducts((prev) => [response.product, ...prev])
      }
    } catch (err) {
      setError(`Add failed: ${err.message}`)
    }
  }

  const handleUpdateProduct = async (product) => {
    try {
      const productId = product._id || product.id
      const response = await apiUpdateProduct(productId, product)
      if (response.success) {
        setProducts((prev) => prev.map((item) => {
          const itemId = item._id || item.id
          return itemId === response.product._id || itemId === response.product.id ? response.product : item
        }))
      }
    } catch (err) {
      setError(`Update failed: ${err.message}`)
    }
  }

  const handleDeleteProduct = async (productId) => {
    try {
      await apiDeleteProduct(productId)
      setProducts((prev) => prev.filter((item) => (item._id || item.id) !== productId))
    } catch (err) {
      setError(`Delete failed: ${err.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-10 border-b border-slate-200 bg-purple-900 shadow-sm">
        <div className="mx-auto max-w-8xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Ashish Computers" className="h-12 w-auto" />
              
            </div>

            <div className="flex items-center gap-4">
              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setMobileOpen((s) => !s)}
                className="inline-flex items-center gap-2 rounded-md bg-white/5 p-2 text-white lg:hidden"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              <div className="hidden sm:flex sm:items-center sm:gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-200" />
                <div className="text-right">
                  <p className="text-sm font-medium text-white">Ashish Ahirwar</p>
                  <p className="text-xs text-gray-200">Administrator</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onSignOut}
                className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu (small screens) */}
      <div className={`lg:hidden ${mobileOpen ? 'block' : 'hidden'} bg-white border-b border-slate-200 shadow-sm`}>
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-900">A Computers</p>
              <p className="text-xs text-slate-500">Admin Panel</p>
            </div>
            <button type="button" onClick={() => setMobileOpen(false)} className="text-slate-600">Close</button>
          </div>

          <div className="mt-3 space-y-2">
            {pageItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => { setActivePage(item.id); setMobileOpen(false) }}
                className={`w-full text-left rounded-md px-3 py-2 text-sm font-semibold transition ${
                  activePage === item.id ? 'bg-purple-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-9xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
        <aside className="hidden w-full shrink-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:fixed lg:top-24 lg:left-0 lg:z-20 lg:h-[calc(100vh-6rem)] lg:w-72 lg:flex lg:flex-col lg:gap-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-600">Admin Panel</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">A Computers</h2>
            <p className="mt-2 text-sm text-slate-500">Secure admin portal for product and order management.</p>
          </div>

          <nav className="space-y-2">
            {pageItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActivePage(item.id)}
                className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  activePage === item.id
                    ? 'bg-purple-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-3">
            <button
              type="button"
              onClick={() => setActivePage('products')}
              className="w-full rounded-2xl bg-purple-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
            >
              Add / Manage Products
            </button>
          </div>
        </aside>

        <main className="flex-1 min-w-0 lg:ml-72">
          <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:hidden">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-sky-600">Admin Panel</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">A Computers</h2>
              <p className="mt-2 text-sm text-slate-500">Secure admin portal for product and order management.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {pageItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActivePage(item.id)}
                  className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                    activePage === item.id
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            {error && (
              <div className="mb-4 rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                {error}
              </div>
            )}
            {isLoading ? (
              <div className="p-10 text-center text-sm text-slate-600">Loading product data...</div>
            ) : (
              <>
                {activePage === 'dashboard' && (
                  <Dashboard summary={summary} orders={orders} products={products} users={users} onStatusChange={handleStatusChange} />
                )}
                {activePage === 'orders' && (
                  <AllOrders orders={orders} onStatusChange={handleStatusChange} />
                )}
                {activePage === 'products' && (
                  <ProductPage
                    products={products}
                    categories={categories}
                    onAddProduct={handleAddProduct}
                    onUpdateProduct={handleUpdateProduct}
                    onDeleteProduct={handleDeleteProduct}
                  />
                )}
                {activePage === 'catalog' && (
                  <ProductCatalog
                    products={products}
                    onDeleteProduct={handleDeleteProduct}
                    onUpdateProduct={handleUpdateProduct}
                  />
                )}
                {activePage === 'users' && (
                  <UserManagement users={users} />
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminPanel
