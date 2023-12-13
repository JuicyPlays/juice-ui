import React from "react";
import NavBar from "./pages/NavBar";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import RenderHome from "./pages/Home";
import RenderMiddles from "./pages/Middles";
import RenderPricing from "./pages/Pricing";
import RenderCorrelation from "./pages/Correlation";
import Logout from "./pages/Logout";
import { RequireAuth } from "react-auth-kit";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import RenderAccount from "./pages/Account";

const firebaseConfig = {
  apiKey: "AIzaSyB4MQBCofpzSbKVQhnMZ6ANqrMHtowuY6I",
  authDomain: "juicy-plays-db.firebaseapp.com",
  databaseURL: "https://juicy-plays-db-default-rtdb.firebaseio.com",
  projectId: "juicy-plays-db",
  storageBucket: "juicy-plays-db.appspot.com",
  messagingSenderId: "43154383117",
  appId: "1:43154383117:web:0bd1bca0f106b880d0d044",
  measurementId: "G-1S3F7R1SS4",
};

const app = initializeApp(firebaseConfig);
getAuth(app);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={
          <RequireAuth loginPath="/">
            <RenderHome />
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
      <Route
        path="/account"
        element={
          <RequireAuth loginPath="/">
            <RenderAccount />
          </RequireAuth>
        }
      />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

export default App;
