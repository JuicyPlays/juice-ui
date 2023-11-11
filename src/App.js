import React from "react";
import NavBar from "./pages/NavBar";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import RenderMiddles from "./pages/Middles";
import RenderPricing from "./pages/Pricing";
import RenderCorrelation from "./pages/Correlation";
import Logout from "./pages/Logout";
import { RequireAuth } from "react-auth-kit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={
          <RequireAuth loginPath="/">
            <NavBar />
          </RequireAuth>
        }
      />
      <Route
        path="/middles"
        element={
          <RequireAuth loginPath="/">
            <RenderMiddles />
          </RequireAuth>
        }
      />
      <Route
        path="/correlation"
        element={
          <RequireAuth loginPath="/">
            <RenderCorrelation />
          </RequireAuth>
        }
      />
      <Route
        path="/pricing"
        element={
          <RequireAuth loginPath="/">
            <RenderPricing />
          </RequireAuth>
        }
      />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

export default App;
