# Homepage motion accessibility review

Date: November 12, 2026.

Scope: local source and production-build verification only. The existing Cloudflare preview was not updated.

## Finding and change

The homepage's two Motion containers began at opacity 0. The `.hero-copy` container faded in over 0.55 seconds, affecting the name, eyebrow, statement, description, affiliation, and three calls to action. The `.hero-profile` container faded in over 0.8 seconds after a 0.1-second delay, affecting the approved portrait and profile note. Axe detected low effective contrast while the hero copy was partially transparent; settled and reduced-motion states passed.

Both containers now remain fully opaque. The hero copy still moves 14 px vertically over 0.55 seconds; the profile moves 10 px vertically over 0.8 seconds after the existing 0.1-second delay. The site's `prefers-reduced-motion` handling still omits entrance movement. No text, typography, spacing, colors, layout, portrait, PDFs, or research media changed.

## Verification

- New Playwright checks inspect the first rendered hero state and sample text and ancestor opacity throughout 1.1 seconds of entrance motion. Text colors and backgrounds remain stable. Axe scans run during motion and after it settles. All light/dark and reduced-motion combinations passed at the existing mobile, tablet, and desktop test viewports.
- Full local Playwright suite: 93 passed. TypeScript, production build, repository-wide Prettier, and npm audit passed; npm audit found 0 vulnerabilities.
- Homepage screenshots reviewed at 360, 390, 768, 1280, and 1440 px. Each settled light-theme screenshot was pixel-identical to the corresponding prior screenshot. Mobile and desktop dark-theme screenshots were also reviewed. No clipped text, displaced portrait, or horizontal overflow was observed.
- The six approved PDFs matched their recorded SHA-256 values in both `public/` and `dist/`. All six research figures and the portrait matched their `main` Git blobs and production-build copies. No DOCX, source map, or private Markdown file appeared in `dist/`.

## Screenshot paths

The local test runner writes the reviewed screenshots to ignored `test-results/` files: `audit-360-home.png`, `home-mobile-light.png`, `home-tablet-light.png`, `audit-1280-home.png`, `home-desktop-light.png`, `home-mobile-dark.png`, and `home-desktop-dark.png`. They are not part of this commit.

## Remaining limits

Automated contrast and opacity sampling does not replace manual screen-reader or real-device review. The existing Cloudflare preview still serves the earlier portfolio build; this change requires a separately authorized preview upload before live verification. This review does not authorize a production deployment.
