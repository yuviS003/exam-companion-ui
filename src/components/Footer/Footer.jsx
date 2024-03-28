import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import lightTheme from "../../themes/lightTheme";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Logo from "../Logo/Logo";
import styles from "../../styles";

const Footer = ({ currentTheme, toggleCurrentTheme }) => {
  return (
    <div
      className={`h-[15vh] ${styles.sectionPaddingX} flex justify-between items-center`}
    >
      <Logo currentTheme={currentTheme} className="w-[80px] bg-cover" />
      <span className="text-gray-400 tracking-wider text-sm text-center">
        Copyright © 2024 Quizzo. <br />
        All rights reserved.
      </span>
      <IconButton aria-label="delete" size="small" onClick={toggleCurrentTheme}>
        {currentTheme === lightTheme ? (
          <LightModeIcon fontSize="inherit" />
        ) : (
          <DarkModeIcon fontSize="inherit" />
        )}
      </IconButton>
    </div>
  );
};

Footer.propTypes = {
  currentTheme: PropTypes.object.isRequired,
  toggleCurrentTheme: PropTypes.func.isRequired,
};

export default Footer;
