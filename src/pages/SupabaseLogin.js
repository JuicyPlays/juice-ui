import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useIsAuthenticated } from "react-auth-kit";

export default function SupabaseLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const authenticated = useIsAuthenticated();

  useEffect(() => {
    if (authenticated()) {
      navigate("/");
    }
  }, [authenticated, navigate]);

  const handleWhopLogin = () => {
    const redirectPath = location.state?.from?.pathname || "/";
    const loginUrl = `${
      import.meta.env.VITE_JUICE_API_BASE_URL
    }/auth/whop/login?redirect=${encodeURIComponent(redirectPath)}`;
    window.location.assign(loginUrl);
  };

  return (
    <div style={styles.page}>
      {/* Animated background orbs */}
      <div style={styles.orb1} />
      <div style={styles.orb2} />
      <div style={styles.orb3} />

      <div style={styles.card}>
        {/* Branding */}
        <div style={styles.branding}>
          <div style={styles.logoWrap}>
            <span style={styles.logoEmoji}>⚡</span>
          </div>
          <h1 style={styles.logoTitle}>
            <span style={styles.logoPrimary}>Juicy</span>
            <span style={styles.logoSecondary}>Plays</span>
          </h1>
          <p style={styles.tagline}>Data-driven esports value.</p>
        </div>

        {/* Auth widget */}
        <div style={styles.authWrap}>
          <button style={styles.whopButton} onClick={handleWhopLogin}>
            Continue with Whop
          </button>
          <p style={styles.authSubtext}>
            Sign in with your Whop account to manage access and unlock premium
            plays.
          </p>
        </div>
      </div>

      {/* Footer hint */}
      <p style={styles.footerHint}>
        By signing in you agree to our{" "}
        <Link to="/terms" style={styles.footerLink}>
          Terms &amp; Conditions
        </Link>
      </p>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--bg-primary)",
    position: "relative",
    overflow: "hidden",
    padding: "24px",
  },
  orb1: {
    position: "absolute",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
    top: "-200px",
    left: "-150px",
    animation: "orb-drift 20s ease-in-out infinite",
    pointerEvents: "none",
  },
  orb2: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
    bottom: "-150px",
    right: "-100px",
    animation: "orb-drift 25s ease-in-out infinite reverse",
    pointerEvents: "none",
  },
  orb3: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
    top: "50%",
    left: "60%",
    animation: "orb-drift 18s ease-in-out infinite 5s",
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: "400px",
    background: "rgba(15, 15, 30, 0.8)",
    border: "1px solid rgba(99, 102, 241, 0.2)",
    borderRadius: "20px",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    boxShadow:
      "0 4px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
    overflow: "hidden",
  },
  branding: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "36px",
    paddingBottom: "8px",
    background:
      "linear-gradient(180deg, rgba(99,102,241,0.06) 0%, transparent 100%)",
    borderBottom: "1px solid rgba(99,102,241,0.1)",
    marginBottom: "4px",
  },
  logoWrap: {
    width: "52px",
    height: "52px",
    borderRadius: "14px",
    background:
      "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2))",
    border: "1px solid rgba(99,102,241,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "14px",
    boxShadow: "0 0 24px rgba(99,102,241,0.3)",
    animation: "pulse-glow 3s ease-in-out infinite",
  },
  logoEmoji: {
    fontSize: "26px",
    filter: "drop-shadow(0 0 6px rgba(99,102,241,0.8))",
  },
  logoTitle: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 800,
    fontSize: "28px",
    letterSpacing: "-0.5px",
    margin: "0 0 6px 0",
    lineHeight: 1,
  },
  logoPrimary: {
    background: "linear-gradient(135deg, #818cf8 0%, #6366f1 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  logoSecondary: {
    background: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  tagline: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "13px",
    color: "var(--text-muted)",
    margin: "0 0 20px 0",
    letterSpacing: "0.02em",
  },
  authWrap: {
    padding: "4px 20px 24px",
  },
  whopButton: {
    width: "100%",
    border: "none",
    borderRadius: "12px",
    padding: "14px 18px",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "white",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: "0 10px 24px rgba(99,102,241,0.35)",
  },
  authSubtext: {
    marginTop: "14px",
    marginBottom: 0,
    color: "var(--text-muted)",
    fontSize: "13px",
    lineHeight: 1.5,
    fontFamily: "'Inter', sans-serif",
    textAlign: "center",
  },
  footerHint: {
    position: "relative",
    zIndex: 1,
    marginTop: "20px",
    fontSize: "12px",
    color: "var(--text-muted)",
    fontFamily: "'Inter', sans-serif",
    textAlign: "center",
  },
  footerLink: {
    color: "var(--accent-light)",
    textDecoration: "none",
  },
};
