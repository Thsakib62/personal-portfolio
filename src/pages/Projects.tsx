import { useState } from 'react'
import { ArrowLeft, ArrowRight, Image, Video } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import {
  publications,
  researchProjects,
  undergraduateProjects,
} from '../data/portfolio'
import { PageIntro, ProjectCard, SectionHeading, Tag } from '../components/ui'

const allProjects = [...researchProjects, ...undergraduateProjects]
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
        <SectionHeading eyebrow="Earlier work" title="Undergraduate projects">
          A secondary collection spanning security, machine learning,
          telemedicine, and software development.
        </SectionHeading>
        <div className="project-grid two-columns">
          {undergraduateProjects.map((project) => (
            <ProjectCard compact project={project} key={project.id} />
          ))}
        </div>
      </section>
    </div>
  )
}

function DetailSection({
  id,
  title,
  content,
}: {
  id: string
  title: string
  content?: string | string[]
}) {
  if (!content || (Array.isArray(content) && !content.length)) return null
  return (
    <section id={id} className="case-section">
      <h2>{title}</h2>
      {Array.isArray(content) ? (
        <ul>
          {content.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>{content}</p>
      )}
    </section>
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
  const sections: [string, string, string | string[] | undefined][] = [
    ['problem', 'Research problem', project.problem],
    ['contributions', 'My contributions', project.contributions],
    ['approach', 'Technical approach', project.approach],
    ['architecture', 'System architecture', project.architecture],
    ['implementation', 'Implementation & technologies', project.implementation],
    ['evaluation', 'Experimental evaluation', project.evaluation],
    ['findings', 'Results & findings', project.findings],
  ]
  const available = sections.filter(
    ([, , content]) => content && (!Array.isArray(content) || content.length),
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
          {available.map(([key, title]) => (
            <a key={key} href={`#${key}`}>
              {title}
            </a>
          ))}
          {(project.resources || project.publicationIds?.length) && (
            <a href="#resources">Publications & resources</a>
          )}
          <a href="#media">Images & videos</a>
        </nav>
        <div className="case-content">
          <section id="overview" className="case-section">
            <h2>Overview</h2>
            <p>{project.description}</p>
          </section>
          {available.map(([key, title, content]) => (
            <DetailSection key={key} id={key} title={title} content={content} />
          ))}
          {(project.resources || project.publicationIds?.length) && (
            <section id="resources" className="case-section">
              <h2>Publications & resources</h2>
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
            </section>
          )}
          <section id="media" className="case-section">
            <h2>Images & videos</h2>
            <p>
              Research images and videos are not available for this case study.
            </p>
            <div className="media-grid">
              {(
                project.media ?? [
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
