import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CopyLinkButton from "../../components/Buttons/CopyButton";
import CompHeading from "../../components/Heading/CompHeading";
import PurpleContainedButton from "../../components/Buttons/PurpleContainedButton";
import { enqueueSnackbar } from "notistack";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const uiUrl = import.meta.env.VITE_REACT_APP_UI_URL;

const AllFormsForAdmin = ({ setGlobalLoaderText, setGlobalLoaderStatus }) => {
  const [allFormsData, setAllFormsData] = useState([]);
  const navigate = useNavigate();
  const [formPreviewDialog, setFormPreviewDialog] = useState(false);
  const [
    formPreviewDialogCurrentQuestions,
    setFormPreviewDialogCurrentQuestions,
  ] = useState([]);

  const handleFormPreviewDiagOpen = () => {
    setFormPreviewDialog(true);
  };

  const handleFormPreviewDiagClose = () => {
    setFormPreviewDialog(false);
  };

  // Fetch all forms data based on the user ID
  const fetchAllFormsByUserId = () => {
    setGlobalLoaderText("Fetching all forms...");
    setGlobalLoaderStatus(true);
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiUrl}/api/form/`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("quizzo_token")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log("response", response);
        // Map the response data to set the row ID
        let formsData = response.data.map((form) => ({
          ...form,
          id: form._id, // Use _id as the row ID
        }));

        // Sort the forms data
        formsData = formsData.sort((a, b) => {
          const isActiveA = isFormActive(a.formDueDate);
          const isActiveB = isFormActive(b.formDueDate);

          // First sort by active status (active forms first)
          if (isActiveA && !isActiveB) {
            return -1; // Active forms first
          } else if (!isActiveA && isActiveB) {
            return 1; // Inactive forms after active forms
          } else {
            // If both forms have the same status, sort by createdAt
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB - dateA; // Most recent forms first
          }
        });

        // Set the sorted forms data to state
        setAllFormsData(formsData);
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
  };

  // Handle form ID click event
  const handleFormIdClick = (formId) => {
    console.log("Form ID clicked:", formId);
    // Add your navigation or specific action here
    navigate(`/dashboard/form_editor`, {
      state: {
        form: allFormsData.find((form) => form.formId === formId),
      },
    });
  };

  // Handle edit button click event
  const handlePreviewQuestions = (form) => {
    const formQuestions = JSON.parse(form.formQuestions);
    console.log("Preview form:", formQuestions);
    setFormPreviewDialogCurrentQuestions(formQuestions);
    handleFormPreviewDiagOpen();
    // Add your edit functionality here
  };

  // Handle delete button click event
  const handleDelete = (formId) => {
    console.log("Delete form:", formId);
    // Add your delete functionality here
  };

  // Function to determine whether the form is active or not
  const isFormActive = (formDueDate) => {
    const currentDate = new Date();
    const dueDate = new Date(formDueDate);
    return dueDate >= currentDate;
  };

  // Define the columns for the DataGrid, including the custom status column
  const columns = [
    {
      field: "formId",
      headerName: "Form ID",
      width: 100,
      renderCell: (params) => (
        <p
          className="text-blue-800 underline cursor-pointer underline-offset-1"
          onClick={() => handleFormIdClick(params.row.formId)}
        >
          {params.value}
        </p>
      ),
    },
    { field: "userId", headerName: "User ID", width: 250 },
    { field: "formName", headerName: "Form Name", width: 150 },
    { field: "formDuration", headerName: "Duration", width: 100 },
    { field: "formDueDate", headerName: "Due Date", width: 150 },
    // Custom status column indicating whether the form is active or not
    {
      field: "formStatus",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        // Determine the status of the form based on the due date
        const isActive = isFormActive(params.row.formDueDate);
        return (
          <span style={{ color: isActive ? "green" : "red" }}>
            {isActive ? "Active" : "Inactive"}
          </span>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 500,
      renderCell: (params) => (
        <div className="flex gap-5 items-center h-full">
          <CopyLinkButton
            link={`${uiUrl}/form/response/${params.row.formId}`}
          />
          <Button
            variant="contained"
            onClick={() => handlePreviewQuestions(params.row)}
            sx={{
              backgroundColor: "#4338CA",
              "&:hover": { backgroundColor: "#4338CA" },
            }}
            size="small"
          >
            Preview Questions
          </Button>
          <Button
            variant="contained"
            onClick={() => handleDelete(params.row.formId)}
            sx={{
              backgroundColor: "white",
              "&:hover": { backgroundColor: "white" },
              border: "1px solid #4338CA",
              color: "#4338CA",
            }}
            size="small"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchAllFormsByUserId();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-5 p-10">
        <div className="flex justify-between">
          <CompHeading heading="All Forms" />
          <p className="text-xs self-end italic">
            You have {allFormsData.length} forms
          </p>
        </div>
        <div className="w-full max-w-[1200px] overflow-auto h-[400px]">
          <DataGrid
            rows={allFormsData}
            columns={columns}
            sx={{ backgroundColor: "white" }}
            disableSelectionOnClick={true}
          />
        </div>
      </div>
      <Dialog
        open={formPreviewDialog}
        onClose={handleFormPreviewDiagClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Previewing questions</DialogTitle>
        <DialogContent>
          <div className="w-full flex flex-col gap-8">
            {formPreviewDialogCurrentQuestions.map((question, index) => {
              return (
                <div key={index} className="flex flex-col gap-3">
                  <span className="text-xl">
                    Q{index + 1}. {question["Question Text"]}
                  </span>
                  <div className="flex flex-col flex-grow">
                    Options
                    <div className="flex gap-x-5 flex-wrap">
                      {question.Type === "Checkbox" &&
                        question.Option.map((_opt, i) => (
                          <FormControlLabel
                            key={i}
                            control={<Checkbox />}
                            label={_opt}
                          />
                        ))}
                      {question.Type === "Radio" &&
                        question.Option.map((_opt, i) => (
                          <FormControlLabel
                            key={i}
                            label={_opt}
                            control={<Radio />}
                          />
                        ))}
                      {question.Type === "Dropdown" && (
                        <select
                          className="mt-1 block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select your option
                          </option>
                          {question.Option.map((_opt, i) => (
                            <option key={i} value={_opt}>
                              {_opt}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                  {question?.Answer && (
                    <span>Correct Answer: {question?.Answer}</span>
                  )}
                </div>
              );
            })}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormPreviewDiagClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllFormsForAdmin;
