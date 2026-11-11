# Tahmid Hasan Sakib — Research & Engineering

Static React portfolio for graduate research, engineering projects, publications, and professional background. It uses React, TypeScript, Vite, React Router, Motion, Lucide, and Tailwind CSS v4. It has no backend or analytics.

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

- `src/data/portfolio.ts` — structured profile, verified contact links, independent and earlier projects, publication records, skills, education, experience, mentoring, achievements, and navigation.
- `src/data/researchProjects.ts` — graduate research case studies and references to six approved research figures.
- `src/data/models.ts` — project and publication types plus guarded preparation/available CV document states.
- `src/pages/Home.tsx` — selected research, publication, and background preview.
- `src/pages/Research.tsx` — themes and searchable, category/year-filterable publication record.
- `src/pages/Projects.tsx` — project index, filters, and reusable detail route at `/projects/:id`.
- `src/pages/Sections.tsx` — experience, education, six CV/resume categories, contact, and 404.
- `src/components` and `src/styles.css` — shared design system, themes, navigation, figure viewer, and reusable cards.
- `CONTENT_TODO.md` — unresolved verification and assets.

The Research page separates accepted journal work, published conference papers, an extended abstract/poster contribution, a manuscript under review, and a registered manuscript awaiting full submission. BibTeX actions appear only for published conference records with the required citation fields. Final publisher metadata and some individual contribution details remain open in `CONTENT_TODO.md`.

The site contains one approved professional portrait and six approved research figures. It hosts no research video or paper PDF. All six CV/resume categories display “In preparation” and have no download links. Contact uses owner-authorized institutional email and professional profiles; it has no phone number or contact form.

## Hosting

`public/_redirects` provides a static-host SPA fallback. For Cloudflare Pages, the build command is `npm run build` and the output directory is `dist`. Confirm the final production URL, metadata, robots/sitemap policy, research and asset approvals, and PDF release decisions before deployment. A completed audit and explicit owner approval are required; no deployment is performed by this repository.
