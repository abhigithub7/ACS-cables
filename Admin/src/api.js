const API_BASE = import.meta.env.VITE_API_BASE || 'https://acs-cables.onrender.com/api/v1'

let adminAuth = {
  username: import.meta.env.VITE_ADMIN_USERNAME,
  password: import.meta.env.VITE_ADMIN_PASSWORD
}

export const setAdminAuth = (auth) => {
  if (auth?.username && auth?.password) {
    adminAuth = auth
  }
}

const getAdminAuthHeaders = () => {
  const { username, password } = adminAuth
  return username && password ? {
    'x-admin-username': username,
    'x-admin-password': password
  } : {}
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
      ...getAdminAuthHeaders()
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
      ...getAdminAuthHeaders()
    },
    body: JSON.stringify(product)
  })
  return handleResponse(response)
}

export const deleteProduct = async (productId) => {
  const response = await fetch(`${API_BASE}/products/${productId}`, {
    method: 'DELETE',
    headers: {
      ...getAdminAuthHeaders()
    }
  })
  return handleResponse(response)
}

export const fetchOrders = async () => {
  const response = await fetch(`${API_BASE}/orders/admin`, {
    headers: {
      ...getAdminAuthHeaders()
    }
  })
  return handleResponse(response)
}

export const updateOrderStatus = async (orderId, status) => {
  const response = await fetch(`${API_BASE}/orders/${orderId}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAdminAuthHeaders()
    },
    body: JSON.stringify({ status })
  })
  return handleResponse(response)
}

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE}/users`, {
    headers: {
      ...getAdminAuthHeaders()
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
