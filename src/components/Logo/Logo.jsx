import { darkLogo, lightLogo } from "../../assets";
import lightTheme from "../../themes/lightTheme";
import PropTypes from "prop-types";

const Logo = ({ currentTheme, className }) => {
  return (
    <img
      src={currentTheme === lightTheme ? darkLogo : lightLogo}
      alt="logo"
      className={className}
    />
  );
};

Logo.propTypes = {
  currentTheme: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default Logo;
