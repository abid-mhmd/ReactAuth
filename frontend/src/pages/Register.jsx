import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelecter } from "react-redux";
import { register as registerUser } from "../features/auth/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelecter((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await dispatch(registerUser(data));

    if (registerUser.fullfilled.match(result)) {
      navigate("/");
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

        {/* Password  */}

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

        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 p-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
