import { mishra } from "../../../assets";
import { FaLinkedin } from "react-icons/fa";

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
  return (
    <div className="min-h-screen flex flex-col pt-2 pb-10 gap-5" id="About">
      <span className="w-full text-center font-bold text-5xl">About</span>
      <span className="w-full text-center text-xl">
        We are a small passionate team.
      </span>
      <div className="w-full pt-10 flex justify-center gap-20">
        {team.map((_team, i) => (
          <div
            className="flex flex-col items-center justify-center gap-3"
            key={i}
          >
            <img
              src={_team.pic}
              alt="team member"
              className="object-cover rounded hover:shadow-lg hover:shadow-black transition w-[300px]"
            />
            <span className="text-xl font-light">{_team.name}</span>
            <span className="text-gray-600">{_team.designation}</span>
            <a href={_team.linkedIn} target="_blank">
              <FaLinkedin size={25} color="#0A66C2" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutTeam;
