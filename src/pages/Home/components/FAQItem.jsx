import React, { useState, useEffect, useRef } from "react";
import { faqStyles } from "../styles/home.styles";

export default function FAQItem({ item }) {
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
}
