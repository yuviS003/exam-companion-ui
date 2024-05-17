import { Button } from "@mui/material";
import axios from "axios";
import ReactPlayer from "react-player";
import { FaDownload } from "react-icons/fa";
import { useEffect, useState } from "react";
import CompHeading from "../Heading/CompHeading";
import { tutorialVid } from "../../assets/index";

const formCreationSteps = [
  "Download the form template and fill it with your questions.",
  "Upload the template.",
  "Review your questionnaire in our automated form editor.",
  "Publish your questionnaire and share the link with your audience.",
  "View the response.",
];

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const CountingAnimation = ({ start, end, duration, className }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }
      const elapsed = timestamp - startTime;
      const currentCount = start + (end - start) * (elapsed / duration);
      if (elapsed < duration) {
        setCount(Math.floor(currentCount));
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  }, [start, end, duration]);

  return <div className={className}>{count.toLocaleString()}+</div>;
};

const Overview = () => {
  const [currentAuthUser, setCurrentAuthUser] = useState(null);

  const downloadFreshFormTemplate = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiUrl}/api/excel/downloadFormTemplate`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("quizzo_token")}`,
      },
      responseType: "blob", // Set response type to blob
    };

    axios
      .request(config)
      .then((response) => {
        // Create blob from response data
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });

        // Create a download link
        const downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.setAttribute(
          "download",
          `${currentAuthUser?.name}_form.xlsx`
        ); // Set desired file name here
        downloadLink.click();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("quizzo_current_user")) {
      setCurrentAuthUser(
        JSON.parse(localStorage.getItem("quizzo_current_user"))
      );
    }
  }, []);

  return (
    <div className="p-10 flex flex-col">
      <CompHeading heading={`Hi, ${currentAuthUser?.name.split(" ")[0]}`} />

      <div className="w-full flex items-center justify-between">
        <p className="text-sm">What are we doing today?</p>
        <p>
          <i className="flex items-center gap-1">
            Total Quizzes:{" "}
            <CountingAnimation start={0} end={500} duration={1000} />
          </i>
        </p>
      </div>
      <div className="w-full flex items-start justify-between pt-8 pb-14">
        <div className="flex flex-col w-1/2 text-lg leading-loose">
          <p className="text-xl">How easy is it to create a form?</p>
          <ol className="pl-8 list-decimal">
            {formCreationSteps.map((_steps, i) => (
              <li key={i}>{_steps}</li>
            ))}
          </ol>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <ReactPlayer
            url={tutorialVid}
            controls
            width="500px"
            height="100%"
            muted
            playbackRate={1.5}
          />
        </div>
      </div>
      <div className="w-fit flex items-center justify-center gap-5">
        <Button
          variant="contained"
          onClick={downloadFreshFormTemplate}
          sx={{
            backgroundColor: "#4338CA",
            fontSize: 15,
            "&:hover": { backgroundColor: "#4338CA" },
          }}
          startIcon={<FaDownload />}
        >
          Download Fresh Form Template
        </Button>
      </div>
    </div>
  );
};

export default Overview;
