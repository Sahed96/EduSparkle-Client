import { useLocation, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import useAuth from "../../AuthProvider/useAuth";

const SocialLogin = () => {
  const { googleLogin } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = () => {
    googleLogin()
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
      .catch((error) => {
        console.error(error);
      });
  };
  // const handleGitHubLogin = () => {
  //   gitHubLogin()
  //     .then((result) => {
  //       if (result.user) {
  //         toast.success("Login Successfully", {
  //           duration: 2000,
  //         });
  //         setTimeout(() => {
  //           navigate(location?.state || "/");
  //         }, 2000);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

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
