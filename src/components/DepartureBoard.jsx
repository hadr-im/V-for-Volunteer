import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { destinations } from "../data/content";
import SplitFlap from "./ui/SplitFlap";

const ROWS = 3;
const SWAP_MS = 3400;
const EASE = [0.16, 1, 0.3, 1];

const PlaneIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
  </svg>
);

/** Hours:minutes, flipping over as a real board does. Seconds would churn. */
function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="board__clock">
      <SplitFlap value={String(now.getHours()).padStart(2, "0")} className="flaps--amber" />
      <i>:</i>
      <SplitFlap value={String(now.getMinutes()).padStart(2, "0")} className="flaps--amber" />
    </span>
  );
}

/**
 * Three slots onto the full destination list. One slot swaps every few
 * seconds and the whole row flips over, character by character, the way a
 * real split-flap board rolls a line.
 */
export default function DepartureBoard({ play = true }) {
  const reduced = useReducedMotion();
  const [slots, setSlots] = useState(() => Array.from({ length: ROWS }, (_, i) => i));
  const nextDest = useRef(ROWS);
  const nextRow = useRef(0);

  useEffect(() => {
    if (!play || reduced) return undefined;
    const id = setInterval(() => {
      setSlots((prev) => {
        const next = [...prev];
        next[nextRow.current % ROWS] = nextDest.current % destinations.length;
        nextDest.current += 1;
        nextRow.current += 1;
        return next;
      });
    }, SWAP_MS);
    return () => clearInterval(id);
  }, [play, reduced]);

  return (
    <motion.div
      className="board"
      initial="hidden"
      animate={play ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { delayChildren: 0.7, staggerChildren: 0.1 } },
      }}
    >
      <div className="board__top">
        <span className="board__brand">
          <PlaneIcon />
          Departures
        </span>
        <Clock />
      </div>

      <div className="board__head">
        <span>Time</span>
        <span>Destination</span>
        <span className="board__col-flight">Flight</span>
        <span className="board__col-gate">Gate</span>
        <span>Remarks</span>
      </div>

      {slots.map((destIndex, i) => {
        const d = destinations[destIndex];
        return (
          <motion.div
            key={i}
            className="board__row"
            variants={{
              hidden: reduced ? { opacity: 0 } : { opacity: 0, y: -8 },
              show: reduced
                ? { opacity: 1 }
                : { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
            }}
          >
            <SplitFlap value={d.time} className="flaps--amber" />
            <SplitFlap value={d.city} className="flaps--amber" delay={0.05} />
            <SplitFlap value={d.flight} className="flaps--amber board__col-flight" delay={0.1} />
            <SplitFlap value={d.gate} className="flaps--amber board__col-gate" delay={0.15} />
            <SplitFlap
              value={d.status === "open" ? "BOARDING" : "FINAL CALL"}
              className={d.status === "open" ? "flaps--open" : "flaps--warn"}
              delay={0.2}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
