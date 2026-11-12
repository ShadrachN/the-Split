import { Link, NavLink, useLocation } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const { pathname } = useLocation()
  const inEvents = pathname === '/' || pathname.startsWith('/events')
  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__brand">Splits</Link>
        <nav aria-label="Main">
          <Link to="/" className={`header__link ${inEvents ? 'active' : ''}`}
            aria-current={pathname === '/' ? 'page' : undefined}>Events</Link>
          <NavLink to="/links" className="header__link">Official results</NavLink>
        </nav>
      </div>
    </header>
  )
}
