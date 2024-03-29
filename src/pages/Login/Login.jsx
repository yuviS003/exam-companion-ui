import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Paper, Typography } from "@mui/material";
import Logo from "../../components/Logo/Logo";
import axios from "axios";
import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import { enqueueSnackbar } from "notistack";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Login = ({
  currentTheme,
  setGlobalLoaderText,
  setGlobalLoaderStatus,
  toggleCurrentTheme,
}) => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevLoginInfo) => ({
      ...prevLoginInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("login info", loginInfo);

    // Set loader text and status before making the API call
    setGlobalLoaderText("Logging in...");
    setGlobalLoaderStatus(true);

    try {
      const response = await axios.post(`${apiUrl}/api/user/login`, loginInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);
      if (response?.data?.message === "Login successful!") {
        localStorage.setItem("quizzo_token", response.data.user.token);
        localStorage.setItem(
          "quizzo_current_user",
          JSON.stringify(response.data.user.userDetails)
        );
        navigate("/dashboard/");
      }
      // Add any additional logic or state updates based on the response if needed
    } catch (error) {
      console.error(error);
      console.log(error?.message);
      console.log(error?.response?.data?.message);
      enqueueSnackbar(error?.response?.data?.message || error?.message, {
        variant: "error",
      });

      // Handle errors appropriately
    } finally {
      // Reset loader text and status after API call
      setGlobalLoaderText("");
      setGlobalLoaderStatus(false);
    }
  };

  return (
    <>
      <div className="flex items-start justify-center h-[85vh] pt-24">
        <Paper elevation={7} className="py-12 px-10 max-w-md w-full">
          <Logo
            currentTheme={currentTheme}
            className="mx-auto mb-4 w-[200px] bg-cover"
          />
          <p className="w-full text-center -mt-4 mb-4 text-xs italic">
            Answering questions!
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                placeholder="Enter your registered email"
                type="email"
                required
                sx={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                name="email"
                value={loginInfo.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                placeholder="**********"
                type="password"
                required
                InputLabelProps={{
                  shrink: true,
                }}
                name="password"
                value={loginInfo.password}
                onChange={handleInputChange}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{ color: "white" }}
            >
              Login
            </Button>
          </form>
          <Typography variant="body2" component="div" sx={{ mt: 2 }}>
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </Typography>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            <Link to="/" className="cursor-pointer">
              Back to website
            </Link>
          </Typography>
        </Paper>
      </div>
      <Footer
        toggleCurrentTheme={toggleCurrentTheme}
        currentTheme={currentTheme}
      />
    </>
  );
};

export default Login;
