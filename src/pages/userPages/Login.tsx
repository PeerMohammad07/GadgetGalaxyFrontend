import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { IoEyeOffSharp } from "react-icons/io5";
import { BiLeftArrowAlt } from "react-icons/bi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginApi } from "../../Api/userApi.ts";
import { userLogin } from "../../Redux/Slices/userSlice";
import { useDispatch } from "react-redux";

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email. Please enter a valid email address."),
  password: z.string()
    .trim()
    .min(1, "Password cannot be empty.")
    .refine((password) => password.length > 0, {
      message: "Password cannot be only spaces.",
    }),
});

type ILogin = z.infer<typeof loginSchema>;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [eyeState, setEyeState] = useState(false);
  const { register, handleSubmit, formState: { errors }, setError } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: ILogin) => {
    try {
      setLoading(true);
      const response = await loginApi(data);
      if (response?.data.status) {
        setLoading(false);
        dispatch(userLogin(response.data.data));
        navigate("/");
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
          message: "User not found with this email",
        });
      }
    }
  };

  return (
    <div className="flex flex-col font-sans">
      <header className="flex justify-between items-center p-5">
        <Link to={"/"} className="text-gray-800 text-sm flex items-center">
          <BiLeftArrowAlt className="mr-1" />
          Back
        </Link>
        <Link to={"/register"} className="text-gray-800 text-sm">
          Create Account
        </Link>
      </header>
      <main className="flex flex-col justify-center items-center flex-1 p-5">
        <div className="w-full max-w-md text-center">
          <img src={"/logo.png"} alt="" className="w-15 h-15 mb-5" />
          <h1 className="text-2xl mb-8">Log into Gadget Galaxy</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5 text-left">
              <label htmlFor="email" className="block text-gray-600 text-xs mb-1 uppercase">EMAIL ADDRESS</label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div className="mb-5 text-left">
              <label htmlFor="password" className="block text-gray-600 text-xs mb-1 uppercase">PASSWORD</label>
              <div className="relative">
                <input
                  type={eyeState ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button type="button" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer" onClick={() => setEyeState(!eyeState)}>
                  {eyeState ? <FaEye /> : <IoEyeOffSharp />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <button type="submit" className="w-full p-3 bg-black text-white rounded mt-5 hover:bg-gray-800" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
