import React from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import Index from "./routers";
import Theme from "./styles/Theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={Theme}>
        <ToastContainer position="top-right" autoClose={3000} />
        <RouterProvider router={Index} />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
