import "./index.css";
import { createClient } from "@supabase/supabase-js";
import { Route, Routes } from "react-router-dom";
import SupabaseLogin from "./pages/SupabaseLogin";
import RenderHome from "./pages/Home";
import RenderMiddles from "./pages/Middles";
import RenderPricing from "./pages/Pricing";
import RenderCorrelation from "./pages/Correlation";
import Logout from "./pages/Logout";
import { AuthProvider, RequireAuth } from "react-auth-kit";

// The supabase client
export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON
);

export default function App() {
  return (
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === "https:"}
    >
      <Routes>
        <Route path="/" Component={SupabaseLogin} />
        <Route path="/logout" Component={Logout} />
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
      </Routes>
    </AuthProvider>
  );
}
