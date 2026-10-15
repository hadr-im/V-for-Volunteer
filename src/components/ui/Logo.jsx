import aiesec from "../../images/logos/aiesec.png";
import globalTalent from "../../images/logos/global-talent.png";
import linkedOut from "../../images/logos/linked-out.svg";

/**
 * Logo slot.
 *
 * To add a logo: drop the file in src/images/logos/, import it above, and
 * add it to the map. A name with no entry renders a labelled placeholder
 * rather than a broken image, so unfinished slots are visible but harmless.
 *
 * The AIESEC file is pre-processed: the source was black ink with a white
 * matte baked in, which is invisible on a dark background, so it was
 * cropped to the wordmark and recoloured white with the matte removed.
 */
const LOGOS = {
  aiesec,
  "global-talent": globalTalent,
  "linked-out": linkedOut,
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
