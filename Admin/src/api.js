const API_BASE =
  import.meta.env.VITE_API_BASE ||
  'https://acs-cables.onrender.com/api/v1'

let adminToken = null

try {
  const stored = localStorage.getItem('adminToken')
  if (stored) {
    adminToken = stored
  }
} catch (error) {
  console.error('Error loading token:', error)
}

export const setAdminToken = (token) => {
  adminToken = token

  try {
    if (token) {
      localStorage.setItem('adminToken', token)
    } else {
      localStorage.removeItem('adminToken')
    }
  } catch (error) {
    console.error('Error saving token:', error)
  }
}

const getAuthHeaders = () => {
  return adminToken
    ? {
        Authorization: `Bearer ${adminToken}`
      }
    : {}
}

const handleResponse = async (response) => {
  const data = await response.json().catch(() => null)

  if (!response.ok) {
    if (response.status === 401) {
      adminToken = null

      try {
        localStorage.removeItem('adminToken')
      } catch (error) {
        console.error(error)
      }
    }

    throw new Error(
      data?.message ||
      response.statusText ||
      'Something went wrong'
    )
  }

  return data
}

/* ==========================
   AUTH APIs
========================== */

export const adminLogin = async (username, password) => {
  const response = await fetch(
    `${API_BASE}/auth/admin`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    }
  )

  return handleResponse(response)
}

export const verifyAdmin = async () => {
  const response = await fetch(
    `${API_BASE}/auth/verify-admin`,
    {
      method: 'GET',
      headers: {
        ...getAuthHeaders()
      }
    }
  )

  return handleResponse(response)
}

export const logoutAdmin = () => {
  adminToken = null

  try {
    localStorage.removeItem('adminToken')
  } catch (error) {
    console.error(error)
  }
}

/* ==========================
   PRODUCT APIs
========================== */

export const fetchProducts = async () => {
  const response = await fetch(
    `${API_BASE}/products`
  )

  return handleResponse(response)
}

export const createProduct = async (product) => {
  // If product is FormData, don't set Content-Type (browser sets it with boundary)
  const isFormData = product instanceof FormData
  const headers = {
    ...getAuthHeaders()
  }
  if (!isFormData) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(
    `${API_BASE}/products`,
    {
      method: 'POST',
      headers,
      body: isFormData ? product : JSON.stringify(product)
    }
  )

  return handleResponse(response)
}

export const updateProduct = async (
  productId,
  product
) => {
  // If product is FormData, don't set Content-Type (browser sets it with boundary)
  const isFormData = product instanceof FormData
  const headers = {
    ...getAuthHeaders()
  }
  if (!isFormData) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(
    `${API_BASE}/products/${productId}`,
    {
      method: 'PUT',
      headers,
      body: isFormData ? product : JSON.stringify(product)
    }
  )

  return handleResponse(response)
}

export const deleteProduct = async (
  productId
) => {
  const response = await fetch(
    `${API_BASE}/products/${productId}`,
    {
      method: 'DELETE',
      headers: {
        ...getAuthHeaders()
      }
    }
  )

  return handleResponse(response)
}

/* ==========================
   ORDER APIs
========================== */

export const fetchOrders = async () => {
  const response = await fetch(
    `${API_BASE}/orders/admin`,
    {
      headers: {
        ...getAuthHeaders()
      }
    }
  )

  return handleResponse(response)
}

export const updateOrderStatus = async (
  orderId,
  status
) => {
  const response = await fetch(
    `${API_BASE}/orders/${orderId}/status`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({ status })
    }
  )

  return handleResponse(response)
}

/* ==========================
   USER APIs
========================== */

export const fetchUsers = async () => {
  const response = await fetch(
    `${API_BASE}/users`,
    {
      headers: {
        ...getAuthHeaders()
      }
    }
  )

  return handleResponse(response)
}

export default {
  adminLogin,
  verifyAdmin,
  logoutAdmin,
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchOrders,
  updateOrderStatus,
  fetchUsers
}