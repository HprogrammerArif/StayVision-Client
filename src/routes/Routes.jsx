import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
// import DashboardLayout from '../../../../b9-stayVista-part4-main/client/src/layouts/DashboardLayout'
// import Statistics from '../../../../b9-stayVista-part4-main/client/src/pages/Dashboard/Common/Statistics'
// import AddRoom from '../../../../b9-stayVista-part4-main/client/src/pages/Dashboard/Host/AddRoom'
// import MyListings from '../../../../b9-stayVista-part4-main/client/src/pages/Dashboard/Host/MyListings'
// import Profile from '../../../../b9-stayVista-part4-main/client/src/pages/Dashboard/Common/Profile'
// import ManageUsers from '../../../../b9-stayVista-part4-main/client/src/pages/Dashboard/Admin/ManageUsers'
// import AdminRoute from './AdminRoute'
// import HostRoute from './HostRoute'
// import MyBookings from '../../../../b9-stayVista-part4-main/client/src/pages/Dashboard/Guest/MyBookings'
// import ManageBookings from '../../../../b9-stayVista-part4-main/client/src/pages/Dashboard/Host/ManageBookings'
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import SessionDetails from "../pages/Home/Session/SessionDetails";
import Main from "../layouts/Main";
import Dashboard from "../layouts/Dashboard";
import UserHome from "../pages/Dashboard/Guest/UserHome";
import MyBookings from "../pages/Dashboard/Guest/MyBookings";
import BookingDetails from "../pages/Dashboard/Guest/BookingDetails";
import CreateNotes from "../pages/Dashboard/Guest/CreateNotes";
import ManageNotes from "../pages/Dashboard/Guest/ManageNotes";
import UpdateItem from "../pages/Dashboard/Guest/UpdateItem";
import StudyMaterials from "../pages/Dashboard/Guest/StudyMaterials";
import TutorRoute from "./TutorRoute";
import CreateStudySession from "../pages/Dashboard/Host/CreateStudySession";
import Profile from "../pages/Dashboard/Common/Profile";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/session/:id",
        element: (
          <PrivateRoute>
            <SessionDetails />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <UserHome></UserHome>,
      },

      //COMMON ROUTE
      {
        path: "profile",
        element: <Profile />,
      },

      //student only routes
      {
        path: "adminHome",
        element: (
          //<AdminRoute>
          <UserHome></UserHome>
        ),
        //</AdminRoute>
      },
      {
        path: "myBooking",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "myBooking/booking-details/:id",
        element: (
          <PrivateRoute>
            <BookingDetails></BookingDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/bookings/details/${params.id}`),
      },
      {
        path: "createNotes",
        element: (
          <PrivateRoute>
            <CreateNotes></CreateNotes>
          </PrivateRoute>
        ),
      },
      {
        path: "manageNotes",
        element: (
          <PrivateRoute>
            <ManageNotes></ManageNotes>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/updateNotes/:id",
        element: (
          <PrivateRoute>
            <UpdateItem></UpdateItem>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/note/${params.id}`),
      },
      {
        path: "studyMaterials",
        element: (
          <PrivateRoute>
            <StudyMaterials></StudyMaterials>
          </PrivateRoute>
        ),
      },

      //TUTOR ROUTE

      {
        path: "createStudySession",
        element: (
          <PrivateRoute>
            <TutorRoute>
              <CreateStudySession></CreateStudySession>
            </TutorRoute>
          </PrivateRoute>
        ),
      },

      //ADMIN ROUTE
      {
        path: 'manage-users',
        element:<ManageUsers></ManageUsers>
      },

      // {
      //   index: true,
      //   element: (
      //     <PrivateRoute>
      //       <Statistics />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: 'add-room',
      //   element: (
      //     <PrivateRoute>
      //       <HostRoute>
      //         <AddRoom />
      //       </HostRoute>
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: 'my-listings',
      //   element: (
      //     <PrivateRoute>
      //       <HostRoute>
      //         <MyListings />
      //       </HostRoute>
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: 'manage-users',
      //   element: (
      //     <PrivateRoute>
      //       <AdminRoute>
      //         <ManageUsers />
      //       </AdminRoute>
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: 'my-bookings',
      //   element: (
      //     <PrivateRoute>
      //       <MyBookings />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: 'manage-bookings',
      //   element: (
      //     <PrivateRoute>
      //       <HostRoute>
      //         <ManageBookings />
      //       </HostRoute>
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: 'profile',
      //   element: (
      //     <PrivateRoute>
      //       <Profile />
      //     </PrivateRoute>
      //   ),
      // },
    ],
  },
]);
