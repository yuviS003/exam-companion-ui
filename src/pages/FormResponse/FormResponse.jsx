import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormResponseQuesCard from "../../components/Cards/FormResponseQuesCard";
import Navbar from "../../components/User/Navbar/Navbar";
import { Button } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import AuthDialog from "../../components/Dialogs/AuthDialog";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Lottie from "react-lottie";
import animationData from "../../assets/Animation.json"; // Import your Lottie JSON file

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const LottieAnimation = () => {
  const defaultOptions = {
    loop: false, // Set to false if you don't want the animation to loop
    autoplay: true, // Set to false if you want to control the animation manually
    animationData: animationData, // The imported Lottie JSON file
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={250} width={350} />
    </div>
  );
};

const FormResponse = ({
  setGlobalLoaderText,
  setGlobalLoaderStatus,
  currentTheme,
}) => {
  const [currentFormData, setCurrentFormData] = useState([]);
  const [currentFormQuestions, setCurrentFormQuestions] = useState([]);
  const [openAuthDialog, setOpenAuthDialog] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [filledFormResponse, setFilledFormResponse] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const fetchFormData = async () => {
    // Set loader text and status
    setGlobalLoaderText("Loading form data...");
    setGlobalLoaderStatus(true);

    const formId = location.pathname.split("/")[3];
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiUrl}/api/form/${formId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("quizzo_token")}`,
      },
    };

    try {
      const response = await axios.request(config);

      console.log("response", response.data);

      if (response.data.length) {
        setCurrentFormData(response.data[0]);
        setCurrentFormQuestions(
          JSON.parse(response.data[0].formQuestions).map((_question) => {
            return { ..._question, Answer: [] };
          })
        );
        console.log("currentFormQuestions", currentFormQuestions);
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
      enqueueSnackbar(
        error?.response?.data?.message || error?.message || "API ERROR",
        {
          variant: "error",
        }
      );
    } finally {
      // Hide loader
      setGlobalLoaderStatus(false);
    }
  };

  const handleCheckboxChange = (value, checked, index) => {
    console.log(currentFormQuestions[index]);
    console.log(value, checked, index);

    const questionToBeUpdated = currentFormQuestions[index];

    if (checked) {
      questionToBeUpdated.Answer.push(value);
    } else {
      questionToBeUpdated.Answer = questionToBeUpdated.Answer.filter(
        (_ans) => _ans !== value
      );
    }
    console.log("questionToBeUpdated", questionToBeUpdated);

    currentFormQuestions[index] = questionToBeUpdated;
  };

  const handleRadioChange = (event, index) => {
    console.log(event, index);
    const questionToBeUpdated = currentFormQuestions[index];
    questionToBeUpdated.Answer = [event];
    console.log("questionToBeUpdated", questionToBeUpdated);

    currentFormQuestions[index] = questionToBeUpdated;
  };

  const handleDropDownChange = (event, index) => {
    console.log(event, index);
    const questionToBeUpdated = currentFormQuestions[index];
    questionToBeUpdated.Answer = [event];
    console.log("questionToBeUpdated", questionToBeUpdated);

    currentFormQuestions[index] = questionToBeUpdated;
  };

  const saveFormResponse = () => {
    const isFormFilled = currentFormQuestions.every(
      (question) => question.Answer.length > 0
    );

    if (isFormFilled) {
      console.log("form is filled", currentFormQuestions);

      const isUserLoggedIn = localStorage.getItem("quizzo_current_user");

      if (isUserLoggedIn) {
        setGlobalLoaderText("Saving your response... Keep Quizzing!");
        setGlobalLoaderStatus(true);
        const currentUser = JSON.parse(isUserLoggedIn);
        console.log("User is logged in", currentUser);
        const payload = {
          formId: currentFormData.formId,
          userId: currentUser._id,
          form_response: JSON.stringify(currentFormQuestions),
        };
        console.log("payload", payload);
        let data = JSON.stringify(payload);

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${apiUrl}/api/response/create`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("quizzo_token")}`,
          },
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            setIsFormFilled(true);
          })
          .catch((error) => {
            console.log(error);
            enqueueSnackbar(
              error?.response?.data?.message || error?.message || "API ERROR",
              {
                variant: "error",
              }
            );
          })
          .finally(() => {
            setGlobalLoaderStatus(false);
          });
      }
    } else {
      console.log("form is not filled");
      const questionToBeFilled = currentFormQuestions.find(
        (question) => question.Answer.length === 0
      );
      console.log("questionToBeFilled", questionToBeFilled);
      enqueueSnackbar(
        `Question ${questionToBeFilled["S.No"]} is not answered!`,
        {
          variant: "error",
        }
      );
    }
  };

  const checkResponseExists = () => {
    setGlobalLoaderText("Preparing form...");
    setGlobalLoaderStatus(true);
    const currentUser = JSON.parse(localStorage.getItem("quizzo_current_user"));
    const formId = location.pathname.split("/")[3];
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiUrl}/api/response/getById?formId=${formId}&userId=${currentUser._id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("quizzo_token")}`,
      },
    };
    axios
      .request(config)
      .then((response) => {
        console.log("response", response.data);
        if (response.data) {
          console.log("form is already filled");
          setFilledFormResponse(response.data);
          setIsFormFilled(true);
          setGlobalLoaderStatus(false);
        } else {
          fetchFormData();
        }
      })
      .catch((error) => {
        console.error("Error fetching response data:", error);
        enqueueSnackbar(
          error?.response?.data?.message || error?.message || "API ERROR",
          {
            variant: "error",
          }
        );
        setGlobalLoaderStatus(false);
      });
  };

  const checkUserLoggedIn = () => {
    if (localStorage.getItem("quizzo_current_user")) {
      return true;
    } else return false;
  };

  const prepareForm = () => {
    const isUserLoggedIn = checkUserLoggedIn();

    if (!isUserLoggedIn) {
      console.log("trigger auth process");
      setOpenAuthDialog(true);
      setGlobalLoaderStatus(false);
    } else {
      checkResponseExists();
    }
  };
  useEffect(() => {
    setGlobalLoaderText("Preparing form...");
    setGlobalLoaderStatus(true);
    prepareForm();
  }, []);

  return (
    <>
      <div className="bg-slate-100 flex flex-col items-center justify-center">
        <Navbar currentTheme={currentTheme} isFormResponse />
        {isFormFilled ? (
          <div className="min-h-screen shadow bg-white p-10 flex flex-col gap-5">
            <LottieAnimation />
            <span className="text-4xl">You have filled this form!</span>
            <span>
              You have attempted this form at{" "}
              {filledFormResponse?.createdAt &&
                filledFormResponse?.createdAt.split("T")[0]}
            </span>

            <div className="my-5">
              <Button
                variant="contained"
                color="success"
                endIcon={<ArrowRightAltIcon />}
                onClick={() => navigate("/dashboard")}
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow w-fit flex flex-col items-center justify-center p-10">
            <span className="my-2 w-full text-7xl">
              {currentFormData?.formName}
            </span>
            <div className="italic my-2 w-full flex justify-between items-center">
              <span className="w-full text-xl">
                Due Date: {currentFormData?.formDueDate}
              </span>
              <span className="w-full text-xl text-end">
                Duration: {currentFormData?.formDuration}mins
              </span>
            </div>
            <span className="italic my-2 w-full text-xl">
              Instructions:- <br />
              <span className="italic text-base">
                {currentFormData?.formDescription}
              </span>
            </span>

            {currentFormQuestions.map((_ques, i) => {
              return (
                <FormResponseQuesCard
                  _form={_ques}
                  index={i}
                  handleCheckboxChange={handleCheckboxChange}
                  handleRadioChange={handleRadioChange}
                  handleDropDownChange={handleDropDownChange}
                  key={i}
                />
              );
            })}
            <Button fullWidth variant="contained" onClick={saveFormResponse}>
              Submit
            </Button>
          </div>
        )}
      </div>
      {openAuthDialog && (
        <AuthDialog
          openAuthDialog={openAuthDialog}
          setOpenAuthDialog={setOpenAuthDialog}
          prepareForm={prepareForm}
        />
      )}
    </>
  );
};

export default FormResponse;
