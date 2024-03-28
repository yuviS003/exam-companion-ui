const team = [
  {
    name: "Aayushmaan Mishra",
    designation: "Developer",
    pic: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?&fit=crop&w=280",
  },
  {
    name: "Yuvraj Singh",
    designation: "Developer",
    pic: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?&fit=crop&w=280",
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
              className="object-cover rounded hover:shadow-lg hover:shadow-black transition"
            />
            <span className="text-xl font-light">{_team.name}</span>
            <span className="text-gray-600">{_team.designation}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutTeam;
