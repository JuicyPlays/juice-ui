import React from "react";
import { styles } from "../styles/home.styles";
import TechGridVisual from "./TechGridVisual";

export default function HeroSection() {
  return (
    <section style={styles.sectionLarge}>
      <div className="hero-grid" style={styles.heroGrid}>
        <div style={styles.heroContent}>
          <h1 style={styles.headline}>
            Data-Driven <br /> <span style={styles.gradientText}>Esports Value</span>
          </h1>
          <p style={styles.subheadline}>
            Stop guessing. We analyze millions of data points across global esports lines to identify profitable discrepancies before the books can adjust.
          </p>
          <div style={styles.actionRow}>
            <a href="#pricing-section" style={{ textDecoration: 'none' }}>
              <button className="btn-gradient">
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
  );
}
