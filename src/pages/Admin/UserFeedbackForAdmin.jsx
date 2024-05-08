// import { useEffect, useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import axios from "axios";
// import {
//   Box,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   Button,
// } from "@mui/material";

// const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

// const UserFeedbackForAdmin = ({
//   setGlobalLoaderText,
//   setGlobalLoaderStatus,
// }) => {
//   const [allUserFeedback, setAllUserFeedback] = useState([]);
//   const [selectedFeedback, setSelectedFeedback] = useState(null);
//   const [dialogOpen, setDialogOpen] = useState(false);

//   // Columns for DataGrid
//   const columns = [
//     {
//       field: "sno",
//       headerName: "S. No.",
//       width: 100,
//     },
//     {
//       field: "userId",
//       headerName: "User ID",
//       width: 300,
//     },
//     {
//       field: "userFeedback",
//       headerName: "Feedback",
//       width: 500,
//     },
//     {
//       field: "createdAt",
//       headerName: "Attempted At",
//       width: 250,
//     },
//   ];

//   // Function to fetch responses
//   const fetchAllUserFeedback = () => {
//     setGlobalLoaderText("Fetching User Feedbacks...");
//     setGlobalLoaderStatus(true);

//     axios
//       .get(`${apiUrl}/api/feedback`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("quizzo_token")}`,
//         },
//       })
//       .then((response) => {
//         console.log("User feedback response", response.data);
//         setAllUserFeedback(
//           response.data.map((res, index) => ({
//             ...res,
//             sno: index + 1,
//             createdAt: new Date(res.createdAt).toLocaleString(),
//           }))
//         );
//       })
//       .catch((error) => {
//         console.error("Error fetching user feedback:", error);
//       })
//       .finally(() => {
//         setGlobalLoaderStatus(false);
//       });
//   };

//   useEffect(() => {
//     fetchAllUserFeedback();
//   }, []);

//   // Function to handle cell click
//   const handleCellClick = (params) => {
//     const feedback = params.row.userFeedback; // Get feedback from the clicked cell
//     setSelectedFeedback(feedback);
//     setDialogOpen(true);
//   };

//   // Function to close the dialog
//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setSelectedFeedback(null);
//   };

//   return (
//     <div className="flex flex-col gap-5 p-5">
//       <p className="text-3xl">User Feedback</p>
//       <div className="">
//         <Box sx={{ height: 450, width: "100%", backgroundColor: "white" }}>
//           <DataGrid
//             rows={allUserFeedback}
//             columns={columns}
//             initialState={{
//               pagination: {
//                 paginationModel: {
//                   pageSize: 10,
//                 },
//               },
//             }}
//             getRowId={(row) => row._id}
//             pageSizeOptions={[5, 10, 20]}
//             checkboxSelection={false}
//             disableColumnMenu
//             disableColumnFilter
//             disableColumnSelector
//             disableDensitySelector
//             disableSelectionOnClick
//             disableColumnResize
//             onCellClick={handleCellClick} // Attach event handler
//           />
//         </Box>
//       </div>

//       {/* Dialog to display user feedback */}
//       <Dialog open={dialogOpen} onClose={handleCloseDialog}>
//         <DialogTitle>User Feedback</DialogTitle>
//         <DialogContent>
//           <DialogContentText>{selectedFeedback}</DialogContentText>
//         </DialogContent>
//         <Button onClick={handleCloseDialog}>Close</Button>
//       </Dialog>
//     </div>
//   );
// };

// export default UserFeedbackForAdmin;

import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Box, Tooltip } from "@mui/material";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const UserFeedbackForAdmin = ({
  setGlobalLoaderText,
  setGlobalLoaderStatus,
}) => {
  const [allUserFeedback, setAllUserFeedback] = useState([]);

  // Columns for DataGrid
  const columns = [
    {
      field: "sno",
      headerName: "S. No.",
      width: 100,
    },
    {
      field: "userId",
      headerName: "User ID",
      width: 300,
    },
    {
      field: "userFeedback",
      headerName: "Feedback",
      width: 500,
      renderCell: (params) => (
        // Render a Tooltip for each cell in the userFeedback column
        <Tooltip title={params.value} arrow>
          <span>{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: "createdAt",
      headerName: "Attempted At",
      width: 250,
    },
  ];

  // Function to fetch responses
  const fetchAllUserFeedback = () => {
    setGlobalLoaderText("Fetching User Feedbacks...");
    setGlobalLoaderStatus(true);

    axios
      .get(`${apiUrl}/api/feedback`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("quizzo_token")}`,
        },
      })
      .then((response) => {
        console.log("User feedback response", response.data);
        setAllUserFeedback(
          response.data.map((res, index) => ({
            ...res,
            sno: index + 1,
            createdAt: new Date(res.createdAt).toLocaleString(),
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching user feedback:", error);
      })
      .finally(() => {
        setGlobalLoaderStatus(false);
      });
  };

  useEffect(() => {
    fetchAllUserFeedback();
  }, []);

  return (
    <div className="flex flex-col gap-5 p-5">
      <p className="text-3xl">User Feedback</p>
      <div>
        <Box sx={{ height: 450, width: "100%", backgroundColor: "white" }}>
          <DataGrid
            rows={allUserFeedback}
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
    </div>
  );
};

export default UserFeedbackForAdmin;
