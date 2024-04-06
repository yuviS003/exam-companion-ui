import { Button } from "@mui/material";
import { heroImg } from "../../../assets";

const Hero = () => {
  return (
    <div
      id="hero"
      className="min-h-[90vh] px-20 flex items-center justify-center gap-20 animate-fade-left animate-once animate-ease-linear animate-duration-100"
    >
      <div className="flex flex-col gap-10 max-w-[650px]">
        <span className="text-6xl font-bold">
          Simplify, Customize, Excel Together
        </span>
        <span className="text-lg text-gray-700">
          Welcome to Quizzo, where creating engaging quizzes and surveys is as
          easy as pie! With our simplified form creation using Excel,
          you&apos;ll be a pro in no time!
        </span>
        <div className="w-fit flex items-center justify-center gap-10">
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
        </div>
      </div>
      <img
        src={heroImg}
        // src="https://astroship.web3templates.com/_astro/hero.6fdd0dc6_Z2mbqjy.webp"
        alt="hero_img"
        className="w-[400px] object-cover"
      />
    </div>
  );
};

export default Hero;
