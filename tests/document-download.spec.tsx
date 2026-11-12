import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { renderToStaticMarkup } from 'react-dom/server'
import { DocumentCard } from '../src/components/DocumentCard'
import { cvDocumentCategories } from '../src/data/portfolio'
import { publicPdfPath, type CvDocument } from '../src/data/models'

const approvedDocuments = [
  {
    title: 'Academic Curriculum Vitae',
    filename: 'Tahmid_Hasan_Sakib_Academic_CV.pdf',
    label: 'Download academic curriculum vitae PDF',
    sha256: '28E01298BD964FD9F68A6121891DA5710F5AB194BB47B9F3935638CF140AA7FD',
  },
  {
    title: 'General Engineering Resume',
    filename: 'Tahmid_Hasan_Sakib_General_Engineering_Resume.pdf',
    label: 'Download general engineering resume PDF',
    sha256: '45430E0E0B600DD027F1D09254941975A3F6EEF17E8536D2CBEA1FBAB3F1BDFC',
  },
  {
    title: 'Embedded Systems / Robotics Resume',
    filename: 'Tahmid_Hasan_Sakib_Embedded_Robotics_Resume.pdf',
    label: 'Download embedded systems and robotics resume PDF',
    sha256: '7A442726646DB94CCF0C55AA269E9F1A2E3724BE5959AFCEE3E81F182332E878',
  },
  {
    title: 'AI / Machine Learning / Computer Vision Resume',
    filename: 'Tahmid_Hasan_Sakib_AI_ML_Computer_Vision_Resume.pdf',
    label: 'Download AI, machine learning, and computer vision resume PDF',
    sha256: '14D431F6238E7ACD0AE7170DFA2D3226DE1E10A3E9E4C36FB35642699EAEF78C',
  },
  {
    title: 'Hardware / Electrical Engineering Resume',
    filename: 'Tahmid_Hasan_Sakib_Hardware_Electrical_Resume.pdf',
    label: 'Download hardware and electrical engineering resume PDF',
    sha256: 'CDC5B459495DFD25557C9E8D7E15A1F2CE76D4FBAE115CD52399F2BCD606F6F1',
  },
  {
    title: 'Research / Simulation Resume',
    filename: 'Tahmid_Hasan_Sakib_Research_Simulation_Resume.pdf',
    label: 'Download research and simulation resume PDF',
    sha256: '70E54FC65A07A13B4A8108A0A8F1D48BEBB0FD44AF7C4D8415E28FE68667F20B',
  },
] as const

const sha256 = (bytes: Buffer) =>
  createHash('sha256').update(bytes).digest('hex').toUpperCase()

test('only the six owner-approved PDFs are available and accessible', async ({
  page,
}, testInfo) => {
  await page.goto('/cv')
  const cards = page.locator('.document-card')
  await expect(cards).toHaveCount(6)
  expect(cvDocumentCategories.map(({ title }) => title)).toEqual(
    approvedDocuments.map(({ title }) => title),
  )
  expect(cvDocumentCategories.map(({ state }) => state)).toEqual(
    approvedDocuments.map(() => 'available'),
  )
  await expect(cards.getByText('In preparation')).toHaveCount(0)
  await expect(cards.locator('a[download]')).toHaveCount(6)
  const builtFiles = readdirSync('dist', { recursive: true }).map((file) =>
    String(file).replaceAll('\\', '/'),
  )
  expect(builtFiles.filter((file) => /\.pdf$/i.test(file)).sort()).toEqual(
    approvedDocuments.map(({ filename }) => `documents/${filename}`).sort(),
  )
  expect(
    builtFiles.filter((file) =>
      /\.docx$|(?:^|\/)(?:09_PUBLIC_DOCUMENT_RELEASE_MANIFEST|06_PUBLIC_DOCUMENT_RELEASE_CHECKLIST)\.md$/i.test(
        file,
      ),
    ),
  ).toEqual([])

  for (const [index, document] of approvedDocuments.entries()) {
    const card = cards.nth(index)
    await expect(
      card.getByRole('heading', { name: document.title }),
    ).toBeVisible()
    const link = card.getByRole('link', { name: document.label })
    const path = `/documents/${document.filename}`
    await expect(link).toHaveAttribute('href', path)
    await expect(link).toHaveAttribute('download', '')
    const response = await page.request.get(path)
    expect(response.ok(), path).toBe(true)
    expect(response.headers()['content-type'], path).toContain(
      'application/pdf',
    )
    const bytes = await response.body()
    expect(bytes.subarray(0, 5).toString()).toBe('%PDF-')
    expect(sha256(bytes), path).toBe(document.sha256)
    expect(sha256(readFileSync(`dist/documents/${document.filename}`))).toBe(
      document.sha256,
    )
    const downloadPromise = page.waitForEvent('download')
    if (index === 0) {
      await link.focus()
      await expect(link).toBeFocused()
      await page.keyboard.press('Enter')
    } else {
      await link.click()
    }
    const download = await downloadPromise
    expect(download.suggestedFilename()).toBe(document.filename)
    expect(sha256(readFileSync((await download.path())!))).toBe(document.sha256)
  }

  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
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
