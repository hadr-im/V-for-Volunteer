# Logo slots

These are **partner** marks. Our own is not a file: V4V is set in type by
[`src/components/ui/Wordmark.jsx`](../../components/ui/Wordmark.jsx), so it
stays crisp at every size. `linked-out.svg` is the retired mark it replaced
and nothing imports it any more.

| File                   | Rendered by                        | Appears                        |
| ---------------------- | ---------------------------------- | ------------------------------ |
| `aiesec.png`           | `<Logo name="aiesec" />`           | Closing lockup, right of the × |
| `global-volunteer.png` | `<Logo name="global-volunteer" />` | Closing lockup, left of the ×  |

`global-talent.png` is the teal Global Talent mark this replaced; nothing
imports it any more.

To add another: drop the file here, then import it and add it to the `LOGOS`
map in [`src/components/ui/Logo.jsx`](../../components/ui/Logo.jsx). A name
with no entry renders a dashed placeholder rather than a broken image, so an
unfinished slot is visible but harmless.

Logos render at a fixed **height** with `width: auto`, so any aspect ratio is
fine. `height` accepts a number or a CSS string, e.g. `clamp(62px, 12vw, 112px)`.

`global-volunteer.png` is `src/assets/gv.png` copied here unchanged — it is
already coral ink on transparent, which is the brand colour on our dark
background, so it needs none of the processing below.

## About the processed AIESEC file

The supplied `src/assets/Aiesec -logo.png` could not be used as-is:

- It was **black ink**, invisible against the `#0C0908` background.
- It had a **white matte** baked in around the glyphs, so inverting it in CSS
  would have turned that matte into visible white smudges.
- The wordmark occupied only ~55% of its canvas width, so centring the file
  would have placed the mark visibly off-centre.

`aiesec.png` here is that file cropped to the wordmark (1265×259 → 701×154)
and recoloured white, with the alpha derived from pixel darkness so the
antialiased edges survive and the matte is gone. The originals are untouched
in `src/assets/`.

**If you have vector versions, use them instead** — SVG is sharper at every
size and a fraction of the weight. Drop in `aiesec.svg` / `global-volunteer.svg`,
update the two imports, and delete the PNGs. For AIESEC supply the white
(or "reverse") variant so no processing is needed.

## Still missing

- `public/og-image.png` — 1200×630. This is the preview image when the link is
  shared on Instagram, LinkedIn or WhatsApp. `index.html` already points at it;
  until it exists the link previews as a bare grey card.
- `public/favicon.svg` — would replace the inline placeholder diamond in
  `index.html`.
