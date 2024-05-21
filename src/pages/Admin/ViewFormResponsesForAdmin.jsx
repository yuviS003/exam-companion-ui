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
import CompHeading from "../../components/Heading/CompHeading";
import { enqueueSnackbar } from "notistack";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ViewFormResponsesForAdmin = ({
  setGlobalLoaderText,
  setGlobalLoaderStatus,
}) => {
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
      width: 200,
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
      field: "userId",
      headerName: "User ID",
      width: 250,
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
          onClick={() => constructFormResult(params.row)}
          sx={{
            backgroundColor: "#4338CA",
            "&:hover": { backgroundColor: "#4338CA" },
          }}
          size="small"
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
  };

  // Function to fetch responses
  const fetchAttemptedResponses = () => {
    setGlobalLoaderText("Fetching responses...");
    setGlobalLoaderStatus(true);

    axios
      .get(`${apiUrl}/api/response/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("quizzo_token")}`,
        },
      })
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
        if (response.data.length) {
          const receivedForm = response.data[0];
          // construct the current form result
          const formResult = {
            formId: receivedForm.formId,
            formName: receivedForm.formName,
            formDueDate: receivedForm.formDueDate,
            formDuration: receivedForm.formDuration,
            formDescription: receivedForm.formDescription,
            formQuestions: JSON.parse(receivedForm.formQuestions),
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
                formId: receivedForm.formId,
                formName: receivedForm.formName,
                formDueDate: receivedForm.formDueDate,
                formDuration: receivedForm.formDuration,
                formDescription: receivedForm.formDescription,
              },
            },
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching form information:", error);
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
  };

  useEffect(() => {
    fetchAttemptedResponses();
  }, []);

  // Function to handle dialog close
  const handleFormInfoDialogClose = () => {
    setIsFormInfoDialogOpen(false);
  };

  return (
    <div className="flex flex-col gap-5 p-10">
      <div className="flex justify-between">
        <CompHeading heading="Attempted Forms" />
        <p className="text-xs self-end italic">
          You have responded to {allResponses.length} forms
        </p>
      </div>
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

export default ViewFormResponsesForAdmin;
