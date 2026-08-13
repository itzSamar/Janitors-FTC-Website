# The Janitors FTC Website

Official site for **The Janitors** — FIRST Tech Challenge team **36721** (San Francisco).

This is the team’s designed site: dark industrial UI, broom boot sequence, page wipes, and sections for Robot, Season, Outreach, Sponsors, Team, Portfolio, and Join.

## Development

Requires **Node 20+** (22 recommended).

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder (GitHub Pages workflow included).

## Source layout

| Path | Role |
|------|------|
| `index.html` | Full design (DC template + inline styles) |
| `public/assets/` | Runtime, React UMD, fonts, team data |
| `design-src/` | Unpacked copies for reference (`app.logic.js`, `team-data.js`, CSS) |

Live content and interactions live in `index.html` (markup) and the Component logic in the `text/x-dc` script (also mirrored at `design-src/app.logic.js`). Team build-log / match placeholders are in `public/assets/c0b5dd21-….js` / `design-src/team-data.js`.
