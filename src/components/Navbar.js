"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ onEnrollClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isWorkshop = pathname === "/workshop";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = isWorkshop
    ? [

      { label: "AI Workshop", href: "/workshop" },
    ]
    : [
      { label: "Features", href: "#features" },
      { label: "Curriculum", href: "#curriculum" },
      { label: "AI Workshop", href: "/workshop" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ];

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: "all 0.3s ease",
    background: "#000000",
    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
    boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.6)" : "none",
  };

  return (
    <nav style={navStyle}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0px",
            flexShrink: 0,
          }}
        >
          {/* Logo image */}
          <img
            src="/emark-logo.png"
            alt="Emark Academy Logo"
            style={{
              width: "40px",
              height: "40px",
              objectFit: "contain",
              display: "block",
            }}
          />
          {/* Text — hidden on mobile via CSS */}
          <span
            className="navbar-brand-text"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                letterSpacing: "-0.5px",
                display: "flex",
                alignItems: "center",
                marginLeft: "12px",
              }}
          >
            <span style={{ color: "#ffffff" }}>Emark&nbsp;</span>
            <span
              style={{
                background: "linear-gradient(135deg, #FF8C00, #E8291C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Academy
            </span>
          </span>
        </a>


        {/* Desktop Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          className="nav-links-desktop"
        >
          {links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              whileHover={{
                color: "#FF8C00",
                background: "rgba(255,140,0,0.08)"
              }}
              className="navbar-link"
              style={{
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.75)",
                textDecoration: "none",
                borderRadius: "8px",
                transition: "all 0.2s",
              }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.button
            id="navbar-enroll-btn"
            onClick={onEnrollClick}
            whileHover={{
              y: -1,
              boxShadow: "0 8px 24px rgba(232,41,28,0.5)"
            }}
            whileTap={{ scale: 0.98 }}
            style={{
              marginLeft: "8px",
              padding: "10px 22px",
              background: "linear-gradient(135deg, #FF8C00, #E8291C, #4D7FFF)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(232,41,28,0.35)",
              transition: "all 0.3s",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Enroll Now
          </motion.button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          <div style={{ width: "22px", display: "flex", flexDirection: "column", gap: "5px" }}>
            <span
              style={{
                height: "2px",
                background: "#ffffff",
                borderRadius: "2px",
                transition: "all 0.3s",
                transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
                display: "block",
              }}
            />
            <span
              style={{
                height: "2px",
                background: "#ffffff",
                borderRadius: "2px",
                transition: "all 0.3s",
                opacity: mobileOpen ? 0 : 1,
                display: "block",
              }}
            />
            <span
              style={{
                height: "2px",
                background: "#ffffff",
                borderRadius: "2px",
                transition: "all 0.3s",
                transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
                display: "block",
              }}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "#000000",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              padding: "16px 24px 24px",
            }}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 0",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.8)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setMobileOpen(false); onEnrollClick(); }}
              style={{
                marginTop: "16px",
                width: "100%",
                padding: "14px",
                background: "linear-gradient(135deg, #FF8C00, #E8291C, #4D7FFF)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Enroll Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .navbar-brand-text { display: none !important; }
        }
        @media (min-width: 769px) {
          .navbar-brand-text { display: inline !important; }
        }
      `}</style>
    </nav>
  );
}
