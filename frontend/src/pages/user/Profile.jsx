import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle, FaCamera } from "react-icons/fa";
import { logout, updateUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
  updateProfile,
  uploadProfileImage,
  getProfile,
} from "../../services/userServices";
import { useEffect, useState } from "react";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();

        dispatch(updateUser(data.user));
      } catch (error) {
        console.log(error);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const data = await updateProfile(formData, token);
      dispatch(updateUser(data.user));
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("profileImage", file);
    try {
      const data = await uploadProfileImage(formData, token);
      dispatch(updateUser(data.user));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white shadow-md p-5">
        <h2 className="text-xl font-semibold text-center mb-5">My Profile</h2>

        <div className="flex flex-col items-center mb-5">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
          ) : (
            <FaUserCircle className="text-7xl text-gray-400" />
          )}

          <label
            htmlFor="profileImage"
            className="mt-3 flex items-center gap-1 text-sm text-blue-600 cursor-pointer hover:underline"
          >
            <FaCamera />
            Choose Photo
          </label>

          <input
            id="profileImage"
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />
        </div>

        {isEditing ? (
          <div className="mt-5 space-y-3">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border rounded-md p-2 outline-none focus:border-blue-500"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border rounded-md p-2 outline-none focus:border-blue-500"
            />

            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Save
              </button>

              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: user.name,
                    email: user.email,
                  });
                }}
                className="flex-1 bg-gray-300 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-5 text-center">
            <h3 className="text-lg font-semibold">{user.name}</h3>

            <p className="text-sm text-gray-600 mt-1">{user.email}</p>

            <span className="inline-block mt-2 rounded-full bg-blue-100 text-blue-700 text-xs px-3 py-1 capitalize">
              {user.role}
            </span>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full mt-5 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            >
              Edit Profile
            </button>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full mt-4 bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
