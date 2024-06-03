import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// import SocialLogin from "../SocialLogin/SocialLogin";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import Aos from "aos";
import useAuth from "../../AuthProvider/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  const [showPass, setShowPass] = useState(false);
  const { userLogin } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    userLogin(email, password)
      .then((result) => {
        if (result.user) {
          toast.success("Login Successfully", {
            duration: 2000,
          });
          setTimeout(() => {
            navigate(location?.state || "/");
          }, 2000);
        }
      })
      .catch(() => {
        toast.error("Invalid Username or Password");
      });
  };

  return (
    <div data-aos="zoom-in-up">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login- EduSparkle</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="w-full max-w-md p-8 mx-auto mt-20 lg:mt-10 space-y-3 rounded-xl border-2 border-rose-400 dark:text-gray-800">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block dark:text-gray-600">
              Email
            </label>
            <input
              type="name"
              name="email"
              id="email"
              placeholder="email"
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 border-2 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className=" text-red-600">This field is required</span>
            )}
          </div>
          <div className="space-y-1 text-sm relative">
            <label htmlFor="password" className="block dark:text-gray-600">
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 border-2 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className=" text-red-600">This field is required</span>
            )}
            <span
              onClick={() => setShowPass(!showPass)}
              className=" absolute hover:cursor-pointer top-9 right-2"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
            <div className="flex justify-end text-xs dark:text-gray-600">
              <a rel="noopener noreferrer" href="#">
                Forgot Password?
              </a>
            </div>
          </div>
          <button className="block px-5 py-3 text-center mx-auto rounded-full font-semibold bg-rose-400 hover:bg-red-500 hover:text-white hover:font-bold">
            Sign in
          </button>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
          <p className="px-3 text-base dark:text-gray-600">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
        </div>
        <SocialLogin></SocialLogin>
        <p className="text-md text-center sm:px-6 dark:text-gray-600">
          Do not have an account?
          <Link
            to="/register"
            className="underline font-bold text-rose-800 ml-2"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
