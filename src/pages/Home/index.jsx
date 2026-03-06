import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../NavBar";
import Footer from "../Footer";
import HeroSection from "./components/HeroSection";
import TechnologySection from "./components/TechnologySection";
import ComparisonSection from "./components/ComparisonSection";
import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";
import SubscriptionAlert from "./components/SubscriptionAlert";
import { styles } from "./styles/home.styles";

export default function Home() {
  const location = useLocation();
  const subscriptionRequired = location.state?.subscriptionRequired;

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', overflowX: 'hidden' }}>
      <NavBar />
      
      <div style={styles.container}>
        {subscriptionRequired && <SubscriptionAlert />}
        
        {/* Background Orbs */}
        <div style={styles.bgOrbTop} />
        <div style={styles.bgOrbBottom} />

        <HeroSection />
        <TechnologySection />
        <ComparisonSection />
        <PricingSection />
        <FAQSection />
      </div>

      <Footer />
    </div>
  );
}
