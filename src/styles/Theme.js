import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#002447",
      light: "#79c5e7",
      dark: "#1a3b5d",
      contrastText: "#fffaf7",
    },
    secondary: {
      main: "#bc672c",
      light: "#f2dcc5",
      dark: "#8c451e",
      contrastText: "#ffffff",
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
