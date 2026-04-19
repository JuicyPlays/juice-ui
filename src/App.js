import "./index.css";
import {
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
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
import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";

axios.defaults.withCredentials = true;

const PROTECTED_API_PATHS = ["/v1/juicy", "/v1/line-shopper", "/v1/slips"];

function buildAuthState(sessionData) {
  return {
    userId: sessionData.userId,
    email: sessionData.email,
    name: sessionData.name,
    whopUserId: sessionData.whopUserId,
    subscribed: sessionData.subscribed,
    hasAccess: sessionData.hasAccess,
    planId: sessionData.planId,
    subscriptionId: sessionData.subscriptionId,
  };
}

function isProtectedApiRequest(config) {
  const requestUrl = config?.url;

  if (!requestUrl) {
    return false;
  }

  return PROTECTED_API_PATHS.some((path) => requestUrl.includes(path));
}

function isSubscriptionRequiredError(error) {
  const message = error?.response?.data?.error;

  return (
    typeof message === "string" &&
    message.toLowerCase().includes("subscription required")
  );
}

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

export function getCachedAuthMe() {
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



function MainContent() {
  const authenticated = useIsAuthenticated();
  const signIn = useSignIn();
  const signOut = useSignOut();
  const location = useLocation();
  const navigate = useNavigate();
  const [bootstrapping, setBootstrapping] = useState(true);
  const locationRef = useRef(location);
  const authTransitionRef = useRef(null);

  useEffect(() => {
    locationRef.current = location;
  }, [location]);

  const syncAuthState = useCallback(
    (sessionData) => {
      signIn({
        token: "whop-session",
        expiresIn: 60 * 24 * 7,
        tokenType: "Bearer",
        authState: buildAuthState(sessionData),
      });
    },
    [signIn]
  );

  const handleUnauthorizedResponse = useCallback(
    async (error) => {
      if (authTransitionRef.current) {
        return authTransitionRef.current;
      }

      const currentLocation = locationRef.current;
      const from = {
        pathname: currentLocation.pathname,
        search: currentLocation.search,
        hash: currentLocation.hash,
      };

      authTransitionRef.current = (async () => {
        if (isSubscriptionRequiredError(error)) {
          try {
            const response = await getCachedAuthMe();
            syncAuthState(response.data);
            navigate("/", {
              replace: true,
              state: { from, subscriptionRequired: true },
            });
            return;
          } catch (refreshError) {
            signOut();
            navigate("/login", {
              replace: true,
              state: { from, sessionExpired: true },
            });
            return;
          }
        }

        signOut();
        navigate("/login", {
          replace: true,
          state: { from, sessionExpired: true },
        });
      })().finally(() => {
        authTransitionRef.current = null;
      });

      return authTransitionRef.current;
    },
    [navigate, signOut, syncAuthState]
  );

  useEffect(() => {
    const interceptorId = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error?.response?.status === 401 &&
          isProtectedApiRequest(error.config)
        ) {
          await handleUnauthorizedResponse(error);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptorId);
    };
  }, [handleUnauthorizedResponse]);

  useEffect(() => {
    let cancelled = false;

    async function bootstrapSession() {
      try {
        const response = await getCachedAuthMe();
        if (cancelled) {
          return;
        }

        syncAuthState(response.data);
      } catch (error) {
        if (
          !cancelled &&
          error?.response?.status === 401 &&
          authenticated()
        ) {
          const currentLocation = locationRef.current;
          signOut();
          navigate("/login", {
            replace: true,
            state: {
              from: {
                pathname: currentLocation.pathname,
                search: currentLocation.search,
                hash: currentLocation.hash,
              },
              sessionExpired: true,
            },
          });
        }
      } finally {
        if (!cancelled) {
          setBootstrapping(false);
        }
      }
    }

    bootstrapSession();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array prevents infinite loops on auth state changes

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
