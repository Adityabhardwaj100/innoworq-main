"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const modules = [
  {
    number: "01",
    title: "Introduction to AI Generalist Role",
    duration: "1 hour",
    description: "Understand what it means to be an AI Generalist in today's job market. Explore the AI landscape, career paths, and how companies are leveraging AI talent.",
    topics: ["AI Generalist vs Specialist", "Job market", "Tools overview"],
  },
  {
    number: "02",
    title: "AI Fundamentals & Core Concepts",
    duration: "1 hour",
    description: "Build a solid foundation in AI concepts — from machine learning to neural networks.",
    topics: ["Machine learning", "Neural networks", "Key terminologies"],
  },
  {
    number: "03",
    title: "Foundations of LLMs, RAG & MCP",
    duration: "2 hours",
    description: "Dive into Large Language Models, Retrieval-Augmented Generation, and the Model Context Protocol.",
    topics: ["LLM Architecture", "RAG", "MCP Protocol"],
  },
  {
    number: "04",
    title: "Advanced Prompt Engineering",
    duration: "2 hours",
    description: "Master the art and science of prompt engineering. Learn techniques that unlock the full potential of AI models.",
    topics: ["Chain-of-thought", "Few-shot", "System prompts"],
  },
  {
    number: "05",
    title: "Diffusion Models & Generative Media",
    duration: "4 hours",
    description: "Explore the world of generative AI for images, video, audio, and music.",
    topics: ["Stable Diffusion", "AI Video", "Suno Music"],
  },
  {
    number: "06",
    title: "Vibe Coding – Full-Stack Foundations",
    duration: "4 hours",
    description: "Learn to build full-stack applications using AI-powered coding assistants without typing syntax.",
    topics: ["AI assistants", "Rapid dev", "Deployment"],
  },
  {
    number: "07",
    title: "Agentic Workflows & Automation",
    duration: "4 hours",
    description: "Build autonomous AI agents and complex automation pipelines using n8n and Make.",
    topics: ["n8n workflows", "Make.com", "Voice agents"],
  },
  {
    number: "08",
    title: "Data Ethics & Responsible AI",
    duration: "1 hour",
    description: "Navigate the ethical landscape of AI. Learn about bias, fairness, and privacy.",
    topics: ["Bias", "Privacy", "Frameworks"],
  },
  {
    number: "09",
    title: "Future Careers & Portfolio",
    duration: "1 hour",
    description: "Prepare for the AI job market. Build a standout portfolio and craft your brand.",
    topics: ["Portfolio", "LinkedIn", "Interviews"],
  },
];

function ModuleCard({ mod, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="module-card"
      style={{
        background: "rgba(255,255,255,0.04)",
        borderRadius: "24px",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        marginBottom: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div
          style={{
            fontSize: "14px",
            fontWeight: 800,
            fontFamily: "'Inter', sans-serif",
            background: "linear-gradient(135deg, #FF8C00, #E8291C)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "1px",
          }}
        >
          MODULE {mod.number}
        </div>
        <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>
          {mod.duration}
        </div>
      </div>

      <h3
        className="module-title"
        style={{
          fontWeight: 700,
          fontFamily: "'Inter', sans-serif",
          color: "#ffffff",
          letterSpacing: "-0.5px",
          lineHeight: 1.2
        }}
      >
        {mod.title}
      </h3>

      <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
        {mod.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
        {mod.topics.map((topic) => (
          <span
            key={topic}
            style={{
              padding: "6px 12px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "100px",
              fontSize: "12px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.45)",
            }}
          >
            {topic}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Curriculum() {
  const totalHours = modules.reduce((acc, m) => acc + parseInt(m.duration), 0);
  const containerRef = useRef(null);

  return (
    <section
      id="curriculum"
      className="curriculum-section"
      style={{
        background: "#000000",
        position: "relative"
      }}
    >
      <div
        ref={containerRef}
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 24px",
        }}
        className="curriculum-container"
      >
        {/* Left Sticky Side */}
        <div className="sticky-sidebar">
          <span
            style={{
              display: "inline-block",
              fontSize: "13px",
              fontWeight: 700,
              background: "linear-gradient(135deg, #FF8C00, #E8291C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "1px",
              marginBottom: "16px",
              textTransform: "uppercase"
            }}
          >
            Curriculum
          </span>
          <h2
            className="curriculum-title"
            style={{
              fontWeight: 800,
              fontFamily: "'Inter', sans-serif",
              color: "#ffffff",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              marginBottom: "24px",
            }}
          >
            Everything
            <br />
            you need to
            <br />
            <span style={{ color: "#ffffff", fontStyle: "italic", fontWeight: 400, fontFamily: "'Poppins', sans-serif" }}>
              execute
            </span>
          </h2>
          <p
            className="curriculum-subtitle"
            style={{
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.6,
              marginBottom: "40px",
              maxWidth: "400px"
            }}
          >
            A carefully structured journey from AI fundamentals to advanced applications — {totalHours} hours of intensive, practical learning.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { label: "Total Training", value: `${totalHours} Hours` },
              { label: "Modules", value: "9 Comprehensive" },
              { label: "Pacing", value: "3 Classes per Week" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  padding: "20px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>{s.label}</span>
                <strong style={{ fontSize: "15px", color: "#ffffff", fontWeight: 700 }}>{s.value}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Right Scrolling Side */}
        <div className="scrolling-content">
          {modules.map((mod, i) => (
            <ModuleCard key={mod.number} mod={mod} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .curriculum-section { padding: 160px 0; }
        .curriculum-container {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 100px;
          align-items: start;
        }
        .sticky-sidebar {
          position: sticky;
          top: 120px;
        }
        .curriculum-title { font-size: clamp(40px, 5vw, 64px); }
        .curriculum-subtitle { font-size: 18px; }
        .module-card { padding: 32px; }
        .module-title { font-size: 24px; }

        @media (max-width: 1280px) {
          .curriculum-container { gap: 60px; }
        }

        @media (max-width: 992px) {
          .curriculum-container {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          .sticky-sidebar {
            position: relative;
            top: 0;
            margin-bottom: 20px;
          }
          .curriculum-section { padding: 120px 0; }
        }

        @media (max-width: 768px) {
          .curriculum-section { padding: 80px 0; }
          .curriculum-title { font-size: 40px; }
          .curriculum-subtitle { font-size: 16px; margin-bottom: 32px; }
          .curriculum-container { gap: 40px; }
          .module-card { padding: 24px; border-radius: 20px; }
          .module-title { font-size: 20px; }
        }
      `}</style>
    </section>
  );
}
