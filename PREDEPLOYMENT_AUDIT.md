# Predeployment audit — 2026-11-11

## Scope and method

Audited the Vite/React portfolio on `develop/predeployment-audit` against the owner-confirmed professional record, the private verification checklist, `CONTENT_TODO.md`, and the existing research evidence boundaries. Private documents and thesis sources were read only. The review covered tracked files and relevant file-name history, `public/`, production output, routing, links, metadata, dependency status, accessibility tests, image metadata, and representative viewport screenshots. It did not involve deployment or external account changes.

The checks are bounded: pattern scans cannot prove that every possible secret is absent, automated accessibility checks do not replace manual or assistive-technology review, and local previews do not prove behavior on a production Cloudflare Pages deployment.

## Findings by severity

### Critical

None confirmed in this repository.

### High

None confirmed in this repository. A previously identified credential exposure belongs to the separate ANGTHAS repository; this site does not link to that repository or contain its credential. Remediation and rotation, if applicable, must occur in that repository and its history through a separate security process.

### Medium

| Finding                                                                                  | Evidence                                                                                                                    | Resolution                                                                                                                                      |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| The “Visual product recommendation” project heading widened a 360 px viewport to 366 px. | Direct-route Playwright sweep of `/projects/recommendation`; the heading's 346 px text width exceeded its 320 px container. | Reduced the small-screen case-study heading size and allowed emergency wrapping. The 360 px route sweep now passes without horizontal overflow. |

### Low

| Finding                                                                                                                               | Evidence                                                                             | Resolution                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| Repository-wide Prettier check failed on 28 otherwise formatted files in this Windows checkout.                                       | `core.autocrlf=true`; `prettier --end-of-line auto --check .` passed before changes. | Set `endOfLine: auto`; `npm run format:check` now passes without reformatting unrelated files.                          |
| README described the portrait, contact page, paper relationships, and research media as pending despite their current implementation. | Compared `README.md` with tracked assets and current routes/data.                    | Updated project structure, content status, and local build guidance.                                                    |
| Generic Open Graph title and description were absent.                                                                                 | Inspected `index.html`; there is no approved production URL or social image.         | Added domain-independent Open Graph type, title, and description. Canonical URL and social-image decisions remain open. |
| Robots and sitemap policy are not yet defined.                                                                                        | No `robots.txt`, sitemap, or canonical production URL is present.                    | Left open for the owner to decide with the final production URL; no domain or indexing policy was guessed.              |

## Privacy and security status

- The tracked tree and relevant Git history file names contain no PDF, DOCX, environment file, key file, raw log, dataset, video, or thesis-source file. The production output likewise contains no PDF or DOCX.
- The public asset tree contains the approved portrait and six previously approved research figures. No research figure or portrait was edited in this phase. No new media was added.
- Targeted scans of tracked source and HTML found no credential pattern or absolute private Windows path. A pattern scan of 91 reachable text blobs in Git history found no private-key, token-shape, assigned-secret, private-path, or noninstitutional-email flag. Existing image metadata showed no private path or email-pattern flag. No personal phone number or residential address was found in public content.
- The institutional email and five professional profile URLs in central data match the owner-authorized destinations. External links use descriptive labels and safe new-tab attributes. Browser tests verify the URL values; external account availability was not independently certified by this local audit.
- All six CV/resume entries remain in the `preparation` state with no download URL or rendered download action. No private draft was copied.
- `npm audit --json` reported zero critical, high, moderate, or low vulnerabilities at the time of this audit. No dependency was changed.

## Content and interaction review

The displayed education, current GPA, defended/pending degree status, GRA and Robi dates, REU mentoring, MECC personal presentation, awards, and selected leadership match the owner-confirmed record. IoT intrusion detection remains an independent post-undergraduate project. The Research page keeps accepted IEEE Access, three published conference papers, MECC extended abstract/poster, PULSE under review, and REDAP registration/full-submission-pending in distinct categories. It does not add a final IEEE Access DOI or assert completed REDAP submission.

Existing case-study text retains QCar1/QCar2 distinctions and separates PULSE log replay from live fallback and REDAP offline frames from later closed-loop demonstrations. Individual contributions and several publisher details remain subject to the checks in `CONTENT_TODO.md`.

The direct-route sweep covers every current project ID, all primary routes, and the unknown-route page at 360 and 1280 px. It checks one page heading, document title, internal destinations, same-page anchors, visible image loading, safe new-tab attributes, image alt attributes, browser errors, deep-route refresh, and history navigation. Existing tests also cover navigation, contact links, themes, CV states, figure loading, viewer zoom/pan/Escape/focus restoration, and axe scans. Screenshots at 360 and 1280 px were reviewed alongside the suite's 390, 768, and 1440 px views. No additional clipping or broken grid was confirmed after the heading fix. Review screenshots are stored in a local folder outside the repository.

## Build and performance

- `npm run typecheck`: passed.
- `npm run build`: passed. Current output is approximately 476 kB JavaScript (152 kB gzip) and 37 kB CSS (9 kB gzip).
- `npm run format:check`: passed after the line-ending configuration fix.
- Full Playwright suite: 72 tests passed across desktop, tablet, and mobile, including automated axe checks in both themes. The added route sweep explicitly exercises 360 and 1280 px widths.
- The headshot is about 96 kB. The largest approved research image is the PULSE methodology figure at about 1.12 MB; it is lazy loaded in project content and retains its approved evidence pixels. No speculative image reprocessing was performed.
- No unexpected local production-asset requests or browser page errors appeared in the direct-route sweep.

## Cloudflare Pages readiness

Use `npm run build` with `dist` as the output directory and Node.js 22.12 or newer. The existing `public/_redirects` rule is copied to `dist`; [Cloudflare Pages redirect documentation](https://developers.cloudflare.com/pages/configuration/redirects/) describes this file format. [Cloudflare Pages serving documentation](https://developers.cloudflare.com/pages/configuration/serving-pages/) also documents default SPA fallback when there is no top-level `404.html`. The local route-refresh test passes, but production routing must be checked on a preview deployment after explicit approval. No Cloudflare account, secret, DNS, or deployment configuration was changed.

Before any release, select the production URL and decide canonical, robots, sitemap, and social-preview behavior; check the site on real mobile and keyboard/assistive-technology setups; review all public research figures and claims with the relevant collaborators; and authorize deployment explicitly. Do not upload the private CV/resume drafts. The current “In preparation” page is safe to retain without downloads if the owner approves that public presentation.

## Release blockers and pending owner decisions

1. Final owner review of the public copy and six previously approved research figures, plus separate authorization of the deployment target, is still required. This audit does not approve or deploy the site.
2. Collaborator/evidence review of public research metrics, attribution, and security-disclosure boundaries remains open. The existing limitations must stay attached to their claims.
3. Confirm whether a full REDAP CVPR 2027 submission occurred before changing its registration/pending label. Obtain final IEEE Access publisher metadata and settle the MECC formal proceedings citation before adding those details.
4. Choose a production URL and indexing/canonical/sitemap/social-preview policy. Complete a Cloudflare preview-route check and real-device accessibility review before launch.
5. Keep the ANGTHAS repository unlinked until its separate credential remediation is confirmed. Do not assume removal from its latest revision erases historical exposure.
6. Private CV/resume V2 drafts require separate content, privacy, PDF accessibility, and publication approval. They are not part of this release candidate.
