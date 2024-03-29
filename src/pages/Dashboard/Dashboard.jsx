import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { lightLogo } from "../../assets";
import {
  Avatar,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import { userAvatar } from "../../assets";
import { IoMdSearch } from "react-icons/io";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Dashboard = ({ currentTheme }) => {
  const navigate = useNavigate();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const open = Boolean(menuAnchorEl);

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("quizzo_token");
    localStorage.removeItem("quizzo_current_user");
    navigate("/");
    handleMenuClose();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`${apiUrl}/api/excel/uploadFormTemplate`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer your_token_here",
        },
      })
      .then((response) => {
        console.log("File uploaded successfully:", response.data);
        navigate("/dashboard/form_editor", {
          state: { formData: response.data },
        });
        // Add any further logic here after successful file upload
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  if (!localStorage.getItem("quizzo_current_user")) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen">
      <div
        className={`fixed top-0 left-0 h-screen z-[110] bg-[#111827] w-[300px] flex flex-col items-center py-2 pt-3 gap-5`}
      >
        <img src={lightLogo} alt="logo" className="w-[150px] bg-cover mb-2" />
        <input
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={handleFileUpload}
          id="file-upload"
          hidden
        />
        <label htmlFor="file-upload" className="w-full">
          <div className="w-fit ml-5 bg-white text-[#4338CA] py-2 px-8 mb-2 text-lg rounded-lg rounded-tl-none font-bold cursor-pointer ring-4 ring-[#4338CA] hover:bg-slate-300 transition flex gap-1 items-center justify-center">
            <IoMdAdd color="#X4338CA" /> New Form
          </div>
        </label>
        <div
          className="w-full text-white px-2 py-2 flex items-center bg-gray-700 border-l-4 border-l-white cursor-pointer gap-2"
          onClick={() => {
            navigate("/dashboard/");
          }}
        >
          <MdDashboard /> Dashboard
        </div>
      </div>
      <div className={`ml-[300px] bg-[#E5E7EB] w-full flex flex-col`}>
        <div className="w-full sticky z-[100] top-0 right-0 px-4 py-3 bg-slate-100 flex items-center justify-between border-b-[5px] border-b-[#4338CA]">
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search your form"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IoMdSearch />
                </InputAdornment>
              ),
            }}
          />
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleMenuClick}
          >
            <Avatar alt="user" src={userAvatar} />
          </IconButton>
          <Menu anchorEl={menuAnchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
