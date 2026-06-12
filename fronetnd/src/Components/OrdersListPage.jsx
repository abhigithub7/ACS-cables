import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';

const OrdersListPage = () => {
  const { orders } = useOrders();

  const normalizeStatus = (status) => {
    const normalized = String(status || '').toLowerCase()
    if (normalized === 'processing') return 'Processing'
    if (normalized === 'shipped') return 'Shipped'
    if (normalized === 'delivered') return 'Delivered'
    if (normalized === 'cancelled') return 'Cancelled'
    if (normalized === 'paid') return 'Processing'
    if (normalized === 'pending') return 'Processing'
    return 'Pending'
  }

  const getStatusColor = (status) => {
    const normalized = normalizeStatus(status)
    switch (normalized) {
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    const normalized = normalizeStatus(status)
    switch (normalized) {
      case 'Processing':
        return '⏳';
      case 'Shipped':
        return '🚚';
      case 'Delivered':
        return '✓';
      case 'Cancelled':
        return '✕';
      default:
        return '?';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">No Orders Yet</h2>
          <p className="text-gray-600 mb-8">You haven't placed any orders yet. Start shopping now!</p>
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
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Orders</h1>

        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id || order.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Order Header */}
              <div className="bg-gradient-to-r from-purple-900 to-purple-700 text-white p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-purple-200 text-sm">Order ID</p>
                    <p className="text-xl font-bold">{order.orderId || `ORD-${String(order._id || order.id).slice(-8).toUpperCase()}`}</p>
                  </div>
                  <div>
                    <p className="text-purple-200 text-sm">Order Date</p>
                    <p className="text-xl font-bold">{order.createdAt ? new Date(order.createdAt).toLocaleString() : order.createdAt}</p>
                  </div>
                  <div>
                    <p className="text-purple-200 text-sm">Total Amount</p>
                    <p className="text-xl font-bold">₹{order.totalPrice}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-purple-200 text-sm">Status</p>
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)} {normalizeStatus(order.status)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="p-6">
                {/* Shipping Info */}
                  <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Shipping Address</h3>
                  <p className="text-gray-700">
                    {order.shippingAddress?.street || `${order.firstName || ''} ${order.lastName || ''}`}
                  </p>
                  <p className="text-gray-600">{order.shippingAddress ? `${order.shippingAddress.city || ''}, ${order.shippingAddress.state || ''} ${order.shippingAddress.zipCode || ''}` : order.address}</p>
                  <p className="text-gray-600">📞 {order.shippingAddress?.phone || order.phone || 'N/A'}</p>
                  <p className="text-gray-600">📧 {order.shippingAddress?.email || order.email || 'N/A'}</p>
                  <p className="text-gray-600">💳 Payment Method: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod === 'razorpay' ? 'Razorpay' : order.paymentMethod || 'N/A'}</p>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Order Items</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 pb-3 border-b border-gray-200 last:border-b-0">
                        <img
                          src={item.image || item.product?.image}
                          alt={item.name || item.product?.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-grow">
                          <p className="font-semibold text-gray-800">{item.name || item.product?.name}</p>
                          <p className="text-sm text-gray-600">{item.description || item.product?.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          <p className="font-bold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal:</span>
                      <span>₹{order.totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Shipping:</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Tax:</span>
                      <span>₹0</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between text-lg font-bold text-purple-900">
                        <span>Total:</span>
                        <span>₹{order.totalPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline/Tracking */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Order Timeline</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                        ✓
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Order Placed</p>
                    </div>
                    <div className="flex-grow h-1 bg-gray-300 mx-2"></div>
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                        normalizeStatus(order.status) === 'Shipped' || normalizeStatus(order.status) === 'Delivered'
                          ? 'bg-green-500'
                          : 'bg-gray-300'
                      }`}>
                        🚚
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Shipped</p>
                    </div>
                    <div className="flex-grow h-1 bg-gray-300 mx-2"></div>
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                        normalizeStatus(order.status) === 'Delivered'
                          ? 'bg-green-500'
                          : 'bg-gray-300'
                      }`}>
                        ✓
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Delivered</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button className="flex-grow bg-purple-900 hover:bg-purple-800 text-white py-2 rounded-lg font-semibold transition-colors">
                    Track Order
                  </button>
                  <button className="flex-grow bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 rounded-lg font-semibold transition-colors">
                    Download Invoice
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping Link */}
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="text-purple-900 hover:text-purple-800 font-semibold"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrdersListPage;
