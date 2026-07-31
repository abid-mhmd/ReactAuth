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
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/profile", { replace: true });
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm rounded-xl bg-white p-7 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Login
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          className="mb-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500"
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
          className="mb-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500"
          {...register("password", {
            required: "Password is required",
          })}
        />

        {errors.password && (
          <p className="mb-3 text-sm text-red-500">{errors.password.message}</p>
        )}

        {error && (
          <p className="mb-4 text-center text-sm text-red-500">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-5 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
