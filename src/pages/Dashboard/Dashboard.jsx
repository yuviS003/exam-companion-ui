import PropTypes from "prop-types";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Dashboard = ({ currentTheme }) => {
  return (
    <div>
      <Navbar currentTheme={currentTheme} />
      <Outlet />
    </div>
  );
};

Dashboard.propTypes = {
  currentTheme: PropTypes.object.isRequired,
};

export default Dashboard;
