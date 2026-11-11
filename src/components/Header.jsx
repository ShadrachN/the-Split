import { Link, NavLink } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__brand">Splits</Link>
        <nav aria-label="Main">
          <NavLink to="/" end className="header__link">Events</NavLink>
          <NavLink to="/links" className="header__link">Official results</NavLink>
        </nav>
      </div>
    </header>
  )
}
