"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function InputField({ label, id, type = "text", placeholder, value, onChange, required, textarea }) {
  const [focused, setFocused] = useState(false);

  const baseStyle = {
    width: "100%",
    padding: "14px 16px",
    fontSize: "15px",
    border: `1.5px solid ${focused ? "#FF8C00" : "rgba(255,255,255,0.1)"}`,
    borderRadius: "12px",
    outline: "none",
    fontFamily: "'Inter', sans-serif",
    color: "#ffffff",
    background: "rgba(255,255,255,0.06)",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxShadow: focused ? "0 0 0 3px rgba(255,140,0,0.15)" : "none",
    resize: textarea ? "vertical" : "none",
    minHeight: textarea ? "100px" : "auto",
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontSize: "13px",
          fontWeight: 600,
          color: "rgba(255,255,255,0.7)",
          marginBottom: "8px",
          letterSpacing: "0.1px",
        }}
      >
        {label}
        {required && <span style={{ color: "#ef4444", marginLeft: "3px" }}>*</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          style={baseStyle}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          style={baseStyle}
        />
      )}
    </div>
  );
}



export default function ContactModal({ isOpen, onClose, type = null, onSuccess }) {
  const [enrollType, setEnrollType] = useState(type || "course");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (type) setEnrollType(type);
  }, [type]);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const verifyResponse = await fetch("/api/submit-enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formDetails: { ...form, enrollType }
        }),
      });

      const verifyData = await verifyResponse.json();

      if (verifyResponse.ok) {
        setSubmitted(true);
        if (onSuccess) onSuccess();
        
        // Auto-redirect to WhatsApp
        const waText = enrollType === 'workshop' 
          ? "Hi, I just enrolled for the AI Workshop. Please share the details."
          : "Hi, I just enrolled for the AI Generalist Certification. Please share the details.";
        const waUrl = `https://wa.me/919211633068?text=${encodeURIComponent(waText)}`;
        
        setTimeout(() => {
          window.location.href = waUrl;
        }, 1500);
      } else {
        setError(verifyData.error || "Enrollment failed.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("Network error during submission.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after animation out
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "" });
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(6px)",
              zIndex: 9998,
            }}
          />

          {/* Modal Centering Wrapper */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              pointerEvents: "none",
              padding: "20px"
            }}
          >
            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.93, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: "100%",
                maxWidth: "520px",
                pointerEvents: "auto",
              }}
            >
              <div
                className="modal-content-wrapper"
                style={{
                  background: "rgba(10,10,15,0.97)",
                  borderRadius: "24px",
                  boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,140,0,0.15)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: "90vh",
                  overflow: "hidden"
                }}
              >
                {/* Header */}
                <div
                  className="modal-header"
                  style={{
                    background: "linear-gradient(135deg, #FF8C00, #E8291C, #4D7FFF)",
                    padding: "32px 36px",
                    position: "relative",
                    flexShrink: 0
                  }}
                >
                  <button
                    onClick={handleClose}
                    aria-label="Close modal"
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.2)",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.3)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>

                  <h2
                    style={{
                      fontSize: "24px",
                      fontWeight: 800,
                      fontFamily: "'Poppins', sans-serif",
                      color: "white",
                      letterSpacing: "-0.5px",
                      marginBottom: "8px",
                      textAlign: "center"
                    }}
                  >
                    {submitted ? "Enrollment Successful! 🎉" : `Secure Your Spot`}
                  </h2>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: 1.5, textAlign: "center", maxWidth: "300px", margin: "0 auto" }}>
                    {submitted
                      ? "Check your WhatsApp for confirmation."
                      : `Complete your application for the ${enrollType === 'workshop' ? 'AI Workshop' : 'Certification Program'}.`}
                  </p>
                </div>

                {/* Body */}
                <div className="modal-body" style={{ padding: "36px", overflowY: "auto", flex: 1 }}>
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{ textAlign: "center", padding: "24px 0" }}
                      >
                        <div
                          style={{
                            width: "72px",
                            height: "72px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, rgba(255,140,0,0.1), rgba(232,41,28,0.1))",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 20px",
                            fontSize: "36px",
                          }}
                        >
                          ✅
                        </div>
                        <h3
                          style={{
                            fontSize: "20px",
                            fontWeight: 700,
                            fontFamily: "'Poppins', sans-serif",
                            color: "#ffffff",
                            marginBottom: "12px",
                          }}
                        >
                          Thank You, {form.name || "there"}!
                        </h3>
                        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "28px" }}>
                          Your enrollment for the <strong style={{ color: "#FF8C00" }}>{enrollType === 'workshop' ? 'AI Workshop' : 'Certification Program'}</strong> is confirmed. Redirecting to WhatsApp...
                        </p>



                        <motion.button
                          onClick={handleClose}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          style={{
                            width: "100%",
                            padding: "14px",
                            background: "rgba(255,255,255,0.06)",
                            color: "rgba(255,255,255,0.6)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "12px",
                            fontSize: "15px",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          Close
                        </motion.button>
                      </motion.div>
                    ) : (
                      <>
                        {error && (
                          <div style={{ padding: "12px", background: "#fef2f2", border: "1px solid #fee2e2", borderRadius: "12px", color: "#ef4444", fontSize: "13px", marginBottom: "20px", textAlign: "center" }}>
                            {error}
                          </div>
                        )}
                        <motion.form
                          key="form"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onSubmit={handleSubmit}
                        >
                          <div style={{ marginBottom: "32px" }}>
                            <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: "16px", textAlign: "center" }}>
                              Select Your Program
                            </label>
                            <div className="program-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                              <motion.button
                                type="button"
                                whileHover={{ scale: 1.02, borderColor: "#4F46E5" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setEnrollType("course")}
                                style={{
                                  padding: "20px 12px",
                                  borderRadius: "20px",
                                  border: `2px solid ${enrollType === 'course' ? '#FF8C00' : 'rgba(255,255,255,0.08)'}`,
                                  background: enrollType === 'course' ? 'rgba(255,140,0,0.1)' : 'rgba(255,255,255,0.04)',
                                  color: enrollType === 'course' ? '#FF8C00' : 'rgba(255,255,255,0.5)',
                                  fontWeight: 700,
                                  fontSize: "14px",
                                  cursor: "pointer",
                                  transition: "all 0.3s",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  gap: "8px",
                                  boxShadow: enrollType === 'course' ? '0 10px 20px rgba(255,140,0,0.15)' : 'none'
                                }}
                              >
                                <span style={{ fontSize: "28px" }}>🎓</span>
                                <div style={{ lineHeight: 1.2 }}>Ai Generalist<br /><span style={{ fontSize: "10px", fontWeight: 400, opacity: 0.8 }}>Full Program</span></div>
                              </motion.button>
                              <motion.button
                                type="button"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setEnrollType("workshop")}
                                style={{
                                  padding: "20px 12px",
                                  borderRadius: "20px",
                                  border: `2px solid ${enrollType === 'workshop' ? '#FF8C00' : 'rgba(255,255,255,0.08)'}`,
                                  background: enrollType === 'workshop' ? 'rgba(255,140,0,0.1)' : 'rgba(255,255,255,0.04)',
                                  color: enrollType === 'workshop' ? '#FF8C00' : 'rgba(255,255,255,0.5)',
                                  fontWeight: 700,
                                  fontSize: "14px",
                                  cursor: "pointer",
                                  transition: "all 0.3s",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  gap: "8px",
                                  boxShadow: enrollType === 'workshop' ? '0 10px 20px rgba(255,140,0,0.15)' : 'none'
                                }}
                              >
                                <span style={{ fontSize: "28px" }}>⚡</span>
                                <div style={{ lineHeight: 1.2 }}>AI Workshop<br /><span style={{ fontSize: "10px", fontWeight: 400, opacity: 0.8 }}>3h Intense</span></div>
                              </motion.button>
                            </div>
                          </div>
                          <InputField
                            label="Full Name"
                            id="contact-name"
                            placeholder="Your full name"
                            value={form.name}
                            onChange={handleChange("name")}
                            required
                          />
                          <InputField
                            label="Email Address"
                            id="contact-email"
                            type="email"
                            placeholder="your@email.com"
                            value={form.email}
                            onChange={handleChange("email")}
                            required
                          />
                          <InputField
                            label="Phone Number"
                            id="contact-phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={form.phone}
                            onChange={handleChange("phone")}
                            required
                          />

                          <motion.button
                            id="contact-submit-btn"
                            type="submit"
                            disabled={submitting}
                            whileHover={!submitting ? { scale: 1.02, boxShadow: "0 12px 30px rgba(79,70,229,0.4)" } : {}}
                            whileTap={!submitting ? { scale: 0.98 } : {}}
                            style={{
                              width: "100%",
                              padding: "16px",
                              background: submitting
                                ? "rgba(255,255,255,0.08)"
                                : "linear-gradient(135deg, #FF8C00, #E8291C, #4D7FFF)",
                              color: submitting ? "rgba(255,255,255,0.3)" : "white",
                              border: "none",
                              borderRadius: "12px",
                              fontSize: "16px",
                              fontWeight: 700,
                              cursor: submitting ? "not-allowed" : "pointer",
                              fontFamily: "'Poppins', sans-serif",
                              boxShadow: submitting ? "none" : "0 6px 20px rgba(232,41,28,0.3)",
                              transition: "all 0.3s ease",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "10px",
                            }}
                          >
                            {submitting ? (
                              <>
                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  style={{ animation: "spin 1s linear infinite" }}
                                >
                                  <path d="M21 12a9 9 0 11-6.219-8.56" strokeLinecap="round" />
                                </svg>
                                Submitting...
                              </>
                            ) : (
                              `Enroll Now →`
                            )}
                          </motion.button>
                        </motion.form>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @media (max-width: 600px) {
              .program-grid {
                grid-template-columns: 1fr !important;
              }
              .modal-body {
                padding: 24px !important;
              }
              .modal-header {
                padding: 24px 20px !important;
              }
            }
            @media (max-height: 700px) {
              .modal-content-wrapper {
                max-height: 95vh !important;
              }
              .modal-body {
                padding: 20px !important;
              }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}
