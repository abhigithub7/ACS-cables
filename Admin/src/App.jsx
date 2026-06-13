import React, { useEffect, useState } from 'react'
import LoginPage from './components/LoginPage'
import AdminPanel from './components/AdminPanel'
import { setAdminAuth } from './api'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth')
    if (savedAuth) {
      try {
        const parsedAuth = JSON.parse(savedAuth)
        setAdminAuth(parsedAuth)
        setIsAuthenticated(true)
      } catch (error) {
        localStorage.removeItem('adminAuth')
      }
    }
  }, [])

  const handleLogin = (auth) => {
    setAdminAuth(auth)
    localStorage.setItem('adminAuth', JSON.stringify(auth))
    setIsAuthenticated(true)
  }

  const handleSignOut = () => {
    localStorage.removeItem('adminAuth')
    setIsAuthenticated(false)
  }

  return (
    <>{!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <AdminPanel onSignOut={handleSignOut} />}</>
  )
}

export default App