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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Register
        </h2>


        <input
          type="text"
          placeholder="Enter Name"
          className="mb-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none transition focus:border-blue-500"
          {...register("name", {
            required: "Name is required",
          })}
        />

        {errors.name && (
          <p className="mb-3 ml-1 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}

        <input
          type="email"
          placeholder="Enter Email"
          className="mb-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none transition focus:border-blue-500"
          {...register("email", {
            required: "Email is required",
          })}
        />

        {errors.email && (
          <p className="mb-3 ml-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}

        <input
          type="password"
          placeholder="Enter Password"
          className="mb-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none transition focus:border-blue-500"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />

        {errors.password && (
          <p className="mb-3 ml-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}

        {error && (
          <p className="mb-4 text-center text-sm text-red-500">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-5 text-center text-sm text-gray-600">
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
