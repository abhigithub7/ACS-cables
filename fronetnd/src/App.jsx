import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { OrdersProvider } from './context/OrdersContext'
import Navbar from './Components/Navbar'
import Slider from './Components/Slider'
import ProductList from './Components/ProductList'
import ProductDetails from './Components/ProductDetails'
import FeaturedProducts from './Components/FeaturedProducts'
import CategoryPage from './Components/CategoryPage'
import AboutPage from './Components/AboutPage'
import ContactPage from './Components/ContactPage'
import LoginPage from './Components/LoginPage'
import RegisterPage from './Components/RegisterPage'
import CartPage from './Components/CartPage'
import CheckoutPage from './Components/CheckoutPage'
import OrdersListPage from './Components/OrdersListPage'
import Footer from './Components/Footer'
import ScrollToTop from './Components/ScrollToTop.jsx'
import SEO from './Components/SEO'
import TopCards from './Components/TopCard.jsx'
import BottomFeatures from './Components/Bottomfeature.jsx'

const App = () => {

  
  return (
    
    <CartProvider>
      <OrdersProvider>
        <Router>
          <ScrollToTop/>
        <div className="w-full max-w-[100vw] overflow-x-hidden">
          <Navbar />
   
          <main className="pt-13">
             <div className="flex mx-2 bg-white rounded-md overflow-hidden">

        <input
            type="text"
            placeholder="Search for cables, assessories...."
            className="flex-1 min-w-0 text-sm px-4 bg-white text-start text-black border border-gray-300 py-1 outline-none"
        />

        <button className="bg-blue-950 px-1.5 text-white shrink-0">

           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>


        </button>

    </div>
            <div className="bg-blue-950 mt-1 text-white lg:hidden text-xs sm:text-sm">
  <div className="w-full mx-auto flex items-center justify-center gap-1 sm:gap-3 px-1 sm:px-6 py-2 overflow-x-auto">

    {/* Left Side */}
    <div className="flex justify-center items-center gap-1 sm:gap-6">

      <span className="flex items-center gap-0.5 sm:gap-1 whitespace-nowrap text-[10px] sm:text-xs">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 sm:w-5 sm:h-5 shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
        Fast Delivery
      </span>

      <span className="flex items-center gap-0.5 sm:gap-1 whitespace-nowrap text-[10px] sm:text-xs">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 sm:w-5 sm:h-5 shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        Genuine Products
      </span>

      <span className="flex items-center gap-0.5 sm:gap-1 whitespace-nowrap text-[10px] sm:text-xs">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 sm:w-5 sm:h-5 shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>
        Customer Support
      </span>

    </div>

    

  </div>
</div>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <SEO
                      title="ACS Cables - Premium Cable & Wire Solutions in India"
                      description="Shop premium quality cables, wires, and electrical solutions at ACS Cables. Best prices with GST billing. Wide range of power cables, coaxial cables, and more."
                      ogUrl="/"
                    />
                    <div className='hidden lg:flex font-semibold px-9 py-2 gap-4 border border-gray-100'>
                      <span>Data cables</span>
                      <span>LAN Cables</span>
                      <span>CCTV cables</span>
                      <span>Power cables</span>
                      <span>Printer cables</span>
                      <span>Computer Accessories</span>
                      <span>Brands</span>
                      <span className='text-red-600'>Deals</span>
                    </div>
                    
                    {/* H1 for SEO: Main site heading describing what the business offers */}
                    <h1 className="sr-only">ACS Cables - India's Trusted Cable and Wire Supplier for Power, LAN, CCTV, and Computer Accessories</h1>
                    
                    <div className='md:px-3 px-2'>
                    <Slider />
                    </div>
                    
                    <div className='md:px-4 px-0 '>
                    <h2 className="text-xl font-bold text-gray-900 px-3 py-2">Featured Products</h2>
                    <FeaturedProducts />
                    </div>
                    
                    <section className="max-w-8xl mx-auto py-1">
                    <h2 className="sr-only">Why Choose ACS Cables</h2>
                    <TopCards />
                    <BottomFeatures />
                    </section>
                  </>
                }
              />
              <Route path="/products" element={<ProductList />} />
              <Route path="/categories" element={<CategoryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersListPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        </Router>
      </OrdersProvider>
    </CartProvider>
  )
}

export default App