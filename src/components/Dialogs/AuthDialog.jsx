import { CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const AuthDialog = ({ setOpenAuthDialog, prepareForm }) => {
  const { enqueueSnackbar } = useSnackbar();

  // State variables
  const [isSignInSelected, setIsSignInSelected] = useState(true);
  const [isFormLoading, setIsFormLoading] = useState(false);

  // State variables for form inputs
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  // Function to handle form submission for sign in
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setIsFormLoading(true);

    try {
      const loginInfo = {
        email: signInEmail,
        password: signInPassword,
      };

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
        setOpenAuthDialog(false);
        prepareForm();
      }
    } catch (error) {
      console.error(error);
      console.log(error?.message);
      console.log(error?.response?.data?.message);
      enqueueSnackbar(error?.response?.data?.message || error?.message, {
        variant: "error",
      });
    } finally {
      setIsFormLoading(false);
    }
  };

  // Function to handle form submission for sign up
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setIsFormLoading(true);

    try {
      const userInfo = {
        name: signUpName,
        username: signUpUsername,
        email: signUpEmail,
        password: signUpPassword,
      };

      const response = await axios.post(`${apiUrl}/api/user/signup`, userInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);
      if (response?.data?.message === "User registered successfully!") {
        localStorage.setItem("quizzo_token", response.data.token);
        localStorage.setItem(
          "quizzo_current_user",
          JSON.stringify(response.data.userDetails)
        );
        setOpenAuthDialog(false);
        prepareForm();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error?.response?.data?.message || error?.message, {
        variant: "error",
      });
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[200] bg-black bg-opacity-70 backdrop-blur-md flex justify-center items-center">
      <div className="bg-white rounded border w-[600px] flex flex-col p-5 shadow-lg shadow-slate-900 gap-2">
        <p className="text-4xl">Oops! Seems like you have not logged in yet.</p>
        <p className="font-light">
          No worries! Quizzo will never let this stop you from answering
          quizzes. You can sign in/up below and keep on quizzing.
        </p>
        <div className="mt-4 w-full flex items-center gap-2">
          <button
            className={`w-full py-2 rounded-full transition duration-150 ${
              isSignInSelected ? "bg-black text-white" : "border border-black"
            }`}
            onClick={() => setIsSignInSelected(true)}
          >
            Sign In
          </button>
          <button
            className={`w-full py-2 rounded-full transition duration-150 ${
              isSignInSelected ? "border border-black" : "bg-black text-white"
            }`}
            onClick={() => setIsSignInSelected(false)}
          >
            Sign Up
          </button>
        </div>
        {isSignInSelected ? (
          <form
            onSubmit={handleSignInSubmit}
            className="w-full flex flex-col gap-2 pt-6"
          >
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
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
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
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
              />
            </div>
            {isFormLoading ? (
              <div className="w-full flex items-center justify-center">
                <CircularProgress color="primary" size={35} />
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-black text-white hover:bg-slate-900 active:bg-slate-900 transition rounded py-2 text-lg"
              >
                Sign In
              </button>
            )}
          </form>
        ) : (
          <form
            onSubmit={handleSignUpSubmit}
            className="w-full flex flex-col gap-2 pt-6"
          >
            <div className="mb-6">
              <TextField
                label="Name"
                variant="outlined"
                type="text"
                required
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="What is your name?"
                name="name"
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <TextField
                label="Username"
                variant="outlined"
                type="text"
                required
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="What username do you want to have?"
                name="username"
                value={signUpUsername}
                onChange={(e) => setSignUpUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                required
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="What is your email?"
                name="email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                required
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Have a strong password!"
                name="password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
              />
            </div>
            {isFormLoading ? (
              <div className="w-full flex items-center justify-center">
                <CircularProgress color="primary" size={35} />
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-black text-white hover:bg-slate-900 active:bg-slate-900 transition rounded py-2 text-lg"
              >
                Sign Up
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthDialog;
