import React, { useState } from 'react'

const UserManagement = ({ users = [] }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.firstName || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (user.lastName || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (user.email || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

    const matchesRole = filterRole === 'all' || (user.role || 'customer') === filterRole

    return matchesSearch && matchesRole
  })

  const stats = {
    totalUsers: users.length,
    admins: users.filter((u) => u.role === 'admin').length,
    customers: users.filter((u) => !u.role || u.role === 'customer').length,
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-600">Total Users</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{stats.totalUsers}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-600">Administrators</p>
          <p className="mt-2 text-3xl font-bold text-blue-600">{stats.admins}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-600">Customers</p>
          <p className="mt-2 text-3xl font-bold text-green-600">{stats.customers}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Users</h2>
            <p className="mt-1 text-sm text-slate-600">Manage and view registered users</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-900 placeholder-slate-500 focus:border-purple-900 focus:outline-none"
            />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-purple-900 focus:outline-none"
            >
              <option value="all">All Roles</option>
              <option value="admin">Administrators</option>
              <option value="customer">Customers</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Role</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Joined</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-slate-600">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id || user.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-900 text-xs font-bold text-white">
                          {(user.firstName?.[0] || 'U').toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {user.firstName} {user.lastName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{user.email}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          user.role === 'admin'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {user.role === 'admin' ? 'Administrator' : 'Customer'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        Active
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-slate-600">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>
    </div>
  )
}

export default UserManagement
