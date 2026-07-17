import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  getStateFromPincode,
  getGST,
  getDeliveryCharge,
  calculatePriceBreakdown
} from '../utils/gstCalculator';
import SEO from './SEO';

const CartPage = () => {
  return (
    <>
      <SEO
        title="Shopping Cart - ACS Cables"
        description="Review your shopping cart at ACS Cables. View items, calculate GST and delivery charges, and proceed to checkout securely."
        ogUrl="/cart"
      />
      <CartPageContent />
    </>
  );
};

const CartPageContent = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getCartCount } = useCart();
  const [pincode, setPincode] = useState('');
  const [deliveryState, setDeliveryState] = useState(null);
  const [pincodeError, setPincodeError] = useState('');

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPincode(value);
    setPincodeError('');

    if (value.length === 6) {
      const state = getStateFromPincode(value);
      if (state) {
        setDeliveryState(state);
        setPincodeError('');
      } else {
        setDeliveryState(null);
        setPincodeError('Could not identify delivery state for this pincode. Please check it is a valid Indian pincode.');
      }
    } else {
      setDeliveryState(null);
    }
  };

  const subtotal = getTotalPrice();
  const priceBreakdown = deliveryState
    ? calculatePriceBreakdown(subtotal, deliveryState)
    : null;
  const gstDetails = deliveryState ? getGST(deliveryState) : null;
  const deliveryCharge = deliveryState ? getDeliveryCharge(deliveryState) : 0;

  const formatGstLabel = (gst) => {
    if (gst.type === 'intra-state') {
      return `CGST 9% + SGST 9%`;
    } else if (gst.type === 'inter-state') {
      return `IGST 18%`;
    }
    return '—';
  };

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
                    className="flex gap-2 sm:gap-4 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0"
                  >
                    {/* Product Image */}
                    <div className="w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-1 rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow min-w-0">
                      <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-4 overflow-hidden text-ellipsis whitespace-nowrap">{item.description}</p>

                      {/* Quantity and Price */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded transition-colors text-sm sm:text-base"
                          >
                            −
                          </button>
                          <span className="text-base sm:text-lg font-semibold text-gray-800 w-6 sm:w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded transition-colors text-sm sm:text-base"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">
                            ₹{item.price} × {item.quantity}
                          </p>
                          <p className="text-base sm:text-xl font-bold text-purple-900">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 sm:p-2 rounded transition-colors shrink-0 self-start"
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

              {/* Pincode Input */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Delivery Pincode
                </label>
                <input
                  type="text"
                  value={pincode}
                  onChange={handlePincodeChange}
                  placeholder="Enter 6-digit pincode"
                  maxLength={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-center tracking-widest text-lg"
                />
                {deliveryState && (
                  <p className="text-sm text-green-600 mt-2 font-medium">
                    ✓ Delivering to <span className="font-bold">{deliveryState}</span>
                  </p>
                )}
                {pincodeError && (
                  <p className="text-sm text-red-600 mt-2">{pincodeError}</p>
                )}
                {!pincode && (
                  <p className="text-xs text-gray-500 mt-2">
                    Enter pincode to calculate GST and delivery charges
                  </p>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Items ({getCartCount()})</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                {/* Delivery Charge */}
                {deliveryState ? (
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery Charge</span>
                    <span className="font-semibold text-green-600">
                      ₹{deliveryCharge.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery Charge</span>
                    <span className="text-gray-400">—</span>
                  </div>
                )}

                {/* GST */}
                {gstDetails ? (
                  <>
                    <div className="border-t border-gray-200 pt-3">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                        Tax Breakdown {gstDetails.type === 'intra-state' ? '(Intra-State)' : '(Inter-State)'}
                      </p>
                      {gstDetails.type === 'intra-state' ? (
                        <>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>CGST (9%)</span>
                            <span>₹{(priceBreakdown.gst.amount / 2).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>SGST (9%)</span>
                            <span>₹{(priceBreakdown.gst.amount / 2).toFixed(2)}</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>IGST (18%)</span>
                          <span>₹{priceBreakdown.gst.amount.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between text-gray-700">
                    <span>GST</span>
                    <span className="text-gray-400">—</span>
                  </div>
                )}
              </div>

              {/* Total */}
              {priceBreakdown ? (
                <>
                  <div className="border-t border-gray-200 pt-4 mb-2">
                    <div className="flex justify-between text-lg text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{priceBreakdown.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>+ GST ({formatGstLabel(gstDetails)})</span>
                      <span>₹{priceBreakdown.gst.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>+ Delivery</span>
                      <span>₹{priceBreakdown.deliveryCharge.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between text-2xl font-bold text-purple-900">
                      <span>Total</span>
                      <span>₹{priceBreakdown.total.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-2xl font-bold text-purple-900">
                    <span>Total</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  const state = deliveryState || '';
                  navigate(`/checkout?pincode=${pincode}&state=${encodeURIComponent(state)}`);
                }}
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
