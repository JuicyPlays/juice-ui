import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../../App";
import { styles } from "../styles/home.styles";
import { pricingPlans, sharedFeatures } from "../data/pricingPlans";
import PricingCard from "./PricingCard";

export default function PricingSection() {
  const plansWithFeatures = pricingPlans.map(plan => ({
    ...plan,
    features: sharedFeatures
  }));

  return (
    <section id="pricing-section" style={{ ...styles.sectionStandard, paddingBottom: '120px' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={styles.sectionTitle}>Choose Your Plan</h2>
        <p style={styles.sectionSub}>
          Get instant access to profitable predictions, real-time line alerts, and a proven system that works while you sleep.
        </p>
      </div>

      <div className="pricing-grid" style={styles.pricingGrid}>
        <Elements stripe={stripePromise}>
          {plansWithFeatures.map((plan) => (
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
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
