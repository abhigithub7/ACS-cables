import { createContext, useContext, useEffect, useState } from 'react';
import { createOrder as apiCreateOrder, getOrders as apiGetOrders } from '../api';

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await apiGetOrders();
        if (res && res.success && Array.isArray(res.orders)) {
          setOrders(res.orders);
        }
      } catch (error) {
        console.warn('Unable to load orders:', error.message || error);
      }
    };

    loadOrders();
  }, []);

  const addOrder = async (orderData) => {
    const items = Array.isArray(orderData.items) ? orderData.items : []
    const payload = {
      items: items.map(i => ({ product: i._id || i.id, quantity: i.quantity })),
      shippingAddress: {
        street: orderData.address,
        city: orderData.city,
        state: orderData.state,
        zipCode: orderData.zipCode,
        country: 'India'
      },
      paymentMethod: orderData.paymentMethod || 'cod'
    }

    const res = await apiCreateOrder(payload)
    if (res && res.success && res.order) {
      setOrders(prev => [res.order, ...prev])
      return res.order
    }
    throw new Error(res?.message || 'Failed to create order')
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev =>
      prev.map(order =>
        (order._id === orderId || order.id === orderId)
          ? { ...order, status }
          : order
      )
    );
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order._id === orderId || order.id === orderId);
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        getOrderById,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within OrdersProvider');
  }
  return context;
};
