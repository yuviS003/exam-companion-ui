import { Button } from "@mui/material";
import axios from "axios";
import ReactPlayer from "react-player";
import { FaDownload } from "react-icons/fa";
import { useEffect, useState } from "react";

const formCreationSteps = [
  "Download the form template and fill it with your questions.",
  "Upload the template.",
  "Review your questionnaire in our automated form editor.",
  "Publish your questionnaire and share the link with your audience.",
  "View the response.",
];

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Overview = () => {
  const [currentAuthUser, setCurrentAuthUser] = useState(null);

  const downloadFreshFormTemplate = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiUrl}/api/excel/downloadFormTemplate`,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJlMzNlMDA3Zi1mMGE4LTQ0MzMtODFhYy1hNjMyMWE5NmVjOTkiLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiY29udGFjdE51bWJlciI6IjEyMzQ1Njc4OTAiLCJnZW5kZXIiOiJNYWxlIiwib3JnYW5pemF0aW9uIjoiRXhhbXBsZSBDb3JwIiwicHJvZmVzc2lvbiI6IlNvZnR3YXJlIERldmVsb3BlciIsInByb2ZpbGVQaG90byI6Imh0dHBzOi8vZXhhbXBsZS5jb20vcHJvZmlsZS5qcGciLCJpYXQiOjE3MDgxNzM1NTcsImV4cCI6MTczOTczMTE1N30.ub51lC5nhsRDd5tCpK1lGkQUIBee0jmxfKQ_ZD3GijQ",
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
        downloadLink.setAttribute("download", `${currentAuthUser?.name}_form.xlsx`); // Set desired file name here
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
      <span className="text-4xl mb-2">
        Hi, {currentAuthUser?.name}
      </span>
      <div className="w-full flex items-center justify-between">
        <p className="text-sm">What are we doing today?</p>
        <p>
          <i>Total Quizzes: 0</i>
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
            url="path_to_your_video.mp4"
            controls
            width="500px"
            height="100%"
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
