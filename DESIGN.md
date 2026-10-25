# Design — JobTrackr

**World: the filing cabinet.** A job search is paperwork: one folder per application, a coloured tab for where it stands, and a cabinet you open every morning. The app uses office-grey paper, manila folders, coloured file tabs for status, and a steel-navy cabinet for the sidebar. The cream ground, Fraunces headings, gradient headline text, glow blobs and emoji icons are gone.

## Tokens (`frontend/index.html` `:root`)

| Token | Value | Role |
|---|---|---|
| `--bg` / `--bg2` / `--bg3` / `--bg4` | `#F0F1EE` / `#FFFFFF` / `#E7E9E4` / `#DADDD6` | ground, panels, wells |
| `--border` / `--border2` | `#DDE0DA` / `#C6CAC2` | rules |
| `--text` / `--text2` / `--text3` | `#15181C` / `#4B5260` / `#6B7280` | text levels |
| `--accent` / `--accent2` | `#1F3A5C` / `#2B5188` | primary buttons, links |
| `--sidebar-bg` | `#16263A` | the cabinet |
| `--manila` / `--manila2` / `--manila-ink` | `#EDDCA9` / `#E2CC8C` / `#4A3A12` | folders, logo mark, highlights, offer status |

### Status tabs (used identically in tables, Kanban, the hero folders and charts)
| Status | Tab | Text |
|---|---|---|
| Applied | `#E4ECF8` | `#1C4F96` |
| Reviewing | `#FBF0D3` | `#7A5306` |
| Interview | `#E1F2E9` | `#13603E` |
| Offer | manila `#EDDCA9` | `#4A3A12` |
| Rejected | `#F8E3E1` | `#9C2A23` |
| Hired | `#DDEEF2` | `#0B5B71` |

### Type
**Public Sans** 400–900 (one family). The hero runs at 900, `clamp(40px, 5.6vw, 76px)`, tracking −0.025em. Labels are sentence case, never tracked uppercase.

### Shape
Radii 4 / 6 / 8px; status pills are 3px tabs.

## Components
- **Icons:** an inline SVG set (`icon(name)`, 24px grid, 1.8 stroke). Static markup uses `<i class="ic" data-ic="…">` and is hydrated on load. Toasts take their icon from the leading emoji hint, so `⚠️` shows an alert and anything else a check.
- **Hero folders:** three applications from the seed data (Stripe applied, Figma interview, Linear offer) sit as stacked folders with offset tabs, and each lifts on hover.
- **Section heads:** a left-aligned title over a 2px ink rule, with the subline on the right.
- **Feature list:** a ruled 3×2 table with manila icon tiles.
- **Kanban columns:** file drawers with a top tab edge.

## Motion
Folders file in one after another (80ms apart). Cards no longer lift on hover. Reduced motion is respected.
