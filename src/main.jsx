import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SuperContextProvider } from "./context/SuperContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SuperContextProvider>
        <App />
      </SuperContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
