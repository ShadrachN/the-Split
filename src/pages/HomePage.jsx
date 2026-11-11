import { Link } from 'react-router-dom'
import { EVENTS } from '../data/events.js'
import { findPR, formatMark } from '../data/marks.js'
import { useSplits } from '../SplitsContext.jsx'
import Card from '../components/Card.jsx'
import './HomePage.css'

// Start of both flows: pick an event.
export default function HomePage() {
  const { results } = useSplits()
  return (
    <>
      <h1>Outdoor season 2026</h1>
      <p>Pick an event to see your personal record and log a new result.</p>
      <ul className="event-grid">
        {EVENTS.map((event) => {
          const pr = findPR(event, results.filter((r) => r.eventId === event.id))
          return (
            <li key={event.id}>
              <Card as="div" className="event-grid__card">
                <h2>
                  <Link to={`/events/${event.id}`}>{event.name}</Link>
                </h2>
                <p>{pr ? `PR ${formatMark(event, pr.value)}` : 'No results yet'}</p>
              </Card>
            </li>
          )
        })}
      </ul>
    </>
  )
}
