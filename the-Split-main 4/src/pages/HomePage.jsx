import { Link } from 'react-router-dom'
import { events, getPR, formatMark } from '../data.js'

// First screen: pick an event.
export default function HomePage({ results }) {
  return (
    <div>
      <h1>Outdoor season 2026</h1>
      <p>Pick an event to see your personal record and log a new result.</p>

      <div className="event-grid">
        {events.map((event) => {
          const eventResults = results.filter((r) => r.eventId === event.id)
          const pr = getPR(event, eventResults)

          return (
            <div className="card" key={event.id}>
              <h2>
                <Link to={`/events/${event.id}`}>{event.name}</Link>
              </h2>
              <p>{pr ? 'PR ' + formatMark(event, pr.value) : 'No results yet'}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
