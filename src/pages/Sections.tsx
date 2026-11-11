import {
  ArrowUpRight,
  FileText,
  GraduationCap,
  BriefcaseBusiness,
  Mail,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  achievements,
  education,
  experience,
  publications,
  researchProjects,
  skills,
  undergraduateProjects,
} from '../data/portfolio'
import {
  ComingSoon,
  ContactCTA,
  PageIntro,
  ProjectCard,
  PublicationEntry,
  SectionHeading,
  Tag,
} from '../components/ui'

export function Research() {
  return (
    <>
      <div className="container page-content">
        <PageIntro
          eyebrow="Research & publications"
          title="Building trust into autonomy."
        >
          Research directions spanning perception security, resilient
          cyber-physical systems, and embedded intelligence.
        </PageIntro>
        <ComingSoon title="Research overview · foundation edition">
          Detailed research narratives, verified citations, and supporting
          materials will be added as they become available. The efforts below
          are distinct; no publication status is implied.
        </ComingSoon>
        <div className="project-grid two-columns">
          {researchProjects.map((project) => (
            <ProjectCard compact project={project} key={project.id} />
          ))}
        </div>
        <section className="inner-section">
          <SectionHeading
            eyebrow="Publication record / draft"
            title="Verification before citation."
          >
            Venue names below are owner-provided context only. They are not
            confirmed citations or acceptance claims.
          </SectionHeading>
          {publications.map((publication) => (
            <PublicationEntry key={publication.id} publication={publication} />
          ))}
        </section>
        <section className="inner-section">
          <SectionHeading
            eyebrow="Methods & systems"
            title="Research toolkit"
          />
          <div className="skills-grid">
            {skills.map((group) => (
              <article key={group.area}>
                <h3>{group.area}</h3>
                <div className="tags">
                  {group.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
      <ContactCTA />
    </>
  )
}
export function Projects() {
  return (
    <div className="container page-content">
      <PageIntro eyebrow="Project index" title="Ideas, made tangible.">
        A growing collection of research and engineering work, from autonomous
        systems to machine learning applications.
      </PageIntro>
      <ComingSoon title="Project index · foundation edition">
        Case studies, repositories, diagrams, and demonstrations are pending.
        These summaries reflect the supplied background without adding outcomes
        or metrics.
      </ComingSoon>
      <SectionHeading
        eyebrow="Primary focus"
        title="Graduate research & engineering"
      />
      <div className="project-grid two-columns">
        {researchProjects.map((project) => (
          <ProjectCard compact project={project} key={project.id} />
        ))}
      </div>
      <section className="inner-section" id="undergraduate">
        <SectionHeading eyebrow="Earlier work" title="Undergraduate projects">
          Selected foundations in machine learning, software development, and
          applied computing.
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
export function Experience() {
  return (
    <div className="container page-content">
      <PageIntro
        eyebrow="Experience & education"
        title="A foundation for what’s next."
      >
        Academic preparation, early industry exposure, and leadership beyond the
        lab.
      </PageIntro>
      <ComingSoon title="Background overview · foundation edition">
        Expanded responsibilities, supporting links, and additional verified
        experience will follow.
      </ComingSoon>
      <SectionHeading eyebrow="Academic background" title="Education" />
      <div className="timeline">
        {education.map((item) => (
          <article key={item.institution}>
            <GraduationCap size={24} />
            <div>
              <p className="card-kicker">
                {item.period} · {item.location}
              </p>
              <h3>{item.institution}</h3>
              <p>{item.qualification}</p>
              <p className="muted">{item.description}</p>
              <Tag>{item.note}</Tag>
            </div>
          </article>
        ))}
      </div>
      <section className="inner-section">
        <SectionHeading eyebrow="Industry & leadership" title="Experience" />
        <div className="timeline">
          {experience.map((item) => (
            <article key={item.organization}>
              <BriefcaseBusiness size={23} />
              <div>
                <p className="card-kicker">
                  {item.period ?? 'Dates to be confirmed'}
                </p>
                <h3>{item.role}</h3>
                <p>{item.organization}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="inner-section">
        <SectionHeading eyebrow="Recognition" title="Achievements" />
        <ul className="achievement-list">
          {achievements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
export function CV() {
  return (
    <div className="container page-content">
      <PageIntro eyebrow="CV / Resume" title="The fuller picture.">
        Two perspectives on the same work: an academic record and an
        engineering-focused resume.
      </PageIntro>
      <div className="document-grid">
        {[
          {
            title: 'Academic CV',
            copy: 'Research experience, education, verified publications, and academic contributions.',
          },
          {
            title: 'Industry resume',
            copy: 'Engineering experience, technical skills, and selected projects for industry applications.',
          },
        ].map((item) => (
          <article className="document-card" key={item.title}>
            <FileText size={32} strokeWidth={1.2} />
            <h2>{item.title}</h2>
            <p>{item.copy}</p>
            <span className="tag">PDF asset pending</span>
            <p className="muted small">
              A download will be available once the final document is supplied.
            </p>
          </article>
        ))}
      </div>
      <Link className="text-link" to="/experience">
        Explore education & experience
        <ArrowUpRight size={17} />
      </Link>
    </div>
  )
}
export function Contact() {
  return (
    <div className="container page-content contact-page">
      <PageIntro eyebrow="Contact" title="A conversation can start something.">
        For research collaboration, engineering opportunities, or a thoughtful
        exchange about trustworthy autonomous systems.
      </PageIntro>
      <div className="contact-panel">
        <Mail size={32} strokeWidth={1.2} />
        <h2>Let’s connect.</h2>
        <p>
          Verified contact details and professional profiles will appear here
          once provided.
        </p>
        <span className="tag">Email & profile links pending</span>
        <p className="muted small">
          No contact form is active in this foundation release.
        </p>
      </div>
      <Link className="text-link" to="/research">
        Explore my research in the meantime
        <ArrowUpRight size={17} />
      </Link>
    </div>
  )
}
export function NotFound() {
  return (
    <div className="container page-content">
      <PageIntro
        eyebrow="404 / Page not found"
        title="A path yet to be explored."
      >
        This page doesn’t exist. Return to the homepage to find research,
        projects, and background.
      </PageIntro>
      <Link className="button button-primary" to="/">
        Back to home
        <ArrowUpRight size={18} />
      </Link>
    </div>
  )
}
