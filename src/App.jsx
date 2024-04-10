import { useEffect, useState } from "react";
import darkTheme from "./themes/darkTheme";
import lightTheme from "./themes/lightTheme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import GlobalLoader from "./components/Loaders/GlobalLoader";
import Dashboard from "./pages/Dashboard/Dashboard";
import Homepage from "./pages/Homepage/Homepage";
import { SnackbarProvider } from "notistack";
import Overview from "./components/UserDashboard/Overview";
import FormEditor from "./components/UserDashboard/FormEditor";
import "aos/dist/aos.css"; // Import the AOS CSS file

const App = () => {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);
  const [globalLoaderStatus, setGlobalLoaderStatus] = useState(false);
  const [globalLoaderText, setGlobalLoaderText] = useState("Loading");

  const toggleCurrentTheme = () => {
    setCurrentTheme((prevTheme) =>
      prevTheme === darkTheme ? lightTheme : darkTheme
    );
  };

  // useEffect(() => {
  //    AOS.init({
  //      offset: 5, // Set the offset to your desired value
  //    });
    
  //   AOS.refresh(); // Refresh AOS after initializing
  //  }, []);
  
  return (
    <ThemeProvider theme={currentTheme}>
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transitionDuration={200}
        autoHideDuration={1000}
        preventDuplicate={true}
      />
      <CssBaseline />
      {/* Your App Components Here */}
      <Routes>
        <Route
          index
          element={
            <Homepage
              currentTheme={currentTheme}
              setGlobalLoaderText={setGlobalLoaderText}
              setGlobalLoaderStatus={setGlobalLoaderStatus}
              toggleCurrentTheme={toggleCurrentTheme}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              currentTheme={currentTheme}
              setGlobalLoaderText={setGlobalLoaderText}
              setGlobalLoaderStatus={setGlobalLoaderStatus}
              toggleCurrentTheme={toggleCurrentTheme}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup
              currentTheme={currentTheme}
              setGlobalLoaderText={setGlobalLoaderText}
              setGlobalLoaderStatus={setGlobalLoaderStatus}
              toggleCurrentTheme={toggleCurrentTheme}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              currentTheme={currentTheme}
              setGlobalLoaderText={setGlobalLoaderText}
              setGlobalLoaderStatus={setGlobalLoaderStatus}
            />
          }
        >
          <Route index element={<Overview />} />
          <Route path="form_editor" element={<FormEditor />} />
        </Route>
      </Routes>

      {globalLoaderStatus && (
        <GlobalLoader globalLoaderText={globalLoaderText} />
      )}
    </ThemeProvider>
  );
};

export default App;
