import { motion, useReducedMotion } from "framer-motion";

/**
 * Split-flap text.
 *
 * Changing `value` remounts every glyph, so each one flips about its
 * horizontal seam with a per-character stagger — the mechanical cascade a
 * real departures board makes when a row changes. React does the work on
 * the key change; no timers in here.
 */
export default function SplitFlap({ value = "", className = "", stagger = 0.035, delay = 0 }) {
  const reduced = useReducedMotion();
  const chars = String(value).split("");

  if (reduced) {
    return (
      <span className={`flaps ${className}`}>
        {chars.map((ch, i) => (
          <span className="flap" key={i}>
            {ch === " " ? " " : ch}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={`flaps ${className}`}>
      {chars.map((ch, i) => (
        <motion.span
          key={`${value}-${i}`}
          className="flap"
          initial={{ rotateX: -90, opacity: 0.25 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + i * stagger,
          }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}
