const LINKS = [
  { section: "Event",   items: ["About", "Program", "Benefits", "Team"] },
  { section: "AIESEC",  items: ["About AIESEC", "Global Programs", "Alumni Network", "Contact"] },
  { section: "Legal",   items: ["Privacy Policy", "Terms of Use", "Cookie Policy"] },
   

];


  const SOCIALS = [
  {
    name: "Instagram", href: "https://www.instagram.com/linkedout2.0?igsh=ZGczNGN1azV1dTZo",
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>,
  },
];
  

export default function Footer() {
  return (
    <footer style={{
      borderTop: "0.5px solid var(--border)",
      padding: "60px 24px 32px",
      background: "var(--bg)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Top */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 48,
          marginBottom: 48,
        }}>
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 800,
              marginBottom: 12,
              letterSpacing: "-0.5px",
            }}>
              Linked<span style={{ color: "var(--teal)" }}>Out</span>
            </div>
            <p style={{
              fontSize: 14,
              color: "var(--text-muted)",
              lineHeight: 1.6,
              maxWidth: 280,
              marginBottom: 20,
            }}>
              A global professional micro-event by AIESEC connecting ambitious young people with international opportunities.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {SOCIALS.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  style={{
                    width: 36,
                    height: 36,
                    background: "var(--bg-card)",
                    border: "0.5px solid var(--border)",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "var(--teal)"; e.currentTarget.style.borderColor = "var(--teal-border)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {LINKS.map(col => (
            <div key={col.section}>
              <h4 style={{
                fontFamily: "var(--font-display)",
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 16,
                letterSpacing: "0.04em",
                color: "#fff",
              }}>{col.section}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {col.items.map(item => (
                  <li key={item}>
                    <a href="#" style={{
                      fontSize: 14,
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                      onMouseEnter={e => e.target.style.color = "#fff"}
                      onMouseLeave={e => e.target.style.color = "var(--text-muted)"}
                    >{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "0.5px solid var(--border)",
          paddingTop: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <p style={{ fontSize: 13, color: "var(--text-faint)" }}>
            © 2026 AIESEC. All rights reserved. Made with ♥ by the IM departement
          </p>
          <p style={{ fontSize: 13, color: "var(--text-faint)" }}>
            Tunis, Tunisia 🇹🇳
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
