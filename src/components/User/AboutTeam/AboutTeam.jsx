import React, { useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { mishra } from "../../../assets";

const team = [
  {
    name: "Aayushmaan Mishra",
    designation: "Developer",
    pic: mishra,
    linkedIn: "https://www.linkedin.com/in/aayushmaan-mishra/",
  },
  {
    name: "Yuvraj Singh",
    designation: "Developer",
    pic: "https://media.licdn.com/dms/image/C5603AQEMP76RYxr9oQ/profile-displayphoto-shrink_400_400/0/1623302728762?e=1717027200&v=beta&t=Slcy857POGz9YTlUHaB-3oBeDiTstjNY9UcnY40JQVs",
    linkedIn: "https://www.linkedin.com/in/yuvraj-singh-4ab111156/",
  },
];

const AboutTeam = () => {
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
      className={`min-h-screen flex flex-col pt-2 pb-10 gap-5 ${
        isVisible ? "animate-fade-up" : ""
      }`}
      id="About"
      ref={ref}
    >
      <span className="w-full text-center font-bold text-3xl md:text-5xl">About</span>
      <span className="w-full text-center md:text-xl">
        We are a small passionate team.
      </span>
      <div className="w-full pt-10 flex flex-col md:flex-row justify-center gap-10 md:gap-20">
        {team.map((_team, i) => (
          <div
            className="flex flex-col items-center justify-center gap-5"
            key={i}
          >
            <img
              src={_team.pic}
              alt="team member"
              className="object-cover rounded hover:shadow-lg hover:shadow-black transition  h-[220px] w-[200px]"
            />
            <span className="text-xl font-light">{_team.name}</span>
            <span className="text-gray-600">{_team.designation}</span>
            <a href={_team.linkedIn} target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={25} color="#0A66C2" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutTeam;
