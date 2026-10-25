import aiesec from "../../images/logos/aiesec.png";
import globalVolunteer from "../../images/logos/global-volunteer.png";

/**
 * Logo slot — partner marks only.
 *
 * To add a logo: drop the file in src/images/logos/, import it above, and
 * add it to the map. A name with no entry renders a labelled placeholder
 * rather than a broken image, so unfinished slots are visible but harmless.
 *
 * Our own mark is not here: it is <Wordmark>, set in type rather than
 * shipped as a file, so it stays crisp at every size it appears at.
 *
 * The AIESEC file is pre-processed: the source was black ink with a white
 * matte baked in, which is invisible on a dark background, so it was
 * cropped to the wordmark and recoloured white with the matte removed.
 * The Global Volunteer file needed none of that — it ships as coral ink
 * on transparent, which is already the brand colour on our background.
 */
const LOGOS = {
  aiesec,
  "global-volunteer": globalVolunteer,
};

export function hasLogo(name) {
  return Boolean(LOGOS[name]);
}

export default function Logo({ name, alt, height = 40, className = "", style }) {
  const src = LOGOS[name];

  if (!src) {
    return (
      <div
        className={`logo-slot ${className}`}
        style={{
          height,
          // `height` may be a CSS string like clamp(...), which has no numeric width.
          minWidth: typeof height === "number" ? height * 2.4 : undefined,
          ...style,
        }}
        aria-label={alt || `${name} logo placeholder`}
        role="img"
      >
        <span>{name.replace(/-/g, " ")}</span>
        <span style={{ opacity: 0.55 }}>logo slot</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || `${name} logo`}
      className={`logo ${className}`}
      style={{ height, ...style }}
      draggable="false"
    />
  );
}
