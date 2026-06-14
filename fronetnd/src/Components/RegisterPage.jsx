import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api';

const RegisterPage = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', phone: '', street: '', city: '', state: '', zipCode: '' });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setStatus('Passwords do not match.');
      return;
    }
    setStatus('Registering...')
    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      phone: form.phone,
      address: {
        street: form.street,
        city: form.city,
        state: form.state,
        zipCode: form.zipCode,
        country: 'India'
      }
    }

    register(payload).then((res) => {
      if (res && res.success) {
        localStorage.setItem('token', res.token)
        if (res.user) {
          localStorage.setItem('user', JSON.stringify(res.user))
        }
        setStatus('Registration successful. Redirecting...')
        navigate('/')
      } else {
        setStatus(res.message || 'Registration failed')
      }
    }).catch((err) => setStatus('Registration failed'))
  };

  return (
    <main className="container mx-auto px-4 py-14">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-gray-200 bg-white p-10 shadow-xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-900 font-bold">Create account</p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">Register as a new user</h1>
          <p className="mt-3 text-gray-600">Sign up to save favorites, track orders, and access exclusive offers.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First name</label>
              <input
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-gray-300 px-4 py-3 focus:border-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
                placeholder="First name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
              <input
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-gray-300 px-4 py-3 focus:border-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
                placeholder="Last name"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
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
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-gray-300 px-4 py-3 focus:border-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
                placeholder="9999999999"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
              <input
                id="street"
                name="street"
                type="text"
                value={form.street}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-gray-300 px-4 py-3 focus:border-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
                placeholder="123 Main St"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                id="city"
                name="city"
                type="text"
                value={form.city}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-gray-300 px-4 py-3 focus:border-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
                placeholder="City"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <input
                id="state"
                name="state"
                type="text"
                value={form.state}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-gray-300 px-4 py-3 focus:border-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
                placeholder="State"
              />
            </div>
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
              <input
                id="zipCode"
                name="zipCode"
                type="text"
                value={form.zipCode}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-gray-300 px-4 py-3 focus:border-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
                placeholder="100001"
              />
            </div>
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
              placeholder="Create a password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full rounded-3xl border border-gray-300 px-4 py-3 focus:border-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
              placeholder="Repeat your password"
            />
          </div>

          <button type="submit" className="w-full rounded-3xl bg-purple-900 px-6 py-3 text-white text-sm font-semibold transition hover:bg-purple-800">
            Register
          </button>

          {status && <p className="text-sm text-green-600">{status}</p>}
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-purple-900 hover:text-purple-700">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;
