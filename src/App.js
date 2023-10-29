import React from "react";
import NavBar from "./pages/NavBar";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Footer from "./pages/Footer";
import Middles from "./pages/Middles";
import Correlation from "./pages/Correlation";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const appStyles = {
  background: "linear-gradient(to bottom, #121212, #000000)",
  minHeight: "100vh",
};

function App() {
  return (
    <Router>
      <div style={appStyles}>
        {" "}
        {/* Apply the gradient background */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <NavBar />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/middles"
              element={
                <div>
                  <NavBar />
                  <Middles />
                  <br />
                  <br />
                  <br />
                  <br />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/correlation"
              element={
                <div>
                  <NavBar />
                  <Correlation />
                  <br />
                  <br />
                  <br />
                  <br />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/pricing"
              element={
                <div>
                  <NavBar />
                  <Footer />
                </div>
              }
            />
          </Routes>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
