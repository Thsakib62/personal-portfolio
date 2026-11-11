import { motion, useReducedMotion } from 'motion/react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  FileText,
  MapPin,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  education,
  experience,
  interests,
  profile,
  publications,
  researchProjects,
  skills,
} from '../data/portfolio'
import {
  ContactCTA,
  InterestIcon,
  ProjectCard,
  PublicationEntry,
  SectionHeading,
  Tag,
} from '../components/ui'

export function Home() {
  const reduced = useReducedMotion()
  return (
    <>
      <section className="hero container">
        <motion.div
          className="hero-copy"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p className="eyebrow hero-eyebrow">
            <span />
            RESEARCHER. ENGINEER. BUILDER.
          </p>
          <h1>
            Tahmid Hasan <br />
            <span>
              Sakib<span className="blue-dot">.</span>
            </span>
          </h1>
          <p className="hero-statement">
            Making autonomous systems
            <br className="desktop-break" /> more <em>secure</em> and{' '}
            <em>trustworthy.</em>
          </p>
          <p className="hero-summary">{profile.summary}</p>
          <div className="hero-buttons">
            <Link to="/research" className="button button-primary">
              Explore research
              <ArrowUpRight size={17} />
            </Link>
            <Link to="/contact" className="button button-secondary">
              Get in touch
              <ArrowRight size={17} />
            </Link>
            <Link to="/cv" className="cv-link">
              <FileText size={16} />
              CV / Resume
            </Link>
          </div>
          <div className="hero-affiliation">
            <span className="affiliation-line" />
            <div>
              <strong>{profile.role}</strong>
              <span>{profile.affiliation}, USA</span>
            </div>
          </div>
        </motion.div>
        <motion.aside
          className="hero-profile"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          aria-label="Professional profile"
        >
          <div className="portrait-frame">
            <img
              src="/images/professional-headshot.webp"
              alt="Professional portrait of Tahmid Hasan Sakib."
              width="1536"
              height="1024"
              fetchPriority="high"
            />
          </div>
          <div className="profile-note">
            <div className="note-icon">
              <MapPin size={18} />
            </div>
            <div>
              <strong>From perception to protection.</strong>
              <p>Autonomy · Security · Embedded AI</p>
            </div>
            <ArrowUpRight size={20} />
          </div>
        </motion.aside>
        <a href="#about" className="scroll-cue">
          <ArrowDown size={15} /> A little more about me
        </a>
      </section>
      <div className="focus-strip">
        <div className="container">
          <span>FOCUSED ON</span>
          <p>Autonomous systems</p>
          <span className="strip-plus">+</span>
          <p>Embedded AI</p>
          <span className="strip-plus">+</span>
          <p>Computer vision</p>
          <span className="strip-plus">+</span>
          <p>Cyber-physical security</p>
        </div>
      </div>
      <section className="section container about-grid" id="about">
        <div>
          <p className="eyebrow">01 / About me</p>
          <h2>
            Curiosity, grounded <br />
            in the real world.
          </h2>
        </div>
        <div className="about-copy">
          <p className="large-copy">
            I work where intelligent systems meet the physical world — and where
            trust becomes an engineering problem.
          </p>
          <p>
            As a Graduate Research Assistant at Tennessee Technological
            University, I study autonomous vehicle perception, embedded AI,
            runtime monitoring, and ROS 2 security through physical and
            simulated vehicle experiments.
          </p>
          <Link className="text-link" to="/experience">
            Education & experience
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="section interests-section">
        <div className="container">
          <SectionHeading
            eyebrow="02 / Research interests"
            title="Three perspectives. One connected focus."
          />
          <div className="interest-grid">
            {interests.map((interest, i) => (
              <article key={interest.title} className="interest-card">
                <div className="interest-top">
                  <InterestIcon name={interest.icon} />
                  <span>0{i + 1}</span>
                </div>
                <h3>{interest.title}</h3>
                <p>{interest.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="03 / Selected research & engineering"
          title="Exploring the systems we rely on."
          link={{ to: '/projects', label: 'All projects' }}
        >
          Distinct research efforts in perception defense, runtime assurance,
          and physical autonomy.
        </SectionHeading>
        <div className="project-grid">
          {researchProjects
            .filter((project) => project.featured)
            .map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
        </div>
        <p className="section-footnote">
          Explore each project for its specific testbed, methods, and current
          evidence.
        </p>
      </section>
      <section className="section publication-section">
        <div className="container">
          <SectionHeading
            eyebrow="04 / Publications"
            title="Research, in writing."
            link={{ to: '/research', label: 'Research & publications' }}
          >
            Selected conference research. Each entry links to its status and
            source context on the Research page.
          </SectionHeading>
          <div className="publication-list">
            {publications.slice(0, 2).map((publication) => (
              <PublicationEntry
                publication={publication}
                key={publication.id}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="section container background-section">
        <SectionHeading
          eyebrow="05 / The foundation"
          title="A path shaped by learning."
          link={{ to: '/experience', label: 'Education & experience' }}
        />
        <div className="education-grid">
          {education.map((item, i) => (
            <article className="education-card" key={item.institution}>
              <p className="card-kicker">
                0{i + 1} / {item.period}
              </p>
              <h3>{item.institution}</h3>
              <p>{item.qualification}</p>
              <span className="muted">{item.location}</span>
            </article>
          ))}
        </div>
        <div className="experience-preview">
          <p className="card-kicker">Current research experience</p>
          <p>
            <strong>
              {experience[0].role} · {experience[0].organization}
            </strong>
            <span>Embedded perception · sensor integration · validation</span>
          </p>
        </div>
        <div className="toolbox">
          <span className="eyebrow">Research toolkit</span>
          <div className="tags">
            {skills
              .flatMap((group) => group.items)
              .filter((item) =>
                [
                  'ROS 2',
                  'CARLA',
                  'NVIDIA Jetson',
                  'Computer vision',
                  'Adversarial machine learning',
                ].includes(item),
              )
              .map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
          </div>
        </div>
        <div className="earlier-work">
          <p>
            <strong>Earlier chapters</strong>Machine learning projects,
            full-stack systems, and community leadership.
          </p>
          <Link className="text-link" to="/projects#undergraduate">
            Explore undergraduate work
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <ContactCTA />
    </>
  )
}
