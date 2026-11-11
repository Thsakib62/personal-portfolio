import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('confirmed education, appointments, mentoring, and honors appear on Experience', async ({
  page,
}, testInfo) => {
  await page.goto('/experience')
  await expect(page.getByText('May 2024 – Present')).toBeVisible()
  await expect(
    page.getByText('Master of Science in Electrical and Computer Engineering'),
  ).toBeVisible()
  await expect(page.getByText('Expected December 2026')).toBeVisible()
  await expect(page.getByText(/thesis successfully defended/)).toBeVisible()
  await expect(page.getByText(/degree conferral pending/)).toBeVisible()
  await expect(page.getByText(/GPA: 4.00\/4.00/)).toBeVisible()
  await expect(
    page.getByText('Bachelor of Science in Computer Science and Engineering'),
  ).toBeVisible()
  await expect(page.getByText('Graduated August 2021.')).toBeVisible()

  const internship = page.locator('.inner-section').filter({
    has: page.getByRole('heading', { name: 'Internship' }),
  })
  await expect(internship).toContainText('Hardware Engineer Intern')
  await expect(internship).toContainText('December 2019 — January 2020')
  await expect(internship).toContainText('Dhaka, Bangladesh')
  await expect(internship).toContainText(
    'MATLAB, LTspice, and Cisco Packet Tracer',
  )
  const mentoring = page.locator('.inner-section').filter({
    has: page.getByRole('heading', { name: 'Mentoring' }),
  })
  await expect(mentoring).toContainText('Summers 2025 and 2026')
  await expect(mentoring).toContainText('under faculty supervision')
  await expect(page.getByText('Treasurer')).toBeVisible()
  await expect(page.getByText('Leading Organizer')).toBeVisible()
  await expect(page.getByText('Co-founder')).toBeVisible()
  await expect(page.locator('.achievement-list li')).toHaveCount(3)
  await expect(page.locator('.achievement-list')).toContainText(
    'Third runner-up',
  )
  await expect(page.locator('.achievement-list')).toContainText(
    'HSC, Dhaka Board',
  )
  await expect(page.locator('.achievement-list')).toContainText(
    'SSC, Dhaka Board',
  )

  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  await page.screenshot({
    path: `test-results/experience-${testInfo.project.name}-light.png`,
    fullPage: true,
  })
  await page.getByRole('button', { name: 'Switch to dark theme' }).click()
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  await page.screenshot({
    path: `test-results/experience-${testInfo.project.name}-dark.png`,
    fullPage: true,
  })
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
})

test('research entries keep accepted, published, poster, review, and registration states distinct', async ({
  page,
}, testInfo) => {
  await page.goto('/research')
  await expect(page.locator('.publication-entry')).toHaveCount(7)
  const access = page.locator('#access-manuscript')
  await expect(access).toContainText('Accepted journal article')
  await expect(access).toContainText(
    'Accepted for publication in IEEE Access, 2026',
  )
  await expect(access).toContainText(
    'Tahmid Hasan Sakib, Abhijeet Solanki, Wesam Al Amiri, Syed Rafay Hasan, Syed Ali Asad Rizvi, Terry N. Guo',
  )
  await expect(access.locator('a, button')).toHaveCount(0)

  const mecc = page.locator('#mecc-2025')
  await expect(mecc).toContainText('Conference extended abstract / poster')
  await expect(mecc).toContainText('personally presented')
  await expect(mecc).toContainText('October 5–8, 2025')
  await expect(mecc).toContainText('10.5281/zenodo.17497276')
  await expect(
    mecc.getByRole('link', { name: 'Zenodo record' }),
  ).toHaveAttribute('href', 'https://zenodo.org/records/17497276')

  const pulse = page.locator('#pulse-manuscript')
  await expect(pulse).toContainText('Manuscript under review')
  await expect(pulse).toContainText(
    'Submitted and under review, IEEE VTC 2027-Spring',
  )
  const redap = page.locator('#redap-manuscript')
  await expect(redap).toContainText('Registered / in preparation')
  await expect(redap).toContainText(
    'CVPR 2027 registered; full submission pending',
  )
  await expect(redap).not.toContainText('under review')
  await expect(page.locator('a[href$=".pdf"], a[download]')).toHaveCount(0)
  for (const id of ['satc-2026', 'milcom-2025', 'acmi-2021']) {
    await expect(page.locator(`#${id}`)).toContainText(
      'Published conference papers',
    )
    await expect(page.locator(`#${id} .text-link`)).toHaveAttribute(
      'href',
      /https:\/\/doi.org\/10.1109\//,
    )
  }

  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  await page.screenshot({
    path: `test-results/research-${testInfo.project.name}-light.png`,
    fullPage: true,
  })
  await page.getByRole('button', { name: 'Switch to dark theme' }).click()
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  await page.screenshot({
    path: `test-results/research-${testInfo.project.name}-dark.png`,
    fullPage: true,
  })
})

test('independent IoT work and earlier project sources preserve deep links', async ({
  page,
}, testInfo) => {
  await page.goto('/projects')
  const earlier = page.locator('#undergraduate')
  await expect(
    earlier.getByRole('heading', { name: 'Independent & earlier projects' }),
  ).toBeVisible()
  await expect(earlier.locator('.project-card')).toHaveCount(6)
  const iotCard = earlier.locator('.project-card').filter({
    has: page.getByRole('link', {
      name: 'Network intrusion detection for IoT devices',
    }),
  })
  await expect(iotCard).toContainText('Independent project')
  await expect(iotCard).not.toContainText('Undergraduate project')
  await page.screenshot({
    path: `test-results/projects-${testInfo.project.name}-light.png`,
    fullPage: true,
  })
  await page.getByRole('button', { name: 'Switch to dark theme' }).click()
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  await page.screenshot({
    path: `test-results/projects-${testInfo.project.name}-dark.png`,
    fullPage: true,
  })

  await page.goto('/projects/iot')
  await expect(page.locator('.case-hero')).toContainText('Independent project')
  await expect(page.locator('#approach')).toContainText('CICIoT2023')
  await expect(page.locator('#resources a')).toHaveAttribute(
    'href',
    'https://github.com/Thsakib62/IoT-IDS-with-ML-and-DL',
  )
  await expect(page.locator('#resources a')).toHaveAttribute(
    'rel',
    'noopener noreferrer',
  )
  await page.goto('/projects/angthas')
  await expect(page.locator('#resources a')).toHaveCount(0)
  await page.goto('/projects/recommendation')
  await expect(page.locator('#resources a')).toHaveAttribute(
    'href',
    'https://www.kaggle.com/tahmidhasansakib/visual-product-recommendation-system-using-cnn',
  )
  await page.goto('/projects/metro')
  await expect(page.locator('#resources a')).toHaveAttribute(
    'href',
    'https://github.com/Thsakib62/MetroRail-Management-System',
  )
  await page.goto('/projects/tweet-classification')
  await expect(page.locator('#resources a')).toHaveAttribute(
    'href',
    'https://www.kaggle.com/tahmidhasansakib/suicidal-ideation-prediction-from-twitter',
  )
  await page.goto('/projects/ideation')
  await expect(page.locator('#resources a')).toHaveAttribute(
    'href',
    '/research#acmi-2021',
  )
  await page.goto('/projects/physical-attacks')
  await expect(page.locator('#resources')).toContainText('IEEE Access')
  await expect(page.locator('#resources a')).toHaveAttribute(
    'href',
    '/research#access-manuscript',
  )
  for (const route of [
    '/projects/iot',
    '/projects/recommendation',
    '/projects/metro',
    '/projects/tweet-classification',
  ]) {
    await page.goto(route)
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      route,
    ).toBe(true)
  }
})
