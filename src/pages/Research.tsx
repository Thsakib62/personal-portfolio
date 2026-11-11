import { useMemo, useState } from 'react'
import { BookOpen, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { publications, researchProjects } from '../data/portfolio'
import type { PublicationCategory } from '../data/models'
import {
  ContactCTA,
  PageIntro,
  PublicationEntry,
  SectionHeading,
} from '../components/ui'

const categories: PublicationCategory[] = [
  'Published peer-reviewed work',
  'Manuscripts / submissions',
  'Work in progress',
  'Status pending verification',
]

export function Research() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<'All' | PublicationCategory>('All')
  const [year, setYear] = useState('All years')
  const years = [
    ...new Set(
      publications
        .map((entry) => entry.year)
        .filter((value): value is number => value !== undefined),
    ),
  ].sort((a, b) => b - a)
  const filtered = useMemo(
    () =>
      publications.filter((entry) => {
        const text = [
          entry.title,
          entry.authors,
          entry.venue,
          entry.venueContext,
          entry.status,
          entry.year,
        ]
          .join(' ')
          .toLowerCase()
        return (
          text.includes(query.trim().toLowerCase()) &&
          (category === 'All' || entry.category === category) &&
          (year === 'All years' || String(entry.year) === year)
        )
      }),
    [query, category, year],
  )
  return (
    <>
      <div className="container page-content">
        <PageIntro
          eyebrow="Research & publications"
          title="Building trust into autonomy."
        >
          I investigate how autonomous systems perceive, decide, and respond
          under real-world and adversarial conditions.
        </PageIntro>
        <div className="research-lede">
          <div>
            <p className="eyebrow">Research direction</p>
            <h2>From a camera frame to a closed-loop decision.</h2>
          </div>
          <p>
            My master’s research connects physical traffic-sign experiments,
            adversarial perception, runtime monitoring, embedded defenses, and
            secure robotics middleware. QCar1 and QCar2 testbeds, NVIDIA Jetson
            systems, and CARLA simulation make these questions measurable beyond
            offline model evaluation.
          </p>
        </div>
        <SectionHeading
          eyebrow="01 / Research themes"
          title="Questions across the autonomy stack"
        />
        <div className="theme-grid">
          {[
            [
              'Perception under attack',
              'Physical traffic-sign perturbations, naturalistic patches, and camera–LiDAR behavior.',
            ],
            [
              'Defense at runtime',
              'Restoration, anomaly evidence, and fallback decisions under real-time constraints.',
            ],
            [
              'Systems trust',
              'ROS 2 supply-chain security and repeatable hardware-in-the-loop evaluation.',
            ],
          ].map(([title, description]) => (
            <article key={title}>
              <BookOpen size={21} />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <p className="research-project-link">
          Explore the{' '}
          <Link className="text-link" to="/projects">
            graduate project case studies →
          </Link>
          , including {researchProjects.length} distinct research and
          engineering efforts.
        </p>
        <section className="inner-section" aria-labelledby="publications-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / Research record</p>
              <h2 id="publications-title">Publications & manuscripts</h2>
              <p className="section-intro">
                Entries are grouped by status and year. The supplied paper
                bundle is treated as source material, not proof of final
                acceptance. Unverified metadata is identified in each entry.
              </p>
            </div>
          </div>
          <div className="filter-panel">
            <label className="search-field">
              <span>Search publications</span>
              <span className="search-control">
                <Search size={18} aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Title, author, venue, keyword…"
                />
              </span>
            </label>
            <label className="select-field">
              <span>Category</span>
              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value as typeof category)
                }
              >
                <option>All</option>
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="select-field">
              <span>Year</span>
              <select
                value={year}
                onChange={(event) => setYear(event.target.value)}
              >
                <option>All years</option>
                {years.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>
          <p className="result-count" role="status">
            {filtered.length} {filtered.length === 1 ? 'record' : 'records'}{' '}
            shown
          </p>
          {filtered.length === 0 && (
            <div className="empty-state">
              No records match these filters. Try another search or category.
            </div>
          )}
          {categories.map((group) => {
            const items = filtered
              .filter((item) => item.category === group)
              .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
            if (
              !items.length &&
              (query ||
                year !== 'All years' ||
                (category !== 'All' && category !== group))
            )
              return null
            return (
              <section
                className="publication-group"
                key={group}
                aria-label={group}
              >
                <div className="group-heading">
                  <h3>{group}</h3>
                  <span>{items.length}</span>
                </div>
                {items.length ? (
                  [
                    ...new Set(
                      items.map((item) => item.year ?? 'Year unverified'),
                    ),
                  ].map((groupYear) => (
                    <div key={groupYear}>
                      <h4 className="year-heading">{groupYear}</h4>
                      {items
                        .filter(
                          (item) =>
                            (item.year ?? 'Year unverified') === groupYear,
                        )
                        .map((item) => (
                          <PublicationEntry key={item.id} publication={item} />
                        ))}
                    </div>
                  ))
                ) : (
                  <p className="empty-state">
                    No publicly listed work in this category yet.
                  </p>
                )}
              </section>
            )
          })}
        </section>
      </div>
      <ContactCTA />
    </>
  )
}
