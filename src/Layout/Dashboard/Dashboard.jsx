import { RiHomeHeartLine } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-52 min-h-screen  bg bg-cyan-200">
        <ul className="menu space-y-5 ">
          <li className="mx-auto text-2xl">
            <NavLink to="/">
              <RiHomeHeartLine />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="profile">My Profile</NavLink>
          </li>
          <li>
            <NavLink to="myApplication">My Application</NavLink>
          </li>
          <li>
            <NavLink to="myReview">My Reviews</NavLink>
          </li>
        </ul>
      </div>
      <div className=" flex-1 bg-slate-300">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
