import { Link } from "react-router-dom";

/**
 * The apply call to action: a link, not a button, with its icon
 * departing on hover. Shared by the hero, the navbar and the
 * opportunities card so the three can never drift apart.
 */

const ICONS = {
  // Aircraft silhouette, same one as the board header. Rotated inside
  // the SVG rather than with a CSS transform, which the departure
  // animation owns.
  plane: (
    <svg className="link-apply__plane" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <g transform="rotate(90 12 12)">
        <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
      </g>
    </svg>
  ),
  arrow: (
    <svg
      className="link-apply__plane"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12h15M13 5.5 19.5 12 13 18.5" />
    </svg>
  ),
  back: (
    <svg
      className="link-apply__plane"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 12H5M11 5.5 4.5 12 11 18.5" />
    </svg>
  ),
};

export default function ApplyLink({
  label = "Apply now",
  icon = "plane",
  to = "/register",
  className = "",
  iconFirst = false,
  onClick,
}) {
  const track = (
    <span className="link-apply__track" aria-hidden="true">
      {ICONS[icon] || ICONS.plane}
    </span>
  );
  const text = <span className="link-apply__label">{label}</span>;

  const inner = iconFirst ? (
    <>
      {track}
      {text}
    </>
  ) : (
    <>
      {text}
      {track}
    </>
  );

  const classes = `link-apply ${className}`;

  // An in-page anchor is not a route — router <Link> would try to
  // navigate to a path called "#opportunities".
  if (to.startsWith("#")) {
    return (
      <a href={to} className={classes} onClick={onClick}>
        {inner}
      </a>
    );
  }

  return (
    <Link to={to} className={classes} onClick={onClick}>
      {inner}
    </Link>
  );
}
