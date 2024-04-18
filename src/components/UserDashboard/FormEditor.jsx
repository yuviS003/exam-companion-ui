import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import EditQuesDialog from "../Dialogs/EditQuesDialog";
import DeleteQuesDialog from "../Dialogs/DeleteQuesDialog";
import FormEditorQuesCard from "../Cards/FormEditorQuesCard";
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const FormEditor = ({ setGlobalLoaderText, setGlobalLoaderStatus }) => {
  const location = useLocation();
  const [formData, setFormData] = useState(location.state?.formData || []);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formDueDate, setFormDueDate] = useState("");
  const [formDuration, setFormDuration] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState({
    "S.No": "",
    "Question Text": "",
    Type: "",
    Option: [],
    Answer: "",
  });
  const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);
  const [openEditConfirmDialog, setOpenEditConfirmDialog] = useState(false);

  const handleDeleteQuestion = (question) => {
    const updatedQuestions = formData.filter((q) => q !== question);

    setFormData(updatedQuestions);
  };

  const handleConfirmQuestionnaire = () => {
    setGlobalLoaderText("Creating your form...");
    setGlobalLoaderStatus(true);
    const payload = {
      userId: JSON.parse(localStorage.getItem("quizzo_current_user"))._id,
      formName,
      formDescription,
      formDueDate,
      formDuration,
      formQuestions: JSON.stringify(formData),
    };

    console.log("payload", payload);

    let data = JSON.stringify(payload);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiUrl}/api/form/create`,
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
  };

  if (!location.state) {
    return <Navigate to="/dashboard/" />;
  }

  return (
    <>
      <div className="flex flex-col gap-5 p-10">
        <p className="text-3xl text-gray-700 font-medium">Form Editor</p>
        <TextField
          placeholder="Form Name"
          label="Form Name"
          sx={{ backgroundColor: "whitesmoke" }}
          InputLabelProps={{ shrink: true }}
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-5">
          <TextField
            type="date"
            label="Due date"
            sx={{ backgroundColor: "whitesmoke" }}
            InputLabelProps={{ shrink: true }}
            value={formDueDate}
            onChange={(e) => setFormDueDate(e.target.value)}
          />
          <TextField
            placeholder="Duration in minutes"
            label="Duration"
            InputLabelProps={{ shrink: true }}
            sx={{ backgroundColor: "whitesmoke" }}
            value={formDuration}
            onChange={(e) => setFormDuration(e.target.value)}
          />
        </div>
        <TextField
          placeholder="Description"
          label="Type your guidelines for your form"
          sx={{ backgroundColor: "whitesmoke" }}
          InputLabelProps={{ shrink: true }}
          multiline
          minRows={5}
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
        />
        <div className="w-full flex flex-col items-center justify-center gap-5">
          {formData.map((_form, i) => (
            <FormEditorQuesCard
              _form={_form}
              index={i}
              key={i}
              triggerQuesDelete={() => {
                setCurrentQuestion(_form);
                setOpenDeleteConfirmDialog(true);
              }}
              triggerQuesEdit={() => {
                setCurrentQuestion(_form);
                setOpenEditConfirmDialog(true);
              }}
            />
          ))}
        </div>
        <div className="w-full flex items-center justify-end gap-5">
          <Button variant="outlined" color="error" sx={{ width: 300 }}>
            Back
          </Button>
          <Button
            variant="contained"
            sx={{ width: 300 }}
            color="success"
            onClick={handleConfirmQuestionnaire}
          >
            Confirm
          </Button>
        </div>
      </div>
      {/* Delete question dialog */}
      <DeleteQuesDialog
        openDeleteConfirmDialog={openDeleteConfirmDialog}
        setOpenDeleteConfirmDialog={setOpenDeleteConfirmDialog}
        handleDeleteQuestionFunc={() => {
          handleDeleteQuestion(currentQuestion);
          setOpenDeleteConfirmDialog(false);
        }}
      />
      {/* Edit Question Dialog */}
      <EditQuesDialog
        openEditConfirmDialog={openEditConfirmDialog}
        setOpenEditConfirmDialog={setOpenEditConfirmDialog}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  );
};

export default FormEditor;
