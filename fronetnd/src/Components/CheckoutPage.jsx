import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import { createPaymentOrder, verifyPaymentSignature, createOrder as apiCreateOrder } from '../api';

const CheckoutPage = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'cod',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone ||
        !formData.address || !formData.city || !formData.state || !formData.zipCode) {
      setError('Please fill in all required fields');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }

    return true;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCODPayment = async (order) => {
    try {
      setOrderPlaced(true);
      setOrderId(order._id);
      setTimeout(() => {
        clearCart();
        navigate(`/orders/${order._id}`);
      }, 2000);
    } catch (err) {
      setError('Failed to complete order: ' + err.message);
      setLoading(false);
    }
  };

  const handleRazorpayPayment = async (order) => {
    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Unable to load Razorpay. Please try again.');
      }

      // Create payment order on backend
      const totalPrice = parseFloat(getTotalPrice().toFixed(2));
      const paymentRes = await createPaymentOrder(totalPrice, order._id);
      if (!paymentRes.success) {
        throw new Error(paymentRes.message || 'Failed to initiate payment');
      }

      const { razorpayOrderId, amount } = paymentRes.data;

      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: amount,
        currency: 'INR',
        name: 'A Computers',
        description: 'Order Payment',
        order_id: razorpayOrderId,
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#5b21b6',
        },
        handler: async function (response) {
          try {
            setLoading(true);
            // Verify payment signature with backend
            const verifyRes = await verifyPaymentSignature({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: order._id
            });

            if (!verifyRes.success) {
              throw new Error(verifyRes.message || 'Payment verification failed');
            }

            setOrderPlaced(true);
            setOrderId(order._id);
            setTimeout(() => {
              clearCart();
              navigate(`/orders/${order._id}`);
            }, 2000);
          } catch (verifyErr) {
            setError('Payment verification failed: ' + verifyErr.message);
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setError('Payment cancelled. Please try again.');
            setLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setError('Payment error: ' + err.message);
      setLoading(false);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!validateForm()) {
        setLoading(false);
        return;
      }

      // Create order in database
      const orderPayload = {
        items: cartItems.map(item => ({
          product: item._id || item.id,
          quantity: item.quantity
        })),
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: 'India'
        },
        paymentMethod: formData.paymentMethod
      };

      const orderRes = await apiCreateOrder(orderPayload);
      if (!orderRes.success || !orderRes.order) {
        throw new Error(orderRes.message || 'Failed to create order');
      }

      const order = orderRes.order;

      // Handle payment based on method
      if (formData.paymentMethod === 'cod') {
        await handleCODPayment(order);
      } else if (formData.paymentMethod === 'razorpay') {
        await handleRazorpayPayment(order);
      }
    } catch (err) {
      setError(err.message || 'Failed to place order');
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Add products to proceed with checkout.</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-purple-900 hover:bg-purple-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">✓</div>
          <h2 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
          <p className="text-gray-600 mb-8">Your order confirmation has been sent to {formData.email}</p>
          <div className="bg-white rounded-lg p-4 mb-6 shadow-md">
            <p className="text-sm text-gray-600 mb-2">Order ID:</p>
            <p className="text-2xl font-bold text-purple-900">{orderId?.substring(0, 8).toUpperCase()}</p>
          </div>
          <p className="text-sm text-gray-500">Redirecting to order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePlaceOrder} className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="+91 9999999999"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="NY"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Zip Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="10001"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Method</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <label className={`border-2 rounded-lg p-4 cursor-pointer flex items-center gap-3 transition-all ${
                    formData.paymentMethod === 'razorpay' ? 'border-purple-600 bg-purple-50' : 'border-gray-300 hover:border-purple-400'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={formData.paymentMethod === 'razorpay'}
                      onChange={handleInputChange}
                      className="form-radio h-5 w-5 text-purple-600"
                    />
                    <div>
                      <span className="font-semibold text-gray-800">Razorpay</span>
                      <p className="text-xs text-gray-600">Credit/Debit Card, UPI, Wallet</p>
                    </div>
                  </label>
                  
                  <label className={`border-2 rounded-lg p-4 cursor-pointer flex items-center gap-3 transition-all ${
                    formData.paymentMethod === 'cod' ? 'border-purple-600 bg-purple-50' : 'border-gray-300 hover:border-purple-400'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="form-radio h-5 w-5 text-purple-600"
                    />
                    <div>
                      <span className="font-semibold text-gray-800">Cash on Delivery</span>
                      <p className="text-xs text-gray-600">Pay on delivery</p>
                    </div>
                  </label>
                </div>

                <div className="text-sm text-gray-600 p-4 bg-blue-50 rounded-lg">
                  {formData.paymentMethod === 'razorpay'
                    ? '💳 You will be redirected to Razorpay for secure payment. We accept all major cards, UPI, and digital wallets.'
                    : '🏠 Pay with cash when your order is delivered to your address.'}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-4 rounded-lg font-bold text-lg transition-colors"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item._id || item.id} className="flex justify-between items-start pb-4 border-b border-gray-200">
                    <div className="flex-grow">
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">₹{item.price.toFixed(2)} × {item.quantity}</p>
                    </div>
                    <p className="font-bold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>₹0.00</span>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between text-2xl font-bold text-purple-900">
                  <span>Total</span>
                  <span>₹{getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/products')}
                className="w-full mt-6 bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 rounded-lg font-semibold transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
