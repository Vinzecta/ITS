import { useState, useEffect } from 'react';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    role: "Student"
  });

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost/ITS/Backend/src/Endpoint/admin_access/add_user.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: form.email,
            password: form.password,
            name: form.name,
            role: form.role
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        alert(data.message || data.error || "Failed to create user");
        return;
      }

      alert("User created successfully!");
      setShowModal(false);
      setForm({ email: "", password: "", name: "", role: "Student" });
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Network error!");
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    console.log("Deleting user:", userToDelete);

    try {
      const response = await fetch(
        "http://localhost/ITS/Backend/src/Endpoint/admin_access/delete_user.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ user_id: userToDelete.user_id })
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        alert(data.message || data.error || "Failed to delete user");
        return;
      }

      alert("User deleted successfully");
      setShowDeleteConfirm(false);
      setUserToDelete(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Network error!");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'http://localhost/ITS/Backend/src/Endpoint/admin_access/get_all_users.php',
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUsers(data || []);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch users');
      }
    } catch (err) {
      setError('Network error: Unable to fetch users');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Student':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Teacher':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusBadge = (isActive) => {
    return isActive
      ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
      : 'bg-red-100 text-red-700 border-red-200';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage and monitor all system users
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)} 
          className="flex items-center gap-2 !px-4 !py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
        >
          <PersonAddOutlinedIcon fontSize="small" />
          Add New User
        </button>
      </div>

      {/* Create User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center !z-50">
          <div className="bg-white !p-6 rounded-xl shadow-xl w-full max-w-md flex flex-col gap-4">
            <h3 className="text-lg font-bold text-slate-800">Create New User</h3>

            <input
              type="text"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border !p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border !p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="text"
              placeholder="Name (optional)"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border !p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full border !p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="!px-4 !py-2 rounded-lg bg-slate-200 hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleCreateUser}
                className="!px-4 !py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && userToDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center !z-50">
          <div className="bg-white !p-6 rounded-xl shadow-xl w-full max-w-md">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Confirm Delete</h3>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete user{' '}
              <span className="font-semibold text-slate-800">{userToDelete.email}</span>?
              <br />
              <span className="text-sm text-red-600">This action cannot be undone.</span>
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setUserToDelete(null);
                }}
                className="!px-4 !py-2 rounded-lg bg-slate-200 hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteConfirm}
                className="!px-4 !py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors font-medium"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 !p-4">
        <div className="relative">
          <SearchOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fontSize="small" />
          <input
            type="text"
            placeholder="Search by email or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full !pl-10 !pr-4 !py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg !p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="!px-6 !py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  User ID
                </th>
                <th className="!px-6 !py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="!px-6 !py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="!px-6 !py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="!px-6 !py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Created At
                </th>
                <th className="!px-6 !py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="!px-6 !py-12 text-center text-slate-500">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.user_id} className="hover:bg-slate-50 transition-colors">
                    <td className="!px-6 !py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-slate-700">
                        #{user.user_id}
                      </span>
                    </td>
                    <td className="!px-6 !py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-700">{user.email}</span>
                    </td>
                    <td className="!px-6 !py-4 whitespace-nowrap">
                      <span className={`inline-flex !px-3 !py-1 text-xs font-semibold rounded-full border ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="!px-6 !py-4 whitespace-nowrap">
                      <span className={`inline-flex !px-3 !py-1 text-xs font-semibold rounded-full border ${getStatusBadge(user.is_active)}`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="!px-6 !py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-500">
                        {new Date(user.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </td>
                    <td className="!px-6 !py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          className="!p-2 hover:bg-indigo-50 rounded-lg transition-colors group"
                          title="Edit user"
                        >
                          <EditOutlinedIcon fontSize="small" className="text-slate-400 group-hover:text-indigo-600" />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(user)}
                          className="!p-2 hover:bg-red-50 rounded-lg transition-colors group"
                          title="Delete user"
                        >
                          <DeleteOutlineOutlinedIcon 
                            fontSize="small" 
                            className="text-slate-400 group-hover:text-red-600" 
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="bg-slate-50 !px-6 !py-4 border-t border-slate-200">
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold">{filteredUsers.length}</span> of{' '}
            <span className="font-semibold">{users.length}</span> users
          </p>
        </div>
      </div>
    </div>
  );
}