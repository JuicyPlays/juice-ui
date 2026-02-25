import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { pages } from "../common/constants";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Logout, Settings } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleProfileClick = () => setAnchorEl((v) => !v);
  const closeProfile = () => setAnchorEl(false);
  const toggleMobile = () => setMobileOpen((v) => !v);
  const closeMobile = () => setMobileOpen(false);

  const isActive = (link) => location.pathname === `/${link}`;

  return (
    <>
      <nav style={styles.nav}>
        <div style={styles.inner}>
          {/* Logo */}
          <Link to="/home" style={styles.logoLink} onClick={closeMobile}>
            <span style={styles.logoIcon}>⚡</span>
            <span style={styles.logoText}>
              <span style={styles.logoJuicy}>Juicy</span>
              <span style={styles.logoPlays}>Plays</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div style={styles.navLinks}>
            {pages.map((page) => (
              <Link
                key={page.title}
                to={`/${page.link}`}
                style={{
                  ...styles.navLink,
                  ...(isActive(page.link) ? styles.navLinkActive : {}),
                }}
              >
                {isActive(page.link) && <span style={styles.navActiveDot} />}
                {page.title}
              </Link>
            ))}
          </div>

          {/* Right side: profile + mobile hamburger */}
          <div style={styles.rightSide}>
            {/* Profile button */}
            <div style={{ position: "relative" }}>
              <button
                style={styles.profileBtn}
                onClick={handleProfileClick}
                aria-label="User menu"
              >
                <AccountCircleIcon style={{ fontSize: 20, color: "var(--text-secondary)" }} />
              </button>

              {anchorEl && (
                <>
                  <div style={styles.menuBackdrop} onClick={closeProfile} />
                  <div style={styles.dropdown}>
                    <Link to="/account" style={styles.dropdownItem} onClick={closeProfile}>
                      <AccountCircleIcon style={{ fontSize: 16 }} />
                      Account
                    </Link>
                    <Link to="/account" style={styles.dropdownItem} onClick={closeProfile}>
                      <Settings style={{ fontSize: 16 }} />
                      Settings
                    </Link>
                    <div style={styles.dropdownDivider} />
                    <Link to="/logout" style={{ ...styles.dropdownItem, ...styles.dropdownDanger }} onClick={closeProfile}>
                      <Logout style={{ fontSize: 16 }} />
                      Sign out
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button style={styles.hamburger} onClick={toggleMobile} aria-label="Menu">
              <MenuIcon style={{ fontSize: 22, color: "var(--text-secondary)" }} />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div style={styles.mobileMenu}>
            {pages.map((page) => (
              <Link
                key={page.title}
                to={`/${page.link}`}
                style={{
                  ...styles.mobileLink,
                  ...(isActive(page.link) ? styles.mobileLinkActive : {}),
                }}
                onClick={closeMobile}
              >
                {page.title}
              </Link>
            ))}
            <div style={styles.dropdownDivider} />
            <Link to="/account" style={styles.mobileLink} onClick={closeMobile}>Account</Link>
            <Link to="/account" style={styles.mobileLink} onClick={closeMobile}>Settings</Link>
            <Link to="/logout" style={{ ...styles.mobileLink, color: "#ef4444" }} onClick={closeMobile}>Sign out</Link>
          </div>
        )}
      </nav>
    </>
  );
};

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: "rgba(8, 8, 16, 0.85)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    borderBottom: "1px solid rgba(99, 102, 241, 0.12)",
    boxShadow: "0 1px 0 rgba(255,255,255,0.04)",
  },
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 24px",
    height: "60px",
  },
  logoLink: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    textDecoration: "none",
    flexShrink: 0,
  },
  logoIcon: {
    fontSize: "20px",
    filter: "drop-shadow(0 0 8px rgba(99,102,241,0.7))",
  },
  logoText: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 800,
    fontSize: "18px",
    letterSpacing: "-0.5px",
    lineHeight: 1,
  },
  logoJuicy: {
    background: "linear-gradient(135deg, #818cf8 0%, #6366f1 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  logoPlays: {
    background: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    "@media (maxWidth: 768px)": { display: "none" },
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    borderRadius: "8px",
    textDecoration: "none",
    color: "var(--text-secondary)",
    fontSize: "13.5px",
    fontWeight: 500,
    fontFamily: "'Inter', sans-serif",
    transition: "all 0.2s ease",
    letterSpacing: "0.01em",
    position: "relative",
  },
  navLinkActive: {
    color: "var(--accent-light)",
    background: "rgba(99, 102, 241, 0.1)",
    fontWeight: 600,
  },
  navActiveDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "var(--accent-light)",
    flexShrink: 0,
  },
  rightSide: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  profileBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  hamburger: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },
  menuBackdrop: {
    position: "fixed",
    inset: 0,
    zIndex: 998,
  },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 10px)",
    right: 0,
    minWidth: "180px",
    background: "var(--bg-surface)",
    border: "1px solid var(--border)",
    borderRadius: "12px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.08)",
    overflow: "hidden",
    zIndex: 999,
    animation: "fadeInUp 0.15s ease both",
  },
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 16px",
    textDecoration: "none",
    color: "var(--text-primary)",
    fontSize: "13.5px",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    transition: "background 0.15s ease",
    cursor: "pointer",
  },
  dropdownBtn: {
    width: "100%",
    background: "none",
    border: "none",
    textAlign: "left",
  },
  dropdownDanger: {
    color: "#f87171",
  },
  dropdownDivider: {
    height: "1px",
    background: "var(--border-subtle)",
    margin: "4px 0",
  },
  mobileMenu: {
    display: "flex",
    flexDirection: "column",
    padding: "12px 16px 16px",
    background: "var(--bg-secondary)",
    borderTop: "1px solid var(--border-subtle)",
  },
  mobileLink: {
    display: "block",
    padding: "11px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    color: "var(--text-secondary)",
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "'Inter', sans-serif",
    margin: "2px 0",
    transition: "all 0.15s ease",
  },
  mobileLinkActive: {
    color: "var(--accent-light)",
    background: "rgba(99, 102, 241, 0.1)",
  },
};

export default NavBar;
