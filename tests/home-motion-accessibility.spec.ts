import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const textSelectors = [
  '.hero-eyebrow',
  '.hero h1',
  '.hero-statement',
  '.hero-summary',
  '.hero-buttons .button-primary',
  '.hero-buttons .button-secondary',
  '.hero-buttons .cv-link',
  '.hero-affiliation strong',
  '.profile-note strong',
  '.profile-note p',
]

for (const theme of ['light', 'dark'] as const) {
  for (const reducedMotion of [false, true]) {
    test(`hero text remains opaque during ${theme} entrance with reduced motion ${reducedMotion}`, async ({
      page,
    }) => {
      await page.emulateMedia({
        reducedMotion: reducedMotion ? 'reduce' : 'no-preference',
      })
      await page.addInitScript((initialTheme) => {
        localStorage.setItem('portfolio-theme', initialTheme)
      }, theme)
      await page.goto('/', { waitUntil: 'domcontentloaded' })
      await page.locator('.hero-copy').waitFor({ state: 'attached' })
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme)

      // Sample from the first rendered frame through the longest entrance.
      // Axe runs concurrently so it also inspects a moving, not just settled, page.
      const frames = page.evaluate(async (selectors) => {
        const nodes = selectors.map((selector) => {
          const node = document.querySelector<HTMLElement>(selector)
          if (!node) throw new Error(`Missing hero text: ${selector}`)
          return node
        })
        const minOpacity = Object.fromEntries(selectors.map((s) => [s, 1]))
        const colors = Object.fromEntries(
          selectors.map((s) => [s, new Set<string>()]),
        )
        const backgrounds = Object.fromEntries(
          selectors.map((s) => [s, new Set<string>()]),
        )
        const pageBackgrounds = new Set<string>()
        const opacityKeyframes = nodes.flatMap((node) => {
          const ancestors: HTMLElement[] = []
          for (let current: HTMLElement | null = node; current;) {
            ancestors.push(current)
            current = current.parentElement
          }
          return ancestors.flatMap((ancestor) =>
            ancestor.getAnimations().flatMap((animation) => {
              const effect = animation.effect
              return effect instanceof KeyframeEffect &&
                effect.getKeyframes().some((frame) => 'opacity' in frame)
                ? [ancestor.className || ancestor.tagName]
                : []
            }),
          )
        })
        const started = performance.now()
        let sampleCount = 0
        do {
          sampleCount += 1
          pageBackgrounds.add(
            getComputedStyle(document.documentElement).backgroundColor,
          )
          for (const [index, node] of nodes.entries()) {
            const selector = selectors[index]
            const style = getComputedStyle(node)
            colors[selector].add(style.color)
            backgrounds[selector].add(style.backgroundColor)
            for (let current: HTMLElement | null = node; current;) {
              minOpacity[selector] = Math.min(
                minOpacity[selector],
                Number(getComputedStyle(current).opacity),
              )
              current = current.parentElement
            }
          }
          await new Promise<void>((resolve) =>
            requestAnimationFrame(() => resolve()),
          )
        } while (performance.now() - started < 1100)
        return {
          sampleCount,
          minOpacity,
          colors: Object.fromEntries(selectors.map((s) => [s, [...colors[s]]])),
          backgrounds: Object.fromEntries(
            selectors.map((s) => [s, [...backgrounds[s]]]),
          ),
          pageBackgrounds: [...pageBackgrounds],
          opacityKeyframes,
        }
      }, textSelectors)
      const movingScan = await new AxeBuilder({ page }).analyze()
      const observed = await frames
      expect(observed.sampleCount).toBeGreaterThan(1)
      expect(observed.opacityKeyframes).toEqual([])
      expect(Object.values(observed.minOpacity)).toEqual(
        textSelectors.map(() => 1),
      )
      for (const selector of textSelectors) {
        expect(observed.colors[selector], selector).toHaveLength(1)
        expect(observed.backgrounds[selector], selector).toHaveLength(1)
      }
      expect(observed.pageBackgrounds).toHaveLength(1)
      expect(movingScan.violations).toEqual([])
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
    })
  }
}
