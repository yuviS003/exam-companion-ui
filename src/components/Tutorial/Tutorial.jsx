import ReactPlayer from "react-player";

const Tutorial = () => {
  return (
    <div className="min-h-screen flex flex-col pt-2 pb-10 gap-5" id="Tutorial">
      <span className="w-full text-center font-bold text-5xl">Take a look</span>
      <span className="w-full text-center text-xl">
        Quizzo is very easy to use. Here is a quick tutorial.
      </span>
      <div className="w-full flex items-center justify-center pt-5">
        <ReactPlayer
          url="path_to_your_video.mp4"
          controls
          width="700px"
          height="100%"
        />
      </div>
    </div>
  );
};

export default Tutorial;
