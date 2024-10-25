import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { IoEyeOffSharp } from "react-icons/io5";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerApi } from "../../Api/userApi";
import { useDispatch } from "react-redux";
import { userLogin } from "../../Redux/Slices/userSlice";

const registerSchema = z.object({
  name: z.string()
    .trim()
    .min(3, "Name must contain at least 3 letters")
    .refine((name) => name.length > 0, {
      message: "Username cannot be only spaces.",
    }),
  email: z.string()
    .trim()
    .email("Invalid email. Please enter a valid email address."),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password cannot exceed 20 characters")
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase letter.",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must contain at least one lowercase letter.",
    })
    .refine((password) => /\d/.test(password), {
      message: "Password must contain at least one digit.",
    })
    .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
      message: "Password must contain at least one special character.",
    })
    .refine((password) => !/\s/.test(password), {
      message: "Password cannot contain spaces.",
    }),
});

type IRegister = z.infer<typeof registerSchema>;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [eyeState, setEyeState] = useState(false);
  const { register, handleSubmit, formState: { errors }, setError } = useForm<IRegister>({
    resolver: zodResolver(registerSchema)
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: IRegister) => {
    try {
      setLoading(true);
      const response = await registerApi(data);
      if (response?.data.status) {
        setLoading(false);
        dispatch(userLogin(response.data.data));
        navigate("/");
      }
    } catch (error: any) {
      if (error.status === 409) {
        setError("email", {
          type: "manual",
          message: "User already exists with this email",
        });
        setLoading(false);
      } else {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col font-sans">
      <header className="flex justify-between items-center p-5">
        <Link to="/" className="text-gray-800 text-sm flex items-center">
          <BiLeftArrowAlt className="mr-1" />
          Back
        </Link>
        <Link to="/login" className="text-gray-800 text-sm">Log In</Link>
      </header>
      <main className="flex flex-col justify-center items-center flex-1 p-5">
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl mb-8">Create Your Account</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5 text-left">
              <label htmlFor="username" className="block text-xs text-gray-600 mb-1 uppercase">USERNAME</label>
              <input type="text" id="username" {...register("name")} className="w-full p-2 border border-gray-300 rounded" />
              {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div className="mb-5 text-left">
              <label htmlFor="email" className="block text-xs text-gray-600 mb-1 uppercase">EMAIL ADDRESS</label>
              <input type="email" id="email" {...register("email")} className="w-full p-2 border border-gray-300 rounded" />
              {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div className="mb-5 text-left">
              <label htmlFor="password" className="block text-xs text-gray-600 mb-1 uppercase">PASSWORD</label>
              <div className="relative">
                <input type={eyeState ? "text" : "password"} id="password" {...register("password")} className="w-full p-2 border border-gray-300 rounded" />
                <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer" onClick={() => setEyeState(!eyeState)}>
                  {eyeState ? <FaEye /> : <IoEyeOffSharp />}
                </button>
              </div>
              {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <button type="submit" className="w-full py-3 bg-black text-white rounded mt-5" disabled={loading}>
              {loading ? "Creating" : "Create Account"}
            </button>
          </form>
          <p className="text-xs text-gray-600 mt-5">
            By creating an account, you agree to our <Link to="/terms" className="underline">Terms of Service</Link> and have read and understood the <Link to="/privacy" className="underline">Privacy Policy</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
