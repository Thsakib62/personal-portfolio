export type ProjectCategory = 'Graduate research' | 'Undergraduate project'

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
