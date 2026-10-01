import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Logo } from './Logo'

type AppShellProps = {
  children: ReactNode
}

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Calculator', to: '/calculator' },
  { label: 'Methodology', to: '/methodology' },
]

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <nav className="primary-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                end={item.to === '/'}
                key={item.to}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <NavLink className="header-cta" to="/calculator">
            Start estimating <span aria-hidden="true">↗</span>
          </NavLink>
        </div>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div className="footer-inner">
          <Logo />
          <p>Simple salary estimates, made private by design.</p>
          <span className="footer-note">© 2026 Netwise</span>
        </div>
      </footer>
    </div>
  )
}
