import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getCartCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <Link
            to="/products"
            className="bg-purple-900 hover:bg-purple-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded transition-colors"
                        >
                          −
                        </button>
                        <span className="text-lg font-semibold text-gray-800 w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">
                          ₹{item.price} × {item.quantity}
                        </p>
                        <p className="text-xl font-bold text-purple-900">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition-colors"
                    title="Remove from cart"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Items ({getCartCount()})</span>
                  <span>₹{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>₹0</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-2xl font-bold text-purple-900">
                  <span>Total</span>
                  <span>₹{getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-purple-900 hover:bg-purple-800 text-white py-3 rounded-lg font-semibold transition-colors mb-4"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="block text-center text-purple-900 hover:text-purple-800 font-semibold py-2"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
