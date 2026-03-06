import React from "react";
import { styles, faqStyles } from "../styles/home.styles";
import { faqItems } from "../data/faqData";
import FAQItem from "./FAQItem";

export default function FAQSection() {
  return (
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
}
