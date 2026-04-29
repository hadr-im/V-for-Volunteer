function SectionLabel({ tag, title, sub }) {
  return (
    <div className="reveal" style={{ marginBottom: 48, textAlign: "center" }}>
      <div style={{
        fontSize: 11, fontWeight: 600, color: "var(--teal)",
        letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12,
      }}>{tag}</div>
      <h2 style={{
        fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 42px)",
        fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 12, lineHeight: 1.1,
      }}>{title}</h2>
      {sub && <p style={{ color: "var(--text-muted)", fontSize: 16, maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>{sub}</p>}
    </div>
  );
}

export { SectionLabel };

const programs = [
  {
    id: "professional-exchange",
    color: "#00b09b",
    avatar: "PE",
    flag: "🌍",
    country: "International",
    name: "Professional Exchange",
    role: "Work Abroad Program",
    company: "12 weeks · Paid stipend · Certificate",
    description: "A structured placement connecting young professionals with host organizations abroad — with a paid stipend, mentorship, and a recognized certificate.",
    pills: ["Stipend included", "Mentorship", "Certificate"],
    areaLabel: "Available regions",
    areas: ["Egypt", "Turkey", "Romania", "Greece", "Germany", "+ others more"],
  },
];

export default function Programs() {
  const p = programs[0];

  return (
    <section id="programs" style={{ padding: "clamp(48px, 10vw, 96px) 16px" }}>
      <style>{`
        .programs-card {
          width: 100%;
          max-width: 550px;
          background: var(--bg-card);
          border: 0.5px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          transition: border-color 0.3s, transform 0.3s;
          cursor: default;
        }

        .programs-card-inner {
          padding: 36px 36px 32px;
          text-align: center;
        }

        .programs-card h3 {
          font-family: var(--font-display);
          font-size: clamp(20px, 5vw, 28px);
          font-weight: 800;
          margin-bottom: 6px;
          letter-spacing: -0.5px;
          text-align: center;
        }

        @media (max-width: 480px) {
          .programs-card-inner {
            padding: 28px 20px 24px;
          }
        }
      `}</style>

      <SectionLabel
        tag="Our Programs"
        title="Opportunities that shape your future"
        sub="Structured international programs designed to build real-world skills and global connections."
      />

      <div style={{ display: "flex", justifyContent: "center", padding: "0 8px" }}>
        <div
          className="reveal reveal-delay-1 programs-card"
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = `${p.color}80`;
            e.currentTarget.style.transform = "translateY(-4px)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {/* Accent top bar */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 3,
            background: p.color,
            opacity: 0.8,
          }} />

          <div className="programs-card-inner">

            {/* Avatar */}
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: `${p.color}22`,
              border: `1.5px solid ${p.color}55`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontWeight: 700, fontSize: 20,
              color: p.color, margin: "0 auto 20px",
            }}>{p.avatar}</div>

            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
              {p.flag} {p.country}
            </div>

            <h3>{p.name}</h3>

            <p style={{ fontSize: 15, color: "var(--teal)", fontWeight: 500, marginBottom: 6 }}>{p.role}</p>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>{p.company}</p>

            <p style={{
              fontSize: 14, color: "var(--text-muted)", lineHeight: 1.75,
              marginBottom: 24, maxWidth: 480, margin: "0 auto 24px",
            }}>
              {p.description}
            </p>

            {/* Pills */}
            <div style={{
              display: "flex", flexWrap: "wrap",
              justifyContent: "center", gap: 8, marginBottom: 28,
            }}>
              {p.pills.map(pill => (
                <span key={pill} style={{
                  fontSize: 12, padding: "4px 14px", borderRadius: 20,
                  border: "0.5px solid var(--border)",
                  color: "var(--text-muted)", background: "var(--bg2)",
                }}>{pill}</span>
              ))}
            </div>

            <div style={{ borderTop: "0.5px solid var(--border)", margin: "0 0 24px" }} />

            <p style={{
              fontSize: 11, color: "var(--text-muted)",
              textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12,
            }}>
              {p.areaLabel}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
              {p.areas.map(area => (
                <span key={area} style={{
                  fontSize: 12, padding: "4px 12px", borderRadius: 20,
                  background: "var(--bg2)", color: "var(--text-muted)",
                  border: "0.5px solid var(--border)",
                }}>{area}</span>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}