import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { registerUser } from "../services/authService";
import { setCredentials } from "../features/auth/authSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");

      const response = await registerUser(data);

      dispatch(setCredentials(response));

      reset();

      navigate("/profile");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
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
        <h2 className="mb-6 text-center text-3xl font-bold">Register</h2>

        {/* Name */}

        <input
          type="text"
          placeholder="Enter Name"
          className="mb-1 w-full rounded border p-3"
          {...register("name", {
            required: "Name is required",
          })}
        />

        {errors.name && (
          <p className="mb-3 text-sm text-red-500">{errors.name.message}</p>
        )}

        {/* Email */}

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

        {/* Password */}

        <input
          type="password"
          placeholder="Enter Password"
          className="mb-1 w-full rounded border p-3"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />

        {errors.password && (
          <p className="mb-3 text-sm text-red-500">{errors.password.message}</p>
        )}

        {/* Backend Error */}

        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 p-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="font-medium text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
