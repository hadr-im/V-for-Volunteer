import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STATS = [
  { num: "6/12",    label: "Weeks",        suffix: "" },
  { num: "18",   label: "Min age",      suffix: "+" },
  { num: "12",  label: "Countries",    suffix: "+" },
  { num: "100",   label: "Alumni",       suffix: "+" },
];

function Countdown() {
  const deadline = new Date("2026-05-03T11:00:00");
  const [time, setTime] = useState({ d: 13, h: 10, m: 50, s: 10 });

  useEffect(() => {
    const tick = () => {
      const diff = deadline - Date.now();
      if (diff <= 0) return;
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 40 }}>
      {[["d", "Days"], ["h", "Hours"], ["m", "Min"], ["s", "Sec"]].map(([k, lbl]) => (
        <div key={k} style={{
          background: "var(--bg-card)",
          border: "0.5px solid var(--teal-border)",
          borderRadius: 10,
          padding: "12px 16px",
          textAlign: "center",
          minWidth: 64,
        }}>
          <div style={{
            fontSize: 28,
            fontWeight: 800,
            color: "var(--teal-bright)",
            fontFamily: "var(--font-display)",
            fontVariantNumeric: "tabular-nums",
            lineHeight: 1,
          }}>{pad(time[k])}</div>
          <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 4, letterSpacing: "0.08em" }}>{lbl}</div>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "120px 24px 80px",
      position: "relative",
      overflow: "hidden",
      textAlign: "center",
    }}>
      {/* Background glows */}
      <div className="glow-blob" style={{ width: 500, height: 500, top: -100, right: -100, animationDelay: "0s" }} />
      <div className="glow-blob" style={{ width: 300, height: 300, bottom: 60, left: -80, animationDelay: "2s" }} />

      {/* Grid pattern */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }}>
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#00B09B" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Badge */}
      <div className="animate-fade-up" style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "rgba(0,176,155,0.1)",
        border: "0.5px solid rgba(0,176,155,0.35)",
        borderRadius: 100,
        padding: "6px 16px",
        marginBottom: 28,
        fontSize: 12,
        fontWeight: 500,
        color: "var(--teal-bright)",
        letterSpacing: "0.06em",
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: "50%",
          background: "var(--teal)",
          display: "inline-block",
          boxShadow: "0 0 0 2px rgba(0,176,155,0.3)",
        }} />
        AIESEC GLOBAL TALENT PROGRAM · MAY 03, 2026
      </div>

      {/* Headline */}
      <h1 className="animate-fade-up" style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(44px, 8vw, 80px)",
        fontWeight: 800,
        lineHeight: 1.05,
        letterSpacing: "-3px",
        marginBottom: 24,
        maxWidth: 820,
        animationDelay: "0.1s",
        opacity: 0,
        animationFillMode: "forwards",
      }}>
        Go beyond borders.<br />
        Get{" "}
        <span style={{
          color: "var(--teal)",
          position: "relative",
          display: "inline-block",
        }}>
          Linked Out.
          <svg style={{ position: "absolute", bottom: -6, left: 0, width: "100%", height: 4, overflow: "visible" }} viewBox="0 0 200 4">
            <path d="M0 3 Q100 0 200 3" stroke="var(--teal)" strokeWidth="2" fill="none" opacity="0.5" />
          </svg>
        </span>
      </h1>

      {/* Subtext */}
      <p className="animate-fade-up" style={{
        fontSize: "clamp(15px, 2vw, 18px)",
        color: "var(--text-muted)",
        maxWidth: 520,
        lineHeight: 1.7,
        marginBottom: 40,
        animationDelay: "0.2s",
        opacity: 0,
        animationFillMode: "forwards",
      }}>
        A global professional micro-event by AIESEC connecting ambitious young professionals aged 18–30 with real international opportunities, mentors, and industry leaders.
      </p>

      {/* CTAs */}
      <div className="animate-fade-up" style={{
        display: "flex",
        gap: 12,
        justifyContent: "center",
        flexWrap: "wrap",
        marginBottom: 56,
        animationDelay: "0.3s",
        opacity: 0,
        animationFillMode: "forwards",
      }}>
        <Link to="/register">
          <button style={{
            background: "var(--teal)",
            color: "#fff",
            border: "none",
            padding: "14px 32px",
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "var(--font-display)",
            cursor: "pointer",
            transition: "all 0.2s",
            letterSpacing: "-0.3px",
          }}
            onMouseEnter={e => { e.target.style.background = "var(--teal-bright)"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.background = "var(--teal)"; e.target.style.transform = "translateY(0)"; }}
          >
            Apply Now →
          </button>
        </Link>
        
      </div>

      {/* Countdown */}
      <div className="animate-fade-up" style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}>
        <p style={{ fontSize: 11, color: "var(--text-faint)", marginBottom: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>Event starts in</p>
        <Countdown />
      </div>

      {/* Stats bar */}
      <div className="animate-fade-up" style={{
        display: "flex",
        gap: 0,
        borderRadius: 14,
        overflow: "hidden",
        border: "0.5px solid var(--border)",
        background: "var(--bg-card)",
        animationDelay: "0.5s",
        opacity: 0,
        animationFillMode: "forwards",
      }}>
        {STATS.map((s, i) => (
          <div key={s.label} style={{
            padding: "20px 32px",
            textAlign: "center",
            borderRight: i < STATS.length - 1 ? "0.5px solid var(--border)" : "none",
          }}>
            <div style={{
              fontSize: 28,
              fontWeight: 800,
              color: "var(--teal)",
              fontFamily: "var(--font-display)",
              lineHeight: 1,
            }}>{s.num}{s.suffix}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
