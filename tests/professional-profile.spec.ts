import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('approved portrait loads with its natural proportions on the homepage', async ({
  page,
}, testInfo) => {
  await page.goto('/')
  const portrait = page.getByRole('img', {
    name: 'Professional portrait of Tahmid Hasan Sakib.',
  })
  await expect(portrait).toBeVisible()
  await expect(portrait).toHaveAttribute(
    'src',
    '/images/professional-headshot.webp',
  )
  const image = await portrait.evaluate((element: HTMLImageElement) => ({
    loaded: element.complete && element.naturalWidth > 0,
    width: element.naturalWidth,
    height: element.naturalHeight,
    fit: getComputedStyle(element).objectFit,
  }))
  expect(image).toEqual({
    loaded: true,
    width: 1536,
    height: 1024,
    fit: 'cover',
  })
  const response = await page.request.get('/images/professional-headshot.webp')
  expect(response.ok()).toBe(true)
  const frame = await page.locator('.portrait-frame').boundingBox()
  expect(frame).not.toBeNull()
  expect(frame!.width).toBeGreaterThan(250)
  expect(frame!.height).toBeGreaterThan(180)
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true)
  await expect(page.getByText('Image unavailable')).toHaveCount(0)
  for (const label of [
    'Autonomous systems',
    'Embedded AI',
    'Computer vision',
    'Cyber-physical security',
  ]) {
    await expect(page.locator('.focus-strip').getByText(label)).toBeVisible()
  }
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  await page.screenshot({
    path: `test-results/profile-home-${testInfo.project.name}.png`,
    fullPage: true,
  })
})

test('document categories are future states without invented downloads', async ({
  page,
}) => {
  await page.goto('/cv')
  const cards = page.locator('.document-card')
  await expect(cards).toHaveCount(6)
  for (const title of [
    'Academic Curriculum Vitae',
    'General Engineering Resume',
    'Embedded Systems / Robotics Resume',
    'AI / Machine Learning / Computer Vision Resume',
    'Hardware / Electrical Engineering Resume',
    'Research / Simulation Resume',
  ]) {
    await expect(page.getByRole('heading', { name: title })).toBeVisible()
  }
  await expect(cards.getByText('In preparation')).toHaveCount(6)
  await expect(page.locator('a[download], a[href$=".pdf"]')).toHaveCount(0)
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
})

test('experience sections and contact placeholders keep verified boundaries', async ({
  page,
}) => {
  await page.goto('/experience')
  for (const heading of [
    'Research experience',
    'Graduate education',
    'Undergraduate education',
    'Skills',
    'Internship',
    'Leadership',
    'Achievements',
  ]) {
    await expect(
      page.getByRole('heading', { name: heading, exact: true }),
    ).toBeVisible()
  }
  await expect(
    page.getByRole('heading', { name: 'Tennessee Technological University' }),
  ).toBeVisible()
  await expect(
    page.getByText('Military Institute of Science and Technology'),
  ).toBeVisible()
  await page.goto('/contact')
  await expect(page.getByText('Contact details unavailable')).toBeVisible()
  await expect(
    page.getByText('Institutional email', { exact: true }),
  ).toBeVisible()
  await expect(
    page.getByText('GitHub · LinkedIn · Google Scholar'),
  ).toBeVisible()
  await expect(page.locator('a[href^="mailto:"], a[href^="tel:"]')).toHaveCount(
    0,
  )
  await expect(page.locator('form')).toHaveCount(0)
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
})

test('public images resolve and navigation and theme remain available', async ({
  page,
}) => {
  for (const route of ['/', '/projects', '/projects/redap']) {
    await page.goto(route)
    const paths = await page
      .locator('img')
      .evaluateAll((images) =>
        images.map((image) => image.getAttribute('src')).filter(Boolean),
      )
    for (const path of new Set(paths)) {
      const response = await page.request.get(path!)
      expect(response.ok(), path!).toBe(true)
      expect(response.headers()['content-type'], path!).toContain('image/')
    }
  }
  await page.getByRole('button', { name: 'Switch to dark theme' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  const mobileMenu = page.getByRole('button', { name: 'Open menu' })
  if (await mobileMenu.isVisible()) {
    await mobileMenu.click()
    await page
      .getByRole('navigation', { name: 'Mobile navigation' })
      .getByRole('link', { name: 'CV / Resume' })
      .click()
  } else {
    await page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'CV / Resume' })
      .click()
  }
  await expect(page).toHaveURL('/cv')
})
