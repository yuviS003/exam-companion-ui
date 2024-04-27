// import { Button,Drawer,Box } from "@mui/material";
// import styles from "../../../styles";
// import Logo from "../../Logo/Logo";
// import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-scroll";
// import darkTheme from "../../../themes/darkTheme";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { useState } from "react";

// const Navbar = ({ currentTheme }) => {
//   const navigate = useNavigate();
//   const [drawerOpen, setDrowerOpen] = useState(false);

//   const toggleDrawer = (newOpen) => () => {
//     setDrowerOpen(newOpen);
//   };



//   return (
// <>
// <div
//       className={`${styles.sectionPaddingX} sticky ${currentTheme === darkTheme ? "bg-black" : "bg-white"} transition top-0 left-0 z-[100] flex justify-between items-center py-6 animate-fade-up animate-once animate-ease-linear animate-duration-100`}
//     >
//       <Logo currentTheme={currentTheme} className="w-[120px] bg-cover" />

//       {/* NavLinks */}
//       <div className="hidden lg:flex items-center justify-center gap-10">
//         {["Features", "Tutorial", "About", "Contact"].map((navText, i) => (
//           <Link
//             activeClass="active"
//             to={navText}
//             spy={true}
//             smooth={true}
//             offset={-100}
//             duration={500}
//             key={i}
//             className={`${currentTheme === darkTheme ? "text-white hover:text-slate-300 active:text-slate-300" : "text-slate-500 hover:text-slate-800 active:text-slate-800"}  cursor-pointer hover:text-slate-800 active:text-slate-800 transition`}
//           >
//             {navText}
//           </Link>
//         ))}
//       </div>

//       <div className="hidden lg:flex items-center justify-center gap-5">
//         <Button
//           variant="text"
//           color="inherit"
//           sx={{
//             textTransform: "capitalize",
//           }}
//           onClick={() => navigate("/login")}
//         >
//           Log in
//         </Button>
//         <Button
//           variant="contained"
//           sx={{
//             backgroundColor: "black",
//             color: "white",
//             textTransform: "capitalize",
//             "&:hover": { backgroundColor: "black" },
//           }}
//           onClick={() => navigate("/signup")}
//         >
//           Sign up
//         </Button>
//       </div>
//       <button onClick={() => {toggleDrawer(true)}}><GiHamburgerMenu /></button>
//     </div>
//       <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
//       <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}> <div>Aayushmaan</div></Box>

     
//     </Drawer>
// </>
//   );
// };

// Navbar.propTypes = {
//   currentTheme: PropTypes.object.isRequired,
// };

// export default Navbar;
import { Button, Drawer, Box } from "@mui/material";
import styles from "../../../styles";
import Logo from "../../Logo/Logo";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import darkTheme from "../../../themes/darkTheme";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const Navbar = ({ currentTheme }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <div
        className={`${styles.sectionPaddingX} w-full sticky ${
          currentTheme === darkTheme ? "bg-black" : "bg-white"
        } transition top-0 left-0 z-[100] flex justify-between items-center py-6 animate-fade-up animate-once animate-ease-linear animate-duration-100`}
      >
        <Logo currentTheme={currentTheme} className="w-[120px] bg-cover" />

        {/* NavLinks */}
        <div className="hidden lg:flex items-center justify-center gap-10">
          {["Features", "Tutorial", "About", "Contact"].map((navText, i) => (
            <Link
              activeClass="active"
              to={navText}
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              key={i}
              className={`${
                currentTheme === darkTheme
                  ? "text-white hover:text-slate-300 active:text-slate-300"
                  : "text-slate-500 hover:text-slate-800 active:text-slate-800"
              }  cursor-pointer hover:text-slate-800 active:text-slate-800 transition`}
            >
              {navText}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center justify-center gap-5">
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
        <button className="block lg:hidden" onClick={toggleDrawer}><GiHamburgerMenu size={25} /></button>
      </div>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250, position: "relative", height: "100%" }} role="presentation">
          <div className="p-4">
            {["Features", "Tutorial", "About", "Contact"].map((navText, i) => (
              <Link
                key={i}
                to={navText}
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                onClick={toggleDrawer}
                className="block py-2 text-center hover:text-gray-700"
              >
                {navText}
              </Link>
            ))}
          </div>
          <div className="absolute bottom-4 left-0 right-0 p-4">
            <Button
              fullWidth
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
              fullWidth
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
        </Box>
      </Drawer>
    </>
  );
};

Navbar.propTypes = {
  currentTheme: PropTypes.object.isRequired,
};

export default Navbar;

