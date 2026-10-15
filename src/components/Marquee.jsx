import { Fragment, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { marqueeRows } from "../data/content";

/**
 * Scroll-velocity marquee.
 *
 * Each row has a slow base drift that scroll speed multiplies, and flips
 * direction when you scroll back up. Deliberately not a pure scroll-progress
 * mapping: full-page snapping makes scrollYProgress jump between sections,
 * which would make the text teleport. Velocity stays smooth across a snap.
 */

const COPIES = 3;
const SPAN = 100 / COPIES;

const wrap = (min, max, v) => {
  const range = max - min;
  return min + ((((v - min) % range) + range) % range);
};

function Row({ items, baseVelocity = 3, className = "" }) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 320 });
  const factor = useTransform(smooth, [-1400, 0, 1400], [-4, 0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-SPAN, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    // Clamp the delta so returning to a backgrounded tab doesn't jump.
    const dt = Math.min(delta, 50) / 1000;
    let moveBy = direction.current * baseVelocity * dt;

    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;

    moveBy += direction.current * moveBy * Math.abs(f);
    baseX.set(baseX.get() + moveBy);
  });

  // Copies 2 and 3 exist only to make the wrap seamless, so they are
  // hidden from assistive tech — the text is announced once.
  const copy = (hidden) => (
    <span className="marquee__item" aria-hidden={hidden || undefined}>
      {items.map((text, i) => (
        <span key={i}>{text}</span>
      ))}
    </span>
  );

  return (
    <div className={`marquee ${className}`}>
      <motion.div className="marquee__track" style={{ x }}>
        {Array.from({ length: COPIES }, (_, i) => (
          <Fragment key={i}>{copy(i !== 0)}</Fragment>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section id="numbers" className="section section--flush">
      <div
        className="glow glow--b"
        style={{ width: "66vw", height: "46vw", maxWidth: 780, maxHeight: 540, top: "10%", right: "-14%", "--aurora-dur": "27s", "--aurora-delay": "-7s" }}
      />

      <Row items={marqueeRows[0]} baseVelocity={-3} />
      <Row items={marqueeRows[1]} baseVelocity={3.6} className="marquee--alt" />
      <Row items={marqueeRows[2]} baseVelocity={-2.2} className="marquee--sm" />
    </section>
  );
}
