import { useState } from 'react';
import { Link, useNavigate, createSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logo from '../assets/lo.jpeg';

const Navbar = () => {
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate({
        pathname: '/products',
        search: createSearchParams({ search: trimmed }).toString()
      });
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white text-white  ">
   <div className="bg-blue-950 text-white hidden lg:block text-xs sm:text-sm">
  <div className="max-w-7xl  mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-3 sm:px-6 py-2">

    {/* Left Side */}
    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 sm:gap-6">

      <span className="flex items-center gap-1 whitespace-nowrap">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
        Fast Delivery
      </span>

      <span className="flex items-center gap-1 whitespace-nowrap">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        Genuine Products
      </span>

      <span className="hidden md:flex items-center gap-1 whitespace-nowrap">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>
        Customer Support
      </span>

    </div>

    {/* Right Side */}
    <span className="text-center text-xs sm:text-sm font-medium">
      Welcome to ACS Cables
    </span>

  </div>
</div>
      <div className="container mx-auto flex justify-between gap-1 sm:gap-2 md:gap-3 px-2 sm:px-4 py-2 sm:p-2">
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          <div className="flex min-w-0 items-center gap-1 sm:gap-3">
              <img
                src={logo}
                alt="Ashish Computers"
                className="h-7 w-7 sm:h-10 sm:w-10 md:h-8 md:w-8 shrink-0 rounded-full object-contain"
              />
              <h1 className='text-black font-serif  sm:flex font-bold'>ACS Cables</h1>
            </div>
        </div>

        <div className=" flex-1 min-w-0 items-center gap-4 lg:gap-8 font-medium">
          <div className="flex-1 hidden lg:block mx-4">

    <form onSubmit={handleSearch} className="flex bg-gray-400 w-full overflow-hidden rounded-md border">

        <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for cables, assessories...."
            className="flex-1 min-w-0 px-4 bg-white text-start text-black border py-1 outline-none"
        />

        <button type="submit" className="bg-blue-950 px-1.5 text-white shrink-0">

           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>


        </button>

    </form>

</div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 shrink-0">
          

          <Link to="/cart" className="relative hover:text-blue-200 p-1">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="sm:size-6 size-5 text-black">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>

            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex h-4 min-w-[16px] sm:h-5 sm:min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 sm:px-1.5 text-[8px] sm:text-[10px] font-bold text-white">
                {getCartCount()}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              title="Logout"
              className="hidden  sm:grid h-8 w-8 md:h-10 md:w-10 place-items-center rounded-full bg-white text-purple-900 font-bold transition hover:bg-slate-100 text-sm md:text-base"
            >
              {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
            </button>
          ) : (
            <Link
              to="/login"
              title="Login"
              className="hidden sm:grid  place-items-center rounded-full bg-white text-blue-950 font-bold transition hover:bg-slate-100 text-sm md:text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-black">
  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
</svg> 



            </Link>
          )}

          <button
            type="button"
            className="inline-flex h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 items-center justify-center rounded-full  p-1.5 sm:p-2 text-black transition hover:bg-white/20 md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">Toggle menu</span>
            <div className="relative h-4 w-4 sm:h-5 sm:w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-full bg-current transition-transform duration-300 ${isOpen ? 'translate-y-1.5 sm:translate-y-2 rotate-45' : ''}`}
              />
              <span
                className={`absolute left-0 top-1/2 h-0.5 w-full bg-current transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
              />
              <span
                className={`absolute left-0 bottom-0 h-0.5 w-full bg-current transition-transform duration-300 ${isOpen ? '-translate-y-1.5 sm:-translate-y-2 -rotate-45' : ''}`}
              />
            </div>
          </button>
        </div>
      </div>

   
   
      <div className={`md:hidden overflow-hidden bg-blue-950 transition-all duration-300 ${isOpen ? 'max-h-screen border-t border-white/10' : 'max-h-0'}`}>
        
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
          {/* Mobile Search Bar */}
         

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
                className="block rounded-2xl bg-white py-2 text-center text-sm font-semibold text-blue-900 transition hover:bg-slate-100"
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
