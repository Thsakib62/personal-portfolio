import { expect, test } from '@playwright/test'
import { requirePreviewTarget } from '../preview-tests/target'

test('live preview target requires explicit configuration', () => {
  expect(() => requirePreviewTarget(undefined, undefined)).toThrow(
    'Preview configuration required',
  )
  expect(() => requirePreviewTarget('', 'project')).toThrow()
})

test('live preview target accepts only the intended Pages preview host', () => {
  expect(
    requirePreviewTarget('https://branch.project.pages.dev/', 'project'),
  ).toBe('https://branch.project.pages.dev')
  for (const url of [
    'http://branch.project.pages.dev',
    'http://localhost:4173',
    'https://project.pages.dev',
    'https://branch.other.pages.dev',
    'https://branch.project.pages.dev.evil.test',
    'https://branch.project.pages.dev:8443',
    'https://branch.project.pages.dev/research',
    'https://branch.project.pages.dev?mode=test',
  ]) {
    expect(() => requirePreviewTarget(url, 'project'), url).toThrow()
  }
})
