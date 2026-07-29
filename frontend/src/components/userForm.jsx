import { useEffect } from "react";
import { useForm } from "react-hook-form";

const UserForm = ({ mode, onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (mode === "edit" && initialData) {
      reset(initialData);
    } else {
      reset({
        name: "",
        email: "",
        password: "",
        role: "user",
      });
    }
  }, [mode, initialData, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      {/* Name */}
      <div>
        <input
          type="text"
          placeholder="Name"
          className="border p-3 w-full rounded"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
          })}
        />

        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          placeholder="Email"
          className="border p-3 w-full rounded"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email",
            },
          })}
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password (Only while Adding User) */}
      {mode === "add" && (
        <div>
          <input
            type="password"
            placeholder="Password"
            className="border p-3 w-full rounded"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        {mode === "add" ? "Add User" : "Update User"}
      </button>
    </form>
  );
};

export default UserForm;