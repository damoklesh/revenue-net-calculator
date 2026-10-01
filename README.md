# Netwise

Netwise is a static React + TypeScript application for clear, private net-salary estimates. The first slice contains the shared app shell, landing page, navigation and route placeholders needed to build the calculator in later stories.

## Requirements

- Node.js 20 or newer
- npm 10 or newer

## Development commands

Install the exact dependency tree:

```bash
npm ci
```

Start the Vite development server:

```bash
npm run dev
```

The repository's validation contract is:

```bash
npm ci
npm run lint
npm run typecheck
npm test -- --run
npm run build
npm run test:e2e
```

The explicit `npm test -- --run` form is the canonical non-interactive unit-test
command used by the repository validation contract.

`npm run test:e2e` starts a Vite preview server automatically and runs Chromium plus the narrow mobile project. The E2E suite covers the landing CTA, shared navigation highlighting, browser back navigation, direct access and refresh of `/calculator` and `/methodology`, the useful 404 view, console errors, and narrow-width overflow. Playwright browsers need to be installed once on a new machine with `npx playwright install chromium`.

## Routes

- `/` — public landing page with the value proposition, supported countries, privacy promise and three-step overview.
- `/calculator` — explicitly labelled calculator placeholder for the next story.
- `/methodology` — explicitly labelled methodology placeholder for the methodology story.
- Any other path — useful 404 view with a link back to the landing page.

The shell and navigation live in `src/components/AppShell.tsx` and are reused by every route. Calculator content is intentionally not implemented in this story. No salary formulas, account system or backend calls are included.

## Static hosting and SPA refreshes

The app uses browser history routes. The production build is generated in `dist/`; a static host must serve `dist/index.html` as the fallback for unknown paths so direct access and refresh work for `/calculator` and `/methodology`.

This repository includes a Netlify-compatible `public/_redirects` file with that fallback rule. For other hosts, configure the equivalent rewrite:

```text
/*  /index.html  200
```

For Vercel, the equivalent is a rewrite in `vercel.json`; for an Nginx deployment, use `try_files $uri $uri/ /index.html`. The Vite preview server already applies SPA fallback and is the server used by the E2E tests. To verify a static host manually, request `/calculator` and `/methodology` directly (not through an in-app link), refresh each page, and confirm the corresponding placeholder remains visible.

## Privacy boundary

The landing page communicates the intended product boundary: salary calculations run on the user's device and do not require registration. This scaffold makes no network requests for salary data and does not persist personal salary information.
