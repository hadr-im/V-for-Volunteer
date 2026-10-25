/**
 * V4V lockup — the site's brand mark.
 *
 * Type, not an image file: the wordmark has to sit at 58px in the navbar
 * and at clamp(60px, 11vw, 108px) in the preloader, and an SVG asset
 * would need a second file to stay crisp at both. Callers pass one
 * `height`; the stylesheet derives the type size, the globe and the gap
 * from it, so the whole mark scales as a unit.
 */

const GLOBE_PATH = (
  <>
    <circle cx="12" cy="12" r="9.25" />
    {/* The meridian is an ellipse, not a circle: it is the only line that
        says the disc is a sphere seen face-on. */}
    <ellipse cx="12" cy="12" rx="4.1" ry="9.25" />
    <path d="M3.1 9.1h17.8M3.1 14.9h17.8" />
  </>
);

export default function Wordmark({ height = 58, className = "", style }) {
  return (
    <span
      className={`wordmark ${className}`}
      style={{
        "--mark-h": typeof height === "number" ? `${height}px` : height,
        ...style,
      }}
      role="img"
      aria-label="V4V"
    >
      <span className="wordmark__text" aria-hidden="true">
        V<i>4</i>V
      </span>

      <svg
        className="wordmark__globe"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        {GLOBE_PATH}
      </svg>
    </span>
  );
}
