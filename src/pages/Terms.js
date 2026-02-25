import React from "react";
import { Link } from "react-router-dom";
import { Twitter, MailOutline } from "@mui/icons-material";

const sections = [
    {
        num: "01",
        title: "Acceptance of Terms",
        highlight: true,
        content: [
            {
                type: "text",
                value:
                    "By accessing or using JuicyPlays, you confirm that you are at least 18 years of age and legally permitted to participate in sports betting or fantasy sports in your jurisdiction. You agree to be bound by these Terms & Conditions in full. If you do not agree, you must not use the platform.",
            },
        ],
    },
    {
        num: "02",
        title: "Service Description",
        content: [
            {
                type: "text",
                value: "JuicyPlays is an algorithmic esports analytics platform that provides:",
            },
            {
                type: "list",
                items: [
                    "Live Expected Value (EV) data comparing prop lines across DFS platforms like PrizePicks and Underdog",
                    "Automated slip generation — mathematically optimized parlays built from high-EV props",
                    "Real-time line discrepancy tracking across CS2, League of Legends, Valorant, and more",
                    "Historical prop data and performance analytics",
                ],
            },
            {
                type: "text",
                value:
                    "All outputs are informational. JuicyPlays does not place bets on your behalf and does not operate as a sportsbook or DFS operator.",
            },
        ],
    },
    {
        num: "03",
        title: "User Responsibilities",
        content: [
            {
                type: "text",
                value: "By using JuicyPlays, you agree to:",
            },
            {
                type: "list",
                items: [
                    "Provide accurate, up-to-date registration information",
                    "Keep your account credentials secure and confidential",
                    "Use the platform for personal, non-commercial purposes only",
                    "Not share your account, subscription access, or any platform outputs with non-subscribers",
                    "Not use bots, scrapers, automated scripts, or browser extensions to access data at rates exceeding normal human usage",
                    "Not attempt to reverse-engineer, copy, or redistribute our algorithms, models, or data",
                    "Comply with all applicable local, state, and federal laws regarding sports betting and DFS",
                    "Not attempt to manipulate or abuse any platform feature",
                ],
            },
        ],
    },
    {
        num: "04",
        title: "Analytics & Data Disclaimer",
        content: [
            {
                type: "text",
                value: "You acknowledge and accept that:",
            },
            {
                type: "list",
                items: [
                    "All analytics, EV calculations, and slip recommendations are informational only — not financial advice",
                    "Historical performance does not guarantee future results",
                    "Prop line data is sourced from third-party platforms and may occasionally contain delays or inaccuracies",
                    "You are solely responsible for verifying information and making your own betting decisions",
                    "Esports markets are highly volatile — lines can move rapidly after our data is refreshed",
                ],
            },
        ],
    },
    {
        num: "05",
        title: "Intellectual Property",
        content: [
            {
                type: "text",
                value:
                    "All content and technology on JuicyPlays — including but not limited to EV algorithms, slip generation models, dashboard interfaces, data visualizations, and written content — are the exclusive intellectual property of JuicyPlays and are protected by copyright and trade secret law.",
            },
            {
                type: "text",
                value:
                    "Unauthorized reproduction, redistribution, scraping, or commercialization of any platform content is strictly prohibited and may result in legal action.",
            },
        ],
    },
    {
        num: "06",
        title: "Subscriptions & Payments",
        content: [
            {
                type: "list",
                items: [
                    "Subscriptions are billed monthly and renew automatically unless cancelled",
                    "You may cancel at any time via the billing portal — your access remains active until the end of the billing period",
                    "Refunds are not provided for partial billing periods",
                    "If your account is terminated due to Terms violations (e.g., account sharing, scraping, or data redistribution), no refund will be issued",
                    "We reserve the right to change pricing with 30 days' notice",
                ],
            },
        ],
    },
    {
        num: "07",
        title: "Platform Access & Termination",
        content: [
            {
                type: "text",
                value: "We reserve the right to:",
            },
            {
                type: "list",
                items: [
                    "Modify, suspend, or discontinue any feature at any time without prior notice",
                    "Limit access during maintenance windows or infrastructure upgrades",
                    "Suspend or permanently terminate accounts that violate these Terms, at our sole discretion",
                    "Adjust data refresh rates or analysis methods to maintain platform integrity",
                ],
            },
            {
                type: "text",
                value:
                    "Account terminations due to policy violations — including sharing credentials, automated scraping, or redistribution of data — will not be eligible for refunds.",
            },
        ],
    },
    {
        num: "08",
        title: "Risk Disclosure",
        highlight: true,
        content: [
            {
                type: "text",
                value: "Sports betting and DFS involve significant financial risk. You acknowledge that:",
            },
            {
                type: "list",
                items: [
                    "You should never wager more than you can afford to lose",
                    "Even strong positive-EV plays can lose in the short term due to variance",
                    "JuicyPlays does not guarantee profits — no service can",
                    "You are solely responsible for all betting decisions and financial outcomes",
                    "Past win rates on our picks do not indicate future performance",
                ],
            },
        ],
    },
    {
        num: "09",
        title: "Limitation of Liability",
        content: [
            {
                type: "text",
                value:
                    "To the maximum extent permitted by law, JuicyPlays shall not be liable for:",
            },
            {
                type: "list",
                items: [
                    "Any financial losses arising from betting decisions made using our platform",
                    "Inaccuracies or delays in third-party prop line data",
                    "Service outages, technical interruptions, or data unavailability",
                    "Changes in DFS platform rules, lines, or payout structures",
                    "Unauthorized access to your account due to your own negligence",
                ],
            },
        ],
    },
    {
        num: "10",
        title: "Privacy",
        content: [
            {
                type: "text",
                value:
                    "Your use of JuicyPlays is also governed by our Privacy Policy, which describes how we collect, store, and protect your personal information. By using the platform, you agree to the terms of our Privacy Policy.",
            },
        ],
    },
    {
        num: "11",
        title: "Modifications to Terms",
        content: [
            {
                type: "text",
                value:
                    "We may update these Terms at any time. When we make material changes, we will notify you via email or a platform announcement. Continued use of JuicyPlays after updates constitutes acceptance of the revised Terms.",
            },
        ],
    },
];

const Terms = () => {
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
                    <Link to="/privacy" style={pg.navLink}>Privacy Policy</Link>
                    <Link to="/home" style={pg.navLinkPrimary}>← Back to Home</Link>
                </div>
            </nav>

            {/* Hero */}
            <header style={pg.hero}>
                <h1 style={pg.heroTitle}>Terms & Conditions</h1>
                <p style={pg.heroSub}>
                    Please read these terms carefully before using JuicyPlays. They govern your access to our platform and services.
                </p>
                <p style={pg.heroMeta}>Last updated: February 2026</p>
            </header>

            {/* Content */}
            <main style={pg.main}>
                {sections.map((sec) => (
                    <section
                        key={sec.num}
                        style={{
                            ...pg.section,
                            ...(sec.highlight
                                ? { border: "1px solid rgba(99,102,241,0.3)", background: "rgba(99,102,241,0.05)" }
                                : {}),
                        }}
                    >
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
                    <p style={pg.ctaText}>Questions about these terms?</p>
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

export default Terms;

// ── Styles (shared with Privacy.js layout) ──────────────────────────────────
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
        background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 60%)",
        top: "-200px",
        left: "-200px",
        pointerEvents: "none",
        zIndex: 0,
    },
    orbBottom: {
        position: "fixed",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 60%)",
        bottom: "-150px",
        right: "-200px",
        pointerEvents: "none",
        zIndex: 0,
    },
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
    },
    navLinkPrimary: {
        color: "var(--accent-light)",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: 600,
    },
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
        background: "rgba(139,92,246,0.1)",
        border: "1px solid rgba(139,92,246,0.25)",
        color: "#a78bfa",
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
        background: "rgba(139,92,246,0.04)",
    },
    sectionNum: {
        fontSize: "11px",
        fontWeight: 800,
        letterSpacing: "0.1em",
        color: "#a78bfa",
        background: "rgba(139,92,246,0.12)",
        border: "1px solid rgba(139,92,246,0.2)",
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
        background: "#a78bfa",
        flexShrink: 0,
        marginTop: "9px",
    },
    cta: {
        marginTop: "16px",
        background: "rgba(139,92,246,0.06)",
        border: "1px solid rgba(139,92,246,0.2)",
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
        background: "rgba(139,92,246,0.1)",
        border: "1px solid rgba(139,92,246,0.25)",
        color: "#a78bfa",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: 600,
    },
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
    },
    footerDivider: {
        color: "var(--text-muted)",
        fontSize: "13px",
    },
};
