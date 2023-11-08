import React from "react";
import NavBar from "./pages/NavBar";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import RenderMiddles from "./pages/Middles";
import RenderPricing from "./pages/Pricing";
import RenderCorrelation from "./pages/Correlation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<NavBar />} />
      <Route path="/middles" element={<RenderMiddles />} />
      <Route path="/correlation" element={<RenderCorrelation />} />
      <Route path="/pricing" element={<RenderPricing />} />
    </Routes>
  );
}

export default App;
