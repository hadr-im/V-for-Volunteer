import { motion, useReducedMotion } from "framer-motion";

/**
 * Line-by-line, word-by-word mask reveal.
 *
 *   <SplitText lines={["GO BEYOND", "_BORDERS._"]} play={ready} />
 *
 * Word markers: *asterisks* fill the word in the brand colour,
 * _underscores_ render it hollow (brand stroke, no fill). Each line is its own
 * overflow-hidden row, so words slide up from behind the line above
 * rather than fading in place.
 */

const EASE = [0.16, 1, 0.3, 1];

/**
 * Splits a line into words, carrying each word's tone.
 *
 * Markers are matched across the whole line before the split, so they
 * can span several words — "_BOARDING PASS_" works. Matching after the
 * word split would leave the underscores on screen, since neither
 * "_BOARDING" nor "PASS_" is a complete pair.
 */
function parseLine(line) {
  const words = [];
  const push = (chunk, tone) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((text) => words.push({ text, tone }));

  const marker = /([*_])(.+?)\1/g;
  let cursor = 0;
  let match;

  while ((match = marker.exec(line)) !== null) {
    if (match.index > cursor) push(line.slice(cursor, match.index), undefined);
    push(match[2], match[1] === "*" ? "brand" : "text-outline");
    cursor = marker.lastIndex;
  }
  if (cursor < line.length) push(line.slice(cursor), undefined);

  return words;
}

export default function SplitText({
  lines = [],
  as: Tag = "div",
  className = "",
  delay = 0,
  stagger = 0.06,
  duration = 0.9,
  // Leave `play` undefined and the reveal waits until the heading is
  // scrolled into view. Pass a boolean only when something else owns the
  // timing — the hero, which waits on the preloader.
  play,
  amount = 0.4,
  nowrap = false,
  style,
}) {
  const reduced = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { delayChildren: delay, staggerChildren: reduced ? 0 : stagger },
    },
  };

  const word = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        // Past 100% + the mask's bottom padding, so no sliver of the
        // glyph tops peeks out before the word animates in.
        hidden: { y: "135%" },
        show: { y: "0%", transition: { duration, ease: EASE } },
      };

  const trigger =
    play === undefined
      ? { whileInView: "show", viewport: { once: true, amount } }
      : { animate: play ? "show" : "hidden" };

  return (
    <Tag className={className} style={style}>
      <motion.span
        variants={container}
        initial="hidden"
        {...trigger}
        style={{ display: "block" }}
      >
        {lines.map((line, li) => (
          // `nowrap` holds the author's line breaks: without it a line
          // that outgrows its column re-wraps and strands single words.
          <span key={li} style={{ display: "block", whiteSpace: nowrap ? "nowrap" : undefined }}>
            {parseLine(line).map(({ text, tone }, wi) => (
              <span className="mask" key={`${li}-${wi}`} style={{ marginRight: "0.24em" }}>
                <motion.span variants={word} className={tone}>
                  {text}
                </motion.span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
