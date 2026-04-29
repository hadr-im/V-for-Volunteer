import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";

export default function Register() {
  useReveal();

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Mini navbar */}
      <div
        style={{
          padding: "0 32px",
          borderBottom: "0.5px solid var(--border)",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(8,12,12,0.95)",
          backdropFilter: "blur(16px)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              color: "white",
              fontFamily: "var(--font-display)",
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            Linked<span style={{ color: "var(--teal)" }}>Out</span>
          </span>
        </Link>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontSize: 14,
            color: "var(--text-muted)",
          }}
        >
          ← Back to event
        </Link>
      </div>

      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "60px 24px 96px",
        }}
      >
        {/* Header */}
        <div
          className="reveal"
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(0,176,155,0.1)",
              border: "0.5px solid rgba(0,176,155,0.35)",
              borderRadius: 100,
              padding: "6px 16px",
              marginBottom: 20,
              fontSize: 12,
              fontWeight: 500,
              color: "var(--teal-bright)",
              letterSpacing: "0.06em",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--teal)",
                display: "inline-block",
              }}
            />
            FREE REGISTRATION · MAY 03, 2026
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-2px",
              marginBottom: 12,
              lineHeight: 1.1,
            }}
          >
            Apply for{" "}
            <span style={{ color: "var(--teal)" }}>Linked Out</span>
          </h1>

          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 16,
              lineHeight: 1.6,
            }}
          >
            Fill in the form below to secure your spot. Takes less than 3
            minutes.
          </p>
        </div>

        {/* Tally Form */}
        <div
          className="reveal"
          style={{
            background: "var(--bg-card)",
            border: "0.5px solid var(--border)",
            borderRadius: 20,
            padding: "24px",
          }}
        >
          <iframe
            src="https://tally.so/r/Y5o1X5"
            width="100%"
            height="900"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="Registration Form"
            style={{
              border: "none",
              width: "100%",
              borderRadius: 12,
            }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}