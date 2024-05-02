import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ViewFormResponses = ({ setGlobalLoaderText, setGlobalLoaderStatus }) => {
  const navigate = useNavigate();
  // State variables
  const [isFormInfoDialogOpen, setIsFormInfoDialogOpen] = useState(false);
  const [formInformation, setFormInformation] = useState(null);
  const [allResponses, setAllResponses] = useState([]);

  // Columns for DataGrid
  const columns = [
    {
      field: "sno",
      headerName: "S. No.",
      width: 100,
    },
    {
      field: "formId",
      headerName: "Form ID",
      width: 250,
      renderCell: (params) => (
        <div className="">
          {params.row.formId}
          <IconButton
            aria-label="info"
            size="small"
            sx={{ mx: 2 }}
            onClick={() => fetchFormInformation(params.row)}
          >
            <InfoOutlinedIcon />
          </IconButton>
        </div>
      ),
    },
    {
      field: "createdAt",
      headerName: "Attempted At",
      width: 300,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          color="success"
          onClick={() => constructFormResult(params.row)}
        >
          View Result
        </Button>
      ),
    },
  ];

  // Function to fetch form information and open dialog
  const fetchFormInformation = (response) => {
    const formId = response?.formId;
    if (!formId) return;

    setGlobalLoaderText("Fetching forms...");
    setGlobalLoaderStatus(true);

    axios
      .get(`${apiUrl}/api/form/${formId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("quizzo_token")}`,
        },
      })
      .then((response) => {
        console.log("Form info", response.data);
        if (response.data) {
          setFormInformation(response.data);
          setIsFormInfoDialogOpen(true); // Open the dialog
        }
      })
      .catch((error) => {
        console.error("Error fetching form information:", error);
      })
      .finally(() => {
        setGlobalLoaderStatus(false);
      });
  };

  // Function to fetch responses
  const fetchAttemptedResponses = () => {
    setGlobalLoaderText("Fetching responses...");
    setGlobalLoaderStatus(true);

    const currentUser = JSON.parse(localStorage.getItem("quizzo_current_user"));

    axios
      .get(
        `${apiUrl}/api/response/getAllResponseByUserId?userId=${currentUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("quizzo_token")}`,
          },
        }
      )
      .then((response) => {
        console.log("Form response", response.data);
        if (response.data) {
          setAllResponses(
            response.data.map((res, index) => ({
              ...res,
              sno: index + 1,
              createdAt: new Date(res.createdAt).toLocaleString(),
            }))
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching responses:", error);
      })
      .finally(() => {
        setGlobalLoaderStatus(false);
      });
  };

  const constructFormResult = (formResponse) => {
    const formId = formResponse?.formId;
    if (!formId) return;

    setGlobalLoaderText("Fetching forms...");
    setGlobalLoaderStatus(true);

    axios
      .get(`${apiUrl}/api/form/${formId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("quizzo_token")}`,
        },
      })
      .then((response) => {
        console.log("Form info", response.data);
        if (response.data) {
          // construct the current form result
          const formResult = {
            formId: response.data.formId,
            formName: response.data.formName,
            formDueDate: response.data.formDueDate,
            formDuration: response.data.formDuration,
            formDescription: response.data.formDescription,
            formQuestions: JSON.parse(response.data.formQuestions),
            formResponses: JSON.parse(formResponse.form_response),
          };
          console.log("formResult", formResult);

          const generatedResult = formResult.formQuestions.map(
            (originalQuestion) => {
              const responseToQuestions = formResult.formResponses.find(
                (response) =>
                  response["Question Text"] ===
                  originalQuestion["Question Text"]
              );
              const questionResult = {
                ...originalQuestion,
                correctAnswer: String(originalQuestion["Answer"]).split(","),
                responseAnswer: formResult.formResponses.find(
                  (response) =>
                    response["Question Text"] ===
                    originalQuestion["Question Text"]
                )["Answer"],
              };

              delete questionResult.Answer;
              console.log("originalQuestion", originalQuestion);
              console.log("responseToQuestions", responseToQuestions);
              console.log("questionResult", questionResult);
              return questionResult;
            }
          );

          console.log("generatedResult", generatedResult);
          navigate("/dashboard/form-result", {
            state: {
              generatedResult,
              formInfo: {
                formId: response.data.formId,
                formName: response.data.formName,
                formDueDate: response.data.formDueDate,
                formDuration: response.data.formDuration,
                formDescription: response.data.formDescription,
              },
            },
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching form information:", error);
      })
      .finally(() => {
        setGlobalLoaderStatus(false);
      });
  };

  useEffect(() => {
    fetchAttemptedResponses();
  }, []);

  // Function to handle dialog close
  const handleFormInfoDialogClose = () => {
    setIsFormInfoDialogOpen(false);
  };

  return (
    <div className="flex flex-col gap-5 p-5">
      <p className="text-3xl">Attempted Forms</p>
      <div className="">
        <Box sx={{ height: 450, width: "100%", backgroundColor: "white" }}>
          <DataGrid
            rows={allResponses}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            getRowId={(row) => row._id}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection={false}
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            disableSelectionOnClick
            disableColumnResize
          />
        </Box>
      </div>

      {/* MUI Dialog for form information */}
      <Dialog open={isFormInfoDialogOpen} onClose={handleFormInfoDialogClose}>
        <DialogTitle>Form Information - {formInformation?.formId}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Form Name:</span>{" "}
                {formInformation?.formName}
              </p>
              <p>
                <span className="font-semibold">Due Date:</span>{" "}
                {new Date(formInformation?.formDueDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Form Duration:</span>{" "}
                {formInformation?.formDuration} minutes
              </p>
              <p>
                <span className="font-semibold">Form Description:</span>{" "}
                {formInformation?.formDescription}
              </p>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormInfoDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewFormResponses;