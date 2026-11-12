# Cloudflare Pages launch checklist

Prepared 2026-11-12. **No Cloudflare project was created and no deployment occurred in Phase 7G.2.** Connecting GitHub later may start automatic builds and deployments; obtain separate owner authorization first.

Phase 7G.3 added the opt-in `npm run test:preview` smoke suite and [controlled preview procedure](CLOUDFLARE_PREVIEW_VERIFICATION.md). No Pages project, GitHub connection, preview, or production deployment was created in that phase either. A temporary Direct Upload project with a harmless holding-page production deployment and a separate preview upload is the recommended first live test method after explicit authorization. It cannot later be converted to Git integration, and both its holding-page URL and preview URL may be publicly accessible.

## Build and routing

- Repository: [`Thsakib62/personal-portfolio`](https://github.com/Thsakib62/personal-portfolio). Use Cloudflare Pages Git integration with `main` as the production branch, repository root as the project root, **React (Vite)**, build command `npm run build`, and output directory `dist`. The lockfile is committed; the build includes TypeScript validation.
- `package.json` requires Node.js **>=22.12.0**. The committed `.nvmrc` requests **Node 24**. Cloudflare Pages' current v3 build image supports Node versions selected by `.nvmrc`; confirm the resolved Node version in the first build log. Do not rely on `package.json` engines alone for selection.
- `public/_redirects` was removed: Cloudflare Pages does not support `200` rewrite rules in that file. With no root `404.html`, Pages provides its documented SPA fallback. React Router renders the site's unknown-route page. Test direct loads, refresh, and back/forward at `/research`, `/projects`, `/projects/redap`, `/projects/pulse`, `/experience`, `/cv`, `/contact`, and an unknown route on a real Pages preview.
- `public/documents/404.html` is a directory-specific missing-document page. Confirm an unknown `/documents/*.pdf` returns **404**, rather than `index.html`, on the Pages preview. The local Vite preview does not prove Cloudflare's 404 routing. A top-level `404.html` must not be added without retesting SPA routes.

## Approved documents

Only these six owner-approved PDFs should be present in `dist/documents/`:

| CV category                 | Public path                                                      |
| --------------------------- | ---------------------------------------------------------------- |
| Academic CV                 | `/documents/Tahmid_Hasan_Sakib_Academic_CV.pdf`                  |
| General Engineering         | `/documents/Tahmid_Hasan_Sakib_General_Engineering_Resume.pdf`   |
| Embedded Systems / Robotics | `/documents/Tahmid_Hasan_Sakib_Embedded_Robotics_Resume.pdf`     |
| AI / ML / Computer Vision   | `/documents/Tahmid_Hasan_Sakib_AI_ML_Computer_Vision_Resume.pdf` |
| Hardware / Electrical       | `/documents/Tahmid_Hasan_Sakib_Hardware_Electrical_Resume.pdf`   |
| Research / Simulation       | `/documents/Tahmid_Hasan_Sakib_Research_Simulation_Resume.pdf`   |

- Run `npm test` after `npm run build`: `tests/document-download.spec.tsx` checks exact approved SHA-256 values, PDF MIME type, download filenames, build assets, and browser downloads. Recheck all six live preview responses and compare downloaded SHA-256 hashes with `CONTENT_TODO.md` before production launch. No DOCX, private manifest, or additional PDF should be served.

## URL, indexing, and metadata

- Do not guess the Pages project name or permanent domain. Record the actual `*.pages.dev` production URL after the owner creates a project. A custom domain can be attached later through the Pages **Custom domains** workflow; no DNS or account change is part of this phase.
- The initial HTML has a domain-independent title, description, Open Graph title/description, and `twitter:card=summary`. React updates document titles by route in the browser. Social crawlers may see only the shared static HTML, so route-specific Open Graph previews are **not verified**. No social sharing image is approved.
- No canonical URL or absolute sitemap is published until the production URL is selected. No `robots.txt` is needed to permit indexing of the completed production site; decide the final policy at launch. Cloudflare Pages documents a default `X-Robots-Tag: noindex` header for preview deployments; verify the header on the actual preview. `robots.txt` is not an access-control or privacy mechanism. The GitHub repository's public visibility and preview URL availability are separate from search indexing.
- Unknown SPA routes currently render a client-side 404 view through a successful HTML fallback response. Review this soft-404 behavior when selecting the final SEO approach.

## Preview and release gate

1. After explicit authorization, connect the GitHub repository in **Workers & Pages > Create > Pages > Connect to Git**, select `main` as production, and review branch deployment controls. By default, nonproduction branches may create preview deployments; choose the desired preview policy before connecting.
2. Inspect **Deployments > View build** for install/build logs, resolved Node version, output directory, and the commit SHA. A local build alone does not verify Cloudflare behavior.
3. On the preview URL, verify SPA deep links and refresh, the six PDF response headers/download names/hashes, missing-PDF 404, contact links, research figures/dialogs, themes, and browser console/network activity. Check `X-Robots-Tag: noindex` on the preview response.
4. Review at 360, 390, 768, 1280, and 1440 px; complete real-device keyboard and screen-reader checks, including PDF reading order. Automated axe and local screenshots are supporting evidence, not a substitute.
5. Obtain owner and relevant collaborator signoff on public research metrics, figure rights, attribution, and security disclosure. Keep IEEE Access final publisher metadata and MECC citation details pending; change REDAP from registration/pending only after confirmed full submission.
6. Obtain explicit approval of the actual production URL, indexing/canonical/sitemap/social-image choices, and production deployment. Do not merge or enable automatic production deployment before this gate.
7. If a production release fails, use **Pages > Deployments > All deployments > Rollback to this deployment** to restore a prior successful production build; preview deployments are not rollback targets. Confirm the restored site and PDFs, then fix the source branch separately. A custom domain, if later chosen, must be configured through Pages rather than by guessing or editing DNS here.

Cloudflare documentation reviewed 2026-11-12: [build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/), [build image and Node selection](https://developers.cloudflare.com/pages/configuration/build-image/), [serving and SPA behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/), [redirect limitations](https://developers.cloudflare.com/pages/configuration/redirects/), [Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/), [preview indexing](https://developers.cloudflare.com/pages/configuration/preview-deployments/), [branch controls](https://developers.cloudflare.com/pages/configuration/branch-build-controls/), [rollbacks](https://developers.cloudflare.com/pages/configuration/rollbacks/), and [custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).
