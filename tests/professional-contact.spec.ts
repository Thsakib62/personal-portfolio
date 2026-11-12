import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const profileLinks = [
  ['LinkedIn', 'https://www.linkedin.com/in/tahmid-hasan-sakib/'],
  ['GitHub', 'https://github.com/Thsakib62'],
  ['Google Scholar', 'https://scholar.google.com/citations?user=fS4QJCgAAAAJ'],
  ['ORCID', 'https://orcid.org/0009-0000-0797-6813'],
  ['Kaggle', 'https://www.kaggle.com/tahmidhasansakib'],
] as const

test('contact page uses approved links and stays accessible in both themes', async ({
  page,
}, testInfo) => {
  await page.goto('/contact')
  const email = page.locator('main a[href="mailto:tsakib42@tntech.edu"]')
  await expect(email).toBeVisible()
  await expect(email).toHaveText(/tsakib42@tntech.edu/)

  for (const [label, url] of profileLinks) {
    const link = page
      .locator('main')
      .getByRole('link', { name: new RegExp(`^${label}.*opens in a new tab`) })
    await expect(link).toHaveAttribute('href', url)
    await expect(link).toHaveAttribute('target', '_blank')
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    await expect(link).toBeVisible()
  }
  await expect(page.locator('main a[href^="mailto:"]')).toHaveCount(1)
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0)
  await expect(page.locator('form, a[download], a[href$=".pdf"]')).toHaveCount(
    0,
  )
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  await page.screenshot({
    path: `test-results/contact-${testInfo.project.name}-light.png`,
    fullPage: true,
  })

  await email.focus()
  await expect(email).toBeFocused()
  expect(
    await email.evaluate((element) => getComputedStyle(element).outlineStyle),
  ).not.toBe('none')
  await page.getByRole('button', { name: 'Switch to dark theme' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  await page.screenshot({
    path: `test-results/contact-${testInfo.project.name}-dark.png`,
    fullPage: true,
  })
})

test('homepage and shared navigation lead to professional contact', async ({
  page,
}) => {
  await page.goto('/')
  await expect(
    page.getByRole('img', {
      name: 'Professional portrait of Tahmid Hasan Sakib.',
    }),
  ).toBeVisible()
  await expect(
    page
      .locator('.hero-buttons')
      .getByRole('link', { name: 'Explore research' }),
  ).toHaveAttribute('href', '/research')
  await expect(
    page.locator('.hero-buttons').getByRole('link', { name: 'CV / Resume' }),
  ).toHaveAttribute('href', '/cv')
  await page
    .locator('.hero-buttons')
    .getByRole('link', { name: 'Get in touch' })
    .click()
  await expect(page).toHaveURL('/contact')

  const footer = page.locator('footer')
  await expect(
    footer.getByRole('link', { name: 'tsakib42@tntech.edu' }),
  ).toHaveAttribute('href', 'mailto:tsakib42@tntech.edu')
  for (const [label, url] of profileLinks.slice(0, 3)) {
    await expect(
      footer.getByRole('link', { name: `${label} (opens in a new tab)` }),
    ).toHaveAttribute('href', url)
  }
  const mobileMenu = page.getByRole('button', { name: 'Open menu' })
  if (await mobileMenu.isVisible()) {
    await mobileMenu.click()
    await expect(
      page
        .getByRole('navigation', { name: 'Mobile navigation' })
        .getByRole('link', { name: 'Contact' }),
    ).toBeVisible()
  } else {
    await expect(
      page
        .getByRole('navigation', { name: 'Main navigation' })
        .getByRole('link', { name: 'Contact' }),
    ).toBeVisible()
  }
  await page.goto('/cv')
  await expect(page.locator('.document-card')).toHaveCount(6)
  await expect(page.getByText('In preparation')).toHaveCount(0)
  await expect(page.locator('.document-card a[download]')).toHaveCount(6)
})
