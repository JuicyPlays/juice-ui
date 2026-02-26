import "./index.css";
import { createClient } from "@supabase/supabase-js";
import { Route, Routes, useLocation, useNavigate, Navigate } from "react-router-dom";
import SupabaseLogin from "./pages/SupabaseLogin";
import RenderHome from "./pages/Home";
import RenderJuicyPlays from "./pages/JuicyPlays";
import RenderSlips from "./pages/Slips";
import Logout from "./pages/Logout";
import { AuthProvider, RequireAuth, useIsAuthenticated, useSignIn, useSignOut } from "react-auth-kit";
import { loadStripe } from "@stripe/stripe-js";
import RenderAccount from "./pages/Account";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import React, { useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";

// The supabase client
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON
);

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK, {});

function SubscriptionGuard({ children }) {
  const user = useAuthUser();
  const [status, setStatus] = React.useState({ loading: true, hasAccess: false });
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    async function checkAccess() {
      if (!user()) return;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_JUICE_API_USERS}/userId/${user().userId}`
        );
        setStatus({
          loading: false,
          hasAccess: response.data.subscribed || response.data.hasAccess,
        });
      } catch (error) {
        console.error("Error checking subscription", error);
        setStatus({ loading: false, hasAccess: false });
      }
    }
    checkAccess();
  }, [user]);

  if (status.loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-primary)' }}>
        <CircularProgress style={{ color: 'var(--accent)' }} />
      </div>
    );
  }

  if (!status.hasAccess) {
    // Redirect to home with state to show pricing or error
    return <Navigate to="/" state={{ from: location, subscriptionRequired: true }} replace />;
  }

  return children;
}

function MainContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const authenticated = useIsAuthenticated();
  const signIn = useSignIn();
  const signOut = useSignOut();

  useEffect(() => {
    async function handleSignIn(userId, session) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_JUICE_API_USERS}/userId/${userId}`
        );
        if (response?.data?.userId === userId) {
          const redirectPath = location.state?.from?.pathname || "/";
          navigate(redirectPath, { replace: true });
          return;
        }
      } catch (error) {
        console.error("Error fetching user. Will try to create.", userId, error);
      }

      try {
        const response = await axios.post(import.meta.env.VITE_JUICE_API_USERS, {
          userId: userId,
        });
        if (response?.data?.userId === userId) {
          const redirectPath = location.state?.from?.pathname || "/";
          navigate(redirectPath, { replace: true });
          return;
        }
      } catch (error) {
        console.log("Error creating new user.", userId, error);
        await supabase.auth.signOut();
        signOut();
        navigate("/login");
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session == null && authenticated()) {
        signOut();
      }

      if (session != null && !authenticated()) {
        const user = session.user;
        const userId = user.id;

        if (signIn({
          token: session.access_token,
          expiresIn: session.expires_in,
          tokenType: session.token_type,
          authState: {
            userId: userId,
            email: user.email,
            name: user.user_metadata.name,
          },
        })) {
          await handleSignIn(userId, session);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, signIn, signOut, authenticated, location.state]);

  return (
    <Routes>
      <Route path="/" Component={RenderHome} />
      <Route path="/login" Component={SupabaseLogin} />
      <Route path="/logout" Component={Logout} />
      <Route path="/privacy" Component={Privacy} />
      <Route path="/terms" Component={Terms} />
      <Route
        path="/home"
        element={
          <RequireAuth loginPath="/login">
            <RenderHome />
          </RequireAuth>
        }
      />
      <Route
        path="/juicy"
        element={
          <RequireAuth loginPath="/login">
            <SubscriptionGuard>
              <RenderJuicyPlays />
            </SubscriptionGuard>
          </RequireAuth>
        }
      />
      <Route
        path="/slips"
        element={
          <RequireAuth loginPath="/login">
            <SubscriptionGuard>
              <RenderSlips />
            </SubscriptionGuard>
          </RequireAuth>
        }
      />
      <Route
        path="/account"
        element={
          <RequireAuth loginPath="/login">
            <RenderAccount />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === "https:"}
    >
      <MainContent />
    </AuthProvider>
  );
}

