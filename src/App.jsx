import { useState } from "react";
import darkTheme from "./themes/darkTheme";
import lightTheme from "./themes/lightTheme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Footer from "./components/Footer/Footer";

const App = () => {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

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
          index
          element={
            <Login
              toggleCurrentTheme={toggleCurrentTheme}
              currentTheme={currentTheme}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup
              toggleCurrentTheme={toggleCurrentTheme}
              currentTheme={currentTheme}
            />
          }
        />
      </Routes>
      <Footer
        toggleCurrentTheme={toggleCurrentTheme}
        currentTheme={currentTheme}
      />
    </ThemeProvider>
  );
};

export default App;
