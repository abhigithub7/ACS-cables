import React from 'react'

const statusStyles = {
  pending: 'bg-sky-500/10 text-sky-700',
  paid: 'bg-amber-500/10 text-amber-700',
  shipped: 'bg-indigo-500/10 text-indigo-700',
  delivered: 'bg-emerald-500/10 text-emerald-700',
  cancelled: 'bg-rose-500/10 text-rose-700'
}

const Dashboard = ({ summary, orders, products, users, onStatusChange }) => {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Sales</p>
          <p className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">₹{summary.totalSales.toFixed(2)}</p>
          <p className="mt-2 text-sm text-slate-500">Sales amount from recorded orders.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Orders</p>
          <p className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">{summary.totalOrders}</p>
          <p className="mt-2 text-sm text-slate-500">Total orders in the system.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Customers</p>
          <p className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">{summary.totalCustomers}</p>
          <p className="mt-2 text-sm text-slate-500">Unique customers who placed orders.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Products</p>
          <p className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">{summary.totalProducts}</p>
          <p className="mt-2 text-sm text-slate-500">Active products in inventory.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Users</p>
          <p className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">{summary.totalUsers}</p>
          <p className="mt-2 text-sm text-slate-500">Registered users in the system.</p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Recent Orders</h2>
              <p className="mt-1 text-sm text-slate-500">Monitor delivery status across key orders.</p>
            </div>
            <span className="rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-600">{orders.length} orders</span>
          </div>

          <div className="space-y-3">
            {orders.map((order) => {
              const orderId = order._id || order.id
              const customerName = order.user?.firstName
                ? `${order.user.firstName} ${order.user.lastName || ''}`.trim()
                : order.user?.email || order.customer || 'Guest'
              const labelStatus = order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'
              const normalizedStatus = (order.status || 'pending').toLowerCase()

              return (
                <div key={orderId} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium text-slate-900">{orderId}</p>
                      <p className="text-sm text-slate-500">{customerName}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[normalizedStatus]}`}>
                      {labelStatus}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                    <p className="text-sm text-slate-500">Total: ${(order.totalPrice || order.total || 0).toFixed(2)}</p>
                    <select
                      value={order.status || 'pending'}
                      onChange={(event) => onStatusChange(orderId, event.target.value)}
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 sm:w-auto"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Featured Products</h2>
          <p className="mt-1 text-sm text-slate-500">Featured items from the product catalog.</p>
          <div className="mt-6 space-y-4">
            {products.filter((product) => product.featured).slice(0, 4).map((product) => (
              <div key={product._id || product.id} className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center">
                <img src={product.images?.[0] || product.imageUrl || 'https://via.placeholder.com/64?text=N/A'} alt={product.name} className="h-16 w-full rounded-2xl object-cover sm:w-16" />
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{product.name}</p>
                  <p className="text-sm text-slate-500">{product.category}</p>
                </div>
                <span className="rounded-2xl bg-slate-100 px-3 py-1 text-xs text-slate-700">₹{product.price.toFixed(2)}</span>
              </div>
            ))}
            {products.filter((product) => product.featured).length === 0 && (
              <p className="text-sm text-slate-500">No featured products yet. Add one from the Products page.</p>
            )}
          </div>
          {users && users.length > 0 && (
            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Recent Users</h2>
                  <p className="mt-1 text-sm text-slate-500">Latest registered accounts.</p>
                </div>
                <span className="rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-600">{users.length} total</span>
              </div>
              <div className="space-y-3">
                {users.slice(0, 4).map((user) => (
                  <div key={user._id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium text-slate-900">{user.firstName} {user.lastName}</p>
                      <p className="text-sm text-slate-500">{user.email}</p>
                    </div>
                    <span className="rounded-2xl bg-slate-100 px-3 py-1 text-xs text-slate-700">{new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
