import PropTypes from "prop-types";
import { CircularProgress, Typography } from "@mui/material";

const GlobalLoader = ({ globalLoaderText }) => {
  return (
    <div
      className="fixed top-0 left-0 z-10 bg-black bg-opacity-70 
       transition-opacity h-screen w-screen flex justify-center items-center flex-col gap-4"
    >
      <CircularProgress color="inherit" />
      <Typography sx={{ color: "#fff" }}>{globalLoaderText}</Typography>
    </div>
  );
};

GlobalLoader.propTypes = {
  globalLoaderText: PropTypes.string,
};

GlobalLoader.defaultProps = {
  globalLoaderText: "Loading...",
};

export default GlobalLoader;
