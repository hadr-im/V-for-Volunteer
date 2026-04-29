import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Speakers from "../components/Speakers";
import Benefits from "../components/Benefits";
import Team from "../components/Team";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import { useReveal } from "../hooks/useReveal";

export default function Home() {
  useReveal();

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />
      <Hero />

      {/* Ticker / announcement bar */}
      <div style={{
        background: "var(--bg2)",
        borderTop: "0.5px solid var(--border)",
        borderBottom: "0.5px solid var(--border)",
        overflow: "hidden",
        padding: "10px 0",
      }}>
        <div style={{
          display: "flex",
          gap: 64,
          animation: "ticker 20s linear infinite",
          whiteSpace: "nowrap",
          width: "max-content",
        }}>
          {[...Array(2)].flatMap(() =>
            ["🌍 Global Talent Program", "🚀 May 03, 2026", "🤝 10+ Countries", "🎓 Free to attend", "✈️ Real opportunities", "💡 Expert mentors"].map((t, i) => (
              <span key={t + i} style={{
                fontSize: 13,
                color: "var(--text-muted)",
                fontWeight: 400,
              }}>
                <span style={{ color: "var(--teal)", marginRight: 8 }}>◆</span>
                {t}
              </span>
            ))
          )}
        </div>
      </div>

      <Speakers />

      {/* Divider */}
      <div style={{ height: "0.5px", background: "var(--border)", maxWidth: 1200, margin: "0 auto" }} />

      

      <div style={{ height: "0.5px", background: "var(--border)", maxWidth: 1200, margin: "0 auto" }} />

      
      <div style={{ height: "0.5px", background: "var(--border)", maxWidth: 1200, margin: "0 auto" }} />

      <Benefits />

      <div style={{ height: "0.5px", background: "var(--border)", maxWidth: 1200, margin: "0 auto" }} />

      <Team />

      <CTA />
      <Footer />
    </div>
  );
}
