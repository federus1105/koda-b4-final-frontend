import { Eye, EyeOff, Link2, LockKeyhole, Mail } from "lucide-react";
import React, { useState } from "react";
import { useLogin } from "../../hooks/UseValidation";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../service/authService";
import { toast } from "react-toastify";
import { login, setCurrentUser } from "../../redux/slice/authSlice";
import { profileUser } from "../../service/profileService";

function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const { formData, errors, handleChange, validate } = useLogin();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    try {
      const data = await loginUser(formData);
      dispatch(
        login({
          token: data.results.token,
        })
      );

      // --- FETCH PROFILE USER ---
      const profile = await profileUser();
      dispatch(setCurrentUser(profile.results));

      toast.success("Login berhasil!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Terjadi kesalahan!, Silahkan coba lagi.");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen px-4 md:px-8 bg-[#EFF6FF] space-y-8 md:space-y-10">
        <div className="flex items-center gap-2 mb-4 md:mb-7">
          <Link2 color="blue" size={34} />
          <p className="text-2xl font-semibold">Koda Shortlink</p>
        </div>
        {/* HEADER */}
        <header className="flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-[40px] font-bold">Welcome Back</h1>
          <p className="text-gray-500 font-medium text-sm md:text-base">
            Sign in to your account to continue
          </p>
        </header>

        {/* CARD FORM */}
        <div className="shadow-xl rounded-xl p-6 md:p-10 bg-white space-y-6 w-full sm:w-3/4 md:w-2/3 lg:w-1/3">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-stone-700"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                  size={20}
                />

                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3.5 border border-stone-200 rounded-xl bg-white focus:border-gray-400 focus:outline-none text-sm md:text-base"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-sm block mt-1">
                  {errors.email}
                </span>
              )}
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-stone-700"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                  size={20}
                />

                <input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3.5 border border-stone-200 rounded-xl bg-white focus:border-gray-400 focus:outline-none text-sm md:text-base"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <p className="text-blue-500 text-right cursor-pointer text-sm md:text-base">
              Forgot password?
            </p>

            {/* SUBMIT */}

            <button
              type="submit"
              className="cursor-pointer w-full bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-800"
            >
              Sign In
            </button>
          </form>

          {/* DIVIDER */}
          <div className="relative text-center my-6 md:my-8">
            <hr className="border-t-2 border-stone-200" />
            <span className="absolute top-1/2 left-1/2 px-4 md:px-6 -translate-x-1/2 -translate-y-1/2 bg-white text-stone-500 font-medium text-sm md:text-base">
              Or
            </span>
          </div>

          {/* SOCIAL LOGIN */}
          <button className="cursor-pointer flex items-center justify-center gap-2 border border-gray-300 w-full rounded-lg py-2 bg-white">
            <img src="/google.png" className="w-5 h-5 md:w-6 md:h-6" />
            <span className="font-semibold text-stone-700 text-sm md:text-base">
              Continue with Google
            </span>
          </button>
        </div>

        {/* SIGN UP LINK */}
        <p className="text-sm md:text-base">
          Don't have an account?
          <Link to={"/auth/register"}>
            <span className="text-blue-500 cursor-pointer ml-1">Sign up</span>
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
