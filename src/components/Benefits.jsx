import { benefits } from "../data/content";
import { SectionLabel } from "./Speakers";

export default function Benefits() {
  return (
    <section id="benefits" style={{
      padding: "96px 24px",
      background: "linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel
          tag="Why Attend"
          title="Everything you need to go global"
          sub="Linked Out gives you the tools, connections, and confidence to take your career international."
        />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 16,
        }}>
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className={`reveal reveal-delay-${(i % 3) + 1}`}
              style={{
                background: "var(--bg-card)",
                border: "0.5px solid var(--border)",
                borderRadius: 14,
                padding: "28px 24px",
                transition: "all 0.3s",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(0,176,155,0.45)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              

              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 8,
                letterSpacing: "-0.3px",
              }}>{b.title}</h3>
              <p style={{
                fontSize: 14,
                color: "var(--text-muted)",
                lineHeight: 1.7,
              }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
