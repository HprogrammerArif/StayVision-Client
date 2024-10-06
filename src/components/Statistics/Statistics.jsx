
import PropTypes from "prop-types";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../Shared/LoadingSpinner";
import AdminStatistics from "./AdminStatistics";
import StudentStatistics from "./StudentStatistics";
import TutorStatistics from "./TutorStatistics";


const Statistics = () => {
  const [role, isLoading] = useRole();
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return <>{role === "admin" && <AdminStatistics></AdminStatistics>}
  {role === "tutor" && <TutorStatistics></TutorStatistics>}
  {role === "student" && <StudentStatistics></StudentStatistics>}
  </>;
};

Statistics.propTypes = {
  isLoading: PropTypes.bool,
};

export default Statistics;
