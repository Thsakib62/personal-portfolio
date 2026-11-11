import type { ReactNode } from 'react'
import { useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  Aperture,
  Activity,
  CircuitBoard,
  Image,
  ShieldCheck,
  ScanLine,
  Cpu,
  Copy,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project, Publication } from '../data/portfolio'

export function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>
}
export function SectionHeading({
  eyebrow,
  title,
  children,
  link,
}: {
  eyebrow: string
  title: string
  children?: ReactNode
  link?: { to: string; label: string }
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {children && <p className="section-intro">{children}</p>}
      </div>
      {link && (
        <Link className="text-link" to={link.to}>
          {link.label}
          <ArrowUpRight size={17} />
        </Link>
      )}
    </div>
  )
}
export function ProjectCard({
  project,
  compact = false,
}: {
  project: Project
  compact?: boolean
}) {
  const Icon =
    project.visual === 'restoration'
      ? Aperture
      : project.visual === 'monitoring'
        ? Activity
        : CircuitBoard
  return (
    <article className={`project-card ${compact ? 'compact' : ''}`}>
      {!compact && project.cardImage && (
        <div className="project-visual project-visual-image">
          <img src={project.cardImage} alt="" loading="lazy" decoding="async" />
        </div>
      )}
      {!compact && !project.cardImage && (
        <div
          className={`project-visual ${project.visual ?? 'vehicle'}`}
          role="img"
          aria-label={`${project.title}: research image placeholder`}
        >
          <span className="visual-corner">
            RESEARCH / {project.id.toUpperCase()}
          </span>
          <Icon className="visual-icon" strokeWidth={0.8} aria-hidden="true" />
          <span className="asset-label">
            <Image size={12} /> Research image placeholder
          </span>
        </div>
      )}
      <div className="project-body">
        <p className="card-kicker">{project.category}</p>
        <h3>
          <Link to={`/projects/${project.id}`}>
            {project.title}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="muted project-description">{project.description}</p>
        <div className="tags">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </article>
  )
}
export function PublicationEntry({
  publication,
}: {
  publication: Publication
}) {
  const [copyStatus, setCopyStatus] = useState('')
  const canCite =
    publication.category === 'Published peer-reviewed work' &&
    publication.authors &&
    publication.venue &&
    publication.year &&
    publication.doi
  const copyBibtex = async () => {
    if (!canCite) return
    const citation = `@inproceedings{${publication.id.replace(/-/g, '')},\n  author = {${publication.authors!.split(', ').join(' and ')}},\n  title = {${publication.title}},\n  booktitle = {${publication.venue}},\n  year = {${publication.year}},\n  doi = {${publication.doi}}\n}`
    try {
      await navigator.clipboard.writeText(citation)
      setCopyStatus('BibTeX copied')
    } catch {
      setCopyStatus('Copy unavailable in this browser')
    }
  }
  return (
    <article className="publication-entry" id={publication.id}>
      <span className="publication-year">{publication.year ?? '—'}</span>
      <div>
        <p className="card-kicker">
          {publication.venue ??
            publication.venueContext ??
            publication.category}
        </p>
        <h3>{publication.title}</h3>
        {publication.authors && <p className="muted">{publication.authors}</p>}
        <p className="muted">{publication.status}</p>
        {publication.note && <p className="muted small">{publication.note}</p>}
        {publication.url && (
          <a
            className="text-link"
            href={publication.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Official DOI <ArrowUpRight size={15} />
          </a>
        )}
        {canCite && (
          <button className="cite-button" type="button" onClick={copyBibtex}>
            <Copy size={14} />
            Copy BibTeX
          </button>
        )}
        <span className="sr-only" role="status">
          {copyStatus}
        </span>
      </div>
      <span className="draft-label">{publication.category}</span>
    </article>
  )
}
export function InterestIcon({ name }: { name: 'shield' | 'scan' | 'cpu' }) {
  const Icon = { shield: ShieldCheck, scan: ScanLine, cpu: Cpu }[name]
  return <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
}
export function ContactCTA() {
  return (
    <section className="contact-cta container">
      <div>
        <p className="eyebrow">Ideas become better together</p>
        <h2>Let’s build what’s next.</h2>
        <p>
          Research collaborations. Engineering opportunities. Meaningful
          conversations.
        </p>
      </div>
      <Link to="/contact" className="button button-light">
        Get in touch
        <ArrowUpRight size={18} />
      </Link>
    </section>
  )
}
export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: ReactNode
}) {
  return (
    <header className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{children}</p>
    </header>
  )
}
export function ComingSoon({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="notice">
      <ArrowDown size={20} aria-hidden="true" />
      <div>
        <h2>{title}</h2>
        <p>{children}</p>
      </div>
    </div>
  )
}
