import { darkLogo, lightLogo } from "../../assets";
import lightTheme from "../../themes/lightTheme";

const Logo = ({ currentTheme, className }) => {
  return (
    <img
      src={currentTheme === lightTheme ? darkLogo : lightLogo}
      alt="logo"
      className={className}
    />
  );
};

export default Logo;
