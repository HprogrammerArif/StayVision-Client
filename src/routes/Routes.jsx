import { createBrowserRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
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
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import SessionDetails from '../pages/Home/Session/SessionDetails'
import Main from '../layouts/Main'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/session/:id',
        element: (
          <PrivateRoute>
            <SessionDetails />
          </PrivateRoute>
        ),
      },
      { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
    ],
  },
  

  // {
  //   path: '/dashboard',
  //   element: (
  //     <PrivateRoute>
  //       <DashboardLayout />
  //     </PrivateRoute>
  //   ),
  //   children: [
  //     {
  //       index: true,
  //       element: (
  //         <PrivateRoute>
  //           <Statistics />
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: 'add-room',
  //       element: (
  //         <PrivateRoute>
  //           <HostRoute>
  //             <AddRoom />
  //           </HostRoute>
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: 'my-listings',
  //       element: (
  //         <PrivateRoute>
  //           <HostRoute>
  //             <MyListings />
  //           </HostRoute>
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: 'manage-users',
  //       element: (
  //         <PrivateRoute>
  //           <AdminRoute>
  //             <ManageUsers />
  //           </AdminRoute>
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: 'my-bookings',
  //       element: (
  //         <PrivateRoute>
  //           <MyBookings />
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: 'manage-bookings',
  //       element: (
  //         <PrivateRoute>
  //           <HostRoute>
  //             <ManageBookings />
  //           </HostRoute>
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: 'profile',
  //       element: (
  //         <PrivateRoute>
  //           <Profile />
  //         </PrivateRoute>
  //       ),
  //     },
  //   ],
  // },
])





// import Home from '../pages/Home/Home'
// import ErrorPage from '../pages/ErrorPage'
// import Login from '../pages/Login/Login'
// import SignUp from '../pages/SignUp/SignUp'
// import RoomDetails from '../pages/RoomDetails/RoomDetails'
// import SessionDetails from '../pages/Home/Session/SessionDetails'

// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Main />,
//     errorElement: <ErrorPage />,

//     children: [
//       {
//         path: '/',
//         element: <Home />,
//       },
//       {
//         path: '/room/:id',
//         element: <RoomDetails />,
//       },
//       {
//         path: "/food/:id",
//         element: (
//           //<PrivateRoute>
//             <SessionDetails></SessionDetails>
//           //</PrivateRoute>
//         ),
//         loader: ({ params }) =>
//           fetch(`${import.meta.env.VITE_API_URL}/food/${params.id}`),
//       },
//       { 
//         path: '/login', 
//         element: <Login /> 
//       },
//       { 
//         path: '/signup', 
//         element: <SignUp /> 
//       },
//     ],
//   },
// ])

