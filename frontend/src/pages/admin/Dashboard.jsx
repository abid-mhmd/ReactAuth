import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserForm from "../../components/userForm";

import {
  fetchUsers,
  removeUser,
  createUser,
  editUser,
} from "../../features/admin/adminSlice";

function Dashboard() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const { users, loading, error } = useSelector((state) => state.admin);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers(token));
  }, [dispatch, token]);

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

  const handleSubmit = (data) => {
    if (mode === "add") {
      dispatch(createUser({ userData: data, token }));
    } else {
      dispatch(editUser({ id: selectedUser._id, userData: data, token }));
    }
    setShow(false);
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
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users</h1>
        <button
          onClick={handleAddClick}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add User
        </button>
      </div>

      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-3">Name</th>

            <th className="border p-3">Email</th>

            <th className="border p-3">Role</th>

            <th className="border p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="border p-3">{user.name}</td>
                <td className="border p-3">{user.email}</td>
                <td className="border p-3">{user.role}</td>

                <td className="border p-3">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center p-6">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {show && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {mode === "add" ? "Add User" : "Edit User"}
              </h2>

              <button onClick={() => setShow(false)}>✕</button>
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
  );
}

export default Dashboard;
