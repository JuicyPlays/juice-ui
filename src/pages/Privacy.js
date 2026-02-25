import React from "react";
import { Link } from "react-router-dom";
import { Twitter, MailOutline } from "@mui/icons-material";

const sections = [
    {
        num: "01",
        title: "Information We Collect",
        content: [
            {
                type: "text",
                value:
                    "To provide JuicyPlays services, we collect only what's necessary:",
            },
            {
                type: "list",
                items: [
                    "Account information (name, email address)",
                    "Subscription and billing status",
                    "Platform preferences and saved settings",
                    "Usage data related to the Juicy Screen and Slip Generator",
                    "Technical information such as browser type and approximate location",
                ],
            },
            {
                type: "text",
                value:
                    "We do not collect sensitive financial information directly — payments are handled entirely by Stripe.",
            },
        ],
    },
    {
        num: "02",
        title: "How We Use Your Information",
        content: [
            {
                type: "text",
                value: "Your data is used exclusively to operate and improve our platform:",
            },
            {
                type: "list",
                items: [
                    "Authenticate your account and manage your subscription",
                    "Deliver real-time EV data and personalized Slip Generator outputs",
                    "Improve our models using aggregated, anonymized usage patterns",
                    "Send important service updates, security alerts, and product notices",
                    "Prevent abuse, fraud, and unauthorized access",
                ],
            },
            {
                type: "text",
                value:
                    "We do not use your data for targeted advertising and we never sell it.",
            },
        ],
    },
    {
        num: "03",
        title: "How We Collect Data",
        content: [
            {
                type: "list",
                items: [
                    "Directly from you when you register or update your profile",
                    "Automatically when you interact with our platform (e.g., pages visited, features used)",
                    "From our third-party authentication provider (Supabase) during login",
                    "From Stripe when processing or managing your subscription",
                ],
            },
        ],
    },
    {
        num: "04",
        title: "Information Sharing",
        content: [
            {
                type: "text",
                value:
                    "We take a strict, minimal-sharing approach to your personal information:",
            },
            {
                type: "list",
                items: [
                    "We never sell your personal data — ever",
                    "Data is shared with service providers (Stripe, Supabase) only to the extent needed to deliver the service",
                    "Aggregated, anonymized statistics may be used internally to improve our EV models",
                    "We may disclose data if required by law or to defend our legal rights",
                ],
            },
        ],
    },
    {
        num: "05",
        title: "Data Security",
        content: [
            {
                type: "text",
                value:
                    "We implement industry-standard safeguards to protect your information:",
            },
            {
                type: "list",
                items: [
                    "All data is transmitted over HTTPS/TLS encryption",
                    "Passwords are never stored — authentication is handled via Supabase",
                    "Payment data is fully tokenized and managed by Stripe (PCI-DSS Level 1)",
                    "Access to production systems is restricted and logged",
                    "We regularly review and harden our infrastructure",
                ],
            },
        ],
    },
    {
        num: "06",
        title: "Your Rights & Controls",
        content: [
            {
                type: "text",
                value: "You are in control of your data at all times:",
            },
            {
                type: "list",
                items: [
                    "Request a copy of all personal data we hold about you",
                    "Correct inaccurate information in your account",
                    "Delete your account and all associated personal data",
                    "Opt out of non-essential email communications",
                    "Cancel your subscription at any time via the billing portal",
                ],
            },
            {
                type: "text",
                value:
                    "To exercise any of these rights, contact us at juicyplaysofficial@gmail.com.",
            },
        ],
    },
    {
        num: "07",
        title: "Data Retention",
        content: [
            {
                type: "text",
                value:
                    "We retain your personal data for as long as your account is active. When you delete your account, we will purge your personal information within 30 days. Aggregated, anonymized analytics data — which cannot identify you — may be retained indefinitely to improve our models.",
            },
        ],
    },
    {
        num: "08",
        title: "Third-Party Services",
        content: [
            {
                type: "text",
                value:
                    "JuicyPlays integrates with a small number of carefully chosen third-party providers. Each has their own privacy policy:",
            },
            {
                type: "list",
                items: [
                    "Stripe — payment processing (stripe.com/privacy)",
                    "Supabase — authentication and database (supabase.com/privacy)",
                ],
            },
            {
                type: "text",
                value:
                    "We are not responsible for the privacy practices of these providers, but we only use providers that meet high security standards.",
            },
        ],
    },
    {
        num: "09",
        title: "Changes to This Policy",
        content: [
            {
                type: "text",
                value:
                    "We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. When we make material changes, we will notify you by email or via a notice on the platform. Continued use of JuicyPlays after updates constitutes acceptance of the revised policy.",
            },
        ],
    },
];

const Privacy = () => {
    return (
        <div style={pg.root}>
            {/* Ambient orbs */}
            <div style={pg.orbTop} />
            <div style={pg.orbBottom} />

            {/* Minimal nav */}
            <nav style={pg.nav}>
                <Link to="/home" style={pg.navBrand}>
                    <span style={pg.navIcon}>⚡</span>
                    <span style={pg.navName}>JuicyPlays</span>
                </Link>
                <div style={pg.navLinks}>
                    <Link to="/terms" style={pg.navLink}>Terms</Link>
                    <Link to="/home" style={pg.navLinkPrimary}>← Back to Home</Link>
                </div>
            </nav>

            {/* Hero */}
            <header style={pg.hero}>
                <h1 style={pg.heroTitle}>Privacy Policy</h1>
                <p style={pg.heroSub}>
                    Your data is yours. We're transparent about everything we collect and why.
                </p>
                <p style={pg.heroMeta}>Last updated: February 2026</p>
            </header>

            {/* Content */}
            <main style={pg.main}>
                {sections.map((sec) => (
                    <section key={sec.num} style={pg.section}>
                        <div style={pg.sectionHeader}>
                            <span style={pg.sectionNum}>{sec.num}</span>
                            <h2 style={pg.sectionTitle}>{sec.title}</h2>
                        </div>
                        <div style={pg.sectionBody}>
                            {sec.content.map((block, i) => {
                                if (block.type === "text") {
                                    return <p key={i} style={pg.para}>{block.value}</p>;
                                }
                                if (block.type === "list") {
                                    return (
                                        <ul key={i} style={pg.list}>
                                            {block.items.map((item, j) => (
                                                <li key={j} style={pg.listItem}>
                                                    <span style={pg.dot} />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </section>
                ))}

                {/* CTA */}
                <div style={pg.cta}>
                    <p style={pg.ctaText}>Questions about your privacy?</p>
                    <div style={pg.ctaRow}>
                        <a href="mailto:juicyplaysofficial@gmail.com" style={pg.ctaBtn}>
                            <MailOutline style={{ fontSize: 16 }} /> juicyplaysofficial@gmail.com
                        </a>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer style={pg.footer}>
                <span style={pg.footerText}>© 2026 JuicyPlays. All Rights Reserved.</span>
                <div style={pg.footerLinks}>
                    <Link to="/terms" style={pg.footerLink}>Terms & Conditions</Link>
                    <span style={pg.footerDivider}>·</span>
                    <Link to="/privacy" style={pg.footerLink}>Privacy Policy</Link>
                </div>
            </footer>
        </div>
    );
};

export default Privacy;

// ── Styles ──────────────────────────────────────────────────────────────────
const pg = {
    root: {
        minHeight: "100vh",
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflowX: "hidden",
    },
    orbTop: {
        position: "fixed",
        width: "700px",
        height: "700px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 60%)",
        top: "-200px",
        right: "-200px",
        pointerEvents: "none",
        zIndex: 0,
    },
    orbBottom: {
        position: "fixed",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 60%)",
        bottom: "-150px",
        left: "-200px",
        pointerEvents: "none",
        zIndex: 0,
    },
    // Nav
    nav: {
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        height: "64px",
        background: "rgba(8,8,16,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border-subtle)",
    },
    navBrand: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        textDecoration: "none",
    },
    navIcon: { fontSize: "18px", filter: "drop-shadow(0 0 6px rgba(99,102,241,0.5))" },
    navName: {
        fontWeight: 700,
        fontSize: "15px",
        background: "linear-gradient(135deg, #818cf8 0%, #8b5cf6 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
    },
    navLinks: { display: "flex", alignItems: "center", gap: "24px" },
    navLink: {
        color: "var(--text-secondary)",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: 500,
        transition: "color 0.2s",
    },
    navLinkPrimary: {
        color: "var(--accent-light)",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: 600,
    },
    // Hero
    hero: {
        position: "relative",
        zIndex: 1,
        textAlign: "center",
        padding: "80px 24px 60px",
        maxWidth: "700px",
        margin: "0 auto",
    },
    heroPill: {
        display: "inline-block",
        padding: "4px 14px",
        borderRadius: "999px",
        background: "rgba(99,102,241,0.1)",
        border: "1px solid rgba(99,102,241,0.25)",
        color: "var(--accent-light)",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.1em",
        marginBottom: "20px",
    },
    heroTitle: {
        fontSize: "clamp(36px, 5vw, 56px)",
        fontWeight: 800,
        letterSpacing: "-0.02em",
        margin: "0 0 20px",
        color: "var(--text-primary)",
    },
    heroSub: {
        fontSize: "18px",
        color: "var(--text-secondary)",
        lineHeight: 1.6,
        margin: "0 0 16px",
    },
    heroMeta: {
        fontSize: "13px",
        color: "var(--text-muted)",
        margin: 0,
    },
    // Main
    main: {
        position: "relative",
        zIndex: 1,
        maxWidth: "800px",
        margin: "0 auto",
        padding: "0 24px 80px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    section: {
        background: "rgba(19,19,43,0.5)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "16px",
        overflow: "hidden",
    },
    sectionHeader: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "24px 28px 20px",
        borderBottom: "1px solid var(--border-subtle)",
        background: "rgba(99,102,241,0.04)",
    },
    sectionNum: {
        fontSize: "11px",
        fontWeight: 800,
        letterSpacing: "0.1em",
        color: "var(--accent-light)",
        background: "rgba(99,102,241,0.12)",
        border: "1px solid rgba(99,102,241,0.2)",
        padding: "3px 10px",
        borderRadius: "999px",
        flexShrink: 0,
    },
    sectionTitle: {
        margin: 0,
        fontSize: "18px",
        fontWeight: 700,
        color: "var(--text-primary)",
        letterSpacing: "-0.01em",
    },
    sectionBody: {
        padding: "24px 28px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    },
    para: {
        margin: 0,
        fontSize: "15px",
        color: "var(--text-secondary)",
        lineHeight: 1.75,
    },
    list: {
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    listItem: {
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        fontSize: "15px",
        color: "var(--text-secondary)",
        lineHeight: 1.6,
    },
    dot: {
        width: "5px",
        height: "5px",
        borderRadius: "50%",
        background: "var(--accent-light)",
        flexShrink: 0,
        marginTop: "9px",
    },
    // CTA
    cta: {
        marginTop: "16px",
        background: "rgba(99,102,241,0.06)",
        border: "1px solid rgba(99,102,241,0.2)",
        borderRadius: "16px",
        padding: "40px 28px",
        textAlign: "center",
    },
    ctaText: {
        margin: "0 0 20px",
        fontSize: "20px",
        fontWeight: 700,
        color: "var(--text-primary)",
    },
    ctaRow: {
        display: "flex",
        justifyContent: "center",
        gap: "12px",
        flexWrap: "wrap",
    },
    ctaBtn: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 22px",
        borderRadius: "10px",
        background: "rgba(99,102,241,0.1)",
        border: "1px solid rgba(99,102,241,0.25)",
        color: "var(--accent-light)",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: 600,
        transition: "all 0.2s",
    },
    // Footer
    footer: {
        position: "relative",
        zIndex: 1,
        borderTop: "1px solid var(--border-subtle)",
        padding: "24px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
        background: "rgba(8,8,16,0.9)",
    },
    footerText: {
        fontSize: "13px",
        color: "var(--text-muted)",
    },
    footerLinks: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },
    footerLink: {
        fontSize: "13px",
        color: "var(--text-muted)",
        textDecoration: "none",
        transition: "color 0.2s",
    },
    footerDivider: {
        color: "var(--text-muted)",
        fontSize: "13px",
    },
};
