import {
  FaAd,
  FaBook,
  FaCalendar,
  FaEnvelope,
  FaEye,
  FaHeadSideCoughSlash,
  FaHome,
  FaItunesNote,
  FaList,
  FaNotesMedical,
  FaRegBookmark,
  FaSearch,
  FaShoppingCart,
  FaStickyNote,
  FaUpload,
  FaUser,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const Dashboard = () => {
  // const [cart] = useCart();

  //TODO: get isAdmin value from database
  // const [isAdmin] = useAdmin();
  const [role, isLoading] = useRole();
  console.log(role);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (!role) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex">
      {/* dashboard sidebar */}
      <div className="w-64 min-h-screen text-gray-50 bg-gradient-to-b from-red-700 to-violet-900">
        <ul className="menu px-4 py-6 text-md">
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome></FaHome> Admin Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/vieweStudySession">
                  <FaList></FaList> View all Study Session
                  {/* ({cart?.length}) */}
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/viewMaterials">
                  <FaEye></FaEye> View all Materials
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers></FaUsers> All Users
                </NavLink>
              </li>
            </>
          )}

          {role === "student" && (
            <>
              <li>
                <NavLink to="/dashboard/userHome">
                  <FaHome></FaHome> User Home (Student)
                </NavLink>
              </li>
              
              <li>
                <NavLink to="/dashboard/myBooking">
                  <FaRegBookmark></FaRegBookmark> My Booking
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/createNotes">
                  <FaNotesMedical></FaNotesMedical> Create Notes
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/manageNotes">
                  <FaStickyNote></FaStickyNote> Manage Notes
                  {/* ({cart?.length}) */}
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/studyMaterials">
                  <FaHeadSideCoughSlash></FaHeadSideCoughSlash> View Study
                  Materials
                </NavLink>
              </li>

              {/* <li>
                <NavLink to="/dashboard/paymentHistory">
                  <FaList></FaList> Payment Real History
                </NavLink>
              </li> */}
            </>
          )}

          {role === "tutor" && (
            <>
              <li>
                <NavLink to="/dashboard/userHome">
                  <FaHome></FaHome> User Home (Tutor)
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/createStudySession">
                  <FaCalendar></FaCalendar> Create Study Session
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/vieweStudySession">
                  <FaList></FaList> View all Session
                  {/* ({cart?.length}) */}
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/uploadMaterials">
                  <FaUpload></FaUpload> Upload materials
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/viewMaterials">
                  <FaEye></FaEye> View all Materials
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/viewNotes">
                  <FaStickyNote></FaStickyNote> View all Notes
                </NavLink>
              </li>
            </>
          )}

          {/* shared nav links */}
          <div className="divider bg-slate-300"></div>

          <li>
            <NavLink to="/">
              <FaHome></FaHome> Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/order/salad">
              <FaSearch></FaSearch> Menu
            </NavLink>
          </li>

          <li>
            <NavLink to="/order/contact">
              <FaEnvelope></FaEnvelope> Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
