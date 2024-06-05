/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../AuthProvider/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className=" w-12 h-12 mb-4 mx-auto">
        <div className="grid grid-cols-2 h-full w-full overflow-hidden shadow-lg rounded-full animate-spin">
          <span className="h-6 w-6 rounded-tl-full bg-transparent"></span>
          <span className="h-6 w-6 rounded-tr-full bg-sky-500"></span>
          <span className="h-6 w-6 rounded-bl-full bg-sky-500"></span>
          <span className="h-6 w-6 rounded-br-full"></span>
        </div>
      </div>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate state={location?.pathname} to={"/login"} />;
};

export default PrivateRoute;
