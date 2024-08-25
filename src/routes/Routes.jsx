import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
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
import AllSession from "../pages/Home/Session/AllSession";
import ViewAllSession from "../pages/Dashboard/Host/ViewAllSession";
import UpdateSession from "../pages/Home/Session/UpdateSession";
import ViewAllSessionByAdmin from "../pages/Dashboard/Admin/ViewAllSessionByAdmin";
import RejectDetails from "../pages/Dashboard/Host/RejectDetails";
import UploadMaterials from "../pages/Dashboard/Host/UploadMaterials";
import UploadMaterialForm from "../pages/Dashboard/Host/UploadMaterialForm";
import ViewMaterials from "../pages/Dashboard/Host/ViewMaterials";
import UpdateMaterials from "../pages/Dashboard/Host/UpdateMaterials";
import ViewAllMaterials from "../pages/Dashboard/Admin/ViewAllMaterials";
import BookingMaterials from "../pages/Dashboard/Guest/BookingMaterials";
import ViewBookedMaterials from "../pages/Dashboard/Guest/ViewBookedMaterials";

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
      {
        path: "/all-session",
        element: (
          <PrivateRoute>
            <AllSession />
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
        path: "studyMaterials",
        element: (
          <PrivateRoute>
            <BookingMaterials />
          </PrivateRoute>
        ),
      },

      {
        path: "studyMaterials/view-booked-materials/:id",
        element: (
          <PrivateRoute>
            <ViewBookedMaterials />
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
          fetch(
            `${import.meta.env.VITE_API_URL}/bookings/details/${params.id}`
          ),
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

      {
        path: "view-all-materials",
        element: (
          <PrivateRoute>
            <ViewAllMaterials></ViewAllMaterials>
          </PrivateRoute>
        ),
      },

      {
        path: "view-all-materials/updateMaterials/:id",
        element: (
          <PrivateRoute>
            <UpdateMaterials></UpdateMaterials>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/updateMaterials/${params.id}`),
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
      {
        path: "vieweStudySession",
        element: (
          <PrivateRoute>
            <TutorRoute>
              <ViewAllSession></ViewAllSession>
            </TutorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "uploadMaterials",
        element: (
          <PrivateRoute>
            <TutorRoute>
              <UploadMaterials></UploadMaterials>
            </TutorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "viewMaterials",
        element: (
          <PrivateRoute>
            <TutorRoute>
              <ViewMaterials></ViewMaterials>
            </TutorRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "viewMaterials/updateMaterials/:id",
        element: (
          <PrivateRoute>
            <UpdateMaterials></UpdateMaterials>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/updateMaterials/${params.id}`),
      },

      {
        path: "uploadMaterials/uploadDetails/:id",
        element: (
          <PrivateRoute>
            <UploadMaterialForm></UploadMaterialForm>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/uploadDetails/${params.id}`),
      },

      {
        path: "vieweStudySession/update/:id",
        element: (
          <PrivateRoute>
            <UpdateSession></UpdateSession>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/session/${params.id}`),
      },
      {
        path: "vieweStudySession/rejectDetails/:id",
        element: (
          <PrivateRoute>
            <RejectDetails></RejectDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/rejectDetails/${params.id}`),
      },

      //ADMIN ROUTE
      {
        path: "manage-users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "viewSession",
        element: (
          <PrivateRoute>
            <ViewAllSessionByAdmin />
          </PrivateRoute>
        ),
      },
      {
        path: "viewSession/update/:id",
        element: (
          <PrivateRoute>
            <UpdateSession></UpdateSession>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/session/${params.id}`),
      },
    ],
  },
]);
