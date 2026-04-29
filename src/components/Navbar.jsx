import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Program",    href: "#programs"     },
 
  
  { label: "Benefits",    href: "#benefits"     },
  { label: "Team",        href: "#team"         },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    if (!isHome) return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
        background: scrolled ? "rgba(8,12,12,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "0.5px solid var(--border)" : "0.5px solid transparent",
        padding: "0 40px",
      }}
    >
      <nav style={{
        maxWidth: 1200,
        margin: "0 auto",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.5px",
          }}>
            Linked<span style={{ color: "var(--teal)" }}>Out</span>
            <span style={{
              marginLeft: 8,
              fontSize: 11,
              fontWeight: 400,
              color: "var(--text-muted)",
              fontFamily: "var(--font-body)",
            }}>by AIESEC</span>
          </span>
        </Link>

        {/* Desktop links */}
        {isHome && (
          <ul style={{
            display: "flex",
            gap: 32,
            listStyle: "none",
            alignItems: "center",
          }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); handleNav(l.href); }}
                  style={{
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    fontSize: 14,
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    transition: "color 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => e.target.style.color = "#fff"}
                  onMouseLeave={e => e.target.style.color = "var(--text-muted)"}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* CTA */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link to="/register">
            <button style={{
              background: "var(--teal)",
              color: "#fff",
              border: "none",
              padding: "9px 22px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "var(--font-display)",
              cursor: "pointer",
              transition: "background 0.2s, transform 0.15s",
              letterSpacing: "-0.2px",
            }}
              onMouseEnter={e => { e.target.style.background = "var(--teal-bright)"; e.target.style.transform = "scale(1.03)"; }}
              onMouseLeave={e => { e.target.style.background = "var(--teal)"; e.target.style.transform = "scale(1)"; }}
            >
              Apply Now →
            </button>
          </Link>
        </div>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </header>
  );
}
