import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import { Toaster } from "react-hot-toast";

const Root = () => {
  return (
    <div>
      <Navbar />

      <Outlet />

      <Footer />
      <Toaster />
    </div>
  );
};

export default Root;
