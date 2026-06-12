const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000/api/v1'

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
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  })
  return handleResponse(response)
}

export const updateProduct = async (productId, product) => {
  const response = await fetch(`${API_BASE}/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  })
  return handleResponse(response)
}

export const deleteProduct = async (productId) => {
  const response = await fetch(`${API_BASE}/products/${productId}`, {
    method: 'DELETE'
  })
  return handleResponse(response)
}

export const fetchOrders = async () => {
  const response = await fetch(`${API_BASE}/orders/admin`)
  return handleResponse(response)
}

export const updateOrderStatus = async (orderId, status) => {
  const response = await fetch(`${API_BASE}/orders/${orderId}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status })
  })
  return handleResponse(response)
}

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE}/users`)
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
