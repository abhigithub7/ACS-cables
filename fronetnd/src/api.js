const rawApiBase = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api/v1'
const API_BASE = rawApiBase.replace(/\/+$|\\/g, '').replace(/\/api\/v1$/, '/api/v1')

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const request = async (path, options = {}) => {
  const url = `${API_BASE}${path}`
  const fetchOptions = {
    mode: 'cors',
    headers: {
      ...options.headers,
    },
    ...options,
  }

  const response = await fetch(url, fetchOptions)
  const contentType = response.headers.get('content-type') || ''

  let data = null
  if (contentType.includes('application/json')) {
    data = await response.json().catch(() => null)
  }

  if (!response.ok) {
    return {
      success: false,
      status: response.status,
      message: data?.message || response.statusText || 'Request failed',
      ...data
    }
  }

  return data || { success: true }
}

export const register = async (data) => {
  return request('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}

export const login = async (data) => {
  return request('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}

export const fetchProducts = async (query = {}) => {
  const params = new URLSearchParams(query).toString()
  return request(`/products${params ? `?${params}` : ''}`)
}

export const fetchProductById = async (id) => {
  return request(`/products/${id}`)
}

export const createOrder = async (order) => {
  return request('/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(order)
  })
}

export const getOrders = async () => {
  return request('/orders', {
    headers: getAuthHeaders()
  })
}

export const getOrderById = async (orderId) => {
  return request(`/orders/${orderId}`, {
    headers: getAuthHeaders()
  })
}

export const createPaymentOrder = async (amount, orderId) => {
  return request('/payments/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ amount, orderId })
  })
}

export const verifyPaymentSignature = async (paymentData) => {
  return request('/payments/verify-signature', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(paymentData)
  })
}

export const getPaymentDetails = async (paymentId) => {
  return request(`/payments/${paymentId}`, {
    headers: getAuthHeaders()
  })
}

export const getPaymentByOrderId = async (orderId) => {
  return request(`/payments/order/${orderId}`, {
    headers: getAuthHeaders()
  })
}

export default {
  register,
  login,
  fetchProducts,
  fetchProductById,
  createOrder,
  getOrders,
  getOrderById,
  createPaymentOrder,
  verifyPaymentSignature,
  getPaymentDetails,
  getPaymentByOrderId
}
