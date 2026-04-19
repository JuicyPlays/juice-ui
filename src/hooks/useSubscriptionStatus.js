import { useState, useEffect } from "react";
import axios from "axios";

export function useSubscriptionStatus(userId) {
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const checkSubscription = async () => {
      try {
        const { getCachedAuthMe } = await import("../App");
        const response = await getCachedAuthMe();
        setSubscribed(
          response.data.subscribed || response.data.hasAccess || false
        );
        setError(null);
      } catch (error) {
        // Graceful error handling for backend connection failures
        if (
          error.code === "ERR_NETWORK" ||
          error.code === "ERR_CONNECTION_REFUSED"
        ) {
          console.warn(
            "Backend API not available. Defaulting to no subscription."
          );
          setError("Backend API unavailable");
        } else {
          console.error("Failed to check subscription status:", error);
          setError(error.message);
        }
        setSubscribed(false);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [userId]);

  return { subscribed, loading, error, setSubscribed };
}
