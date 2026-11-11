import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'
import {
  navigation,
  profile,
  professionalContact,
  researchProjects,
  earlierProjects,
} from '../data/portfolio'

export function Layout() {
  const [dark, setDark] = useState(
    () => document.documentElement.dataset.theme === 'dark',
  )
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const main = useRef<HTMLElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const initial = useRef(true)
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', dark ? '#0c1725' : '#f8f9fb')
    try {
      localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light')
    } catch {
      /* Theme works without storage. */
    }
  }, [dark])
  useEffect(() => {
    const item = navigation.find((item) => item.to === location.pathname)
    const project = [...researchProjects, ...earlierProjects].find(
      (item) => `/projects/${item.id}` === location.pathname,
    )
    document.title = `${project?.title ?? item?.label ?? 'Page not found'} | ${profile.name}`
    if (location.hash) {
      requestAnimationFrame(() =>
        document.getElementById(location.hash.slice(1))?.scrollIntoView(),
      )
    } else {
      window.scrollTo(0, 0)
    }
    if (!initial.current) main.current?.focus({ preventScroll: true })
    initial.current = false
  }, [location])
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    window.addEventListener('keydown', escape)
    return () => window.removeEventListener('keydown', escape)
  }, [open])
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container nav-shell">
          <Link
            to="/"
            className="wordmark"
            aria-label="ths. Research & Engineering — Tahmid Hasan Sakib home"
            onClick={() => setOpen(false)}
          >
            ths<span>.</span>
            <span className="wordmark-caption">RESEARCH & ENGINEERING</span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="nav-actions">
            <button
              className="icon-button theme-toggle"
              onClick={() => setDark(!dark)}
              aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}
            >
              {dark ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <button
              ref={menuButton}
              className="icon-button mobile-toggle"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav
            id="mobile-navigation"
            className="mobile-nav container"
            aria-label="Mobile navigation"
          >
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
              >
                {item.label}
                <ArrowUpRight size={16} />
              </NavLink>
            ))}
          </nav>
        )}
      </header>
      <main ref={main} id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer container">
        <div>
          <Link to="/" className="footer-name">
            {profile.name}
            <span>.</span>
          </Link>
          <p>Research with purpose. Engineering with care.</p>
          <a
            className="footer-email"
            href={`mailto:${professionalContact.email}`}
          >
            {professionalContact.email}
          </a>
        </div>
        <div className="footer-right">
          <nav aria-label="Footer navigation">
            <Link to="/research">Research</Link>
            <Link to="/cv">CV / Resume</Link>
            <Link to="/contact">
              Contact
              <ArrowUpRight size={14} />
            </Link>
          </nav>
          <nav className="footer-profiles" aria-label="Professional profiles">
            {professionalContact.profiles
              .filter((item) =>
                ['github', 'linkedin', 'scholar'].includes(item.id),
              )
              .map((item) => (
                <a
                  href={item.url}
                  key={item.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.label} (opens in a new tab)`}
                >
                  {item.label}
                </a>
              ))}
          </nav>
          <p>© {new Date().getFullYear()} Tahmid Hasan Sakib</p>
        </div>
      </footer>
    </>
  )
}
