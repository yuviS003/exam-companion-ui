import { useState } from "react";
import darkTheme from "./themes/darkTheme";
import lightTheme from "./themes/lightTheme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Footer from "./components/Footer/Footer";
import GlobalLoader from "./components/Loaders/GlobalLoader";
import Dashboard from "./pages/Dashboard/Dashboard";
import Homepage from "./pages/Homepage/Homepage";

const App = () => {
  const [currentTheme, setCurrentTheme] = useState(darkTheme);
  const [globalLoaderStatus, setGlobalLoaderStatus] = useState(false);
  const [globalLoaderText, setGlobalLoaderText] = useState("Loading");

  const toggleCurrentTheme = () => {
    setCurrentTheme((prevTheme) =>
      prevTheme === darkTheme ? lightTheme : darkTheme
    );
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {/* Your App Components Here */}
      <Routes>
        <Route
          path="login"
          element={
            <Login
              currentTheme={currentTheme}
              setGlobalLoaderText={setGlobalLoaderText}
              setGlobalLoaderStatus={setGlobalLoaderStatus}
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
            />
          }
        />
        <Route
          path="/"
          element={
            <Dashboard
              currentTheme={currentTheme}
              setGlobalLoaderText={setGlobalLoaderText}
              setGlobalLoaderStatus={setGlobalLoaderStatus}
            />
          }
        >
          <Route
            index
            element={
              <Homepage
                currentTheme={currentTheme}
                setGlobalLoaderText={setGlobalLoaderText}
                setGlobalLoaderStatus={setGlobalLoaderStatus}
              />
            }
          />
        </Route>
      </Routes>
      <Footer
        toggleCurrentTheme={toggleCurrentTheme}
        currentTheme={currentTheme}
      />
      {globalLoaderStatus && (
        <GlobalLoader globalLoaderText={globalLoaderText} />
      )}
    </ThemeProvider>
  );
};

export default App;
