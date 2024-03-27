import { Button } from "@mui/material";
import styles from "../../styles";
import Logo from "../Logo/Logo";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Navbar = ({ currentTheme }) => {
  const navigate = useNavigate();
  const routeToLoginPage = () => {
    navigate("login");
  };

  return (
    <div
      className={`${styles.sectionPaddingX} flex justify-between items-center py-6 border-b border-gray-300 dark:border-b-0`}
    >
      <Logo currentTheme={currentTheme} className="w-[120px] bg-cover" />

      {/* NavLinks */}
      <div className="flex items-center justify-center gap-10">
        {["Tutorial", "About", "Contact"].map((navText, i) => (
          <span
            key={i}
            className="text-slate-500 cursor-pointer hover:text-slate-800 active:text-slate-800 transition"
          >
            {navText}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-center gap-5">
        <Button
          variant="text"
          color="inherit"
          sx={{
            textTransform: "capitalize",
          }}
          onClick={routeToLoginPage}
        >
          Log in
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            textTransform: "capitalize",
          }}
          onClick={routeToLoginPage}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  currentTheme: PropTypes.object.isRequired,
};

export default Navbar;
