import React, { useState } from 'react'

const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setError('')
      onLogin({ username, password })
      return
    }

    setError('Invalid username or password. Please try again.')
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-slate-900">Admin Panel Login</h1>
          <p className="mt-2 text-sm text-slate-500">Enter the fixed admin credentials to continue.</p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="text-sm text-slate-600">Username</span>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="admin"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-600">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="password123"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-base font-semibold text-white transition hover:bg-sky-500"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 text-sm text-slate-500">
          
        </div>
      </div>
    </div>
  )
}

export default LoginPage
