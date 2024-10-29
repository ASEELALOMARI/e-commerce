import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#88C273",
      light: "#b4d8a6",
      dark: "#345927",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#536493",
      light: "#aeb7d1",
      dark: "#2e3751",
    },
    shape: {
      borderRadius: 10,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      }
    }
  },
  typography: {
  h1: {
    fontSize: "2.5rem",
  },
  h2: {
    fontSize: "2.0rem",
  },
  h3: {
    fontSize: "1.5rem",
  },
  h4: {
    fontSize: "1.4rem",
  },
  h5: {
    fontSize: "1.3rem",
  },
  h6: {
    fontSize: "1.2rem",
  },
},
});

export default Theme;
