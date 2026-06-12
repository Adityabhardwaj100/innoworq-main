"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#000000",
        color: "white",
        padding: "72px 0 32px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        {/* Top grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "64px",
            marginBottom: "64px",
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            {/* Logo */}
            <a
              href="#"
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <img
                src="/emark-logo.png"
                alt="Emark Academy Logo"
                style={{
                  width: "36px",
                  height: "36px",
                  objectFit: "contain",
                }}
              />
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: "22px",
                  color: "white",
                  letterSpacing: "-0.3px",
                  marginLeft: "12px",
                }}
              >
                Emark <span style={{ background: "linear-gradient(135deg, #FF8C00, #E8291C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Academy</span>
              </span>
            </a>

            <p
              style={{
                fontSize: "14px",
                color: "#94a3b8",
                lineHeight: 1.8,
                maxWidth: "300px",
                marginBottom: "28px",
              }}
            >
              Bridging the gap between theoretical AI knowledge and industry-ready applications. Empowering the next generation of AI Generalists.
            </p>

            {/* Contact */}
            <a
              href="mailto:contact@emarkacademy.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                color: "#818cf8",
                textDecoration: "none",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#a5b4fc")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#818cf8")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              contact@emarkacademy.com
            </a>
          </div>

          {/* Program links */}
          <div>
            <h4
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#f1f5f9",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Program
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "AI Workshop", href: "/workshop" },
                { label: "Curriculum", href: "#curriculum" },
                { label: "Pricing", href: "#pricing" },
                { label: "Career Outcomes", href: "#careers" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    style={{
                      fontSize: "14px",
                      color: "#94a3b8",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      fontWeight: 400,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h4
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#f1f5f9",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Support
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "FAQ", href: "#faq" },
                { label: "Contact Us", href: "mailto:contact@emarkacademy.com" },
                { label: "Partner With Us", href: "mailto:contact@emarkacademy.com" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    style={{
                      fontSize: "14px",
                      color: "#94a3b8",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      fontWeight: 400,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.08)",
            marginBottom: "32px",
          }}
        />

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p style={{ fontSize: "13px", color: "#475569" }}>
            © 2026 Emark Academy. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontSize: "13px",
                  color: "#475569",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#94a3b8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </footer>
  );
}
