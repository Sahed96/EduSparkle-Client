import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/LoginPage/Login";
import Register from "../Pages/RegisterPage/Register";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AllScholarship from "../Pages/AllScholarship/AllScholarship";
import ScholarshipDetails from "../Pages/ScholarshipDetails/ScholarshipDetails";
import PrivateRoute from "./Private/PrivateRoute";
import CheckOut from "../Pages/CheckOut/CheckOut";
import ApplicantForm from "../Pages/ApplicantForm/ApplicantForm";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Profile from "../Layout/Dashboard/Page/Profile.jsx/Profile";
import MyApplication from "../Layout/Dashboard/Page/MyApplication/MyApplication";
import MyReviews from "../Layout/Dashboard/Page/MyReviews/MyReviews";
import Users from "../Layout/Dashboard/Page/Users/Users";
import ManageScholarship from "../Layout/Dashboard/Page/ManageScholarship/ManageScholarship";
import AddScholarship from "../Layout/Dashboard/Page/AddScholarship/AddScholarship";
import ManageReview from "../Layout/Dashboard/Page/ManageReview/ManageReview";
import ManageApplication from "../Layout/Dashboard/Page/ManageApplication/ManageApplication";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/scholarships",
        element: <AllScholarship />,
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/checkout/:id",
        element: (
          <PrivateRoute>
            <CheckOut />
          </PrivateRoute>
        ),
      },
      {
        path: "/applyForm/:transId",
        element: (
          <PrivateRoute>
            <ApplicantForm />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "manageUser",
        element: <Users />,
      },
      {
        path: "myApplication",
        element: (
          <PrivateRoute>
            <MyApplication />
          </PrivateRoute>
        ),
      },
      {
        path: "myReview",
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      {
        path: "manageScholarship",
        element: (
          <PrivateRoute>
            <ManageScholarship />
          </PrivateRoute>
        ),
      },
      {
        path: "addScholarship",
        element: (
          <PrivateRoute>
            <AddScholarship />
          </PrivateRoute>
        ),
      },
      {
        path: "manageReview",
        element: (
          <PrivateRoute>
            <ManageReview />
          </PrivateRoute>
        ),
      },
      {
        path: "manageApplication",
        element: (
          <PrivateRoute>
            <ManageApplication />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
