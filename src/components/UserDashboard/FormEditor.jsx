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
    const updatedQuestions = formData.filter((q) => q !== question);

    setFormData(updatedQuestions);
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
