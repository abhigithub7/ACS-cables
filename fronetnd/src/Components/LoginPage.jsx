import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('Logging in...')
    login({ email: form.email, password: form.password }).then((res) => {
      if (res && res.success) {
        localStorage.setItem('token', res.token)
        if (res.user) {
          localStorage.setItem('user', JSON.stringify(res.user))
        }
        setStatus('Login successful. Redirecting...')
        navigate('/')
      } else {
        setStatus(res.message || 'Login failed')
      }
    }).catch(() => setStatus('Login failed'))
  };

  return (
    <main className="container mx-auto px-4 py-14">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-gray-200 bg-white p-10 shadow-xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-900 font-bold">Welcome back</p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">Log in to your account</h1>
          <p className="mt-3 text-gray-600">Enter your email and password to access your orders, favorites, and account settings.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-3xl border border-gray-300 px-4 py-3 focus:border-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-3xl border border-gray-300 px-4 py-3 focus:border-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="w-full rounded-3xl bg-purple-900 px-6 py-3 text-white text-sm font-semibold transition hover:bg-purple-800">
            Log in
          </button>

          {status && <p className="text-sm text-green-600">{status}</p>}
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-purple-900 hover:text-purple-700">
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
