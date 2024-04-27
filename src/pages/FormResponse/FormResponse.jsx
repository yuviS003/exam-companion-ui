import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FormResponseQuesCard from "../../components/Cards/FormResponseQuesCard";
import Navbar from "../../components/User/Navbar/Navbar";
import { Button } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import AuthDialog from "../../components/Dialogs/AuthDialog";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const FormResponse = ({
  setGlobalLoaderText,
  setGlobalLoaderStatus,
  currentTheme,
}) => {
  const [currentFormData, setCurrentFormData] = useState([]);
  const [currentFormQuestions, setCurrentFormQuestions] = useState([]);
  const [openAuthDialog, setOpenAuthDialog] = useState(false);
  const location = useLocation();

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
          })
          .catch((error) => {
            console.log(error);
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
        } else {
          fetchFormData();
        }
      })
      .catch((error) => {
        console.error("Error fetching response data:", error);
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
    } else {
      checkResponseExists();
    }
  };
  useEffect(() => {
    prepareForm();
  }, []);

  return (
    <>
      <div className="bg-slate-100 flex flex-col items-center justify-center">
        <Navbar currentTheme={currentTheme} />
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
