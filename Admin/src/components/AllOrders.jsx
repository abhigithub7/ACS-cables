import React from 'react'

const statusStyles = {
  pending: 'bg-sky-500/10 text-sky-700',
  paid: 'bg-amber-500/10 text-amber-700',
  shipped: 'bg-indigo-500/10 text-indigo-700',
  delivered: 'bg-emerald-500/10 text-emerald-700',
  cancelled: 'bg-rose-500/10 text-rose-700'
}

const AllOrders = ({ orders, onStatusChange }) => {
  const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">All Orders</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Order Management</h1>
          <p className="mt-1 text-sm text-slate-500">Review order details, update shipping status, and track payments.</p>
        </div>
        <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
          {orders.length} orders
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-4 text-left font-medium uppercase tracking-[0.3em]">Order</th>
                <th className="px-4 py-4 text-left font-medium uppercase tracking-[0.3em]">Customer</th>
                <th className="px-4 py-4 text-left font-medium uppercase tracking-[0.3em]">Total</th>
                <th className="px-4 py-4 text-left font-medium uppercase tracking-[0.3em]">Payment</th>
                <th className="px-4 py-4 text-left font-medium uppercase tracking-[0.3em]">Status</th>
                <th className="px-4 py-4 text-left font-medium uppercase tracking-[0.3em]">Date</th>
                <th className="px-4 py-4 text-left font-medium uppercase tracking-[0.3em]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              {sortedOrders.map((order) => {
                const orderId = order._id || order.id
                const customerName = order.user?.firstName
                  ? `${order.user.firstName} ${order.user.lastName || ''}`.trim()
                  : order.user?.email || order.customer || 'Guest'
                const labelStatus = order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'
                const normalizedStatus = (order.status || 'pending').toLowerCase()
                const createdAt = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'
                const total = order.totalPrice || order.total || 0

                return (
                  <tr key={orderId} className="hover:bg-slate-50">
                    <td className="whitespace-nowrap px-4 py-4 font-medium text-slate-900">{orderId}</td>
                    <td className="px-4 py-4 text-slate-600">{customerName}</td>
                    <td className="px-4 py-4 text-slate-600">₹{total.toFixed(2)}</td>
                    <td className="px-4 py-4 text-slate-600">{order.paymentMethod || 'N/A'}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[normalizedStatus]}`}>
                        {labelStatus}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{createdAt}</td>
                    <td className="px-4 py-4">
                      <select
                        value={order.status || 'pending'}
                        onChange={(event) => onStatusChange(orderId, event.target.value)}
                        className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                )
              })}
              {sortedOrders.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-sm text-slate-500">
                    No orders found. Check back after customers place orders.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AllOrders
