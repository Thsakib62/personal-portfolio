# Tahmid Hasan Sakib — Research & Engineering

A static, responsive research and engineering portfolio. This initial foundation includes a fully designed homepage and functional starter pages for research, projects, experience, CV/resume, and contact. It requires no backend, database, authentication, or paid service.

## Local development

Use Node.js **22.12+** (Node 24 LTS recommended) and npm. The lockfile is committed.

```sh
npm ci
npm run dev
```

Vite prints the local address. The development server binds to all interfaces for cloud development. No environment variables or credentials are required. If the cloud sandbox prevents npm writing to its default cache, use `npm ci --cache /tmp/portfolio-npm-cache`.

```sh
npm run format:check # Verify consistent formatting
npm run typecheck   # Strict TypeScript check
npm run build       # TypeScript + production build, output: dist/
npm run preview     # Locally serve the production build
npm test            # Browser regression and accessibility checks against dist/
```

Run `npm run build` before `npm test`. Tests use installed `/usr/bin/chromium` when available. On other machines, run `npx playwright install chromium` first (on Linux, install the browser's system dependencies as documented by Playwright). You can select an existing Chromium with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. Playwright runs desktop (1440px), tablet (768px), and mobile (390px) configurations, checks all routes, theme persistence, menu/keyboard behavior, project anchors, overflow, reduced motion, unavailable storage, and automated axe accessibility scans. Screenshots and failure traces go to ignored `test-results/`. Automated scans do not replace human accessibility review.

## Project structure

```text
src/
  main.tsx                  React, router, and reduced-motion setup
  styles.css                Tailwind entry, design tokens, responsive styles
  data/portfolio.ts         Typed profile, projects, publications, education,
                            experience, interests, skills, achievements, navigation
  components/
    Layout.tsx              Navigation, mobile menu, persisted theme, footer
    ui.tsx                  Cards, tags, headings, publication rows, page introductions
  pages/
    Home.tsx                Complete homepage
    Sections.tsx            Research, projects, experience, CV, contact, 404 starters
public/
  _redirects                Cloudflare Pages SPA route fallback
  favicon.svg               Local monogram icon
tests/portfolio.spec.ts      Browser behavior and accessibility regression checks
CONTENT_TODO.md             Content and assets required before launch
```

Built with React, TypeScript, Vite, Tailwind CSS v4, React Router, Motion, and Lucide. CSS variables keep both themes consistent; Tailwind is available for future utility styles. All assets are local, and no third-party font or API request is required. Light mode is the initial default; an explicit theme choice persists when browser storage is available. Motion follows the operating system's reduced-motion setting.

## Updating content

Edit `src/data/portfolio.ts` to update content independently of the layout. Each research effort has its own ID; homepage cards use `featured: true`. The project route supports these IDs as anchors. Undergraduate projects are a separate collection and appear after graduate research. Skills, education, and experience are structured data too.

Publications are **unverified draft placeholders**, not citations. The supplied venue/year context is labeled as pending verification. Do not add titles, authors, DOI links, acceptance status, quantitative results, or publication mappings until verified. Keep distinct research efforts separate.

Portrait and research visuals are explicitly labeled placeholders. Replace them with approved photographs/figures and meaningful alternative text. CV and resume cards deliberately have no download links until actual PDFs are supplied. Contact has no fake email, social links, or nonfunctional form. See `CONTENT_TODO.md` for the next phase.

## Cloudflare Pages deployment (when authorized)

**This task does not deploy the site.** When ready to publish:

1. Connect this GitHub repository to a Cloudflare Pages project.
2. Select the intended production branch, usually `main`.
3. Set the root directory to the repository root, build command to `npm run build`, and output directory to `dist`.
4. Set the build environment's `NODE_VERSION` to `24` (or another supported version at least 22.12). No application secrets or environment variables are needed.
5. Deploy only after content review and authorization. Verify direct loads of `/research`, `/projects`, `/experience`, `/cv`, and `/contact`.

`public/_redirects` is copied to `dist/_redirects` and rewrites client routes to `/index.html` with HTTP 200. The wildcard React route provides the visual 404 page; unknown paths therefore also receive HTTP 200 under this static SPA setup. If hosting elsewhere, configure the same history fallback. The application assumes hosting at the domain root. No Pages Functions, server, or paid integration is needed.

Before launch, replace placeholder content, review both themes on real devices, and add the final domain's canonical/social metadata. This repository does not assert publication acceptance or claim verified bibliographic records.
