import {
  FaAd,
  FaBook,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
// import useCart from "../hooks/useCart";
// import useAdmin from "../hooks/useAdmin";
// import useRole from "../hooks/useRole"

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
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu p-4">
          
          {role === 'admin' && (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome></FaHome> Admin Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/addItems">
                  <FaUtensils></FaUtensils> Add Items
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/manageItems">
                  <FaList></FaList> Manage Items
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/bookings">
                  <FaBook></FaBook> Manage Bookings
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers></FaUsers> All Users
                </NavLink>
              </li>
            </>
          )}

          {role === 'student' && (
            <>
              <li>
                <NavLink to="/dashboard/userHome">
                  <FaHome></FaHome> User Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/history">
                  <FaCalendar></FaCalendar> Payment History
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart></FaShoppingCart> My Cart 
                  {/* ({cart?.length}) */}
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/review">
                  <FaAd></FaAd> Add Review
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <FaList></FaList> Payment Real History
                </NavLink>
              </li>
            </>
          )}


          {role === 'tutor' && (
            <>
              <li>
                <NavLink to="/dashboard/userHome">
                  <FaHome></FaHome> User Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/history">
                  <FaCalendar></FaCalendar> Payment History
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart></FaShoppingCart> My Cart 
                  {/* ({cart?.length}) */}
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/review">
                  <FaAd></FaAd> Add Review
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <FaList></FaList> Payment Real History
                </NavLink>
              </li>
            </>
          )}
          

          {/* shared nav links */}
          <div className="divider"></div>

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
