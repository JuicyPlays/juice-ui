import axios from "axios";
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../App";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useIsAuthenticated, useSignIn, useSignOut } from "react-auth-kit";

export default function SupabaseLogin() {
  const navigate = useNavigate();
  const authenticated = useIsAuthenticated();
  const signIn = useSignIn();
  const signOut = useSignOut();
  const [session, setSession] = useState(null);

  async function handleSignIn(userId, session) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_JUICE_API_USERS}/userId/${userId}`
      );
      if (response?.data?.userId === userId) {
        navigate("/home");
        setSession(session);
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
        navigate("/home");
        setSession();
        return;
      }
    } catch (error) {
      console.log("Error creating new user.", userId, error);
      await supabase.auth.signOut();
      signOut();
      navigate("/");
    }
  }

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session != null && authenticated()) {
        navigate("/home");
      }
      if (session == null && authenticated()) {
        signOut();
      }
      if (session === null) {
        return;
      }
      const user = await supabase.auth.getUser();
      const userId = user.data.user.id;
      if (userId === null || userId === undefined) {
        setSession(null);
        await supabase.auth.signOut();
        signOut();
        navigate("/");
      }
      if (
        !authenticated() &&
        signIn({
          token: session.access_token,
          expiresIn: session.expires_in,
          tokenType: session.token_type,
          authState: {
            userId: userId,
            email: user.data.user.email,
            name: user.data.user.user_metadata.name,
          },
        })
      ) {
        await handleSignIn(userId, session);
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line
  }, [navigate, signIn, signOut, authenticated, session]);

  if (!session) {
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
            <Auth
              supabaseClient={supabase}
              theme="dark"
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: "#6366f1",
                      brandAccent: "#8b5cf6",
                      brandButtonText: "white",
                      defaultButtonBackground: "rgba(19,19,43,0.8)",
                      defaultButtonBackgroundHover: "rgba(99,102,241,0.12)",
                      inputBackground: "rgba(19,19,43,0.9)",
                      inputBorder: "rgba(99,102,241,0.2)",
                      inputBorderFocus: "#6366f1",
                      inputText: "#f1f1fb",
                      inputPlaceholder: "#5a5a7a",
                      messageText: "#a0a0c0",
                      anchorTextColor: "#818cf8",
                      dividerBackground: "rgba(99,102,241,0.15)",
                    },
                    radii: {
                      borderRadiusButton: "10px",
                      buttonBorderRadius: "10px",
                      inputBorderRadius: "10px",
                    },
                    fontSizes: {
                      baseBodySize: "14px",
                      baseLabelSize: "13px",
                    },
                    fonts: {
                      bodyFontFamily: "'Inter', sans-serif",
                      buttonFontFamily: "'Inter', sans-serif",
                      inputFontFamily: "'Inter', sans-serif",
                      labelFontFamily: "'Inter', sans-serif",
                    },
                  },
                },
              }}
              providers={["google", "twitter"]}
              redirectTo={import.meta.env.VITE_BASE_URL + "/"}
            />
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
  } else {
    return <div />;
  }
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
    background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
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
    background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
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
    background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
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
    boxShadow: "0 4px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
    overflow: "hidden",
  },
  branding: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "36px",
    paddingBottom: "8px",
    background: "linear-gradient(180deg, rgba(99,102,241,0.06) 0%, transparent 100%)",
    borderBottom: "1px solid rgba(99,102,241,0.1)",
    marginBottom: "4px",
  },
  logoWrap: {
    width: "52px",
    height: "52px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2))",
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
