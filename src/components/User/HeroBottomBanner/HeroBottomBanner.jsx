import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const HeroBottomBanner = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.3, // Adjust threshold as needed
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [inView]);

  return (
    <div
      className={`mb-20 w-full rounded-xl bg-black text-white flex flex-col items-center justify-center gap-5 md:gap-8  py-10 md:py-32 ${
        isVisible ? "animate-fade-up" : ""
      }`}
      ref={ref}
    >
      <span className="font-bold text-2xl md:text-6xl">Build forms faster</span>
      <span className="text-sm mx-4 md:text-xl text-gray-500 max-w-[850px] text-center">
        Get started now! Click to create your first form and unlock the power of
        seamless form creation. Let&apos;s begin!
      </span>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "white",
          color: "black",
          fontSize: 18,
          "&:hover": {
            backgroundColor: "white",
          },
        }}
        size="large"
        onClick={() => navigate("/signup")}
      >
        Get Started
      </Button>
    </div>
  );
};

export default HeroBottomBanner;
