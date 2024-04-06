import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import EditQuesDialog from "../Dialogs/EditQuesDialog";
import DeleteQuesDialog from "../Dialogs/DeleteQuesDialog";
import FormEditorQuesCard from "../Cards/FormEditorQuesCard";

const FormEditor = () => {
  const location = useLocation();
  const [formData, setFormData] = useState(location.state?.formData || []);
  const [currentQuestion, setCurrentQuestion] = useState({
    "S.No": "",
    "Question Text": "",
    Type: "",
    Option: [],
    Answer: "",
  });
  const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);
  const [openEditConfirmDialog, setOpenEditConfirmDialog] = useState(false);

  console.log(location.state);

  const handleDeleteQuestion = (question) => {
    // Find the index of the question to be deleted
    const index = formData.findIndex((q) => q === question);

    if (index !== -1) {
      // Remove the question from the array
      const updatedQuestions = [...formData];
      updatedQuestions.splice(index, 1);

      // Update serial numbers
      for (let i = index; i < updatedQuestions.length; i++) {
        updatedQuestions[i]["S.No"] -= 1;
      }

      // Set the updated array of questions to state
      setFormData(updatedQuestions);
    }
  };

  if (!location.state) {
    return <Navigate to="/dashboard/" />;
  }

  return (
    <>
      <div className="flex flex-col gap-5 p-10">
        <p className="text-3xl text-gray-700 font-medium">Form Editor</p>
        <div className="grid grid-cols-2 gap-5">
          <TextField
            placeholder="Form Name"
            sx={{ backgroundColor: "whitesmoke" }}
          />
          <TextField
            placeholder="Due date"
            sx={{ backgroundColor: "whitesmoke" }}
          />
        </div>
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
          <Button variant="contained" sx={{ width: 300 }} color="success">
            confirm
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
      />
    </>
  );
};

export default FormEditor;
