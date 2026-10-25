import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import Wordmark from "./ui/Wordmark";

/**
 * Boarding sequence.
 *
 * Progress is real, not theatre: it eases toward 92% on a timer and only
 * completes once fonts have loaded and the window `load` event has fired.
 * So a slow connection genuinely waits, and a fast one still gets the full
 * ~2.3s beat instead of a flash. At 100% the whole panel slides up and the
 * hero fades in underneath.
 *
 * Progress is a MotionValue, not state. Setting state every frame made
 * React re-render the whole panel 60 times a second, which is what made
 * the bar stutter; a MotionValue writes straight to the DOM node. The
 * bar uses scaleX (compositor-only) rather than width (triggers layout).
 */

const PHASES = [
  [0.0, "Initialising"],
  [0.3, "Loading manifest"],
  [0.62, "Checking destinations"],
  [0.9, "Cleared for departure"],
];

const EASE = [0.16, 1, 0.3, 1];

const labelFor = (p) => PHASES.reduce((acc, [at, label]) => (p >= at ? label : acc), PHASES[0][1]);

export default function Preloader({ onDone }) {
  const reduced = useReducedMotion();
  const progress = useMotionValue(0);
  const pctText = useTransform(progress, (v) => `${Math.round(v * 100)}%`);

  // The only React state here: four changes over the whole sequence.
  const [phase, setPhase] = useState(PHASES[0][1]);

  useEffect(() => {
    const MIN_MS = reduced ? 400 : 2300;
    const start = performance.now();
    let raf;
    let ready = false;
    let settled = false;
    let lastPhase = PHASES[0][1];

    Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((res) => window.addEventListener("load", res, { once: true })),
    ]).then(() => {
      ready = true;
    });

    const loop = (now) => {
      const t = Math.min((now - start) / MIN_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.min(eased, ready ? 1 : 0.92);

      if (next > progress.get()) progress.set(next);

      const label = labelFor(next);
      if (label !== lastPhase) {
        lastPhase = label;
        setPhase(label);
      }

      if (next >= 1) {
        if (!settled) {
          settled = true;
          // Let the bar read 100% for a beat before the panel leaves.
          window.setTimeout(onDone, 340);
        }
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [onDone, reduced, progress]);

  return (
    <motion.div
      className="preloader"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: reduced ? 0.2 : 0.95, ease: EASE }}
      role="status"
      aria-live="polite"
      aria-label={phase}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
      >
        <Wordmark height="clamp(56px, 10vw, 100px)" />
      </motion.div>

      <motion.div
        className="preloader__progress"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="preloader__meta">
          <span>{phase}</span>
          <motion.b>{pctText}</motion.b>
        </div>

        <div className="preloader__bar">
          <motion.div className="preloader__fill" style={{ scaleX: progress }} />
        </div>
      </motion.div>
    </motion.div>
  );
}
