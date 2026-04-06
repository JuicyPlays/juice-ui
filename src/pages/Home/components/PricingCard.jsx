import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";

export default function PricingCard({ plan }) {
  const user = useAuthUser();
  const navigate = useNavigate();
  const location = useLocation();
  const authUser = user();
  const subscribed = Boolean(authUser?.subscribed || authUser?.hasAccess);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (!authUser) {
      navigate("/login", { state: { from: location } });
      return;
    }
    if (!subscribed) {
      window.open(plan.checkoutUrl, "_blank", "noopener,noreferrer");
    } else {
      navigate("/ev-plays");
    }
  };

  const isFeatured = plan.featured;

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
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
          gap: '24px',
          height: '100%',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: hovered
            ? '0 20px 40px rgba(99,102,241,0.25)'
            : isFeatured
              ? '0 8px 24px rgba(99,102,241,0.15)'
              : '0 4px 12px rgba(0,0,0,0.1)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div>
          <h3 style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: '20px',
            color: 'var(--text-primary)',
            margin: '0 0 6px 0',
            letterSpacing: '-0.2px',
          }}>
            {plan.name}
          </h3>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: 'var(--text-muted)',
            margin: 0,
          }}>
            {plan.subtitle}
          </p>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', marginBottom: '8px' }}>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: '20px',
              color: isFeatured ? '#818cf8' : 'var(--text-primary)',
            }}>
              $
            </span>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: '52px',
              letterSpacing: '-2px',
              lineHeight: 1,
              color: isFeatured ? '#818cf8' : 'var(--text-primary)',
            }}>
              {plan.price}
            </span>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              color: 'var(--text-muted)',
              fontSize: '15px',
              fontWeight: 500,
              marginLeft: '4px',
            }}>
              {plan.period}
            </span>
          </div>

          {plan.originalPrice && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                color: 'var(--text-muted)',
                textDecoration: 'line-through',
              }}>
                ${plan.originalPrice}
              </span>
              <span style={{
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                padding: '3px 10px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '0.06em',
              }}>
                {plan.discount}
              </span>
            </div>
          )}
        </div>

        <ul style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 8px 0",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          flex: 1,
        }}>
          {plan.features?.map((feature, i) => (
            <li key={i} style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
            }}>
              <span style={{
                fontSize: "16px",
                flexShrink: 0,
                lineHeight: "22px",
              }}>✓</span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13.5px",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
              }}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={handleClick}
          style={{
            width: "100%",
            padding: "13px",
            borderRadius: "12px",
            border: "none",
            background: isFeatured
              ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
              : 'rgba(99,102,241,0.15)',
            color: isFeatured ? 'white' : '#818cf8',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: "14px",
            letterSpacing: "0.02em",
            cursor: "pointer",
            transition: "opacity 0.15s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          {!subscribed ? plan.ctaText : 'Open Dashboard'}
        </button>
      </div>
    </div>
  );
}
