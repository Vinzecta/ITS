// import React, { useState } from 'react';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SearchIcon from '@mui/icons-material/Search';
// import CloseIcon from '@mui/icons-material/Close';

// export default function UserManagement() {
//   const [users, setUsers] = useState([
//     { id: 1, name: 'John Smith', email: 'john.smith@example.com', role: 'Student', status: 'Active', joinDate: '2024-01-15' },
//     { id: 2, name: 'Sarah Johnson', email: 'sarah.j@example.com', role: 'Tutor', status: 'Active', joinDate: '2023-11-20' },
//     { id: 3, name: 'Michael Brown', email: 'michael.b@example.com', role: 'Student', status: 'Active', joinDate: '2024-02-10' },
//     { id: 4, name: 'Emily Davis', email: 'emily.davis@example.com', role: 'Tutor', status: 'Inactive', joinDate: '2023-09-05' },
//     { id: 5, name: 'David Wilson', email: 'david.w@example.com', role: 'Student', status: 'Active', joinDate: '2024-03-01' },
//     { id: 6, name: 'Lisa Anderson', email: 'lisa.a@example.com', role: 'Tutor', status: 'Active', joinDate: '2023-12-12' },
//     { id: 7, name: 'James Taylor', email: 'james.t@example.com', role: 'Student', status: 'Active', joinDate: '2024-01-25' },
//     { id: 8, name: 'Jessica Martinez', email: 'jessica.m@example.com', role: 'Student', status: 'Inactive', joinDate: '2023-10-18' },
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterRole, setFilterRole] = useState('All');
//   const [showModal, setShowModal] = useState(false);
//   const [modalMode, setModalMode] = useState('add');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     role: 'Student',
//     status: 'Active'
//   });

//   const filteredUsers = users.filter(user => {
//     const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesRole = filterRole === 'All' || user.role === filterRole;
//     return matchesSearch && matchesRole;
//   });

//   const handleAdd = () => {
//     setModalMode('add');
//     setFormData({ name: '', email: '', role: 'Student', status: 'Active' });
//     setShowModal(true);
//   };

//   const handleEdit = (user) => {
//     setModalMode('edit');
//     setSelectedUser(user);
//     setFormData({ name: user.name, email: user.email, role: user.role, status: user.status });
//     setShowModal(true);
//   };

//   const handleDelete = (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       setUsers(users.filter(user => user.id !== userId));
//     }
//   };

//   const handleSubmit = () => {
//     if (modalMode === 'add') {
//       const newUser = {
//         id: Math.max(...users.map(u => u.id)) + 1,
//         ...formData,
//         joinDate: new Date().toISOString().split('T')[0]
//       };
//       setUsers([...users, newUser]);
//     } else {
//       setUsers(users.map(user => 
//         user.id === selectedUser.id ? { ...user, ...formData } : user
//       ));
//     }
//     setShowModal(false);
//   };

//   const getRoleBadgeColor = (role) => {
//     return role === 'Tutor' 
//       ? 'bg-purple-100 text-purple-700 border-purple-200' 
//       : 'bg-blue-100 text-blue-700 border-blue-200';
//   };

//   const getStatusBadgeColor = (status) => {
//     return status === 'Active'
//       ? 'bg-green-100 text-green-700 border-green-200'
//       : 'bg-gray-100 text-gray-700 border-gray-200';
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
//           <p className="text-sm text-slate-500 !mt-1">Manage students and tutors in the system</p>
//         </div>
//         <button
//           onClick={handleAdd}
//           className="flex items-center gap-2 !px-4 !py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
//         >
//           <PersonAddIcon fontSize="small" />
//           Add New User
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-lg border border-slate-200 p-4">
//         <div className="flex flex-col sm:flex-row gap-4">
//           {/* Search */}
//           <div className="flex-1 relative">
//             <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fontSize="small" />
//             <input
//               type="text"
//               placeholder="Search by name or email..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full !pl-10 !pr-4 !py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
//             />
//           </div>

//           {/* Role Filter */}
//           <select
//             value={filterRole}
//             onChange={(e) => setFilterRole(e.target.value)}
//             className="!px-4 !py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
//           >
//             <option value="All">All Roles</option>
//             <option value="Student">Student</option>
//             <option value="Tutor">Tutor</option>
//           </select>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-slate-50 border-b border-slate-200">
//               <tr>
//                 <th className="!px-6 !py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">User</th>
//                 <th className="!px-6 !py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</th>
//                 <th className="!px-6 !py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Role</th>
//                 <th className="!px-6 !py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
//                 <th className="!px-6 !py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Join Date</th>
//                 <th className="!px-6 !py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-200">
//               {filteredUsers.map((user) => (
//                 <tr key={user.id} className="hover:bg-slate-50 transition-colors">
//                   <td className="!px-6 !py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
//                         {user.name.split(' ').map(n => n[0]).join('')}
//                       </div>
//                       <span className="font-medium text-slate-800">{user.name}</span>
//                     </div>
//                   </td>
//                   <td className="!px-6 !py-4 text-sm text-slate-600">{user.email}</td>
//                   <td className="!px-6 !py-4">
//                     <span className={`inline-flex !px-2.5 !py-1 rounded-full text-xs font-semibold border ${getRoleBadgeColor(user.role)}`}>
//                       {user.role}
//                     </span>
//                   </td>
//                   <td className="!px-6 !py-4">
//                     <span className={`inline-flex !px-2.5 !py-1 rounded-full text-xs font-semibold border ${getStatusBadgeColor(user.status)}`}>
//                       {user.status}
//                     </span>
//                   </td>
//                   <td className="!px-6 !py-4 text-sm text-slate-600">{user.joinDate}</td>
//                   <td className="!px-6 !py-4">
//                     <div className="flex items-center justify-end gap-2">
//                       <button
//                         onClick={() => handleEdit(user)}
//                         className="!p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
//                         title="Edit"
//                       >
//                         <EditIcon fontSize="small" />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(user.id)}
//                         className="!p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                         title="Delete"
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {filteredUsers.length === 0 && (
//           <div className="text-center !py-12">
//             <p className="text-slate-500">No users found matching your criteria</p>
//           </div>
//         )}
//       </div>

//       {/* Stats Footer */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <div className="bg-white rounded-lg border border-slate-200 !p-4">
//           <p className="text-sm text-slate-600">Total Users</p>
//           <p className="text-2xl font-bold text-slate-800 !mt-1">{users.length}</p>
//         </div>
//         <div className="bg-white rounded-lg border border-slate-200 !p-4">
//           <p className="text-sm text-slate-600">Students</p>
//           <p className="text-2xl font-bold text-blue-600 !mt-1">{users.filter(u => u.role === 'Student').length}</p>
//         </div>
//         <div className="bg-white rounded-lg border border-slate-200 !p-4">
//           <p className="text-sm text-slate-600">Tutors</p>
//           <p className="text-2xl font-bold text-purple-600 !mt-1">{users.filter(u => u.role === 'Tutor').length}</p>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center !p-4">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
//             <div className="flex items-center justify-between !p-6 border-b border-slate-200">
//               <h3 className="text-lg font-bold text-slate-800">
//                 {modalMode === 'add' ? 'Add New User' : 'Edit User'}
//               </h3>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="!p-1 hover:bg-slate-100 rounded-lg transition-colors"
//               >
//                 <CloseIcon fontSize="small" />
//               </button>
//             </div>

//             <div className="!p-6 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 !mb-1">Full Name</label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => setFormData({...formData, name: e.target.value})}
//                   className="w-full !px-3 !py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 !mb-1">Email Address</label>
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({...formData, email: e.target.value})}
//                   className="w-full !px-3 !py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 !mb-1">Role</label>
//                 <select
//                   value={formData.role}
//                   onChange={(e) => setFormData({...formData, role: e.target.value})}
//                   className="w-full !px-3 !py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 >
//                   <option value="Student">Student</option>
//                   <option value="Tutor">Tutor</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 !mb-1">Status</label>
//                 <select
//                   value={formData.status}
//                   onChange={(e) => setFormData({...formData, status: e.target.value})}
//                   className="w-full !px-3 !py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//               </div>

//               <div className="flex gap-3 !pt-4">
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="flex-1 !px-4 !py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSubmit}
//                   className="flex-1 !px-4 !py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
//                 >
//                   {modalMode === 'add' ? 'Add User' : 'Save Changes'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

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

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      console.log("OK")
      setLoading(true);
      const response = await fetch('http://localhost/ITS/Backend/src/Endpoint/admin_access/get_all_users.php', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUsers(data|| []);
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
        <button className="flex items-center gap-2 !px-4 !py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium">
          <PersonAddOutlinedIcon fontSize="small" />
          Add New User
        </button>
      </div>

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
                    <td className="px-6 py-4 whitespace-nowrap">
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
                        <button className="!p-2 hover:bg-indigo-50 rounded-lg transition-colors group">
                          <EditOutlinedIcon fontSize="small" className="text-slate-400 group-hover:text-indigo-600" />
                        </button>
                        <button className="!p-2 hover:bg-red-50 rounded-lg transition-colors group">
                          <DeleteOutlineOutlinedIcon fontSize="small" className="text-slate-400 group-hover:text-red-600" />
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