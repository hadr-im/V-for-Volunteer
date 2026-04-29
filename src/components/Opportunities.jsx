import { useState, useEffect } from "react";
import { opportunities as mockData } from "../data/content";
import { SectionLabel } from "./Speakers";

// ─────────────────────────────────────────────────────────────────
// TO CONNECT GOOGLE SHEETS:
// 1. Publish your sheet: File → Share → Publish to web → CSV
// 2. Replace SHEET_CSV_URL with your published CSV link
// 3. Uncomment the fetchOpportunities function below
// 4. Remove the line: setOpps(mockData)
// ─────────────────────────────────────────────────────────────────
const SHEET_CSV_URL = "YOUR_GOOGLE_SHEETS_CSV_URL_HERE";

async function fetchOpportunities() {
  const res = await fetch(SHEET_CSV_URL);
  const text = await res.text();
  const [header, ...rows] = text.trim().split("\n");
  const keys = header.split(",").map(k => k.trim().toLowerCase().replace(/\s+/g, "_"));
  return rows.map((row, i) => {
    const vals = row.split(",");
    const obj = {};
    keys.forEach((k, j) => (obj[k] = vals[j]?.trim() ?? ""));
    obj.id = i + 1;
    obj.tags = obj.tags ? obj.tags.split("|").map(t => t.trim()) : [];
    return obj;
  });
}

const TAG_COLORS = {
  Marketing: "#00B09B", Digital: "#00D4B8", Paid: "#EF9F27",
  Tech: "#7F77DD", React: "#5DCAA5", Stipend: "#EF9F27",
  Education: "#D85A30", NGO: "#D4537E", Volunteer: "#888780",
  Business: "#00B09B", Strategy: "#AFA9EC", Design: "#D4537E",
  Figma: "#D4537E", Remote: "#639922", Community: "#1D9E75",
  Impact: "#1D9E75",
};

const TYPE_ICONS = {
  "Professional Exchange": "🌍",
  "Volunteer": "🤝",
};

export default function Opportunities() {
  const [opps, setOpps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // Uncomment below to use real Google Sheets data:
    // fetchOpportunities()
    //   .then(data => { setOpps(data); setLoading(false); })
    //   .catch(() => { setOpps(mockData); setLoading(false); });

    // Using mock data for now:
    setTimeout(() => { setOpps(mockData); setLoading(false); }, 600);
  }, []);

  const types = ["All", "Professional Exchange", "Volunteer"];
  const filtered = filter === "All" ? opps : opps.filter(o => o.type === filter);

  return (
    <section id="opportunities" style={{ padding: "96px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionLabel
          tag="Global Opportunities"
          title="Your next adventure awaits"
          sub="Real international programs available to Linked Out participants — updated live from our database."
        />

        {/* Filter tabs */}
        <div className="reveal" style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          marginBottom: 40,
          flexWrap: "wrap",
        }}>
          {types.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              style={{
                background: filter === t ? "var(--teal)" : "var(--bg-card)",
                color: filter === t ? "#fff" : "var(--text-muted)",
                border: "0.5px solid " + (filter === t ? "var(--teal)" : "var(--border)"),
                padding: "8px 20px",
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "var(--font-body)",
              }}
            >{t}</button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ textAlign: "center", color: "var(--text-muted)", padding: "60px 0" }}>
            <div style={{
              width: 36, height: 36, border: "2px solid var(--teal-border)",
              borderTopColor: "var(--teal)", borderRadius: "50%",
              animation: "spin 0.8s linear infinite", margin: "0 auto 16px",
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            Loading opportunities...
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 16,
          }}>
            {filtered.map((o, i) => (
              <div
                key={o.id}
                className={`reveal reveal-delay-${(i % 3) + 1}`}
                style={{
                  background: "var(--bg-card)",
                  border: "0.5px solid var(--border)",
                  borderRadius: 14,
                  padding: "22px 20px",
                  transition: "border-color 0.25s, transform 0.25s",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(0,176,155,0.45)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontSize: 22 }}>{o.flag}</span>
                  <span style={{
                    background: "var(--teal-dim)",
                    color: "var(--teal)",
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: 20,
                    letterSpacing: "0.04em",
                  }}>{TYPE_ICONS[o.type]} {o.type}</span>
                </div>

                <div>
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 16,
                    fontWeight: 700,
                    lineHeight: 1.3,
                    marginBottom: 4,
                    letterSpacing: "-0.3px",
                  }}>{o.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{o.org} · {o.country}</p>
                </div>

                {/* Meta */}
                <div style={{ display: "flex", gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Duration</div>
                    <div style={{ fontSize: 13, color: "#fff", marginTop: 2 }}>{o.duration}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Deadline</div>
                    <div style={{ fontSize: 13, color: "#fff", marginTop: 2 }}>{o.deadline}</div>
                  </div>
                </div>

                {/* Tags */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {(o.tags || []).map(tag => (
                    <span key={tag} style={{
                      background: `${TAG_COLORS[tag] || "#888"}18`,
                      color: TAG_COLORS[tag] || "var(--text-muted)",
                      border: `0.5px solid ${TAG_COLORS[tag] || "#888"}44`,
                      fontSize: 11,
                      padding: "3px 9px",
                      borderRadius: 20,
                      fontWeight: 500,
                    }}>{tag}</span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={o.link}
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: "transparent",
                    color: "var(--teal)",
                    border: "0.5px solid var(--teal-border)",
                    padding: "9px",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "background 0.2s, color 0.2s",
                    marginTop: "auto",
                  }}
                  onMouseEnter={e => { e.target.style.background = "var(--teal)"; e.target.style.color = "#fff"; }}
                  onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "var(--teal)"; }}
                >
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Google Sheets note */}
        <div className="reveal" style={{
          marginTop: 32,
          background: "rgba(0,176,155,0.06)",
          border: "0.5px solid rgba(0,176,155,0.2)",
          borderRadius: 10,
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          maxWidth: 600,
          margin: "32px auto 0",
        }}>
          <span style={{ fontSize: 16 }}>📊</span>
          <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>
            Opportunities are synced from a Google Sheet.{" "}
            <span style={{ color: "var(--teal)", fontWeight: 500 }}>
              Replace SHEET_CSV_URL in Opportunities.jsx
            </span>{" "}
            to connect your own sheet.
          </p>
        </div>
      </div>
    </section>
  );
}
