import PropTypes from "prop-types";
import { CircularProgress, Typography } from "@mui/material";

const GlobalLoader = ({ globalLoaderText }) => {
  return (
    <div
      className="fixed top-0 left-0 z-[500] bg-black bg-opacity-90 backdrop-blur-md
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
