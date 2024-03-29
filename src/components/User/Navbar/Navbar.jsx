import { Button } from "@mui/material";
import styles from "../../../styles";
import Logo from "../../Logo/Logo";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";

const Navbar = ({ currentTheme }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`${styles.sectionPaddingX} sticky bg-white top-0 left-0 z-[100] flex justify-between items-center py-6`}
    >
      <Logo currentTheme={currentTheme} className="w-[120px] bg-cover" />

      {/* NavLinks */}
      <div className="flex items-center justify-center gap-10">
        {["Features", "Tutorial", "About", "Contact"].map((navText, i) => (
          <Link
            activeClass="active"
            to={navText}
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            key={i}
            className="text-slate-500 cursor-pointer hover:text-slate-800 active:text-slate-800 transition"
          >
            {navText}
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-center gap-5">
        <Button
          variant="text"
          color="inherit"
          sx={{
            textTransform: "capitalize",
          }}
          onClick={() => navigate("/login")}
        >
          Log in
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            textTransform: "capitalize",
            "&:hover": { backgroundColor: "black" },
          }}
          onClick={() => navigate("/signup")}
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
