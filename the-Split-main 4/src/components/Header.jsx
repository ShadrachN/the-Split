import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand">Splits</Link>
        <nav>
          <NavLink to="/" end className="nav-link">Events</NavLink>
          <NavLink to="/links" className="nav-link">Official results</NavLink>
        </nav>
      </div>
    </header>
  )
}
