import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserForm from "../../components/userForm";

import {
  fetchUsers,
  removeUser,
  createUser,
  editUser,
} from "../../features/admin/adminSlice";

import { logout } from "../../features/auth/authSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { users, loading, error, currentPage, totalPages } = useSelector(
    (state) => state.admin,
  );

  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    if (token) {
      dispatch(fetchUsers({ page, limit, token }));
    }
  }, [dispatch, page, token]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    dispatch(removeUser({ id, token }));
  };

  const handleAddClick = () => {
    setMode("add");
    setSelectedUser(null);
    setShow(true);
  };

  const handleEditClick = (user) => {
    setMode("edit");
    setSelectedUser(user);
    setShow(true);
  };

  const handleSubmit = async (data) => {
    if (mode === "add") {
      await dispatch(createUser({ userData: data, token }));
    } else {
      await dispatch(
        editUser({
          id: selectedUser._id,
          userData: data,
          token,
        }),
      );
    }

    setShow(false);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    dispatch(logout());

    navigate("/", { replace: true });
  };

  const filteredUsers = users.filter((user) => {
    const keyword = search.trim().toLowerCase();

    return (
      user.name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword)
    );
  });

  if (loading) {
    return <h2 className="text-center mt-10 text-xl">Loading...</h2>;
  }

  if (error) {
    return <h2 className="text-center mt-10 text-red-500">{error}</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddClick}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
            >
              + Add User
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Role</th>
                <th className="text-center p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium">{user.name}</td>

                    <td className="p-4 text-gray-600">{user.email}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="mt-6 flex justify-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setPage(page - 1)}
              className="rounded border px-2 py-1 text-xs disabled:opacity-40"
            >
              Prev
            </button>

            <span className="rounded border px-3 py-1 text-xs">
              {currentPage}/{totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setPage(page + 1)}
              className="rounded border px-2 py-1 text-xs disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>

        {show && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold">
                  {mode === "add" ? "Add User" : "Edit User"}
                </h2>

                <button
                  onClick={() => setShow(false)}
                  className="text-gray-500 hover:text-red-600 text-xl"
                >
                  ✕
                </button>
              </div>

              <UserForm
                mode={mode}
                initialData={selectedUser}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
