/* eslint-disable react/style-prop-object */
import React, { Component, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import { stripePromise } from "../App";
import { useAuthUser } from "react-auth-kit";

// -------------- Pricing Data --------------
const sharedFeatures = [
  "AI-generated +EV slips — just click and bet",
  "Juicy Screen — live line discrepancy alerts",
  "Slip Generator with optimized parlays",
  "Real-time esports prop coverage",
];

const plans = [
  {
    name: "Bi-Weekly",
    label: null,
    labelColor: null,
    subtitle: "Flexible short-term access",
    price: "19.99",
    originalPrice: null,
    period: "/ 2 weeks",
    discount: null,
    featured: false,
    priceId: "price_1T4yqfFbPaDvi0T07mimbuDg",
    ctaText: "Select Plan",
  },
  {
    name: "Monthly",
    label: "MOST POPULAR",
    labelColor: "#6366f1",
    subtitle: "Our most popular choice",
    price: "29.99",
    originalPrice: "49.99",
    period: "/ month",
    discount: "40% off",
    featured: true,
    priceId: "price_1T4yrMFbPaDvi0T0f6CRfOB0",
    ctaText: "Start Winning Now",
  },
  {
    name: "Annual",
    label: "BEST VALUE",
    labelColor: "#10b981",
    subtitle: "Maximum savings, full commitment",
    price: "249",
    originalPrice: "599",
    period: "/ year",
    discount: "58% off",
    featured: false,
    priceId: "price_1T4ypsFbPaDvi0T0wpLJcxRI",
    ctaText: "Select Plan",
  },
];

// -------------- Pricing Card Component --------------
const PricingCard = ({ plan }) => {
  const stripe = useStripe();
  const user = useAuthUser();
  const navigate = useNavigate();
  const [subscribed, setSubscribed] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    async function getUser(userId) {
      if (!userId) return;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_JUICE_API_USERS}/userId/${userId}`
        );
        setSubscribed(response.data.subscribed);
      } catch (e) {
        console.error("Error fetching user sub status", e);
      }
    }
    if (user()) getUser(user().userId);
  }, [user]);

  const location = useLocation();

  const handleClick = async () => {
    if (!user()) {
      navigate("/login", { state: { from: location } });
      return;
    }
    if (!subscribed) {
      const response = await axios.post(
        import.meta.env.VITE_JUICE_API_BASE_URL + "/checkout-session",
        {
          priceId: plan.priceId,
          userId: user().userId,
          email: user().email,
          successUrl: import.meta.env.VITE_BASE_URL + "/",
          cancelUrl: import.meta.env.VITE_BASE_URL + "/",
        }
      );
      const sessionUrl = response.data;
      const result = await stripe.redirectToCheckout({ sessionId: sessionUrl });
      if (result.error) console.error(result.error.message);
    } else {
      window.open("https://billing.stripe.com/p/login/test_dR6g2g6mg6W1bcY4gg", "_blank");
    }
  };

  const isFeatured = plan.featured;

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
      {/* Floating pill label */}
      {plan.label && (
        <div style={{
          position: 'absolute',
          top: '-16px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: plan.labelColor === '#10b981'
            ? 'linear-gradient(135deg, #10b981, #059669)'
            : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: 'white',
          padding: '5px 18px',
          borderRadius: '999px',
          fontSize: '11px',
          fontWeight: 800,
          letterSpacing: '0.1em',
          whiteSpace: 'nowrap',
          zIndex: 2,
          boxShadow: plan.labelColor === '#10b981' ? '0 4px 12px rgba(16,185,129,0.4)' : '0 4px 12px rgba(99,102,241,0.4)',
        }}>
          {plan.label}
        </div>
      )}

      <div
        style={{
          background: isFeatured
            ? 'linear-gradient(145deg, rgba(30,30,70,0.95), rgba(20,20,55,0.98))'
            : 'rgba(19,19,43,0.7)',
          border: isFeatured
            ? '1px solid rgba(99,102,241,0.5)'
            : '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px',
          padding: '40px 28px 32px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: hovered
            ? (isFeatured
              ? '0 0 80px rgba(99,102,241,0.35), 0 16px 56px rgba(0,0,0,0.6)'
              : '0 0 40px rgba(99,102,241,0.15), 0 12px 40px rgba(0,0,0,0.5)')
            : (isFeatured
              ? '0 0 60px rgba(99,102,241,0.2), 0 8px 48px rgba(0,0,0,0.5)'
              : '0 4px 32px rgba(0,0,0,0.4)'),
          transform: hovered
            ? 'translateY(-6px) scale(1.03)'
            : isFeatured ? 'scale(1.02)' : 'scale(1)',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          flex: 1,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Plan name */}
        <h3 style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          fontSize: '22px',
          color: isFeatured ? '#c4b5fd' : 'var(--text-primary)',
          margin: '0 0 12px',
          textAlign: 'center',
        }}>{plan.name}</h3>

        {/* Original price + discount badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '26px', marginBottom: '8px' }}>
          {plan.originalPrice && (
            <>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>${plan.originalPrice}</span>
              <span style={{
                background: isFeatured ? 'rgba(99,102,241,0.25)' : 'rgba(16,185,129,0.15)',
                color: isFeatured ? '#818cf8' : '#10b981',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 700,
                border: isFeatured ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(16,185,129,0.3)',
              }}>{plan.discount}</span>
            </>
          )}
        </div>

        {/* Big price */}
        <div style={{ textAlign: 'center', margin: '4px 0 6px' }}>
          <span style={{
            fontSize: '52px',
            fontWeight: 800,
            color: isFeatured ? '#a78bfa' : 'var(--text-primary)',
            letterSpacing: '-2px',
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1,
          }}>${plan.price}</span>
          <span style={{ fontSize: '14px', color: 'var(--text-muted)', marginLeft: '4px' }}>{plan.period}</span>
        </div>

        {/* Subtitle */}
        <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 24px', fontFamily: "'Inter', sans-serif" }}>
          {plan.subtitle}
        </p>

        {/* Divider */}
        <div style={{ height: '1px', background: isFeatured ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.06)', marginBottom: '24px' }} />

        {/* Features */}
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          {sharedFeatures.map((feat, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)', fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}>
              <span style={{ color: '#10b981', fontWeight: 700, flexShrink: 0 }}>✓</span>
              {feat}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={handleClick}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            border: isFeatured ? 'none' : '1px solid rgba(255,255,255,0.12)',
            background: isFeatured ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
            color: isFeatured ? 'white' : 'var(--text-primary)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: '15px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: isFeatured ? '0 4px 20px rgba(99,102,241,0.4)' : 'none',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          {!subscribed ? plan.ctaText : 'Manage Subscription'}
        </button>
      </div>
    </div>
  );
};


// -------------- UI Mocks for Hero --------------
const TechGridVisual = () => {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '400px',
      background: 'linear-gradient(180deg, rgba(19, 19, 43, 0.4) 0%, rgba(13, 13, 26, 0.8) 100%)',
      border: '1px solid rgba(99, 102, 241, 0.2)',
      borderRadius: '16px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 0 40px rgba(99, 102, 241, 0.1)',
    }}>
      {/* Animated Matrix/Grid effect overlay */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        opacity: 0.5,
        zIndex: 0
      }}></div>

      <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#6366f1', boxShadow: '0 0 10px #6366f1' }}></div>
          <span style={{ color: '#a0a0c0', fontSize: '13px', fontFamily: 'monospace', letterSpacing: '0.05em' }}>SLIP GENERATOR</span>
        </div>
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '2px 8px', borderRadius: '4px' }}>
          <span style={{ color: '#10b981', fontSize: '11px', fontWeight: 700 }}>+EV FOUND</span>
        </div>
      </div>

      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '15px', zIndex: 1 }}>
        {/* Mock Slip Rows */}
        {[
          { game: "CS2 • TS vs NAVI", player: "donk", stat: "Map 1-2 Kills", line: "38.5", pick: "OVER", ev: "+11.4%" },
          { game: "VAL • SEN vs LOUD", player: "TenZ", stat: "Map 1-2 Kills", line: "35.5", pick: "OVER", ev: "+14.2%" },
          { game: "LoL • T1 vs GEN", player: "Faker", stat: "Map 1-2 Kills", line: "9.5", pick: "OVER", ev: "+8.9%" },
        ].map((row, i) => (
          <div key={i} style={{
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            borderRadius: '8px',
            padding: '12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 0 15px rgba(99, 102, 241, 0.2)'
          }}>
            <div>
              <div style={{ fontSize: '10px', color: '#a0a0c0', marginBottom: '4px', textTransform: 'uppercase' }}>{row.game}</div>
              <div style={{ color: '#f1f1fb', fontWeight: 600, fontSize: '15px' }}>{row.player}</div>
              <div style={{ color: '#818cf8', fontSize: '12px', marginTop: '2px' }}>{row.stat}</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: '#10b981', marginBottom: '2px', fontWeight: 700 }}>{row.ev} EV</div>
                <div style={{ fontSize: '11px', color: '#a0a0c0', marginBottom: '4px' }}>LINE: {row.line}</div>
              </div>
              <div style={{ background: '#10b981', padding: '6px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#000', fontWeight: 800, fontSize: '12px', letterSpacing: '0.05em' }}>{row.pick}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slip Footer / Total EV */}
      <div style={{
        padding: '16px 20px',
        background: 'rgba(19, 19, 43, 0.8)',
        borderTop: '1px solid rgba(99, 102, 241, 0.3)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1
      }}>
        <div>
          <div style={{ fontSize: '12px', color: '#a0a0c0', fontWeight: 500 }}>3-PICK POWER PLAY</div>
          <div style={{ color: '#f1f1fb', fontSize: '14px', fontWeight: 700, marginTop: '2px' }}>Total Expected Value</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: '#10b981', fontSize: '20px', fontWeight: 800 }}>+34.5%</span>
          <span style={{ color: '#a0a0c0', fontSize: '13px', fontWeight: 600 }}>EV</span>
        </div>
      </div>
    </div>
  );
}

// -------------- FAQ Accordion --------------
const faqItems = [
  {
    q: "How do I know the ROI is real?",
    a: "Our AI model is built on proven statistical methods for identifying mispriced esports prop lines. Over a statistically significant sample, +EV plays outperform the market. We don't guarantee profits but the math works over time with proper bankroll management.",
  },
  {
    q: "What platforms do you support?",
    a: "JuicyPlays currently supports Underdog Fantasy. We actively monitor their esports prop lines and generate optimized slips specifically for their platform. Additional DFS platforms are on our roadmap.",
  },
  {
    q: "I'm a beginner. Will I know what to do?",
    a: "Absolutely. The Juicy Screen highlights discrepancies with clear EV percentages with no expertise required. The Slip Generator even builds your parlay for you. If you can click a button, you can use JuicyPlays.",
  },
  {
    q: "What if I have a losing streak?",
    a: "Variance is part of any EV-based strategy. Losing streaks happen even with a proven edge. Bankroll management is critical and we recommend never risking more than 1-2% per entry. The edge compounds over hundreds of plays, not tens.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. You can cancel your subscription at any time from your billing portal with no cancellation fees. You'll retain full access until the end of your current billing period.",
  },
];

const FAQItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (open) {
      setHeight(bodyRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open]);

  return (
    <div
      style={{
        ...faqStyles.item,
        border: open
          ? "1px solid rgba(99, 102, 241, 0.35)"
          : "1px solid rgba(255,255,255,0.06)",
        background: open ? "rgba(99,102,241,0.07)" : "rgba(19,19,43,0.4)",
      }}
    >
      <button
        style={faqStyles.trigger}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span style={faqStyles.question}>{item.q}</span>
        <span
          style={{
            ...faqStyles.chevron,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          &#8964;
        </span>
      </button>
      <div
        ref={bodyRef}
        style={{
          maxHeight: `${height}px`,
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <p style={faqStyles.answer}>{item.a}</p>
      </div>
    </div>
  );
};

const FAQSection = () => (
  <section style={{ ...styles.sectionStandard, paddingBottom: "100px" }}>
    <div style={{ textAlign: "center", marginBottom: "60px" }}>
      <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
    </div>
    <div style={faqStyles.list}>
      {faqItems.map((item, i) => (
        <FAQItem key={i} item={item} />
      ))}
    </div>
  </section>
);

// -------------- Main Landing Page --------------
const LandingPage = () => {
  const location = useLocation();
  const subscriptionRequired = location.state?.subscriptionRequired;

  return (
    <div style={styles.container}>
      {/* Subscription Required Alert */}
      {subscriptionRequired && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          borderRadius: '12px',
          padding: '16px',
          marginTop: '24px',
          textAlign: 'center',
          color: '#ef4444',
          fontWeight: 600,
          fontFamily: "'Inter', sans-serif",
          zIndex: 10,
          position: 'relative'
        }}>
          ⚠️ Subscription required to access Juicy Screen or Slip Generator. Please choose a plan below.
        </div>
      )}

      {/* Background Orbs */}
      <div style={styles.bgOrbTop} />
      <div style={styles.bgOrbBottom} />

      {/* 1. Esports Hero Section */}
      <section style={styles.sectionLarge}>
        <div className="hero-grid" style={styles.heroGrid}>
          <div style={styles.heroContent}>
            <h1 style={styles.headline}>Data-Driven <br /> <span style={styles.gradientText}>Esports Value</span></h1>
            <p style={styles.subheadline}>
              Stop guessing. We analyze millions of data points across global esports lines to identify profitable discrepancies before the books can adjust.
            </p>
            <div style={styles.actionRow}>
              {/* Anchor scroll to pricing block */}
              <a href="#pricing-section" style={{ textDecoration: 'none' }}>
                <button
                  className="btn-gradient"
                >
                  Start Winning Now
                </button>
              </a>
            </div>
          </div>
          <div style={styles.heroVisual}>
            <TechGridVisual />
          </div>
        </div>
      </section>



      {/* 3. Esports Pipeline (How it works alternative) */}
      <section style={styles.sectionStandard}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={styles.sectionTitle}>The Technology Advantage</h2>
          <p style={styles.sectionSub}>How our system finds an edge in volatile esports markets.</p>
        </div>

        <div style={styles.stepsGrid}>
          {[
            { step: "01", title: "Live Polling", desc: "Our engine scans player props across top esports titles every single minute." },
            { step: "02", title: "EV Calculation", desc: "We run lines against our proven AI model to calculate true probability and determine Expected Value (+EV)." },
            { step: "03", title: "Discrepancy Alerts", desc: "When heavily mispriced lines appear on DFS platforms, they are instantly pushed to the dashboard." },
            { step: "04", title: "Slip Execution", desc: "Use the Slip Generator to mathematically combine the highest EV props into optimized entries." }
          ].map((s, i) => (
            <div key={i} style={styles.stepCard}>
              <div style={styles.stepNum}>{s.step}</div>
              <h3 style={styles.stepTitle}>{s.title}</h3>
              <p style={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Comparison Matrix: Algorithmic vs Gut */}
      <section style={styles.sectionStandard}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={styles.sectionTitle}>Why Data &gt; Gut Feelings</h2>
        </div>

        <div className="comparison-wrapper" style={styles.comparisonWrapper}>
          <div style={{ ...styles.compCol, backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
            <h3 style={{ ...styles.compHeader, color: '#ef4444' }}>Traditional Handicapping</h3>
            <ul style={styles.compList}>
              <li style={styles.compItem}><span style={{ color: '#ef4444' }}>✕</span> Relies on "eye test" and emotion</li>
              <li style={styles.compItem}><span style={{ color: '#ef4444' }}>✕</span> Too slow to catch live line movement</li>
              <li style={styles.compItem}><span style={{ color: '#ef4444' }}>✕</span> Biased toward favorite teams/players</li>
              <li style={styles.compItem}><span style={{ color: '#ef4444' }}>✕</span> Ignores mathematical Expected Value</li>
            </ul>
          </div>
          <div style={{ ...styles.compCol, backgroundColor: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.3)', transform: 'scale(1.05)' }}>
            <div style={styles.compBadge}>JuicyPlays</div>
            <h3 style={{ ...styles.compHeader, color: '#818cf8' }}>Algorithmic Execution</h3>
            <ul style={styles.compList}>
              <li style={styles.compItem}><span style={{ color: '#10b981' }}>✓</span> 100% data-driven projections</li>
              <li style={styles.compItem}><span style={{ color: '#10b981' }}>✓</span> Captures volatile discrepancies instantly</li>
              <li style={styles.compItem}><span style={{ color: '#10b981' }}>✓</span> Completely unbaised modeling</li>
              <li style={styles.compItem}><span style={{ color: '#10b981' }}>✓</span> Mathematically guaranteed long-term edge</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Inline Pricing */}
      <section id="pricing-section" style={{ ...styles.sectionStandard, paddingBottom: '120px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={styles.sectionTitle}>Choose Your Plan</h2>
          <p style={styles.sectionSub}>Get instant access to profitable predictions, real-time line alerts, and a proven system that works while you sleep.</p>

        </div>

        <div className="pricing-grid" style={styles.pricingGrid}>
          <Elements stripe={stripePromise}>
            {plans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </Elements>
        </div>

        {/* Assurance strip */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '40px',
          marginTop: '36px',
          flexWrap: 'wrap',
        }}>
          {[
            { icon: '🛡️', text: 'Cancel anytime' },
            { icon: '🔒', text: 'Secure payment via Stripe' },
            { icon: '⚡', text: 'Instant access' },
          ].map((item) => (
            <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ */}
      <FAQSection />
    </div>
  );
}

// ============== MAIN EXPORT ==============
export default class RenderHome extends Component {
  render() {
    return (
      <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', overflowX: 'hidden' }}>
        <NavBar />
        <LandingPage />
        <Footer />
      </div>
    );
  }
}

// ============== STYLES ==============
const styles = {
  container: {
    position: 'relative',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    fontFamily: "'Inter', sans-serif",
  },
  bgOrbTop: {
    position: "absolute",
    width: "800px",
    height: "800px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 60%)",
    top: "-200px",
    right: "-300px",
    pointerEvents: "none",
    zIndex: 0,
  },
  bgOrbBottom: {
    position: "absolute",
    width: "800px",
    height: "800px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)",
    bottom: "10%",
    left: "-400px",
    pointerEvents: "none",
    zIndex: 0,
  },
  sectionLarge: {
    padding: "120px 0 80px 0",
    position: 'relative',
    zIndex: 1,
  },
  sectionStandard: {
    padding: "80px 0",
    position: 'relative',
    zIndex: 1,
  },
  sectionStrip: {
    padding: "40px 0",
    borderTop: "1px solid var(--border-subtle)",
    borderBottom: "1px solid var(--border-subtle)",
    textAlign: "center",
    position: 'relative',
    zIndex: 1,
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "64px",
    alignItems: "center",
  },
  heroContent: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  badge: {
    display: "inline-block",
    padding: "6px 16px",
    borderRadius: "999px",
    background: "rgba(99,102,241,0.1)",
    border: "1px solid rgba(99,102,241,0.3)",
    color: "var(--accent-light)",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    alignSelf: "flex-start",
  },
  headline: {
    fontSize: "clamp(42px, 5vw, 64px)",
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
    color: "var(--text-primary)",
    margin: 0,
  },
  gradientText: {
    background: "linear-gradient(135deg, #818cf8 0%, #c084fc 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  subheadline: {
    fontSize: "18px",
    lineHeight: 1.6,
    color: "var(--text-secondary)",
    margin: 0,
    maxWidth: "500px",
  },
  actionRow: {
    display: "flex",
    gap: "16px",
    marginTop: "16px",
  },
  primaryBtn: {
    padding: "16px 32px",
    fontSize: "16px",
    fontWeight: 700,
    minWidth: "200px",
    cursor: 'pointer',
    boxShadow: "0 0 24px rgba(99, 102, 241, 0.4)",
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)'
  },
  stripTitle: {
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "var(--text-muted)",
    marginBottom: "24px",
    fontWeight: 600,
  },
  platformLogos: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "24px",
  },
  platformBadge: {
    padding: "10px 24px",
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "8px",
    color: "var(--text-primary)",
    fontWeight: 600,
    fontSize: "15px",
    transition: "var(--transition)",
  },
  sectionTitle: {
    fontSize: "36px",
    fontWeight: 800,
    color: "var(--text-primary)",
    margin: "0 0 16px 0",
    letterSpacing: "-0.01em",
  },
  sectionSub: {
    fontSize: "18px",
    color: "var(--text-secondary)",
    margin: 0,
  },
  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
  },
  stepCard: {
    background: "rgba(19,19,43,0.4)",
    border: "1px solid var(--border-subtle)",
    borderRadius: "16px",
    padding: "32px",
    position: "relative",
    transition: "var(--transition)",
  },
  stepNum: {
    fontSize: "48px",
    fontWeight: 900,
    color: "rgba(99,102,241,0.1)",
    position: "absolute",
    top: "20px",
    right: "24px",
    lineHeight: 1,
  },
  stepTitle: {
    fontSize: "20px",
    fontWeight: 700,
    color: "var(--text-primary)",
    margin: "0 0 16px 0",
    position: "relative",
    zIndex: 1,
  },
  stepDesc: {
    fontSize: "15px",
    color: "var(--text-secondary)",
    lineHeight: 1.6,
    margin: 0,
    position: "relative",
    zIndex: 1,
  },
  comparisonWrapper: {
    display: "flex",
    justifyContent: "center",
    gap: "32px",
    maxWidth: "900px",
    margin: "0 auto",
    alignItems: "center",
    flexWrap: "wrap", // For mobile
  },
  compCol: {
    flex: "1 1 350px",
    borderRadius: "20px",
    padding: "40px",
    position: "relative",
  },
  compBadge: {
    position: "absolute",
    top: "-12px",
    right: "32px",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    padding: "4px 16px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.05em",
    boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
  },
  compHeader: {
    fontSize: "24px",
    fontWeight: 800,
    marginBottom: "24px",
    letterSpacing: "-0.01em",
    marginTop: 0,
  },
  compList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  compItem: {
    color: "var(--text-primary)",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontWeight: 500,
  },
  pricingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
    maxWidth: "960px",
    margin: "0 auto",
    alignItems: "end",
    position: "relative",
    zIndex: 1,
  },
};

const faqStyles = {
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxWidth: "760px",
    margin: "0 auto",
  },
  item: {
    borderRadius: "12px",
    overflow: "hidden",
    transition: "border 0.25s ease, background 0.25s ease",
  },
  trigger: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    gap: "16px",
  },
  question: {
    fontSize: "15px",
    fontWeight: 600,
    color: "var(--text-primary)",
    fontFamily: "'Inter', sans-serif",
    lineHeight: 1.4,
  },
  chevron: {
    fontSize: "22px",
    color: "var(--accent-light)",
    flexShrink: 0,
    transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
    display: "inline-block",
    lineHeight: 1,
  },
  answer: {
    padding: "0 24px 20px",
    margin: 0,
    fontSize: "14.5px",
    color: "var(--text-secondary)",
    lineHeight: 1.7,
    fontFamily: "'Inter', sans-serif",
  },
};

const cardStyles = {
  card: {
    background: "rgba(19,19,43,0.8)",
    borderRadius: "20px",
    backdropFilter: "blur(20px)",
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    gap: "0",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "default",
  },
  ribbon: {
    position: "absolute",
    top: "16px",
    right: "-28px",
    transform: "rotate(45deg)",
    transformOrigin: "center",
    padding: "5px 36px",
    fontSize: "10px",
    fontWeight: 800,
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "0.08em",
    color: "white",
    textTransform: "uppercase",
  },
  header: {
    marginBottom: "28px",
  },
  badge: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    marginBottom: "12px",
  },
  title: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
    fontSize: "20px",
    color: "var(--text-primary)",
    margin: "0 0 16px 0",
    letterSpacing: "-0.2px",
  },
  priceRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "2px",
  },
  currency: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
    fontSize: "20px",
  },
  price: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 800,
    fontSize: "52px",
    letterSpacing: "-2px",
    lineHeight: 1,
  },
  period: {
    fontFamily: "'Inter', sans-serif",
    color: "var(--text-muted)",
    fontSize: "15px",
    fontWeight: 500,
    marginLeft: "4px",
  },
  featureList: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 32px 0",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    flex: 1,
  },
  featureItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },
  featureIcon: {
    fontSize: "16px",
    flexShrink: 0,
    lineHeight: "22px",
  },
  featureText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "13.5px",
    color: "var(--text-secondary)",
    lineHeight: 1.6,
  },
  btn: {
    width: "100%",
    padding: "13px",
    borderRadius: "12px",
    border: "none",
    color: "white",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
    fontSize: "14px",
    letterSpacing: "0.02em",
    cursor: "pointer",
    transition: "opacity 0.15s ease",
  },
};
