import { Button } from "@mui/material";
import { heroImg } from "../../../assets";
import darkTheme from "../../../themes/darkTheme";

const Hero = ({ currentTheme }) => {
  return (
    <div
      id="hero"
      className="min-h-[90vh] pt-14 lg:px-20 flex md:items-center justify-center gap-10 lg:gap-20 animate-fade-left animate-once animate-ease-linear animate-duration-100"
    >
      <div className="flex flex-col gap-8 lg:gap-10 max-w-[650px]">
        <span className="text-4xl md:text-5xl lg:text-6xl font-bold">
          Simplify, Customize, Excel Together
        </span>
        <span className={`text-lg ${currentTheme === darkTheme ? "text-gray-300":"text-gray-700"}`}>
          Welcome to Quizzo, where creating engaging quizzes and surveys is as
          easy as pie! With our simplified form creation using Excel,
          you&apos;ll be a pro in no time!
        </span>
        <div className="w-fit flex items-center justify-center gap-10">
          <a href="/login">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              textTransform: "capitalize",
              fontSize: 20,
              mt: "-20px",
              "&:hover": { backgroundColor: "black" },
            }}
            size="large"
          >
            Start Quizzing!
          </Button>
          </a>
        </div>
      </div>
      <img
        src={heroImg}
        // src="https://astroship.web3templates.com/_astro/hero.6fdd0dc6_Z2mbqjy.webp"
        alt="hero_img"
        className="hidden md:block md:w-[300px]  lg:w-[400px] object-cover"
      />
    </div>
  );
};

export default Hero;
