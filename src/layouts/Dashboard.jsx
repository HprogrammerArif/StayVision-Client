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
import { FcSettings } from "react-icons/fc";
import { GrLogout } from "react-icons/gr";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { logOut } = useAuth();
  const [role, isLoading] = useRole();
  console.log(role);

  if (isLoading || !role) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex">
      {/* dashboard sidebar */}
      <div className="w-64 flex justify-between flex-col min-h-screen text-gray-900 bg-slate-300 ">
        <div>
          <ul className="menu gap-6 font-medium px-4 py-6 text-md">
           
            {role === "admin" && (
              <>
                <li>
                  <NavLink end to="/dashboard">
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
                  <NavLink end to="/dashboard">
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
              </>
            )}

            {role === "tutor" && (
              <>
                <li>
                  <NavLink end to="/dashboard">
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
          </ul>
        </div>

        {/* shared nav links */}

        <div className="divider"></div>

        <div>
          <ul className="menu gap-4 font-medium px-4 py-6 text-md">
            
            <li>
              <NavLink to="/">
                
                <FaHome></FaHome> Home
              </NavLink>
            </li>

            {/* Profile Menu */}
            <li>
              <NavLink to="/dashboard/profile">
                <FcSettings></FcSettings> Profile
              </NavLink>
            </li>

            {/* logout button */}
            <li>
            <button
              onClick={logOut}
              className="flex w-full items-center px-4 py-2 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
            >
              <GrLogout className="w-5 h-5" />

              <span className="mx-4 font-medium">Logout</span>
            </button>
            </li>
          </ul>
        </div>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
