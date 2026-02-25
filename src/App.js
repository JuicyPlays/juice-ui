import "./index.css";
import { createClient } from "@supabase/supabase-js";
import { Route, Routes } from "react-router-dom";
import SupabaseLogin from "./pages/SupabaseLogin";
import RenderHome from "./pages/Home";
import RenderJuicyPlays from "./pages/JuicyPlays";
import RenderSlips from "./pages/Slips";
import Logout from "./pages/Logout";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import { loadStripe } from "@stripe/stripe-js";
import RenderAccount from "./pages/Account";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

// The supabase client
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON
);

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK, {});

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
        <Route path="/privacy" Component={Privacy} />
        <Route path="/terms" Component={Terms} />
        <Route
          path="/home"
          element={
            <RequireAuth loginPath="/">
              <RenderHome />
            </RequireAuth>
          }
        />
        <Route
          path="/juicy"
          element={
            <RequireAuth loginPath="/">
              <RenderJuicyPlays />
            </RequireAuth>
          }
        />
        <Route
          path="/slips"
          element={
            <RequireAuth loginPath="/">
              <RenderSlips />
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
      </Routes>
    </AuthProvider>
  );
}
