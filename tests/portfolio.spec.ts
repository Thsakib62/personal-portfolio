import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('homepage, theme persistence, responsive navigation and project deep link', async ({
  page,
}, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Tahmid Hasan Sakib.',
  )
  await expect(
    page.getByRole('link', { name: 'Explore research' }),
  ).toBeVisible()
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true)
  await expect(page.locator('.project-card')).toHaveCount(3)
  await expect(page.locator('.publication-entry')).toHaveCount(2)
  await page.getByRole('button', { name: 'Switch to dark theme' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(
    page.getByRole('button', { name: 'Switch to light theme' }),
  ).toBeVisible()
  await expect(page.locator('.hero-profile')).toHaveCSS('opacity', '1')
  await expect(page.locator('.hero-copy')).toHaveCSS('opacity', '1')
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  await page.screenshot({
    path: `test-results/home-${testInfo.project.name}-dark.png`,
    fullPage: true,
  })
  await page.getByRole('button', { name: 'Switch to light theme' }).click()
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Open menu' }).click()
    await expect(
      page.getByRole('navigation', { name: 'Mobile navigation' }),
    ).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused()
    await page.getByRole('button', { name: 'Open menu' }).click()
    await page
      .getByRole('navigation', { name: 'Mobile navigation' })
      .getByRole('link', { name: 'Research', exact: true })
      .click()
    await expect(
      page.getByRole('button', { name: 'Open menu' }),
    ).toHaveAttribute('aria-expanded', 'false')
    await expect(page).toHaveURL('/research')
    await page.goto('/')
  }
  await expect(page.locator('.hero-profile')).toHaveCSS('opacity', '1')
  await expect(page.locator('.hero-copy')).toHaveCSS('opacity', '1')
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  await page.screenshot({
    path: `test-results/home-${testInfo.project.name}-light.png`,
    fullPage: true,
  })
  await page.getByRole('link', { name: 'REDAP', exact: true }).click()
  await expect(page).toHaveURL('/projects/redap')
  await expect(
    page.getByRole('heading', { name: 'Research problem' }),
  ).toBeVisible()
  expect(errors).toEqual([])
})

test('all routes load directly without horizontal overflow or inaccessible content', async ({
  page,
}) => {
  for (const [route, title] of [
    ['/research', 'Building trust into autonomy.'],
    ['/projects', 'Ideas, made tangible.'],
    ['/projects/redap', 'REDAP'],
    ['/experience', 'A foundation for what’s next.'],
    ['/cv', 'The fuller picture.'],
    ['/contact', 'A conversation can start something.'],
    ['/unknown', 'A path yet to be explored.'],
  ]) {
    await page.goto(route)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title)
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true)
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
    await page.getByRole('button', { name: 'Switch to dark theme' }).click()
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
    await page.getByRole('button', { name: 'Switch to light theme' }).click()
  }
  await page.goto('/cv')
  await expect(page.getByText('Not available online')).toHaveCount(2)
  await expect(page.locator('a[download]')).toHaveCount(0)
  await page.goto('/contact')
  await expect(page.getByText('Contact details unavailable')).toBeVisible()
  await expect(page.locator('form')).toHaveCount(0)
})

test('research search, status filters and citations use supported records', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/research')
  await expect(page.locator('.publication-entry')).toHaveCount(5)
  await expect(
    page.getByRole('heading', { name: 'Work in progress' }),
  ).toBeVisible()
  await page
    .getByRole('searchbox', { name: 'Search publications' })
    .fill('Naturalistic')
  await expect(page.locator('.publication-entry')).toHaveCount(1)
  await expect(
    page.getByText(
      'Physical Evaluation of Naturalistic Adversarial Patches for Camera-Based Traffic-Sign Detection',
    ),
  ).toBeVisible()
  await page.getByRole('searchbox', { name: 'Search publications' }).fill('')
  await page.getByLabel('Category').selectOption('Manuscripts / submissions')
  await expect(page.locator('.publication-entry')).toHaveCount(1)
  await expect(page.getByRole('button', { name: 'Copy BibTeX' })).toHaveCount(0)
  await page.getByLabel('Category').selectOption('Published peer-reviewed work')
  await expect(page.locator('.publication-entry')).toHaveCount(3)
  await page.getByLabel('Year').selectOption('2021')
  await expect(page.locator('.publication-entry')).toHaveCount(1)
  await expect(page.getByRole('button', { name: 'Copy BibTeX' })).toHaveCount(1)
  await page.getByRole('button', { name: 'Copy BibTeX' }).click()
  await expect(page.getByRole('status', { name: '' }).last()).toContainText(
    'BibTeX copied',
  )
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    '10.1109/ACMI53878.2021.9528252',
  )
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
})

test('project filters and case-study navigation stay accessible', async ({
  page,
}) => {
  await page.goto('/projects')
  await page.getByRole('button', { name: 'Systems security' }).click()
  await expect(page.getByText('Showing 1 graduate project')).toBeVisible()
  await page
    .getByRole('link', { name: 'ROS 2 / SROS2 supply-chain security' })
    .click()
  await expect(page).toHaveURL('/projects/ros-security')
  await expect(
    page.getByRole('navigation', { name: 'Case study sections' }),
  ).toBeVisible()
  await page.getByRole('link', { name: 'Experimental evaluation' }).click()
  await expect(page.locator('#evaluation')).toBeInViewport()
  await page
    .getByRole('link', {
      name: /Supply Chain Exploitation of Secure ROS 2 Systems/,
    })
    .click()
  await expect(page).toHaveURL('/research#milcom-2025')
  await expect(page.locator('#milcom-2025')).toBeInViewport()
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
})

test('keyboard skip link and reduced motion work without persistent storage', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('Storage unavailable')
      },
    })
  })
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
  await page.getByRole('button', { name: 'Switch to dark theme' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('public pages keep publication status and omit editorial notes', async ({
  page,
}) => {
  for (const route of [
    '/',
    '/research',
    '/projects',
    '/projects/physical-attacks',
    '/projects/lapse',
    '/experience',
    '/cv',
    '/contact',
  ]) {
    await page.goto(route)
    await expect(page.locator('main')).not.toContainText(
      /provisional|per source resumes|variants differ|confirm official record|details remain to be checked|public quantitative claims await approval|the supplied brief/i,
    )
  }
  await page.goto('/research')
  await expect(page.locator('#access-manuscript')).toContainText(
    'Manuscript status unverified',
  )
  await expect(page.locator('#mecc-2025')).toContainText(
    'Conference preprint · proceedings status unverified',
  )
  await page.goto('/experience')
  for (const heading of [
    'Research experience',
    'Education',
    'Skills',
    'Internship',
    'Leadership',
    'Achievements',
  ]) {
    await expect(
      page.getByRole('heading', { name: heading, exact: true }),
    ).toBeVisible()
  }
})
