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
import Profile from "./pages/Profile";
import SignIn from "./pages/Login";
import SignUp from "./pages/Register";
import Pricing from "./pages/Pricing";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        outlined: {
          border: "2px solid #fff", // Set your desired outline color
        },
      },
    },
  },
});

const appStyles = {
  background: "linear-gradient(to bottom, #121212, #000000)",
  minHeight: "100vh",
};

// const containerStyles = {
//   minHeight: "100vh",
//   position: "relative",
// };

const contentStyles = {
  paddingBottom: "100px", // Adjust this value to account for the footer's height
};

const footerStyles = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "20px",
  textAlign: "center",
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
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
                  <SignIn />
                </div>
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/home"
              element={
                <div>
                  <NavBar />
                  <div style={footerStyles}>
                    <Footer />
                  </div>
                </div>
              }
            />
            <Route
              path="/middles"
              element={
                <div>
                  <NavBar />
                  <div style={contentStyles}>
                    <Middles />
                  </div>
                  <div style={footerStyles}>
                    <Footer />
                  </div>
                </div>
              }
            />
            <Route
              path="/pricing"
              element={
                <div>
                  <NavBar />
                  <Pricing />
                </div>
              }
            />
            <Route
              path="/correlation"
              element={
                <div>
                  <NavBar />
                  <div style={contentStyles}>
                    <Correlation />
                  </div>
                  <div style={footerStyles}>
                    <Footer />
                  </div>
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
            <Route
              path="/profile"
              element={
                <div>
                  <NavBar />
                  <Profile />
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
