import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

import { loginUser } from "../services/authService";
import { setCredentials } from "../features/auth/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      setError("");
      setLoading(true);
      const response = await loginUser(data);

      dispatch(setCredentials({ user: response.user, token: response.token }));

      if (response.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("profile");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
      >
        <h2 className="mb-6 text-center text-3xl font-bold">Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          className="mb-1 w-full rounded border p-3"
          {...register("email", {
            required: "Email is required",
          })}
        />

        {errors.email && (
          <p className="mb-3 text-sm text-red-500">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Enter Password"
          className="mb-1 w-full rounded border p-3"
          {...register("password", {
            required: "Password is required",
          })}
        />

        {errors.password && (
          <p className="mb-3 text-sm text-red-500">{errors.password.message}</p>
        )}

        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 p-3 text-white"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
