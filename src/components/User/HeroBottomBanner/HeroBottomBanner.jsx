import { Button } from "@mui/material";

const HeroBottomBanner = () => {
  return (
    <div className="mb-20 w-full rounded-xl bg-black text-white flex flex-col items-center justify-center gap-8 py-32">
      <span className="font-bold text-6xl">Build forms faster</span>
      <span className="text-xl text-gray-500 max-w-[850px] text-center">
        Get started now! Click to create your first form and unlock the power of seamless form creation. Let's begin!
      </span>
      <Button
        variant="contained"
        sx={{ backgroundColor: "white", color: "black", fontSize: 18 }}
        size="large"
      >
        Get Started
      </Button>
    </div>
  );
};

export default HeroBottomBanner;
