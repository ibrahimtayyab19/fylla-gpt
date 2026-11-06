# Fylla landing page recreation

A responsive HTML and SCSS recreation of the supplied Fylla landing page. All page layouts use flexbox; no CSS grid is used. Original publicly available fonts, vector illustrations, project photographs and hero video are stored locally in `dist/assets`.

## Edit

- `dist/index.html`: page structure and copy
- `src/styles.scss`: Sass styles, variables, mixins, and responsive rules
- `dist/script.js`: navigation interactions
- `dist/assets/`: replaceable images, fonts, video and SVGs

Run `npm install` then `npm run build` to compile Sass. Serve `dist/` with any static server. Links for pages beyond the requested homepage point to relevant homepage sections; no additional pages or backend are included. Contact email and external social URLs are demonstration destinations to replace before real use.

Reference: https://fylla-template.framer.website/

## UI refinements

Desktop uses a persistent light/dark theme switch; the menu button appears only on mobile. Client logos run in a seamless duplicated flex marquee. Section boundaries and service/value dividers match the reference. Project and news images have clipped zoom hover effects, and their headings use Syne.

The hero uses a silent fast-start H.264 MP4 with a WebM fallback. It attempts muted inline autoplay and exposes a play control if autoplay is blocked. Reduced-motion preferences stop automatic animation and video playback; users can explicitly play the video.

## Developer formatting

Source files use two-space indentation, expanded rules, and labeled sections.

```sh
npm run format        # Format editable source files
npm run format:check  # Check formatting without rewriting
npm run build         # Compile SCSS into dist/styles.css
npm run watch         # Recompile SCSS while editing
```

Edit `src/styles.scss` rather than generated `dist/styles.css`. The SCSS sections label base styles, reusable controls, page sections, interaction refinements, and responsive overrides in cascade order. HTML comments identify each page section; JavaScript is grouped by mobile navigation, dropdowns, theme state, and video playback.
