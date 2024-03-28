import { Button } from "@mui/material";
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Overview = () => {
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
        downloadLink.setAttribute("download", "filename"); // Set desired file name here
        downloadLink.click();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`${apiUrl}/api/excel/uploadFormTemplate`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer your_token_here",
        },
      })
      .then((response) => {
        console.log("File uploaded successfully:", response.data);
        // Add any further logic here after successful file upload
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  return (
    <div className="min-h-[70vh]">
      <Button onClick={downloadFreshFormTemplate}>
        Download Fresh Form Template
      </Button>
      <input
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={handleFileUpload}
        style={{ display: "none" }}
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button component="span">Upload Form Template</Button>
      </label>
    </div>
  );
};

export default Overview;
