import { event, socials } from "../data/content";
import SplitText from "./ui/SplitText";
import Reveal from "./ui/Reveal";
import Logo from "./ui/Logo";
import ApplyLink from "./ui/ApplyLink";

const InstagramIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

export default function Closing() {
  const year = new Date().getFullYear();

  return (
    <section id="apply" className="closing">
      <div className="closing__main">
        <SplitText
          as="h2"
          className="display"
          lines={["READY TO GO _GLOBAL?_"]}
          nowrap
          style={{
            // Lower floor than other headings: one unbroken line of 19
            // characters has to fit a phone without overflowing.
            fontSize: "clamp(26px, 7vw, 100px)",
            lineHeight: 1.14,
            "--outline-size": "1em",
          }}
        />

        <Reveal
          delay={0.12}
          style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 14 }}
        >
          <ApplyLink label="Apply now" className="link-apply--solid" />
          <ApplyLink
            label="Explore opportunities"
            icon="arrow"
            to="#opportunities"
            className="link-apply--outline"
          />
        </Reveal>

        {/* Heights are fluid, not fixed: the Global Volunteer lockup is
            wider than the mark it replaced, and the pair at its full size
            overran a phone's width. The two clamps hold the 2.3:1 ratio
            between the marks, so the lockup shrinks as one. */}
        <Reveal className="lockup" delay={0.2}>
          <Logo
            name="global-volunteer"
            alt="AIESEC Global Volunteer"
            height="clamp(56px, 13vw, 90px)"
          />
          <span className="lockup__x" aria-hidden="true">×</span>
          <Logo name="aiesec" alt="AIESEC" height="clamp(24px, 5.6vw, 39px)" />
        </Reveal>
      </div>

      <footer className="footer">
        <div className="footer__line">
          <p>© {year} AIESEC · Made by the IM department</p>

          <div className="footer__end">
            <span>{event.city}</span>
            {socials.map((s) => (
              <a key={s.name} href={s.href} aria-label={s.name} target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </section>
  );
}
