import { useState, useEffect } from "react";
import { opportunities as mockData } from "../data/content";
import { SectionLabel } from "./Speakers";

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
    setTimeout(() => { setOpps(mockData); setLoading(false); }, 600);
  }, []);

  const types = ["All", "Professional Exchange", "Volunteer"];
  const filtered = filter === "All" ? opps : opps.filter(o => o.type === filter);

  return (
    <section id="opportunities" style={{ padding: "clamp(48px, 10vw, 96px) 16px" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }

        .opp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
        }

        @media (max-width: 600px) {
          .opp-grid {
            grid-template-columns: 1fr;
          }
        }

        .filter-tabs {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-bottom: 40px;
          flex-wrap: wrap;
          padding: 0 4px;
        }

        .filter-tab {
          flex-shrink: 0;
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        @media (max-width: 360px) {
          .filter-tab {
            font-size: 12px;
            padding: 6px 12px;
          }
        }

        .opp-card {
          background: var(--bg-card);
          border: 0.5px solid var(--border);
          border-radius: 14px;
          padding: 18px 16px;
          transition: border-color 0.25s, transform 0.25s;
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: left;
        }

        .opp-card h3 {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 4px;
          letter-spacing: -0.3px;
          text-align: left;
        }

        .opp-card p {
          text-align: left;
        }

        .opp-meta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .opp-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .sheets-note {
          margin-top: 32px;
          background: rgba(0,176,155,0.06);
          border: 0.5px solid rgba(0,176,155,0.2);
          border-radius: 10px;
          padding: 12px 16px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .sheets-note p {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.5;
          word-break: break-word;
        }

        @media (max-width: 360px) {
          .sheets-note p {
            font-size: 12px;
          }
        }

        .opp-cta {
          display: block;
          text-align: center;
          background: transparent;
          color: var(--teal);
          border: 0.5px solid var(--teal-border);
          padding: 9px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
          margin-top: auto;
        }

        .opp-cta:hover {
          background: var(--teal);
          color: #fff;
        }

        .opp-type-badge {
          background: var(--teal-dim);
          color: var(--teal);
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 20px;
          letter-spacing: 0.04em;
          line-height: 1.4;
          white-space: nowrap;
          max-width: 160px;
          text-align: right;
        }

        @media (max-width: 600px) {
          .opp-type-badge {
            font-size: 10px;
            padding: 3px 8px;
            max-width: 130px;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionLabel
          tag="Global Opportunities"
          title="Your next adventure awaits"
          sub="Real international programs available to Linked Out participants — updated live from our database."
        />

        {/* Filter tabs */}
        <div className="reveal filter-tabs">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className="filter-tab"
              style={{
                background: filter === t ? "var(--teal)" : "var(--bg-card)",
                color: filter === t ? "#fff" : "var(--text-muted)",
                border: "0.5px solid " + (filter === t ? "var(--teal)" : "var(--border)"),
                fontFamily: "var(--font-body)",
              }}
            >{t}</button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ textAlign: "center", color: "var(--text-muted)", padding: "60px 0" }}>
            <div style={{
              width: 36, height: 36,
              border: "2px solid var(--teal-border)",
              borderTopColor: "var(--teal)",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 16px",
            }} />
            Loading opportunities...
          </div>
        ) : (
          <div className="opp-grid">
            {filtered.map((o, i) => (
              <div
                key={o.id}
                className={`reveal reveal-delay-${(i % 3) + 1} opp-card`}
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
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 8,
                }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{o.flag}</span>
                  <span className="opp-type-badge">
                    {TYPE_ICONS[o.type]} {o.type}
                  </span>
                </div>

                {/* Title + org */}
                <div>
                  <h3>{o.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
                    {o.org} · {o.country}
                  </p>
                </div>

                {/* Meta */}
                <div className="opp-meta">
                  <div>
                    <div style={{
                      fontSize: 10,
                      color: "var(--text-faint)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}>Duration</div>
                    <div style={{ fontSize: 13, color: "#fff", marginTop: 2 }}>{o.duration}</div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: 10,
                      color: "var(--text-faint)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}>Deadline</div>
                    <div style={{ fontSize: 13, color: "#fff", marginTop: 2 }}>{o.deadline}</div>
                  </div>
                </div>

                {/* Tags */}
                <div className="opp-tags">
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
                <a href={o.link} className="opp-cta">Learn More →</a>
              </div>
            ))}
          </div>
        )}

        {/* Google Sheets note */}
        <div className="reveal sheets-note">
          <span style={{ fontSize: 16, flexShrink: 0 }}>📊</span>
          <p>
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