import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Generic in-view entrance. Replaces the old IntersectionObserver hook,
 * which left `.reveal` elements permanently invisible if it never fired.
 */
export default function Reveal({
  children,
  as = "div",
  className = "",
  delay = 0,
  duration = 0.75,
  y = 26,
  x = 0,
  amount = 0.25,
  once = true,
  style,
  ...rest
}) {
  const reduced = useReducedMotion();
  const Comp = motion[as] || motion.div;

  return (
    <Comp
      className={className}
      style={style}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y, x }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: reduced ? 0.3 : duration, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
