import React from "react";
import { styles } from "../styles/home.styles";

export default function TechnologySection() {
  const steps = [
    {
      step: "01",
      title: "Live Polling",
      desc: "Our engine scans player props across top esports titles every single minute.",
    },
    {
      step: "02",
      title: "EV Calculation",
      desc: "We run lines against our proven AI model to calculate true probability and determine Expected Value (+EV).",
    },
    {
      step: "03",
      title: "Discrepancy Alerts",
      desc: "When heavily mispriced lines appear on DFS platforms, they are instantly pushed to the dashboard.",
    },
    {
      step: "04",
      title: "Slip Execution",
      desc: "Use the Slip Generator to mathematically combine the highest EV props into optimized entries.",
    },
  ];

  return (
    <section style={styles.sectionStandard}>
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h2 style={styles.sectionTitle}>The Technology Advantage</h2>
        <p style={styles.sectionSub}>
          How our system finds an edge in volatile esports markets.
        </p>
      </div>

      <div style={styles.stepsGrid}>
        {steps.map((s, i) => (
          <div key={i} style={styles.stepCard}>
            <div style={styles.stepNum}>{s.step}</div>
            <h3 style={styles.stepTitle}>{s.title}</h3>
            <p style={styles.stepDesc}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
