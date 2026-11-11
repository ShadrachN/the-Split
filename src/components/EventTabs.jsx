import { NavLink } from 'react-router-dom'
import { EVENTS } from '../data/events.js'
import './EventTabs.css'

export default function EventTabs() {
  return (
    <nav aria-label="Events" className="event-tabs">
      {EVENTS.map((e) => (
        <NavLink key={e.id} to={`/events/${e.id}`} end className="event-tabs__tab">
          {e.name}
        </NavLink>
      ))}
    </nav>
  )
}
