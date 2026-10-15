import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "../data/content";
import ApplyLink from "./ui/ApplyLink";
import Logo from "./ui/Logo";

const EASE = [0.16, 1, 0.3, 1];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Don't let the page scroll behind the open drawer.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goTo = (href) => {
    setOpen(false);
    if (!isHome) return;
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header className={`nav ${scrolled || open ? "nav--scrolled" : ""}`}>
        <nav className="nav__inner">
          <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
            <Logo name="linked-out" alt="Linked Out" height={58} />
          </Link>

          {isHome && (
            <ul className="nav__links">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    className="nav__link"
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(l.href);
                    }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ApplyLink label="Apply" onClick={() => setOpen(false)} />

            {isHome && (
              <button
                className="nav__burger"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <motion.path
                    d="M1 1h14"
                    animate={open ? { d: "M2 1l12 10" } : { d: "M1 1h14" }}
                    transition={{ duration: 0.3, ease: EASE }}
                    strokeLinecap="round"
                  />
                  <motion.path
                    d="M1 11h14"
                    animate={open ? { d: "M2 11l12 -10" } : { d: "M1 11h14" }}
                    transition={{ duration: 0.3, ease: EASE }}
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__drawer"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {navLinks.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: EASE }}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(l.href);
                }}
              >
                <span>0{i + 1}</span>
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
