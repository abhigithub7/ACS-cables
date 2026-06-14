import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.svg';

const Navbar = () => {
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    user = null;
  }

  const isLoggedIn = Boolean(token);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-purple-900 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-3">
          <div className="flex min-w-0 items-center gap-3">
              <img
                src="https://img.sanishtech.com/u/bca779b9b4faf56c2c77d87f38e17907.jpeg"
                alt="Ashish Computers"
                className="h-12 w-12 shrink-0 rounded-full object-contain"
              />
            </div>
        </div>

        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/" className="hover:text-blue-200">Home</Link>
          <Link to="/products" className="hover:text-blue-200">Products</Link>
          <Link to="/categories" className="hover:text-blue-200">Categories</Link>
          <Link to="/orders" className="hover:text-blue-200">Orders</Link>
          <Link to="/about" className="hover:text-blue-200">About</Link>
          <Link to="/contact" className="hover:text-blue-200">Contact</Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <input
              type="text"
              placeholder="Search products..."
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-black outline-none transition focus:border-blue-300"
            />
          </div>

          <Link to="/cart" className="relative hover:text-blue-200">
            <span className="text-xl">🛒</span>
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex h-5 min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                {getCartCount()}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              title="Logout"
              className="hidden sm:grid h-10 w-10 place-items-center rounded-full bg-white text-purple-900 font-bold transition hover:bg-slate-100"
            >
              {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
            </button>
          ) : (
            <Link
              to="/login"
              title="Login"
              className="hidden sm:grid h-10 w-10 place-items-center rounded-full bg-white text-purple-900 font-bold transition hover:bg-slate-100"
            >
              👤
            </Link>
          )}

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/20 md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">Toggle menu</span>
            <div className="relative h-5 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-full bg-current transition-transform duration-300 ${isOpen ? 'translate-y-2 rotate-45' : ''}`}
              />
              <span
                className={`absolute left-0 top-1/2 h-0.5 w-full bg-current transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
              />
              <span
                className={`absolute left-0 bottom-0 h-0.5 w-full bg-current transition-transform duration-300 ${isOpen ? '-translate-y-2 -rotate-45' : ''}`}
              />
            </div>
          </button>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden bg-purple-950/95 transition-all duration-300 ${isOpen ? 'max-h-96 border-t border-white/10' : 'max-h-0'}`}>
        <div className="space-y-3 px-4 pb-4 pt-3">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block rounded-2xl px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setIsOpen(false)}
            className="block rounded-2xl px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Products
          </Link>
          <Link
            to="/categories"
            onClick={() => setIsOpen(false)}
            className="block rounded-2xl px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Categories
          </Link>
          <Link
            to="/orders"
            onClick={() => setIsOpen(false)}
            className="block rounded-2xl px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Orders
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block rounded-2xl px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block rounded-2xl px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Contact
          </Link>
          <div className="border-t border-white/10 pt-3">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full rounded-2xl bg-white py-2 text-sm font-semibold text-purple-900 transition hover:bg-slate-100"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block rounded-2xl bg-white py-2 text-center text-sm font-semibold text-purple-900 transition hover:bg-slate-100"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
