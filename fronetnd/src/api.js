const API_BASE = import.meta.env.VITE_API_BASE || 'https://acs-cables-3vc3tpfmm-abhigithub7s-projects.vercel.app/api/v1'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const register = async (data) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export const login = async (data) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export const fetchProducts = async (query = {}) => {
  const params = new URLSearchParams(query).toString()
  const res = await fetch(`${API_BASE}/products${params ? `?${params}` : ''}`)
  return res.json()
}

export const fetchProductById = async (id) => {
  const res = await fetch(`${API_BASE}/products/${id}`)
  return res.json()
}

export const createOrder = async (order) => {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(order)
  })
  return res.json()
}

export const getOrders = async () => {
  const res = await fetch(`${API_BASE}/orders`, { headers: getAuthHeaders() })
  return res.json()
}

export const getOrderById = async (orderId) => {
  const res = await fetch(`${API_BASE}/orders/${orderId}`, { headers: getAuthHeaders() })
  return res.json()
}

// Payment API endpoints
export const createPaymentOrder = async (amount, orderId) => {
  const res = await fetch(`${API_BASE}/payments/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ amount, orderId })
  })
  return res.json()
}

export const verifyPaymentSignature = async (paymentData) => {
  const res = await fetch(`${API_BASE}/payments/verify-signature`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(paymentData)
  })
  return res.json()
}

export const getPaymentDetails = async (paymentId) => {
  const res = await fetch(`${API_BASE}/payments/${paymentId}`, {
    headers: getAuthHeaders()
  })
  return res.json()
}

export const getPaymentByOrderId = async (orderId) => {
  const res = await fetch(`${API_BASE}/payments/order/${orderId}`, {
    headers: getAuthHeaders()
  })
  return res.json()
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
