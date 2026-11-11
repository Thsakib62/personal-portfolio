export type ProjectCategory = 'Graduate research' | 'Undergraduate project'

declare const publicPdfPathBrand: unique symbol
export type PublicPdfPath = `/${string}.pdf` & {
  readonly [publicPdfPathBrand]: true
}

// Call only after a PDF has been approved and placed in the public site.
export function publicPdfPath(path: `/${string}.pdf`): PublicPdfPath {
  if (!/^\/(?:[A-Za-z0-9_-]+\/)*[A-Za-z0-9_-]+\.pdf$/.test(path)) {
    throw new Error('A document download needs a same-origin PDF path')
  }
  return path as PublicPdfPath
}

export type CvDocument =
  | {
      state: 'preparation'
      title: string
      description: string
      statusLabel: 'In preparation'
      pdfUrl?: never
      downloadLabel?: never
    }
  | {
      state: 'available'
      title: string
      description: string
      pdfUrl: PublicPdfPath
      downloadLabel: string
      format: 'PDF'
      statusLabel?: never
    }

export interface EvidenceMetric {
  value: string
  label: string
  context: string
}

export interface CaseStudy {
  problem: string
  contributions: string[]
  architecture: string[]
  methodology: string[]
  metrics?: EvidenceMetric[]
  results: string[]
  limitations: string[]
}

export interface ResearchFigureData {
  section: 'architecture' | 'evaluation' | 'findings'
  heading: string
  src: string
  alt: string
  caption: string
  note?: string
}

export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  category: ProjectCategory
  focus:
    | 'Perception security'
    | 'Systems security'
    | 'Platforms & evaluation'
    | 'Earlier work'
  featured?: boolean
  visual?: 'restoration' | 'monitoring' | 'vehicle'
  cardImage?: string
  figures?: ResearchFigureData[]
  problem?: string
  contributions?: string[]
  approach?: string
  architecture?: string
  implementation?: string
  evaluation?: string
  findings?: string
  resources?: string
  publicationIds?: string[]
  media?: { type: 'image' | 'video'; label: string }[]
  caseStudy?: CaseStudy
}

export type PublicationCategory =
  | 'Published peer-reviewed work'
  | 'Manuscripts / submissions'
  | 'Work in progress'
  | 'Status pending verification'

export interface Publication {
  id: string
  title: string
  year?: number
  category: PublicationCategory
  status: string
  authors?: string
  venue?: string
  venueContext?: string
  doi?: string
  url?: string
  bibtex?: string
  note?: string
}
