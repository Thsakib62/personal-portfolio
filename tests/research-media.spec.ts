import { readdirSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const approvedAssets = [
  'pulse-methodology.png',
  'pulse-qcar2-route-setup.png',
  'qcar1-baseline-stopping-distribution.png',
  'qcar1-system-architecture.png',
  'qcar1-three-stop-route.jpg',
  'redap-qcar2-setup.png',
]

test('only approved research media is in the public asset directory', () => {
  expect(readdirSync('public/research').sort()).toEqual(approvedAssets)
})

test('approved figures have correct pages, captions, alt text, and intact paths', async ({
  page,
}, testInfo) => {
  const projects = [
    {
      path: '/projects/physical-attacks',
      figures: [
        ['qcar1-system-architecture.png', 'Diagram showing QCar1 camera'],
        ['qcar1-three-stop-route.jpg', 'Schematic showing a vehicle'],
        [
          'qcar1-baseline-stopping-distribution.png',
          'Box plots of final stopping distances',
        ],
      ],
      caption: '30 clean QCar1 runs',
    },
    {
      path: '/projects/pulse',
      figures: [
        ['pulse-methodology.png', 'PULSE architecture showing'],
        ['pulse-qcar2-route-setup.png', 'QCar2 route schematic showing'],
      ],
      caption:
        'The documented live physical QCar2 configuration used the range model.',
    },
    {
      path: '/projects/redap',
      figures: [['redap-qcar2-setup.png', 'Annotated overhead photograph']],
      caption: 'used for REDAP image capture',
    },
  ] as const

  for (const project of projects) {
    await page.goto(project.path)
    const figures = page.locator('.research-figure')
    await expect(figures).toHaveCount(project.figures.length)
    await expect(page.locator('.case-content')).toContainText(project.caption)
    for (const [filename, altPrefix] of project.figures) {
      const image = figures.locator(`img[src="/research/${filename}"]`)
      await expect(image).toHaveCount(1)
      await expect(image).toHaveAttribute('alt', new RegExp(`^${altPrefix}`))
      await image.scrollIntoViewIfNeeded()
      await expect
        .poll(() =>
          image.evaluate((node: HTMLImageElement) => node.naturalWidth),
        )
        .toBeGreaterThan(0)
      const geometry = await image.evaluate((node: HTMLImageElement) => {
        const box = node.getBoundingClientRect()
        return {
          ratio: box.width / box.height,
          naturalRatio: node.naturalWidth / node.naturalHeight,
          right: box.right,
        }
      })
      expect(Math.abs(geometry.ratio - geometry.naturalRatio)).toBeLessThan(
        0.01,
      )
      expect(geometry.right).toBeLessThanOrEqual(page.viewportSize()!.width + 1)
    }
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
    await page.screenshot({
      path: `test-results/${project.path.split('/').at(-1)}-media-${testInfo.project.name}.png`,
      fullPage: true,
    })
  }

  for (const path of [
    '/projects/ros-security',
    '/projects/qcar',
    '/projects/qcar2',
    '/projects/lapse',
  ]) {
    await page.goto(path)
    await expect(page.locator('.research-figure')).toHaveCount(0)
  }
})

test('full-size viewer zooms, pans, closes on Escape, and restores focus', async ({
  page,
}, testInfo) => {
  await page.goto('/projects/pulse')
  const trigger = page.getByRole('button', {
    name: 'View full figure: Monitoring architecture',
  })
  await trigger.click()
  const viewer = page.getByRole('dialog', { name: 'Monitoring architecture' })
  await expect(viewer).toBeVisible()
  await expect(
    viewer.getByRole('img', { name: /^PULSE architecture showing/ }),
  ).toBeVisible()
  await expect(
    viewer.getByRole('button', { name: 'Close full-size figure' }),
  ).toBeFocused()
  await viewer.getByRole('button', { name: 'Zoom in' }).click()
  await expect(viewer.getByText('150%')).toBeVisible()
  const stage = viewer.locator('.research-viewer-stage')
  await stage.focus()
  await page.keyboard.press('ArrowRight')
  await expect
    .poll(() => stage.evaluate((node) => node.scrollLeft))
    .toBeGreaterThan(0)
  await page.screenshot({
    path: `test-results/pulse-viewer-${testInfo.project.name}.png`,
  })
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  await page.keyboard.press('Escape')
  await expect(viewer).not.toBeVisible()
  await expect(trigger).toBeFocused()
  await trigger.click()
  await viewer.getByRole('button', { name: 'Close full-size figure' }).click()
  await expect(viewer).not.toBeVisible()
  await expect(trigger).toBeFocused()
})

test('REDAP featured card contains its complete approved setup image', async ({
  page,
}, testInfo) => {
  await page.goto('/')
  const image = page.locator(
    '.project-card:has(a[href="/projects/redap"]) .project-visual-image img',
  )
  await expect(image).toHaveAttribute('src', '/research/redap-qcar2-setup.png')
  await image.scrollIntoViewIfNeeded()
  await expect
    .poll(() => image.evaluate((node: HTMLImageElement) => node.naturalWidth))
    .toBeGreaterThan(0)
  await expect(image).toHaveCSS('object-fit', 'contain')
  await image.screenshot({
    path: `test-results/redap-card-${testInfo.project.name}.png`,
  })
})
