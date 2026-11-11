import { useState } from 'react'
import { ArrowLeft, ArrowRight, Image, Video } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import {
  publications,
  researchProjects,
  earlierProjects,
} from '../data/portfolio'
import type { EvidenceMetric, ResearchFigureData } from '../data/models'
import { PageIntro, ProjectCard, SectionHeading, Tag } from '../components/ui'
import { ResearchFigure } from '../components/ResearchFigure'

const allProjects = [...researchProjects, ...earlierProjects]
const filters = [
  'All graduate work',
  'Perception security',
  'Systems security',
  'Platforms & evaluation',
] as const

export function Projects() {
  const [filter, setFilter] =
    useState<(typeof filters)[number]>('All graduate work')
  const graduate = researchProjects.filter(
    (project) => filter === 'All graduate work' || project.focus === filter,
  )
  return (
    <div className="container page-content">
      <PageIntro eyebrow="Project index" title="Ideas, made tangible.">
        Research and engineering case studies, from physical adversarial
        perception to secure robotics and embedded validation.
      </PageIntro>
      <SectionHeading
        eyebrow="Primary focus"
        title="Graduate research & engineering"
      >
        Each effort has its own scope and testbed. Select a case study for the
        research question, approach, and available evidence.
      </SectionHeading>
      <div
        className="filter-chips"
        role="group"
        aria-label="Filter graduate projects"
      >
        {filters.map((item) => (
          <button
            className={filter === item ? 'active' : ''}
            type="button"
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="result-count" role="status">
        Showing {graduate.length} graduate{' '}
        {graduate.length === 1 ? 'project' : 'projects'}
      </p>
      <div className="project-grid two-columns">
        {graduate.map((project) => (
          <ProjectCard compact project={project} key={project.id} />
        ))}
      </div>
      <section className="inner-section" id="undergraduate">
        <SectionHeading
          eyebrow="Independent & earlier work"
          title="Independent & earlier projects"
        >
          Independent machine-learning work and undergraduate-era software,
          security, and computer-vision projects.
        </SectionHeading>
        <div className="project-grid two-columns">
          {earlierProjects.map((project) => (
            <ProjectCard compact project={project} key={project.id} />
          ))}
        </div>
      </section>
    </div>
  )
}

interface CaseSectionData {
  id: string
  title: string
  paragraphs?: string[]
  items?: string[]
  metrics?: EvidenceMetric[]
  figures?: ResearchFigureData[]
}

function DetailSection({
  id,
  title,
  paragraphs,
  items,
  metrics,
  figures,
}: CaseSectionData) {
  return (
    <section id={id} className="case-section">
      <h2>{title}</h2>
      {paragraphs?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {items && (
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {metrics && <EvidenceHighlights metrics={metrics} />}
      {figures?.map((figure) => (
        <ResearchFigure figure={figure} key={figure.src} />
      ))}
    </section>
  )
}

function EvidenceHighlights({ metrics }: { metrics: EvidenceMetric[] }) {
  return (
    <dl className="evidence-grid" aria-label="Selected research metrics">
      {metrics.map((metric) => (
        <div className="evidence-card" key={metric.label}>
          <dt>{metric.label}</dt>
          <dd>
            <strong>{metric.value}</strong>
            <span>{metric.context}</span>
          </dd>
        </div>
      ))}
    </dl>
  )
}

export function ProjectDetail() {
  const { id } = useParams()
  const project = allProjects.find((item) => item.id === id)
  if (!project)
    return (
      <div className="container page-content">
        <PageIntro
          eyebrow="Project not found"
          title="This case study isn’t here."
        >
          The project may have moved or its link may be incomplete.
        </PageIntro>
        <Link className="text-link" to="/projects">
          <ArrowLeft size={16} />
          Back to projects
        </Link>
      </div>
    )
  const index = allProjects.indexOf(project)
  const next = allProjects[index + 1]
  const study = project.caseStudy
  const hasFigures = Boolean(project.figures?.length)
  const sections: CaseSectionData[] = study
    ? [
        {
          id: 'problem',
          title: 'Research problem',
          paragraphs: [study.problem],
        },
        {
          id: 'contributions',
          title: 'Technical contribution',
          items: study.contributions,
        },
        {
          id: 'architecture',
          title: 'System architecture & implementation',
          paragraphs: study.architecture,
          figures: project.figures?.filter(
            (figure) => figure.section === 'architecture',
          ),
        },
        {
          id: 'evaluation',
          title: 'Experimental methodology',
          paragraphs: study.methodology,
          figures: project.figures?.filter(
            (figure) => figure.section === 'evaluation',
          ),
        },
        {
          id: 'findings',
          title: 'Selected evidence-backed results',
          paragraphs: study.results,
          metrics: study.metrics,
          figures: project.figures?.filter(
            (figure) => figure.section === 'findings',
          ),
        },
        {
          id: 'limitations',
          title: 'Limitations & scope',
          items: study.limitations,
        },
      ]
    : [
        {
          id: 'problem',
          title: 'Research problem',
          paragraphs: project.problem ? [project.problem] : undefined,
        },
        {
          id: 'contributions',
          title: 'Technical contribution',
          items: project.contributions,
        },
        {
          id: 'approach',
          title: 'Technical approach',
          paragraphs: project.approach ? [project.approach] : undefined,
        },
        {
          id: 'architecture',
          title: 'System architecture',
          paragraphs: project.architecture ? [project.architecture] : undefined,
        },
        {
          id: 'implementation',
          title: 'Implementation & technologies',
          paragraphs: project.implementation
            ? [project.implementation]
            : undefined,
        },
        {
          id: 'evaluation',
          title: 'Experimental evaluation',
          paragraphs: project.evaluation ? [project.evaluation] : undefined,
        },
        {
          id: 'findings',
          title: 'Results & findings',
          paragraphs: project.findings ? [project.findings] : undefined,
        },
      ]
  const available = sections.filter(
    (section) =>
      section.paragraphs?.length ||
      section.items?.length ||
      section.metrics?.length,
  )
  return (
    <div className="container page-content case-study">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/projects">
          <ArrowLeft size={15} />
          All projects
        </Link>
        <span>/</span>
        <span aria-current="page">{project.title}</span>
      </nav>
      <header className="case-hero">
        <p className="eyebrow">
          {project.category} / {project.focus}
        </p>
        <h1>{project.title}</h1>
        <p className="case-subtitle">{project.subtitle}</p>
        <p>{project.description}</p>
        <div className="tags">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </header>
      <div className="case-layout">
        <nav className="case-nav" aria-label="Case study sections">
          <p className="eyebrow">On this page</p>
          <a href="#overview">Overview</a>
          {available.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.title}
            </a>
          ))}
          {(project.resources ||
            project.publicationIds?.length ||
            project.sourceLinks?.length) && (
            <a href="#resources">Related publication & sources</a>
          )}
          <a href="#media">
            {hasFigures ? 'Additional media' : 'Reserved media'}
          </a>
        </nav>
        <div className="case-content">
          <section id="overview" className="case-section">
            <h2>Overview</h2>
            <p>{project.description}</p>
          </section>
          {available.map((section) => (
            <DetailSection key={section.id} {...section} />
          ))}
          {(project.resources ||
            project.publicationIds?.length ||
            project.sourceLinks?.length) && (
            <section id="resources" className="case-section">
              <h2>Related publication & sources</h2>
              {project.resources && <p>{project.resources}</p>}
              {project.publicationIds?.map((publicationId) => {
                const paper = publications.find(
                  (item) => item.id === publicationId,
                )
                return (
                  paper && (
                    <Link
                      className="text-link case-paper-link"
                      key={publicationId}
                      to={`/research#${paper.id}`}
                    >
                      {paper.title}
                      <ArrowRight size={16} />
                    </Link>
                  )
                )
              })}
              {project.sourceLinks?.map((source) => (
                <a
                  className="text-link case-paper-link"
                  href={source.url}
                  key={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {source.label}
                  <ArrowRight size={16} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
            </section>
          )}
          <section id="media" className="case-section">
            <h2>{hasFigures ? 'Additional media' : 'Reserved media'}</h2>
            {hasFigures ? (
              <p>
                The reviewed figures appear beside their research context above.
                Demonstration videos remain reserved for separate review.
              </p>
            ) : (
              <p>
                Photographs, figures, and videos will appear here after
                asset-specific permission and accuracy review.
              </p>
            )}
            <div className="media-grid">
              {(
                (hasFigures
                  ? project.media?.filter((item) => item.type !== 'image')
                  : project.media) ?? [
                  {
                    type: 'image' as const,
                    label: 'Research image unavailable',
                  },
                  {
                    type: 'video' as const,
                    label: 'Experiment video unavailable',
                  },
                ]
              ).map((item) => (
                <div className="media-placeholder" key={item.label}>
                  {item.type === 'image' ? (
                    <Image size={27} />
                  ) : (
                    <Video size={27} />
                  )}
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className="case-next">
        <Link className="text-link" to="/projects">
          <ArrowLeft size={16} />
          All projects
        </Link>
        {next && (
          <Link className="text-link" to={`/projects/${next.id}`}>
            Next: {next.title}
            <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </div>
  )
}
