import { readdirSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { renderToStaticMarkup } from 'react-dom/server'
import { DocumentCard } from '../src/components/DocumentCard'
import { publicPdfPath, type CvDocument } from '../src/data/models'

test('all public document cards remain in preparation', async ({
  page,
}, testInfo) => {
  await page.goto('/cv')
  const cards = page.locator('.document-card')
  await expect(cards).toHaveCount(6)
  await expect(cards.getByText('In preparation')).toHaveCount(6)
  await expect(cards.locator('a, button, [tabindex]')).toHaveCount(0)
  await expect(page.locator('a[download], a[href$=".pdf"]')).toHaveCount(0)
  expect(
    readdirSync('dist', { recursive: true }).some((file) =>
      /\.pdf$/i.test(String(file)),
    ),
  ).toBe(false)
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  await page.screenshot({
    path: `test-results/cv-${testInfo.project.name}-light.png`,
    fullPage: true,
  })
  await page.getByRole('button', { name: 'Switch to dark theme' }).click()
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  await page.screenshot({
    path: `test-results/cv-${testInfo.project.name}-dark.png`,
    fullPage: true,
  })
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
  await page
    .getByRole('link', { name: 'Explore education & experience' })
    .click()
  await expect(page).toHaveURL('/experience')
})

test('an isolated available card renders a working accessible download', async ({
  page,
}) => {
  const fixture: CvDocument = {
    state: 'available',
    title: 'Approved test document',
    description: 'Fixture for document-card behavior.',
    pdfUrl: publicPdfPath('/test-fixtures/approved-cv.pdf'),
    downloadLabel: 'Download approved test document',
    format: 'PDF',
  }
  expect(() => publicPdfPath('//example.com/file.pdf')).toThrow()
  expect(() => publicPdfPath('/documents/../private.pdf')).toThrow()
  expect(() =>
    renderToStaticMarkup(
      <DocumentCard document={{ ...fixture, downloadLabel: '' }} />,
    ),
  ).toThrow('download label')

  await page.route('**/test-fixtures/approved-cv.pdf', (route) =>
    route.fulfill({
      contentType: 'application/pdf',
      body: '%PDF-1.4\n%%EOF\n',
    }),
  )
  await page.goto('/cv')
  const markup = renderToStaticMarkup(<DocumentCard document={fixture} />)
  await page.locator('main').evaluate((main, html) => {
    main.insertAdjacentHTML('beforeend', html)
  }, markup)
  const card = page.locator('.document-card').last()
  const link = card.getByRole('link', {
    name: 'Download approved test document PDF',
  })
  await expect(link).toHaveAttribute('href', '/test-fixtures/approved-cv.pdf')
  await expect(link).toHaveAttribute('download', '')
  const downloadPromise = page.waitForEvent('download')
  await link.click()
  expect((await downloadPromise).suggestedFilename()).toBe('approved-cv.pdf')
})
