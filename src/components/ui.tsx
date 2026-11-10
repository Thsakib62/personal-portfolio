import type { ReactNode } from 'react'
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
    <article
      className={`project-card ${compact ? 'compact' : ''}`}
      id={project.id}
    >
      {!compact && (
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
          <Link to={`/projects#${project.id}`}>
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
  return (
    <article className="publication-entry">
      <span className="publication-year">{publication.year}</span>
      <div>
        <p className="card-kicker">
          {publication.venueContext} · Verification pending
        </p>
        <h3>Publication details to be confirmed</h3>
        <p className="muted">
          {publication.verification}. Title, authors, and citation will be added
          after verification.
        </p>
      </div>
      <span className="draft-label">Draft entry</span>
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
