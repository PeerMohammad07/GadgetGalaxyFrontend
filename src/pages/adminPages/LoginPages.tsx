import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLogin } from "../../Redux/Slices/userSlice";
import { useDispatch } from "react-redux";
import { adminLoginApi } from "../../Api/adminApi";
import { adminLogin } from "../../Redux/Slices/adminSlice";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email. Please enter a valid email address."),
  password: z
    .string()
    .trim()
    .min(1, "Password cannot be empty.")
    .refine((password) => password.length > 0, {
      message: "Password cannot be only spaces.",
    }),
});

type ILogin = z.infer<typeof loginSchema>;

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [eyeState, setEyeState] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: ILogin) => {
    try {
      setLoading(true);
      const response = await adminLoginApi(data);
      if (response?.data.status) {
        setLoading(false);
        dispatch(adminLogin(response.data.data));
        navigate("/admin/adminDashboard");
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (error.status === 400) {
        setError("password", {
          type: "manual",
          message: "Incorrect password",
        });
      } else if (error.status === 404) {
        setError("email", {
          type: "manual",
          message: "Admin not found with this email",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-sm w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              placeholder="admin@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                type={eyeState ? "text" : "password"}
                id="password"
                {...register("password")}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
                placeholder="Your Password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                onClick={() => setEyeState(!eyeState)}
              >
                {eyeState ? <FaEye /> : <IoEyeOffSharp />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
