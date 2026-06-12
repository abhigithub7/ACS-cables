import React, { useState } from 'react'
import LoginPage from './components/LoginPage'
import AdminPanel from './components/AdminPanel'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <>{!isAuthenticated ? <LoginPage onLogin={() => setIsAuthenticated(true)} /> : <AdminPanel onSignOut={() => setIsAuthenticated(false)} />}</>
  )
}

export default App