const API_BASE = import.meta.env.VITE_API_BASE || 'https://acs-cables.onrender.com/api/v1'

let adminToken = null
try {
  const stored = localStorage.getItem('adminToken')
  if (stored) adminToken = stored
} catch (e) {}

export const setAdminToken = (token) => {
  adminToken = token
  try {
    if (token) localStorage.setItem('adminToken', token)
    else localStorage.removeItem('adminToken')
  } catch (e) {}
}

const getAuthHeaders = () => {
  return adminToken ? { Authorization: `Bearer ${adminToken}` } : {}
}

export const adminLogin = async (username, password) => {
  const response = await fetch(`${API_BASE}/auth/admin-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  return handleResponse(response)
}

const handleResponse = async (response) => {
  const data = await response.json().catch(() => null)
  if (!response.ok) {
    const message = data?.message || response.statusText || 'An error occurred'
    throw new Error(message)
  }
  return data
}

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE}/products`)
  return handleResponse(response)
}

export const createProduct = async (product) => {
  const response = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(product)
  })
  return handleResponse(response)
}

export const updateProduct = async (productId, product) => {
  const response = await fetch(`${API_BASE}/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(product)
  })
  return handleResponse(response)
}

export const deleteProduct = async (productId) => {
  const response = await fetch(`${API_BASE}/products/${productId}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeaders()
    }
  })
  return handleResponse(response)
}

export const fetchOrders = async () => {
  const response = await fetch(`${API_BASE}/orders/admin`, {
    headers: {
      ...getAuthHeaders()
    }
  })
  return handleResponse(response)
}

export const updateOrderStatus = async (orderId, status) => {
  const response = await fetch(`${API_BASE}/orders/${orderId}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify({ status })
  })
  return handleResponse(response)
}

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE}/users`, {
    headers: {
      ...getAuthHeaders()
    }
  })
  return handleResponse(response)
}

export default {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchOrders,
  updateOrderStatus,
  fetchUsers
}
