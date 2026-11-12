import { existsSync, readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import {
  cvDocumentCategories,
  earlierProjects,
  researchProjects,
} from '../src/data/portfolio'

const mainRoutes = [
  '/',
  '/research',
  '/projects',
  '/experience',
  '/cv',
  '/contact',
]
const projectRoutes = [...researchProjects, ...earlierProjects].map(
  ({ id }) => `/projects/${id}`,
)
const routes = [...mainRoutes, ...projectRoutes, '/not-a-page']
const approvedDocumentPaths = cvDocumentCategories.flatMap((document) =>
  document.state === 'available' ? [document.pdfUrl] : [],
)

test('build keeps Cloudflare SPA fallback and document 404 assets distinct', async ({
  page,
}) => {
  expect(existsSync('dist/_redirects')).toBe(false)
  expect(existsSync('dist/404.html')).toBe(false)
  expect(existsSync('dist/documents/404.html')).toBe(true)
  const html = readFileSync('dist/index.html', 'utf8')
  expect(html).toContain('name="twitter:card" content="summary"')
  expect(html).not.toMatch(/<link[^>]+rel="canonical"/)
  await page.goto('/projects/redap')
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('REDAP')
  const missingDocumentPage = await page.request.get('/documents/404.html')
  expect(missingDocumentPage.headers()['content-type']).toContain('text/html')
  expect(await missingDocumentPage.text()).toContain('Document not found')
})

for (const width of [360, 1280]) {
  test(`direct routes and links stay usable at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: width === 360 ? 780 : 900 })
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('response', (response) => {
      if (
        response.url().startsWith('http://127.0.0.1:4173/') &&
        response.status() >= 400
      ) {
        errors.push(`${response.status()} ${new URL(response.url()).pathname}`)
      }
    })

    for (const route of routes) {
      await page.goto(route)
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
      expect(await page.title(), route).toContain('Tahmid Hasan Sakib')
      const layout = await page.evaluate(() => ({
        fits: document.documentElement.scrollWidth <= innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        bodyWidth: document.body.scrollWidth,
        viewportWidth: innerWidth,
        offenders: [...document.querySelectorAll<HTMLElement>('body *')]
          .filter((element) => element.scrollWidth > element.clientWidth + 1)
          .slice(0, 10)
          .map((element) => ({
            tag: element.tagName,
            className: element.className,
            right: Math.round(element.getBoundingClientRect().right),
            scrollWidth: element.scrollWidth,
            clientWidth: element.clientWidth,
          })),
      }))
      expect(layout.fits, `${route}: ${JSON.stringify(layout)}`).toBe(true)
      const brokenAnchors = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')]
          .map((link) => link.getAttribute('href')!.slice(1))
          .filter((id) => id && !document.getElementById(id)),
      )
      expect(brokenAnchors, route).toEqual([])
      const internalPaths = await page
        .locator('a[href^="/"]')
        .evaluateAll((links) =>
          links.map(
            (link) => new URL((link as HTMLAnchorElement).href).pathname,
          ),
        )
      for (const path of internalPaths)
        expect(
          [...routes, ...approvedDocumentPaths],
          `${route} links to ${path}`,
        ).toContain(path)
      const unsafeLinks = await page.locator('a').evaluateAll((links) =>
        links
          .filter((link) => {
            const anchor = link as HTMLAnchorElement
            const rel = anchor.rel.split(/\s+/)
            return (
              anchor.protocol === 'javascript:' ||
              (anchor.target === '_blank' &&
                (!rel.includes('noopener') || !rel.includes('noreferrer')))
            )
          })
          .map((link) => (link as HTMLAnchorElement).getAttribute('href')),
      )
      expect(unsafeLinks, route).toEqual([])
      await expect(page.locator('img:not([alt])')).toHaveCount(0)
      const images = page.locator('img:visible')
      for (let index = 0; index < (await images.count()); index++) {
        const image = images.nth(index)
        await image.scrollIntoViewIfNeeded()
        await expect
          .poll(() =>
            image.evaluate((element: HTMLImageElement) => element.naturalWidth),
          )
          .toBeGreaterThan(0)
      }
      if (
        mainRoutes.includes(route) ||
        route === '/projects/recommendation' ||
        route === '/projects/redap'
      ) {
        if (route === '/') {
          await expect(page.locator('.hero-profile')).toHaveCSS('opacity', '1')
          await expect(page.locator('.hero-copy')).toHaveCSS('opacity', '1')
        }
        await page.evaluate(() => window.scrollTo(0, 0))
        const name =
          route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')
        await page.screenshot({
          path: `test-results/audit-${width}-${name}.png`,
          fullPage: true,
        })
      }
    }

    await page.goto('/projects/pulse')
    await page.reload()
    await expect(page.getByRole('heading', { level: 1 })).toContainText('PULSE')
    await page.getByRole('link', { name: 'All projects' }).first().click()
    await expect(page).toHaveURL('/projects')
    await page.goBack()
    await expect(page).toHaveURL('/projects/pulse')
    await page.goForward()
    await expect(page).toHaveURL('/projects')
    expect(errors).toEqual([])
  })
}
