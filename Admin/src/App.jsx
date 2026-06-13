import React, { useEffect, useState } from 'react'
import LoginPage from './components/LoginPage'
import AdminPanel from './components/AdminPanel'
import { setAdminToken } from './api'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      setAdminToken(token)
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (token) => {
    setAdminToken(token)
    try { localStorage.setItem('adminToken', token) } catch (e) {}
    setIsAuthenticated(true)
  }

  const handleSignOut = () => {
    try { localStorage.removeItem('adminToken') } catch (e) {}
    setAdminToken(null)
    setIsAuthenticated(false)
  }

  return (
    <>{!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <AdminPanel onSignOut={handleSignOut} />}</>
  )
}

export default App