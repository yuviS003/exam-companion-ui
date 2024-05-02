import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CopyLinkButton from "../Buttons/CopyButton";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const uiUrl = import.meta.env.VITE_REACT_APP_UI_URL;

const AllForms = ({ setGlobalLoaderText, setGlobalLoaderStatus }) => {
  const [allFormsData, setAllFormsData] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Fetch all forms data based on the user ID
  const fetchAllFormsByUserId = () => {
    setGlobalLoaderText("Fetching all forms...");
    setGlobalLoaderStatus(true);
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiUrl}/api/form/user/${
        JSON.parse(localStorage.getItem("quizzo_current_user"))._id
      }`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("quizzo_token")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
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
    handleClickOpen();
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
      headerName: "ID",
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
            onClick={() => handlePreviewQuestions(params.row)}
            variant="contained"
            color="secondary"
            size="small"
          >
            Preview Questions
          </Button>
          <Button
            onClick={() => handleDelete(params.row.formId)}
            variant="contained"
            color="error"
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
          <h1 className="text-2xl font-bold">All Forms</h1>
          <p className="text-xs self-end italic">
            You have {allFormsData.length} forms
          </p>
        </div>
        <Paper elevation={5}>
          <div className="w-full max-w-full overflow-auto h-[400px]">
            <DataGrid
              rows={allFormsData}
              columns={columns}
              sx={{ backgroundColor: "white" }}
              disableSelectionOnClick={true}
            />
          </div>
        </Paper>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllForms;
