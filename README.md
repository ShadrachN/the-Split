# Splits

A track and field progress tracker (Milestone 2, simple version). React + Vite + React Router.

```
npm install
npm run dev
```

## Screens (one route each)

| Screen | Route | File |
|---|---|---|
| Home (pick an event) | `/` | `src/pages/HomePage.jsx` |
| Event (PR bib, chart, results; empty state) | `/events/:eventId` | `src/pages/EventPage.jsx` |
| Log result (form + errors) | `/events/:eventId/log` | `src/pages/LogResultPage.jsx` |
| Result saved (new PR, or rank) | `/events/:eventId/saved?result=id` | `src/pages/ResultSavedPage.jsx` |
| Official results links | `/links` | `src/pages/OfficialLinksPage.jsx` |
| Not found | `*` | `src/pages/NotFoundPage.jsx` |

## Flows and decisions

1. **Log a result:** Home → Event → Log result → *Valid mark?* (no: errors shown on Log result; yes: save) → *New PR?* (yes: "New personal record!" bib; no: "Result saved", rank and gap to PR) → Event.
2. **Save an official profile link:** Home → Official results → *TFRRS, MileSplit or Athletic.net link?* (no: error under the field; yes: link added and "saved" message).

## Color theme (complementary: navy 220 and amber 35-42)

| Role | Where it is used | Value |
|---|---|---|
| Dominant | Page background | `hsl(220, 33%, 96%)` |
| Surface | Cards | `hsl(0, 0%, 100%)` |
| Secondary | Header, navigation, event tabs, chart line, PR badge | `hsl(220, 60%, 22%)` |
| Accent | Buttons and links only, focus ring | `hsl(35, 90%, 32%)` |
| Highlight | PR bib card, PR dot on chart | `hsl(42, 95%, 68%)` |
| Ink | Body text | `hsl(220, 40%, 10%)` |
| Border | Field borders, dividers | `hsl(220, 15%, 50%)` |
| Error | Error messages and invalid fields | `hsl(0, 72%, 42%)` |

## Measured contrast (WCAG formula)

| Pair | Ratio | Needed |
|---|---|---|
| Ink on dominant | 16.37:1 | 4.5 |
| Ink on surface | 18.08:1 | 4.5 |
| Surface (white) on secondary (header, badge) | 13.50:1 | 4.5 |
| Highlight on secondary (active nav, header focus) | 8.96:1 | 3 |
| White on accent (primary button) | 5.26:1 | 4.5 |
| Accent on surface (links, secondary button) | 5.26:1 | 4.5 |
| Accent on dominant (focus ring) | 4.76:1 | 3 |
| Ink on highlight (bib) | 12.01:1 | 4.5 |
| Secondary on surface (tabs, chart) | 13.50:1 | 4.5 |
| Border on surface (field borders) | 4.37:1 | 3 |
| Border on dominant (card edges) | 3.96:1 | 3 |
| Error on surface | 6.47:1 | 4.5 |

## Design tokens

Spacing: 8, 16, 24, 32, 48 px. Type: system-ui, weights 400 and 700, sizes 16 / 24 / 48 px, line height 1.5.
