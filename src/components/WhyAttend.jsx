import { useState } from "react";
import { motion } from "framer-motion";
import { whyAttend } from "../data/content";
import SplitText from "./ui/SplitText";
import Reveal from "./ui/Reveal";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Rows, not cards — the same language as the departure board. One row is
 * open at a time: hover on a pointer, tap on touch. Keeps six benefits in
 * one viewport without six identical boxes.
 */
export default function WhyAttend() {
  const [active, setActive] = useState(0);

  return (
    <section id="why" className="section">
      <div className="shell why__grid">
        <div>
          <SplitText
            as="h2"
            className="display h2"
            lines={["WHAT'S IN", "YOUR _TICKET_"]}
            style={{
              margin: "0 0 20px",
              fontSize: "clamp(34px, 7vw, 78px)",
              letterSpacing: "0.03em",
              // Dialled back from the hero's 0.2em — at this size the full
              // tracking pushes YOUR TICKET past the column.
              "--outline-track": "0.1em",
            }}
          />

          <Reveal as="p" className="lede" delay={0.1} style={{ whiteSpace: "nowrap" }}>
            Six things you leave with.
          </Reveal>
        </div>

        <ul className="why__list">
          {whyAttend.map((item, i) => {
            const open = active === i;
            return (
              <Reveal as="li" key={item.title} delay={i * 0.05} y={18} amount={0.1}>
                <button
                  type="button"
                  className="why__row"
                  data-open={open}
                  aria-expanded={open}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(open ? -1 : i)}
                >
                  <span className="why__head">
                    <span className="why__num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="why__title">{item.title}</span>
                    <span className="why__chev" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M7.5 1v13M1 7.5h13" strokeLinecap="round" />
                      </svg>
                    </span>
                  </span>

                  <motion.span
                    className="why__body"
                    style={{ display: "block" }}
                    initial={false}
                    animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <p>{item.desc}</p>
                  </motion.span>
                </button>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
