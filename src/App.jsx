import React from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import Index from "./routers";
import Theme from "./styles/Theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
      <ToastContainer position="top-right" autoClose={3000} />
        <RouterProvider router={Index} />
      </ThemeProvider>
    </>
  );
}

export default App;
