import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { Button } from "@mui/material";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const UserFeedback = ({ setGlobalLoaderText, setGlobalLoaderStatus }) => {
  // Define state variables for the form input
  const [feedback, setFeedback] = useState("");

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setGlobalLoaderText("Submitting feedback...");
    setGlobalLoaderStatus(true);

    const payload = {
      userId: JSON.parse(localStorage.getItem("quizzo_current_user"))._id,
      userFeedback: feedback,
    };
    console.log("payload", payload);

    try {
      // Simulate a dummy Axios POST call
      const response = await axios.post(
        `${apiUrl}/api/feedback/create`,
        payload
      );

      // Handle the response as needed
      if (response.status === 201) {
        console.log("Successfully submitted feedback.", response);
        // Clear feedback input
        setFeedback("");

        // Show a success notification
        enqueueSnackbar("Feedback recorded successfully!", {
          variant: "success",
        });
      } else {
        // Show an error notification if submission was not successful
        enqueueSnackbar("Failed to submit feedback.", {
          variant: "error",
        });
      }
    } catch (error) {
      // Handle any error during the POST request
      enqueueSnackbar("Error occurred while submitting feedback.", {
        variant: "error",
      });
    } finally {
      // Reset global loader status
      setGlobalLoaderStatus(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 p-5">
      <p className="text-3xl font-bold">Give your feedback!</p>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        {/* Add a label for the feedback textarea */}
        <label htmlFor="feedback" className="text-lg font-medium">
          Your Feedback:
        </label>
        <textarea
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="10"
          placeholder="Enter your feedback here..."
          required
        />
        <Button variant="contained" color="primary" size="large" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UserFeedback;
