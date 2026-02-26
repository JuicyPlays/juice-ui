import React from "react";
import { Link } from "react-router-dom";
import { Twitter, MailOutline } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        {/* Single compact top row */}
        <div style={styles.topRow}>
          {/* Brand */}
          <div style={styles.brandRow}>
            <span style={styles.brandIcon}>⚡</span>
            <span style={styles.brandName}>JuicyPlays</span>
          </div>

          {/* Legal links — center */}
          <div style={styles.links}>
            <Link to="/privacy" style={styles.link}>Privacy Policy</Link>
            <span style={styles.dot}>·</span>
            <Link to="/terms" style={styles.link}>Terms &amp; Conditions</Link>
          </div>

          {/* Social icons — right */}
          <div style={styles.socials}>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.iconLink}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#818cf8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              <Twitter style={{ fontSize: 18 }} />
            </a>
            <a
              href="mailto:juicyplaysofficial@gmail.com"
              style={styles.iconLink}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#818cf8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              <MailOutline style={{ fontSize: 18 }} />
            </a>
          </div>
        </div>

        {/* Bottom strip */}
        <div style={styles.bottomRow}>
          <span style={styles.small}>© 2026 JuicyPlays. All Rights Reserved.</span>
          <span style={styles.small}>For informational purposes only. Not financial advice. Must be 18+.</span>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    borderTop: "1px solid var(--border-subtle)",
    background: "rgba(8, 8, 16, 0.97)",
    backdropFilter: "blur(16px)",
    marginTop: "auto",
  },
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 32px",
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "28px 0",
    borderBottom: "1px solid var(--border-subtle)",
    gap: "24px",
    flexWrap: "wrap",
  },
  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  brandIcon: {
    fontSize: "16px",
    filter: "drop-shadow(0 0 6px rgba(99,102,241,0.5))",
  },
  brandName: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 800,
    fontSize: "15px",
    background: "linear-gradient(135deg, #818cf8 0%, #8b5cf6 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  link: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "13px",
    color: "var(--text-secondary)",
    textDecoration: "none",
    fontWeight: 500,
    transition: "color 0.2s ease",
  },
  dot: {
    color: "var(--text-muted)",
    fontSize: "14px",
  },
  socials: {
    display: "flex",
    gap: "14px",
    alignItems: "center",
  },
  iconLink: {
    color: "var(--text-muted)",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    transition: "color 0.2s ease",
  },
  bottomRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 0",
    flexWrap: "wrap",
    gap: "8px",
  },
  small: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "12px",
    color: "var(--text-muted)",
  },
};

export default Footer;
