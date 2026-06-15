import React, { useEffect, useState } from 'react'
import LoginPage from './components/LoginPage'
import AdminPanel from './components/AdminPanel'
import {
  setAdminToken,
  verifyAdmin,
  logoutAdmin
} from './api'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem('adminToken')

        if (!token) {
          setLoading(false)
          return
        }

        setAdminToken(token)

        // Verify token with backend
        await verifyAdmin()

        setIsAuthenticated(true)
      } catch (error) {
        console.error('Authentication failed:', error)

        logoutAdmin()
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuthentication()
  }, [])

  const handleLogin = async (token) => {
    try {
      setAdminToken(token)

      await verifyAdmin()

      setIsAuthenticated(true)
    } catch (error) {
      console.error('Login verification failed:', error)

      logoutAdmin()
      setIsAuthenticated(false)
    }
  }

  const handleSignOut = () => {
    logoutAdmin()
    setIsAuthenticated(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="text-lg font-medium text-slate-700">
            Loading Admin Panel...
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {isAuthenticated ? (
        <AdminPanel onSignOut={handleSignOut} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </>
  )
}

export default App