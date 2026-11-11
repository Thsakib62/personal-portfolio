# Tahmid Hasan Sakib — Research & Engineering

An existing static React portfolio developed further for graduate research, engineering projects, publications, and background. It uses React, TypeScript, Vite, React Router, Motion, Lucide, and Tailwind CSS v4. No backend, paid service, or public deployment is required.

## Run and verify

Use Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
npm run format:check
npm run typecheck
npm run build
npm test
```

`npm test` runs Playwright against the production build. It uses `/usr/bin/chromium` when available, or `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`; otherwise install Chromium with Playwright. Browser coverage includes desktop, tablet, mobile, direct routes, filters, case-study navigation, themes, keyboard behavior, and automated axe scans.

## Structure

- `src/data/portfolio.ts` — structured profile, distinct graduate and undergraduate projects, publication records, skills, education, experience, achievements, and navigation.
- `src/data/models.ts` — reusable project and publication types. Optional case-study fields are rendered only when supported.
- `src/pages/Home.tsx` — selected research, publication, and background preview.
- `src/pages/Research.tsx` — themes and searchable, category/year-filterable publication record.
- `src/pages/Projects.tsx` — project index, filters, and reusable detail route at `/projects/:id`.
- `src/pages/Sections.tsx` — experience, education, CV placeholder, contact placeholder, and 404.
- `src/components` and `src/styles.css` — existing shared design system, theme, navigation, and reusable cards.
- `CONTENT_TODO.md` — unresolved verification and assets.

The supplied publication PDF is source material, not proof of publication status. Records with corroborated conference and DOI information are separated from preprints and uncertain manuscripts. REDAP and PULSE remain independent project case studies; no paper relationship is inferred. BibTeX buttons appear only on records with title, author, venue, year, and DOI data. No paper PDFs are hosted.

Project images and videos use labeled placeholders until approved assets arrive. The CV and resume page has no download links yet. Contact has no guessed profile links, public phone number, or inactive form. The professional portrait is also pending.

## Hosting

`public/_redirects` provides a static-host SPA fallback. This branch is for review only. Do not deploy or merge without a separate decision.
