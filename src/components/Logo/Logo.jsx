import { Link } from "react-scroll";
import { darkLogo, lightLogo } from "../../assets";
import lightTheme from "../../themes/lightTheme";
import PropTypes from "prop-types";

const Logo = ({ currentTheme, className }) => {
  return (
    <Link
      activeClass="active"
      to="hero"
      spy={true}
      smooth={true}
      offset={-100}
      duration={500}
    >
      <img
        src={currentTheme === lightTheme ? darkLogo : lightLogo}
        alt="logo"
        className={className}
      />
    </Link>
  );
};

Logo.propTypes = {
  currentTheme: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default Logo;
