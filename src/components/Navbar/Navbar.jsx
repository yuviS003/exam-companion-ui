import { Button } from "@mui/material";
import styles from "../../styles";
import Logo from "../Logo/Logo";
import PropTypes from "prop-types";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const Navbar = ({ currentTheme }) => {
  const navigate = useNavigate();
  const routeToLoginPage = () => {
    navigate("login");
  };

  return (
    <div
      className={`${styles.sectionPaddingX} flex justify-between items-center py-6 border-b border-gray-300`}
    >
      <Logo currentTheme={currentTheme} className="w-[120px] bg-cover" />
      <Button
        variant="outlined"
        color="inherit"
        startIcon={<LogoutIcon />}
        onClick={routeToLoginPage}
      >
        Login
      </Button>
    </div>
  );
};

Navbar.propTypes = {
  currentTheme: PropTypes.object.isRequired,
};

export default Navbar;
