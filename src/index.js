import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        outlined: {
          border: "2px solid #fff",
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Router>
);
