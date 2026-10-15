import { Suspense, lazy } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { event } from "../data/content";
import SplitText from "./ui/SplitText";
import ApplyLink from "./ui/ApplyLink";
import DepartureBoard from "./DepartureBoard";

// three.js + three-globe is by far the heaviest thing on the page, and
// nothing above the fold depends on it — so it streams in after the
// headline, CTA and board have already painted.
const GlobeScene = lazy(() => import("./ui/GlobeScene"));

const EASE = [0.16, 1, 0.3, 1];

export default function Hero({ play = true }) {
  const reduced = useReducedMotion();

  const fade = (delay) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: play ? (reduced ? { opacity: 1 } : { opacity: 1, y: 0 }) : {},
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <section id="top" className="hero">
      {/* Aurora. Each blob gets its own period and phase so they never
          sync into a single visible pulse. */}
      <div
        className="glow glow--a"
        style={{ width: "58vw", height: "58vw", maxWidth: 700, maxHeight: 700, top: "-16%", right: "-12%", "--aurora-dur": "26s" }}
      />
      {/* Kept clear of the bottom edge. At a negative offset the blob's
          bright core met the section boundary and `overflow: hidden` cut
          it into a hard horizontal line against the next section. */}
      <div
        className="glow glow--b"
        style={{ width: "46vw", height: "46vw", maxWidth: 560, maxHeight: 560, bottom: "6%", left: "-14%", "--aurora-dur": "34s", "--aurora-delay": "-6s" }}
      />

      <div className="shell hero__grid">
        <div className="hero__copy">
          <SplitText
            as="h1"
            className="display hero__title"
            lines={["GO BEYOND", "_BORDERS._"]}
            play={play}
            delay={0.12}
            duration={1}
            nowrap
          />

          {/* Date, place and the call to action share one line. */}
          <motion.div className="hero__meta" {...fade(0.7)}>
            <b>{event.dateLabel}</b>
            <span>{event.city}</span>

            <ApplyLink />
          </motion.div>
        </div>

        <motion.div className="hero__globe" {...fade(0.5)}>
          <Suspense fallback={<span className="globe-fallback">Plotting routes…</span>}>
            <GlobeScene />
          </Suspense>
        </motion.div>

        <div className="hero__board">
          <DepartureBoard play={play} />
        </div>
      </div>
    </section>
  );
}
