import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useSignOut } from "react-auth-kit";

const Logout = () => {
  const navigate = useNavigate();
  const signOut = useSignOut();

  useEffect(() => {
    async function handleSignout() {
      try {
        await axios.post(
          `${import.meta.env.VITE_JUICE_API_BASE_URL}/auth/logout`
        );
        signOut();
      } catch (e) {
        console.error("Error during sign out:", e);
        signOut();
      } finally {
        navigate("/");
      }
    }

    handleSignout();
  }, [navigate, signOut]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-primary, #08080f)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <span style={{ fontSize: "24px" }}>⚡</span>
      <p style={{ color: "#a0a0c0", fontSize: "15px", margin: 0 }}>
        Signing out...
      </p>
    </div>
  );
};

export default Logout;
