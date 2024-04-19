// Tutorial.js

import React, { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useInView } from "react-intersection-observer";

const Tutorial = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1, // Adjust threshold as needed
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    } else {
      setIsVisible(false); // Reset isVisible when out of view
    }
  }, [inView]);
  return (
    <div
      className={`my-10 md:min-h-screen flex flex-col pt-2 pb-10 gap-5 ${
        isVisible ? "animate-fade-up animate-once" : ""
      }`}
      id="Tutorial"
      ref={ref}
    >
      <span className="w-full text-center font-bold text-3xl md:text-5xl">Take a look</span>
      <span className="w-full text-center md:text-xl">
        Quizzo is very easy to use. Here is a quick tutorial.
      </span>
      <div className="w-full flex items-center justify-center pt-5">
        <ReactPlayer
          url="\src\assets\placeholder.mp4"
          controls
          width="700px"
          height="100%"
        />
      </div>
    </div>
  );
};

export default Tutorial;
