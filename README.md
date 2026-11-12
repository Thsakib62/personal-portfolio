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

`npm run test:preview` is a separate, opt-in live Cloudflare Pages smoke suite. It requires both `PREVIEW_BASE_URL` and `PREVIEW_PROJECT`, accepts only an explicit preview-style `*.pages.dev` URL, and never starts a local server. Do not run it until a real preview deployment has been separately authorized. See `CLOUDFLARE_PREVIEW_VERIFICATION.md` for the command and scope.

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

The site contains one approved professional portrait, six approved research figures, and six owner-approved CV/resume PDFs in `public/documents/`. Each document category has a same-origin PDF download link. It hosts no research video or paper PDF. Contact uses owner-authorized institutional email and professional profiles; it has no phone number or contact form.

The downloadable PDFs are public release copies of the academic CV and five role-focused resumes. Editable DOCX sources and private verification records are not part of this repository. Document availability is controlled by the typed entries in `src/data/portfolio.ts`; new or revised PDFs require separate owner approval and integrity checks before they are added.

## Hosting

For a future production release, Cloudflare Pages Git integration can use `main` as the production branch, build command `npm run build`, and output directory `dist`. Connecting `main` may immediately publish the site; do so only after explicit launch approval. The committed `.nvmrc` requests Node 24; verify the resolved version in the Pages build log. Pages' built-in SPA fallback serves React Router deep links without a root `404.html` or `_redirects` rule. `public/documents/404.html` is intended for missing PDF paths; verify the actual HTTP 404 on a Pages preview. See `CLOUDFLARE_LAUNCH_CHECKLIST.md` and `CLOUDFLARE_PREVIEW_VERIFICATION.md` for controlled setup and release gates. No Cloudflare deployment is performed by repository preparation.
