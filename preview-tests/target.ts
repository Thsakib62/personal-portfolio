/** Require a deliberate Cloudflare Pages branch/deployment preview target. */
export function requirePreviewTarget(
  baseUrl: string | undefined,
  expectedProject: string | undefined,
): string {
  if (!baseUrl || !expectedProject) {
    throw new Error(
      'Preview configuration required: set PREVIEW_BASE_URL and PREVIEW_PROJECT. No localhost or production fallback is allowed.',
    )
  }
  let url: URL
  try {
    url = new URL(baseUrl)
  } catch {
    throw new Error('PREVIEW_BASE_URL must be an absolute HTTPS URL.')
  }
  const labels = url.hostname.split('.')
  const validLabel = (label: string) =>
    /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(label)
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.port ||
    url.pathname !== '/' ||
    url.search ||
    url.hash ||
    labels.length !== 4 ||
    labels[2] !== 'pages' ||
    labels[3] !== 'dev' ||
    !validLabel(labels[0]) ||
    !validLabel(labels[1]) ||
    !validLabel(expectedProject) ||
    labels[1] !== expectedProject
  ) {
    throw new Error(
      'PREVIEW_BASE_URL must be https://<preview-alias>.<PREVIEW_PROJECT>.pages.dev with no path, query, fragment, port, or credentials. Production and unrelated hosts are rejected.',
    )
  }
  return url.origin
}
