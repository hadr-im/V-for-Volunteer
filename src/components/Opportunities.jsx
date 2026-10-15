import { motion, useReducedMotion } from "framer-motion";
import { opportunities } from "../data/content";
import SplitText from "./ui/SplitText";
import Reveal from "./ui/Reveal";
import ApplyLink from "./ui/ApplyLink";

const EASE = [0.16, 1, 0.3, 1];

export default function Opportunities() {
  const reduced = useReducedMotion();

  // Stagger lives on the grid, so the cards cascade in document order
  // rather than each guessing its own delay.
  const grid = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  };

  const card = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 34, scale: 0.97 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.7, ease: EASE },
        },
      };

  return (
    <section id="opportunities" className="section">
      <div
        className="glow glow--c"
        style={{ width: "60vw", height: "44vw", maxWidth: 720, maxHeight: 520, top: "2%", left: "-8%", "--aurora-dur": "30s", "--aurora-delay": "-12s" }}
      />

      <div className="shell" style={{ textAlign: "center", marginBottom: "clamp(36px, 6vh, 64px)" }}>
        <SplitText
          as="h2"
          className="display h2"
          lines={["OPPORTUNITIES THAT", "SHAPE YOUR _FUTURE_"]}
          style={{ marginBottom: 20, "--outline-size": "1em" }}
        />

        <Reveal as="p" className="lede" delay={0.1} style={{ margin: "0 auto" }}>
          Live placements our partner entities are filling right now. Every one
          includes mentorship and a certificate.
        </Reveal>
      </div>

      <motion.ul
        className="shell opps"
        variants={grid}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
      >
        {opportunities.map((o) => (
          <motion.li key={o.id} className="dest" variants={card}>
            <div className="dest__head">
              <span className="dest__code">{o.code}</span>
              <span className="dest__type">{o.type}</span>
            </div>

            <h3 className="dest__title">{o.title}</h3>
            <p className="dest__org">{o.org}</p>

            <div className="pills">
              {o.tags.map((t) => (
                <span className="pill" key={t}>{t}</span>
              ))}
            </div>

            <dl className="dest__meta">
              <div>
                <dt>Duration</dt>
                <dd>{o.duration}</dd>
              </div>
              <div>
                <dt>Apply by</dt>
                <dd>{o.deadline}</dd>
              </div>
            </dl>
          </motion.li>
        ))}

        <motion.li className="dest dest--cta" variants={card}>
          <h3 className="dest__cta-title">Your destination isn't listed yet?</h3>

          <p className="dest__cta-copy">
            Apply once and we'll match you against everything that opens.
          </p>

          <ApplyLink label="Explore more" icon="arrow" className="dest__cta-bar" />
        </motion.li>
      </motion.ul>
    </section>
  );
}
