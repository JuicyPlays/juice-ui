import "./index.css";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import SupabaseLogin from "./pages/SupabaseLogin";
import Home from "./pages/Home";
import JuicyPlaysPage from "./pages/JuicyPlays";
import LineShopperPage from "./pages/LineShopper";
import SlipsPage from "./pages/Slips";
import Logout from "./pages/Logout";
import {
  AuthProvider,
  RequireAuth,
  useAuthUser,
  useIsAuthenticated,
  useSignIn,
  useSignOut,
} from "react-auth-kit";
import RenderAccount from "./pages/Account";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";

axios.defaults.withCredentials = true;

function FullScreenLoader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "var(--bg-primary)",
      }}
    >
      <CircularProgress style={{ color: "var(--accent)" }} />
    </div>
  );
}

// Global cache for auth/me to prevent duplicate calls across components
let globalAuthMeCache = { promise: null, timestamp: 0, data: null };
const CACHE_TTL_MS = 5000; // 5 second cache

function getCachedAuthMe() {
  const now = Date.now();
  if (
    globalAuthMeCache.data &&
    now - globalAuthMeCache.timestamp < CACHE_TTL_MS
  ) {
    return Promise.resolve({ data: globalAuthMeCache.data });
  }
  if (!globalAuthMeCache.promise) {
    globalAuthMeCache.promise = axios
      .get(`${import.meta.env.VITE_JUICE_API_BASE_URL}/auth/me`)
      .then((response) => {
        globalAuthMeCache.data = response.data;
        globalAuthMeCache.timestamp = Date.now();
        globalAuthMeCache.promise = null;
        return response;
      })
      .catch((error) => {
        globalAuthMeCache.promise = null;
        throw error;
      });
  }
  return globalAuthMeCache.promise;
}

function SubscriptionGuard({ children }) {
  const user = useAuthUser();
  const location = useLocation();
  const authUser = user();

  if (!authUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!(authUser.subscribed || authUser.hasAccess)) {
    return (
      <Navigate
        to="/"
        state={{ from: location, subscriptionRequired: true }}
        replace
      />
    );
  }

  return children;
}

// Cache for auth/me to prevent duplicate in-flight requests
let authMePromise = null;

function MainContent() {
  const authenticated = useIsAuthenticated();
  const signIn = useSignIn();
  const signOut = useSignOut();
  const [bootstrapping, setBootstrapping] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function bootstrapSession() {
      // Deduplicate concurrent auth/me requests
      if (!authMePromise) {
        authMePromise = axios.get(
          `${import.meta.env.VITE_JUICE_API_BASE_URL}/auth/me`
        );
      }

      try {
        const response = await authMePromise;
        if (cancelled) {
          return;
        }

        signIn({
          token: "whop-session",
          expiresIn: 60 * 24 * 7,
          tokenType: "Bearer",
          authState: {
            userId: response.data.userId,
            email: response.data.email,
            name: response.data.name,
            whopUserId: response.data.whopUserId,
            subscribed: response.data.subscribed,
            hasAccess: response.data.hasAccess,
            planId: response.data.planId,
            subscriptionId: response.data.subscriptionId,
          },
        });
      } catch (error) {
        if (!cancelled && authenticated()) {
          signOut();
        }
      } finally {
        authMePromise = null;
        if (!cancelled) {
          setBootstrapping(false);
        }
      }
    }

    bootstrapSession();

    return () => {
      cancelled = true;
    };
  }, []);

  if (bootstrapping) {
    return <FullScreenLoader />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<SupabaseLogin />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route
        path="/home"
        element={
          <RequireAuth loginPath="/login">
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/ev-plays"
        element={
          <RequireAuth loginPath="/login">
            <SubscriptionGuard>
              <JuicyPlaysPage />
            </SubscriptionGuard>
          </RequireAuth>
        }
      />
      <Route
        path="/juicy-screen"
        element={
          <RequireAuth loginPath="/login">
            <SubscriptionGuard>
              <LineShopperPage />
            </SubscriptionGuard>
          </RequireAuth>
        }
      />
      {/* Backward-compat redirects for old routes */}
      <Route path="/juicyplays" element={<Navigate to="/ev-plays" replace />} />
      <Route path="/juicy" element={<Navigate to="/ev-plays" replace />} />
      <Route
        path="/slips"
        element={
          <RequireAuth loginPath="/login">
            <SubscriptionGuard>
              <SlipsPage />
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
