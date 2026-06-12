import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.svg';

const Navbar = () => {
  const { getCartCount } = useCart();
  const navigate = useNavigate();
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-purple-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to="/">
            <img src={logo} alt="Ashish Computers" className="h-12 w-auto" />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-9 font-medium">
          <Link to="/" className="hover:text-blue-200">Home</Link>
          <Link to="/products" className="hover:text-blue-200">Products</Link>
          <Link to="/categories" className="hover:text-blue-200">Categories</Link>
          <Link to="/orders" className="hover:text-blue-200">Orders</Link>
          <Link to="/about" className="hover:text-blue-200">About</Link>
          <Link to="/contact" className="hover:text-blue-200">Contact</Link>
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search products..."
            className="px-3 bg-white py-1 rounded text-black hidden sm:block"
          />
          {/* Cart Icon */}
          <Link to="/cart" className="relative hover:text-blue-200">
            🛒
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {getCartCount()}
              </span>
            )}
          </Link>
          {/* User Account */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              title="Logout"
              className="grid h-10 w-10 place-items-center rounded-full bg-white text-purple-900 font-bold transition hover:bg-slate-100"
            >
              {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
            </button>
          ) : (
            <Link to="/login" title="Login" className="grid h-10 w-10 place-items-center rounded-full bg-white text-purple-900 font-bold transition hover:bg-slate-100">
              👤
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;