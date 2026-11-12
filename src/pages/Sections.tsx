import {
  ArrowUpRight,
  GraduationCap,
  BriefcaseBusiness,
  Mail,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  achievements,
  cvDocumentCategories,
  education,
  experience,
  mentoring,
  professionalContact,
  skills,
} from '../data/portfolio'
import { PageIntro, SectionHeading, Tag } from '../components/ui'
import { DocumentCard } from '../components/DocumentCard'

export function Experience() {
  return (
    <div className="container page-content">
      <PageIntro
        eyebrow="Experience & education"
        title="A foundation for what’s next."
      >
        Research practice, embedded engineering, software foundations, and
        leadership.
      </PageIntro>
      <SectionHeading eyebrow="Graduate research" title="Research experience" />
      <div className="timeline">
        {experience.slice(0, 1).map((item) => (
          <article key={item.organization}>
            <BriefcaseBusiness size={23} />
            <div>
              <p className="card-kicker">
                {item.period ?? 'Graduate research'}
              </p>
              <h3>{item.role}</h3>
              <p>
                {item.organization} · {item.location}
              </p>
              <p className="muted">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
      <section className="inner-section">
        <SectionHeading eyebrow="Research mentoring" title="Mentoring" />
        <div className="timeline">
          <article>
            <GraduationCap size={24} aria-hidden="true" />
            <div>
              <p className="card-kicker">{mentoring.period}</p>
              <h3>{mentoring.role}</h3>
              <p>{mentoring.program}</p>
              <p>{mentoring.organization}</p>
              <p className="muted">{mentoring.description}</p>
            </div>
          </article>
        </div>
      </section>
      {education.map((item, index) => (
        <section className="inner-section" key={item.institution}>
          <SectionHeading
            eyebrow="Academic background"
            title={
              index === 0 ? 'Graduate education' : 'Undergraduate education'
            }
          />
          <div className="timeline">
            <article>
              <GraduationCap size={24} />
              <div>
                <p className="card-kicker">
                  {item.period} · {item.location}
                </p>
                <h3>{item.institution}</h3>
                <p>{item.qualification}</p>
                <p className="muted">{item.description}</p>
              </div>
            </article>
          </div>
        </section>
      ))}
      <section className="inner-section">
        <SectionHeading eyebrow="Technical practice" title="Skills" />
        <div className="skills-grid">
          {skills.map((group) => (
            <article className="skill-card" key={group.area}>
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
      <section className="inner-section">
        <SectionHeading eyebrow="Industry experience" title="Internship" />
        <div className="timeline">
          {experience.slice(1, 2).map((item) => (
            <article key={item.organization}>
              <BriefcaseBusiness size={23} />
              <div>
                <p className="card-kicker">{item.period}</p>
                <h3>{item.role}</h3>
                <p>
                  {item.organization} · {item.location}
                </p>
                <p className="muted">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="inner-section">
        <SectionHeading eyebrow="Community" title="Leadership" />
        <div className="timeline">
          {experience.slice(2).map((item) => (
            <article key={item.organization}>
              <BriefcaseBusiness size={23} />
              <div>
                {item.period && <p className="card-kicker">{item.period}</p>}
                <h3>{item.role}</h3>
                <p>{item.organization}</p>
                <p className="muted">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="inner-section">
        <SectionHeading eyebrow="Recognition" title="Achievements" />
        <ul className="achievement-list">
          {achievements.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <span className="muted">{item.detail}</span>
            </li>
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
        Download an academic CV or a resume focused on your area of interest.
        Each version presents the same professional history for a different
        audience.
      </PageIntro>
      <div className="document-grid">
        {cvDocumentCategories.map((item) => (
          <DocumentCard document={item} key={item.title} />
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
        Connect about research collaboration, embedded systems and robotics,
        computer vision and AI engineering, cyber-physical and autonomous
        systems research, or relevant engineering opportunities.
      </PageIntro>
      <div className="contact-panel">
        <Mail size={32} strokeWidth={1.2} aria-hidden="true" />
        <p className="eyebrow">Institutional email</p>
        <h2>Get in touch.</h2>
        <a
          className="contact-email"
          href={`mailto:${professionalContact.email}`}
        >
          {professionalContact.email}
          <ArrowUpRight size={22} aria-hidden="true" />
        </a>
        <p>For research and relevant engineering conversations.</p>
      </div>
      <section className="contact-profiles" aria-labelledby="profiles-heading">
        <div className="contact-profiles-heading">
          <p className="eyebrow">Elsewhere</p>
          <h2 id="profiles-heading">Professional profiles</h2>
        </div>
        <div className="contact-profile-grid">
          {professionalContact.profiles.map((item) => (
            <a
              className="contact-profile-link"
              href={item.url}
              key={item.id}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <strong>{item.label}</strong>
                <small>{item.description}</small>
                <span className="sr-only">(opens in a new tab)</span>
              </span>
              <ArrowUpRight size={19} aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>
      <Link className="text-link contact-research-link" to="/research">
        View research
        <ArrowUpRight size={17} aria-hidden="true" />
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
