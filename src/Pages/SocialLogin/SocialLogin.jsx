import { useNavigate } from "react-router-dom";

// import toast from "react-hot-toast";
import useAuth from "../../AuthProvider/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  // const location = useLocation();

  const handleGoogleLogin = () => {
    googleLogin().then((result) => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    });
  };

  return (
    <div className="flex justify-center space-x-4">
      <button
        onClick={handleGoogleLogin}
        aria-label="Log in with Google"
        className="p-3 rounded-sm"
      >
        <img
          className="h-10 w-10"
          src="https://i.imgur.com/7EJXDUm.png"
          alt=""
        />
      </button>
    </div>
  );
};

export default SocialLogin;
