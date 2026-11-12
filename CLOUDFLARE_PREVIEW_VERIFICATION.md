# Cloudflare Pages preview verification

Prepared 2026-11-12. This is a **future live-test procedure**, not permission to create a Pages project or publish a deployment. No Cloudflare URL exists in the repository and no live test ran in Phase 7G.3.

## Run only after owner authorization

1. Obtain the actual preview URL and Pages project name from the owner and confirm both in the Cloudflare dashboard. A preview URL must have the form `https://<preview-alias>.<your-pages-project>.pages.dev`. The script deliberately rejects the production `<project>.pages.dev` host, localhost, other domains, ports, credentials, paths, queries, and fragments. The hostname check does **not** prove ownership of the project; the operator must verify that separately.
2. From the repository root, use this PowerShell **single-line** command, replacing both clearly marked placeholders with the actual authorized values: `$env:PREVIEW_BASE_URL='https://<preview-alias>.<your-pages-project>.pages.dev'; $env:PREVIEW_PROJECT='<your-pages-project>'; npm.cmd run test:preview`
3. If the bundled Playwright browser is unavailable on Windows, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to an installed browser executable for that session. Do not commit local paths or credentials. `npm test` remains local and does **not** invoke this live suite.
4. With either variable absent, `npm run test:preview` exits nonzero with an explicit configuration error and does not start a localhost server. The preview configuration has no `webServer` setting. Requests use GET and normal browser navigation/download actions; no remote settings are changed.

## Expected results

- Direct GET, hydrated page, expected heading/title, and refresh succeed for `/`, `/research`, `/projects`, `/projects/redap`, `/projects/pulse`, `/experience`, `/cv`, `/contact`, and `/projects/iot`. Primary navigation works. The unknown application route is expected to return HTML with **HTTP 200** and the React not-found view; that is a **soft 404** and remains an SEO decision.
- A nonexistent `/documents/*.pdf` must return a genuine **HTTP 404** with the directory-specific “Document not found” page, never an HTML `200` SPA shell. A failure here blocks launch and calls for a targeted Pages routing fix; local Vite preview cannot certify this behavior.
- Each of the six public PDFs must return `200`, `application/pdf`, a `%PDF-` body, its approved SHA-256, a matching `/cv` download link, and the expected browser filename:

| Public PDF under `/documents/`                        | Approved SHA-256                                                   |
| ----------------------------------------------------- | ------------------------------------------------------------------ |
| `Tahmid_Hasan_Sakib_Academic_CV.pdf`                  | `28E01298BD964FD9F68A6121891DA5710F5AB194BB47B9F3935638CF140AA7FD` |
| `Tahmid_Hasan_Sakib_General_Engineering_Resume.pdf`   | `45430E0E0B600DD027F1D09254941975A3F6EEF17E8536D2CBEA1FBAB3F1BDFC` |
| `Tahmid_Hasan_Sakib_Embedded_Robotics_Resume.pdf`     | `7A442726646DB94CCF0C55AA269E9F1A2E3724BE5959AFCEE3E81F182332E878` |
| `Tahmid_Hasan_Sakib_AI_ML_Computer_Vision_Resume.pdf` | `14D431F6238E7ACD0AE7170DFA2D3226DE1E10A3E9E4C36FB35642699EAEF78C` |
| `Tahmid_Hasan_Sakib_Hardware_Electrical_Resume.pdf`   | `CDC5B459495DFD25557C9E8D7E15A1F2CE76D4FBAE115CD52399F2BCD606F6F1` |
| `Tahmid_Hasan_Sakib_Research_Simulation_Resume.pdf`   | `70E54FC65A07A13B4A8108A0A8F1D48BEBB0FD44AF7C4D8415E28FE68667F20B` |

The local and live tests import these values from `tests/fixtures/approvedDocuments.ts`. Do not replace or regenerate the approved PDFs to make a mismatch pass.

- An unauthenticated preview should respond publicly if no Access policy is enabled. The preview response must include **`X-Robots-Tag: noindex`**. This is an HTTP header, distinct from an HTML `<meta name="robots">`, a `robots.txt` file, or an access restriction. **Noindex does not make a URL private.** If the owner later enables Cloudflare Access, the unauthenticated smoke test will need a separately approved authentication approach; do not place credentials in Git or bypass Access.
- The suite checks 360, 390, 768, 1280, and 1440 px, including overflow, navigation and mobile menu, focus and Escape behavior, figure dialog, theme switching, contact and CV links, image loads, console/network failures, and axe scans. These automated checks do not establish complete screen-reader or real-device accessibility.
- Known candidate private paths (one DOCX path, two release-record paths, and the built JavaScript source-map path) must not expose those files. This is a bounded check, not an unrestricted host scan. The local production inventory and normal document tests also require exactly six PDFs and no DOCX, private release record, or source map.

Playwright prints pass/fail details. Screenshots are produced **only when `test:preview` is intentionally run** and remain under ignored `test-results/preview-*.png`; failure traces are under `test-results/preview/`. Preserve the test output and Cloudflare build log in a private review folder outside Git, recording the deployment URL and commit SHA. Do not commit screenshots, traces, credentials, or private logs. A local pass must never be reported as a Cloudflare pass.

## Controlled project creation options — future owner action only

**Recommended for a first, isolated live preview:** after separate approval to create a Pages project and make preview content publicly reachable, create a **temporary Direct Upload Pages project** with a harmless holding page as its initial production deployment. Then use the dashboard's **Create a new deployment → Preview** option to upload the reviewed `dist` directory to a separate preview branch. This avoids connecting the portfolio GitHub repository or deploying `main`. The holding page still gets a public production `pages.dev` URL, and the preview URL is public by default. The temporary Direct Upload project **cannot later be converted to Git integration**; a separate Git-integrated project and potentially a new URL are needed for eventual production. No holding page, project, upload, or branch is created in this phase.

**Git-integrated alternative:** use a separate, intentionally prepared holding branch as the Pages production branch, then deploy the portfolio from a different branch as a preview. Cloudflare requires selecting a pushed production branch at setup; the first production build is public, even when it is a holding page. Connecting `main` as production instead risks publishing the complete portfolio immediately. Branch deployment controls can be configured afterward, but should not be treated as a safeguard against the initial deployment. This route adds branch/build management and GitHub permissions.

**Manual/isolated alternatives:** a temporary Direct Upload project can also use a build prepared outside Git and dashboard drag-and-drop; this still deploys publicly and retains the Direct Upload migration limit. Local Vite preview remains unpublished but cannot verify Cloudflare routing or response headers. Cloudflare Access may restrict preview URLs after owner authorization; its preview policy does not automatically protect the production `pages.dev` hostname.

Creating any project, selecting its production branch, connecting GitHub, uploading `dist`, enabling Access, or publishing any Pages URL requires a **new explicit owner authorization**. The six PDFs are approved for public distribution, but that approval does not authorize launching the website.

## Production gates still open

Verify the actual preview behavior, Node/build logs, PDF responses, and header policy. Complete real-device and screen-reader review. Resolve public research-content, figure-rights, attribution, and security-disclosure signoffs; keep IEEE Access final metadata and MECC citation checks open, and do not upgrade REDAP's submission status without confirmation. Select the production URL and canonical/sitemap/indexing policy, then obtain separate production deployment approval. See `CLOUDFLARE_LAUNCH_CHECKLIST.md` and `CONTENT_TODO.md`.

Cloudflare documentation checked 2026-11-12: [Git integration and production branch](https://developers.cloudflare.com/pages/get-started/git-integration/), [branch deployment controls](https://developers.cloudflare.com/pages/configuration/branch-build-controls/), [Direct Upload and its migration limit](https://developers.cloudflare.com/pages/get-started/direct-upload/), [preview accessibility, Access, and noindex](https://developers.cloudflare.com/pages/configuration/preview-deployments/), and [SPA/nested 404 behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/).
