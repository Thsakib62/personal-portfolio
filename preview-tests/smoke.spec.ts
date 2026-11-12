import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { expect, test, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { approvedDocuments } from '../tests/fixtures/approvedDocuments'

const baseURL = process.env.PREVIEW_BASE_URL!
const expectedOrigin = new URL(baseURL).origin
const routes = [
  ['/', 'Tahmid Hasan Sakib'],
  ['/research', 'Building trust into autonomy'],
  ['/projects', 'Ideas, made tangible'],
  ['/projects/redap', 'REDAP'],
  ['/projects/pulse', 'PULSE'],
  ['/experience', 'A foundation for what'],
  ['/cv', 'The fuller picture'],
  ['/contact', 'A conversation can start something'],
  ['/projects/iot', 'Network intrusion detection for IoT devices'],
] as const

const sha256 = (bytes: Buffer) =>
  createHash('sha256').update(bytes).digest('hex').toUpperCase()

const approvedImages = [
  ['/favicon.svg', 'image/svg+xml'],
  ['/images/professional-headshot.webp', 'image/webp'],
  ['/research/redap-qcar2-setup.png', 'image/png'],
  ['/research/pulse-methodology.png', 'image/png'],
  ['/research/pulse-qcar2-route-setup.png', 'image/png'],
  ['/research/qcar1-system-architecture.png', 'image/png'],
  ['/research/qcar1-three-stop-route.jpg', 'image/jpeg'],
  ['/research/qcar1-baseline-stopping-distribution.png', 'image/png'],
] as const

async function expectVisibleImagesLoaded(page: Page) {
  for (const image of await page.locator('img:visible').all()) {
    await image.scrollIntoViewIfNeeded()
    await expect
      .poll(() =>
        image.evaluate((node: HTMLImageElement) =>
          node.complete ? node.naturalWidth : 0,
        ),
      )
      .toBeGreaterThan(0)
  }
}

function observePage(page: Page) {
  const errors: string[] = []
  let intentionalNavigation = false
  page.on('request', (request) => {
    if (
      request.url().startsWith('http') &&
      new URL(request.url()).origin !== expectedOrigin
    ) {
      errors.push(`Unexpected external request: ${request.url()}`)
    }
  })
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('requestfailed', (request) => {
    const reason = request.failure()?.errorText ?? 'unknown failure'
    if (intentionalNavigation && reason === 'net::ERR_ABORTED') return
    errors.push(`Failed request (${reason}): ${request.url()}`)
  })
  page.on('response', (response) => {
    if (
      response.url().startsWith(expectedOrigin + '/') &&
      response.status() >= 400
    ) {
      errors.push(`${response.status()} ${new URL(response.url()).pathname}`)
    }
  })
  return {
    errors,
    async navigate(action: () => Promise<unknown>) {
      intentionalNavigation = true
      try {
        await action()
        await page.waitForLoadState('load')
      } finally {
        intentionalNavigation = false
      }
    },
  }
}

test('all published SPA routes load directly and survive refresh', async ({
  page,
  request,
}) => {
  const observation = observePage(page)
  for (const [route, heading] of routes) {
    const response = await request.get(route, { maxRedirects: 0 })
    expect(response.status(), route).toBe(200)
    expect(response.headers()['content-type'], route).toContain('text/html')
    expect(await response.text(), route).toContain('id="root"')
    await observation.navigate(() => page.goto(route))
    expect(new URL(page.url()).origin, route).toBe(expectedOrigin)
    await expect(page.getByRole('heading', { level: 1 }), route).toContainText(
      heading,
      { ignoreCase: true },
    )
    await expect(page, route).toHaveTitle(/Tahmid Hasan Sakib/)
    await expectVisibleImagesLoaded(page)
    await observation.navigate(() => page.reload())
    await expect(page.getByRole('heading', { level: 1 }), route).toContainText(
      heading,
      { ignoreCase: true },
    )
    await expectVisibleImagesLoaded(page)
  }
  expect(observation.errors).toEqual([])
})

test('approved images are reachable and retain their exact bytes', async ({
  request,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440')
  for (const [path, contentType] of approvedImages) {
    const response = await request.get(path, { maxRedirects: 0 })
    expect(response.status(), path).toBe(200)
    expect(response.headers()['content-type'], path).toContain(contentType)
    expect(await response.body(), path).toEqual(readFileSync(`public${path}`))
  }
})

test('unknown application route renders the intentional soft 404', async ({
  page,
  request,
}, testInfo) => {
  const response = await request.get('/preview-verification-unknown-route', {
    maxRedirects: 0,
  })
  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toContain('text/html')
  await page.goto('/preview-verification-unknown-route')
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'A path yet to be explored',
  )
  await expect(page).toHaveTitle(/Page not found/)
  await testInfo.attach('unknown-route-status.txt', {
    body: Buffer.from('HTTP 200 with React 404 content: soft 404\n'),
    contentType: 'text/plain',
  })
})

test('missing document returns a real 404 instead of the SPA shell', async ({
  request,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440')
  const response = await request.get(
    '/documents/preview-verification-missing.pdf',
    { maxRedirects: 0, failOnStatusCode: false },
  )
  expect(response.status()).toBe(404)
  expect(response.headers()['content-type']).toContain('text/html')
  const body = await response.text()
  expect(body).toContain('Document not found')
  expect(body).not.toContain('id="root"')
})

test('six approved PDFs retain exact bytes, links, and download names', async ({
  page,
  request,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440')
  await page.goto('/cv')
  await expect(page.locator('.document-card')).toHaveCount(6)
  for (const document of approvedDocuments) {
    const path = `/documents/${document.filename}`
    const response = await request.get(path, { maxRedirects: 0 })
    expect(response.status(), path).toBe(200)
    expect(response.headers()['content-type'], path).toContain(
      'application/pdf',
    )
    const bytes = await response.body()
    expect(bytes.subarray(0, 5).toString(), path).toBe('%PDF-')
    expect(sha256(bytes), path).toBe(document.sha256)
    const link = page.getByRole('link', { name: document.label })
    await expect(link).toHaveAttribute('href', path)
    await expect(link).toHaveAttribute('download', '')
    const downloadPromise = page.waitForEvent('download')
    await link.click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toBe(document.filename)
    expect(sha256(readFileSync((await download.path())!))).toBe(document.sha256)
  }
})

test('preview indexing header and expected private paths are safe', async ({
  request,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440')
  const home = await request.get('/', { maxRedirects: 0 })
  expect(home.status()).toBe(200) // An unauthenticated preview is public.
  expect(home.headers()['x-robots-tag']?.toLowerCase()).toContain('noindex')
  const html = await home.text()
  expect(html).toContain('name="twitter:card" content="summary"')
  expect(html).not.toMatch(/<link[^>]+rel="canonical"/)
  const favicon = await request.get('/favicon.svg', { maxRedirects: 0 })
  expect(favicon.status()).toBe(200)
  expect(favicon.headers()['content-type']).toContain('image/svg+xml')
  for (const path of [
    '/documents/Tahmid_Hasan_Sakib_Academic_CV.docx',
    '/09_PUBLIC_DOCUMENT_RELEASE_MANIFEST.md',
    '/06_PUBLIC_DOCUMENT_RELEASE_CHECKLIST.md',
  ]) {
    const response = await request.get(path, {
      maxRedirects: 0,
      failOnStatusCode: false,
    })
    expect([200, 404], path).toContain(response.status())
    expect(response.headers()['content-type'] ?? '', path).toContain(
      'text/html',
    )
    const body = await response.text()
    if (response.status() === 200) expect(body, path).toContain('id="root"')
  }
  const scriptPath = html.match(/<script[^>]+src="([^"]+\.js)"/)?.[1]
  expect(scriptPath).toBeTruthy()
  const sourceMap = await request.get(`${scriptPath}.map`, {
    maxRedirects: 0,
    failOnStatusCode: false,
  })
  expect(sourceMap.headers()['content-type'] ?? '').not.toContain(
    'application/json',
  )
  const mapBody = await sourceMap.text()
  expect(mapBody).not.toContain('"sourcesContent"')
  if (sourceMap.status() === 200) expect(mapBody).toContain('id="root"')
})

test('responsive navigation, themes, figures, links, and axe checks', async ({
  page,
}, testInfo) => {
  const observation = observePage(page)
  await observation.navigate(() => page.goto('/'))
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Tahmid Hasan Sakib',
  )
  await expect(page.locator('.hero-copy')).toHaveCSS('opacity', '1')
  await expect(page.locator('.hero-profile')).toHaveCSS('opacity', '1')
  await expectVisibleImagesLoaded(page)
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  if (testInfo.project.name === 'desktop-1440') {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await observation.navigate(() => page.reload())
    await expect(page.locator('.hero-copy')).toHaveCSS('opacity', '1')
    await expect(page.locator('.hero-profile')).toHaveCSS('opacity', '1')
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  }
  await page.screenshot({
    path: `test-results/preview-home-${testInfo.project.name}.png`,
    fullPage: true,
  })
  await page.keyboard.press('Tab')
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main')).toBeFocused()
  if (testInfo.project.name.startsWith('mobile')) {
    const menu = page.getByRole('button', { name: 'Open menu' })
    await menu.click()
    await expect(
      page.getByRole('navigation', { name: 'Mobile navigation' }),
    ).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(menu).toBeFocused()
    await menu.click()
    await page
      .getByRole('navigation', { name: 'Mobile navigation' })
      .getByRole('link', { name: 'Research', exact: true })
      .click()
  } else {
    await page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Research', exact: true })
      .click()
  }
  await expect(page).toHaveURL('/research')
  await page.getByRole('button', { name: 'Switch to dark theme' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  await observation.navigate(() => page.goto('/projects/pulse'))
  const trigger = page.getByRole('button', {
    name: 'View full figure: Monitoring architecture',
  })
  await trigger.click()
  await expect(
    page.getByRole('dialog', { name: 'Monitoring architecture' }),
  ).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(trigger).toBeFocused()
  await expectVisibleImagesLoaded(page)
  await observation.navigate(() => page.goto('/contact'))
  await expect(page.locator('.contact-email')).toHaveAttribute(
    'href',
    'mailto:tsakib42@tntech.edu',
  )
  for (const href of [
    'https://www.linkedin.com/in/tahmid-hasan-sakib/',
    'https://github.com/Thsakib62',
    'https://scholar.google.com/citations?user=fS4QJCgAAAAJ',
    'https://orcid.org/0009-0000-0797-6813',
    'https://www.kaggle.com/tahmidhasansakib',
  ]) {
    await expect(
      page.locator(`.contact-profile-link[href="${href}"]`),
    ).toHaveAttribute('rel', 'noopener noreferrer')
  }
  await observation.navigate(() => page.goto('/cv'))
  await expect(page.locator('.document-card a[download]')).toHaveCount(6)
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
  await page.screenshot({
    path: `test-results/preview-cv-${testInfo.project.name}.png`,
    fullPage: true,
  })
  expect(observation.errors).toEqual([])
})
