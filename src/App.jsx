import React from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import Index from "./routers";
import Theme from "./styles/Theme";

function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <RouterProvider router={Index} />
      </ThemeProvider>
    </>
  );
}

export default App;
