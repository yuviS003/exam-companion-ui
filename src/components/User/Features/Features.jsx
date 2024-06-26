import React, { useEffect, useState } from "react";
import {
  FaClipboardCheck,
  FaComments,
  FaEdit,
  FaFolderOpen,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import darkTheme from "../../../themes/darkTheme";

const features = [
  {
    icon: <FaClipboardCheck size={22} color="white" />,
    title: "Easy Quiz Creation",
    description:
      "Quizzo makes creating quizzes a breeze. Just upload your Excel or CSV files and let Quizzo do the rest.",
  },
  {
    icon: <FaFolderOpen size={22} color="white" />,
    title: "Stay Organized",
    description:
      "Keep all your files neat and tidy with Quizzo's built-in file manager.",
  },
  {
    icon: <FaEdit size={22} color="white" />,
    title: "Customize Your Quizzes",
    description:
      "Tailor your quizzes to fit your needs with Quizzo's user-friendly editing tools.",
  },
  {
    icon: <FaUserFriends size={22} color="white" />,
    title: "Engage Your Audience",
    description:
      "Quizzo helps you captivate your audience with interactive quizzes and surveys.",
  },
  {
    icon: <FaComments size={22} color="white" />,
    title: "Improve Together",
    description:
      "Gather feedback and share results seamlessly with Quizzo's collaboration features.",
  },
  {
    icon: <FaUsers size={22} color="white" />,
    title: "Powered by Community",
    description:
      "Quizzo is driven by a vibrant community of educators and learners, always evolving to meet your needs.",
  },
];

const Features = ({ currentTheme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.3, // Adjust threshold as needed
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
      className={`min-h-screen py-4 md:py-8 md:px-10 flex flex-col gap-5 ${isVisible ? "animate-fade-up animate-once" : ""
        }`}
      id="Features"
      ref={ref}
    >
      <span className="font-bold text-3xl lg:text-5xl">
        Everything you need to create a form
      </span>
      <span className=" lg:text-xl">
        Simplifying your workflow with forms is now easier than ever.
      </span>
      <div className="my-10 md:px-6  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 md:gap-y-20">
        {features.map((feat, i) => (
          <div key={i} className="flex gap-5">
            <span className="bg-black h-fit p-2 rounded-full">{feat.icon}</span>
            <div className="flex flex-col gap-2">
              <span className="font-bold text-xl lg:text-2xl">{feat.title}</span>
              <span className={`${currentTheme === darkTheme ? "text-gray-300" : "text-gray-600"} text-justify text-sm md:text-lg transition`}>
                {feat.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
