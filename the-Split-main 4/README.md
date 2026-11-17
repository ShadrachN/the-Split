# Splits

A track and field progress tracker made with React, Vite and React Router.

## How to run it

```
npm install
npm run dev
```

The app starts empty and only keeps results while the tab is open. To see the chart and the "not a PR" message, log at least two results for the same event (for example 12.84 and then 13.10 in the 100m).

## Screens

| Screen | Route | File |
|---|---|---|
| Home (pick an event) | `/` | `src/pages/HomePage.jsx` |
| Event (PR, chart, results) | `/events/:eventId` | `src/pages/EventPage.jsx` |
| Log a result (form) | `/events/:eventId/log` | `src/pages/LogResultPage.jsx` |
| Result saved (new PR or not) | `/events/:eventId/saved` | `src/pages/ResultSavedPage.jsx` |
| Official results links | `/links` | `src/pages/LinksPage.jsx` |
| Not found | `*` | `src/pages/NotFoundPage.jsx` |

## How the code is organized

- `src/App.jsx` holds the results and links in state and passes them to the pages as props.
- `src/data.js` has the list of events and small helper functions (reading a mark, formatting it, finding the PR).
- `src/components/` has the pieces used on the event page: the header, the PR bib card, the chart and the results table.
- `src/App.css` has all the styles.

## Flows

1. **Log a result:** Home → Event → Log a result → if something is wrong, the errors show on the form; if it's good, it saves → "New personal record!" or "Result saved" → back to the event.
2. **Save an official link:** Home → Official results → if the link isn't from TFRRS, MileSplit or Athletic.net, an error shows; otherwise the link is added.

## Colors

Navy and amber are opposite each other on the color wheel, so the amber buttons and yellow PR bib stand out against the navy and light blue-gray.

| Name | Used for | Value |
|---|---|---|
| background | Page background | `hsl(220, 33%, 96%)` |
| white | Cards | `hsl(0, 0%, 100%)` |
| navy | Header, tabs, chart, PR badge | `hsl(220, 60%, 22%)` |
| amber | Buttons and links | `hsl(35, 90%, 32%)` |
| yellow | PR bib, PR dot on the chart | `hsl(42, 95%, 68%)` |
| text | Body text | `hsl(220, 40%, 10%)` |
| border | Borders and lines | `hsl(220, 15%, 50%)` |
| red | Error messages | `hsl(0, 72%, 42%)` |

## AI use acknowledgement

This project was assisted by Claude (Anthropic's AI assistant). Claude helped set up the project, review it against the Milestone 2 rubric, and write the Milestone 2 design document and change note. Claude also helped simplify the code so it is easier to read: shared state moved from React Context into `App.jsx`, the small wrapper components (Card, Button, FormField, EventTabs) were folded into the pages, the helper files were merged into `data.js`, and the CSS was combined into one file.
