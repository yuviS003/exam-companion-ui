import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";
import { useInView } from "react-intersection-observer";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    setIsVisible(inView);
  }, [inView]);

  return (
    <div className="min-h-screen flex flex-col pt-2 pb-10 gap-5" id="Contact">
      <div
        ref={ref}
        className={`w-full flex flex-col items-center justify-center gap-5 ${
          isVisible ? "animate-fade-up" : ""
        }`}
      >
        <span className="w-full text-center font-bold text-5xl">Contact</span>
        <span className="w-full text-center text-xl">We are here to help.</span>
        <div className="w-full flex justify-around pt-14 px-10">
          <div className="w-fit flex flex-col gap-3">
            <span className="text-3xl font-bold">Contact Quizzo</span>
            <span className="text-xl text-gray-600">
              Have something to say? We are here to help.
              <br /> Fill up the form or send an email
            </span>
            <div className="text-lg flex flex-col gap-1 pl-1 text-gray-600">
              <div className="flex items-center justify-center gap-2 w-fit">
                <CiLocationOn />
                Lucknow, India
              </div>
              <div className="flex items-center justify-center gap-2 w-fit">
                <MdOutlineMailOutline /> help@quizzo.com
              </div>
            </div>
          </div>
          <form className="w-1/2 flex flex-col items-center justify-center gap-5">
            <input
              type="text"
              required
              placeholder="What is your name ?"
              className="w-full border-2 border-gray-400 rounded-lg p-3 placeholder:text-gray-700 text-xl outline-none ring-0 focus:border-gray-600 transition duration-200"
            />
            <input
              type="email"
              required
              placeholder="Your email address"
              className="w-full border-2 border-gray-400 rounded-lg p-3 placeholder:text-gray-700 text-xl outline-none ring-0 focus:border-gray-600 transition duration-200"
            />
            <textarea
              placeholder="Your message"
              required
              className="w-full border-2 border-gray-400 rounded-lg p-3 placeholder:text-gray-700 text-xl outline-none ring-0 focus:border-gray-600 transition duration-200 resize-none"
              rows={4}
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: "black", color: "white", fontSize: 18 }}
              size="large"
              fullWidth
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
