import { Link } from "react-router-dom";
import { TextField, Button, Paper, Typography } from "@mui/material";
import Logo from "../../components/Logo/Logo";
import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Signup = ({
  currentTheme,
  setGlobalLoaderText,
  setGlobalLoaderStatus,
}) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("user info", userInfo);

    // Set loader text and status before making the API call
    setGlobalLoaderText("Signing up...");
    setGlobalLoaderStatus(true);

    try {
      const response = await axios.post(`${apiUrl}/api/user/signup`, userInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);
      // Add any additional logic or state updates based on the response if needed
    } catch (error) {
      console.error(error);
      // Handle errors appropriately
    } finally {
      // Reset loader text and status after API call
      setGlobalLoaderText("");
      setGlobalLoaderStatus(false);
    }
  };

  return (
    <div className="flex items-start justify-center h-[90vh] pt-4 md:pt-24">
      <Paper
        elevation={7}
        className="py-8 px-8 md:py-12 md:px-10 w-full md:w-fit"
      >
        <Logo
          currentTheme={currentTheme}
          className="mx-auto mb-4 w-[200px] bg-cover"
        />
        <p className="w-full text-center -mt-4 mb-6 text-xs italic">
          Answering questions!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="mb-6">
              <TextField
                label="Name"
                variant="outlined"
                type="text"
                required
                sx={{ minWidth: 350, width: "100%", maxWidth: { md: 350 } }}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="What is your name?"
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <TextField
                label="Username"
                variant="outlined"
                type="text"
                required
                sx={{ minWidth: 350, width: "100%", maxWidth: { md: 350 } }}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="What username do you want to have?"
                name="userName"
                value={userInfo.userName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="mb-6">
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                required
                sx={{ minWidth: 350, width: "100%", maxWidth: { md: 350 } }}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="What is your email?"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                required
                sx={{ minWidth: 350, width: "100%", maxWidth: { md: 350 } }}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Have a strong password!"
                name="password"
                value={userInfo.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ color: "white" }}
          >
            Sign Up
          </Button>
        </form>
        <Typography variant="body2" component="div" sx={{ mt: 2 }}>
          Do you have an account already?{" "}
          <Link to="/" className="underline">
            Login
          </Link>
        </Typography>
      </Paper>
    </div>
  );
};

Signup.propTypes = {
  currentTheme: PropTypes.object.isRequired,
  setGlobalLoaderText: PropTypes.func.isRequired,
  setGlobalLoaderStatus: PropTypes.func.isRequired,
};

export default Signup;
