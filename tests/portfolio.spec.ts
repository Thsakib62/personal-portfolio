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
  await expect(page).toHaveURL('/projects#redap')
  await expect(page.locator('#redap')).toBeInViewport()
  expect(errors).toEqual([])
})

test('all routes load directly without horizontal overflow or inaccessible content', async ({
  page,
}) => {
  for (const [route, title] of [
    ['/research', 'Building trust into autonomy.'],
    ['/projects', 'Ideas, made tangible.'],
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
  await expect(page.getByText('PDF asset pending')).toHaveCount(2)
  await expect(page.locator('a[download]')).toHaveCount(0)
  await page.goto('/contact')
  await expect(page.getByText('Email & profile links pending')).toBeVisible()
  await expect(page.locator('form')).toHaveCount(0)
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
