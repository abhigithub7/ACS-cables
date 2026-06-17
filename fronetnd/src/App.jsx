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

const App = () => {
  return (
    
    <CartProvider>
      <OrdersProvider>
        <Router>
          <ScrollToTop/>
        <div>
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Slider />
                    <FeaturedProducts />
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