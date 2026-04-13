import React from "react";
import { styles } from "../styles/home.styles";

export default function ComparisonSection() {
  return (
    <section style={styles.sectionStandard}>
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h2 style={styles.sectionTitle}>Why Data &gt; Gut Feelings</h2>
      </div>

      <div className="comparison-wrapper" style={styles.comparisonWrapper}>
        <div
          style={{
            ...styles.compCol,
            backgroundColor: "rgba(239, 68, 68, 0.05)",
            border: "1px solid rgba(239, 68, 68, 0.1)",
          }}
        >
          <h3 style={{ ...styles.compHeader, color: "#ef4444" }}>
            Traditional Handicapping
          </h3>
          <ul style={styles.compList}>
            <li style={styles.compItem}>
              <span style={{ color: "#ef4444" }}>✕</span> Relies on "eye test"
              and emotion
            </li>
            <li style={styles.compItem}>
              <span style={{ color: "#ef4444" }}>✕</span> Too slow to catch live
              line movement
            </li>
            <li style={styles.compItem}>
              <span style={{ color: "#ef4444" }}>✕</span> Biased toward favorite
              teams/players
            </li>
            <li style={styles.compItem}>
              <span style={{ color: "#ef4444" }}>✕</span> Ignores mathematical
              Expected Value
            </li>
          </ul>
        </div>
        <div
          style={{
            ...styles.compCol,
            backgroundColor: "rgba(99, 102, 241, 0.08)",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            transform: "scale(1.05)",
          }}
        >
          <div style={styles.compBadge}>JuicyPlays</div>
          <h3 style={{ ...styles.compHeader, color: "#818cf8" }}>
            Algorithmic Execution
          </h3>
          <ul style={styles.compList}>
            <li style={styles.compItem}>
              <span style={{ color: "#10b981" }}>✓</span> 100% data-driven
              projections
            </li>
            <li style={styles.compItem}>
              <span style={{ color: "#10b981" }}>✓</span> Captures volatile
              discrepancies instantly
            </li>
            <li style={styles.compItem}>
              <span style={{ color: "#10b981" }}>✓</span> Completely unbaised
              modeling
            </li>
            <li style={styles.compItem}>
              <span style={{ color: "#10b981" }}>✓</span> Mathematically
              guaranteed long-term edge
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
