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
  cvDocumentCategories,
  education,
  experience,
  skills,
} from '../data/portfolio'
import { PageIntro, SectionHeading, Tag } from '../components/ui'

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
              <p>{item.organization}</p>
              <p className="muted">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
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
                <p>{item.organization}</p>
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
        Academic and role-specific document categories for future downloads.
        Each version will stay focused on its intended audience.
      </PageIntro>
      <div className="document-grid">
        {cvDocumentCategories.map((item) => (
          <article className="document-card" key={item.title}>
            <FileText size={32} strokeWidth={1.2} aria-hidden="true" />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <span className="tag">In preparation</span>
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
        <Mail size={32} strokeWidth={1.2} aria-hidden="true" />
        <h2>Let’s connect.</h2>
        <p>
          Institutional email and verified professional profiles will be listed
          here when available.
        </p>
        <div className="contact-channel-grid">
          <div>
            <h3>Direct contact</h3>
            <p>Institutional email</p>
          </div>
          <div>
            <h3>Professional profiles</h3>
            <p>GitHub · LinkedIn · Google Scholar</p>
          </div>
        </div>
        <span className="tag">Contact details unavailable</span>
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
