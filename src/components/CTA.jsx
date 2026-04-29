import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section style={{ padding: "96px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{
          background: "var(--bg-card)",
          border: "0.5px solid rgba(0,176,155,0.35)",
          borderRadius: 24,
          padding: "72px 48px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Background glow */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 300,
            background: "radial-gradient(ellipse, rgba(0,176,155,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div className="reveal" style={{
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
            }} />
            APPLICATIONS OPEN · LIMITED SPOTS
          </div>

          <h2 className="reveal" style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800,
            letterSpacing: "-2px",
            marginBottom: 16,
            lineHeight: 1.1,
          }}>
            Ready to go{" "}
            <span style={{ color: "var(--teal)" }}>global?</span>
          </h2>

          <p className="reveal" style={{
            fontSize: 17,
            color: "var(--text-muted)",
            maxWidth: 480,
            margin: "0 auto 40px",
            lineHeight: 1.6,
          }}>
            Join hundreds of ambitious young professionals at Linked Out. Applications close soon — secure your spot today.
          </p>

          <div className="reveal" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/register">
              <button style={{
                background: "var(--teal)",
                color: "#fff",
                border: "none",
                padding: "16px 40px",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "var(--font-display)",
                cursor: "pointer",
                transition: "all 0.2s",
                letterSpacing: "-0.3px",
              }}
                onMouseEnter={e => { e.target.style.background = "var(--teal-bright)"; e.target.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.target.style.background = "var(--teal)"; e.target.style.transform = "translateY(0)"; }}
              >
                Apply Now — It's Free →
              </button>
            </Link>
            <button style={{
              background: "transparent",
              color: "var(--text-muted)",
              border: "0.5px solid var(--border)",
              padding: "16px 32px",
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 500,
              fontFamily: "var(--font-body)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.target.style.color = "#fff"; e.target.style.borderColor = "rgba(255,255,255,0.3)"; }}
              onMouseLeave={e => { e.target.style.color = "var(--text-muted)"; e.target.style.borderColor = "var(--border)"; }}
              onClick={() => window.open("https://aiesec.org", "_blank")}
            >
              Learn about AIESEC
            </button>
          </div>

          {/* Trust badges */}
          <div className="reveal" style={{
            display: "flex",
            gap: 24,
            justifyContent: "center",
            marginTop: 40,
            flexWrap: "wrap",
          }}>
            {["100% Free to attend", "Certificate included", "Global community", "No experience required"].map(t => (
              <div key={t} style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                color: "var(--text-muted)",
              }}>
                <span style={{ color: "var(--teal)", fontSize: 14 }}>✓</span>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
