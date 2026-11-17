import { Link, NavLink, useParams } from 'react-router-dom'
import { events, getEvent, getPR } from '../data.js'
import BibCard from '../components/BibCard.jsx'
import ProgressChart from '../components/ProgressChart.jsx'
import ResultsList from '../components/ResultsList.jsx'
import NotFoundPage from './NotFoundPage.jsx'

// Shows one event: the PR, a chart and every result.
export default function EventPage({ results }) {
  const { eventId } = useParams()
  const event = getEvent(eventId)
  if (!event) return <NotFoundPage />

  const eventResults = results.filter((r) => r.eventId === event.id)
  const pr = getPR(event, eventResults)

  return (
    <div>
      {/* Tabs to jump between events */}
      <nav className="tabs">
        {events.map((e) => (
          <NavLink key={e.id} to={`/events/${e.id}`} end className="tab">
            {e.name}
          </NavLink>
        ))}
      </nav>

      <div className="title-row">
        <h1>{event.name}</h1>
        <Link to={`/events/${event.id}/log`} className="button">Log a result</Link>
      </div>

      {eventResults.length === 0 ? (
        <div className="card">
          <h2>No results yet</h2>
          <p>Log your first {event.name} mark and it will become your personal record.</p>
        </div>
      ) : (
        <>
          <div className="event-top">
            <BibCard event={event} result={pr} label="Personal record" />
            <div className="card">
              <h2>Season progress</h2>
              <ProgressChart event={event} results={eventResults} prId={pr.id} />
            </div>
          </div>
          <div className="card">
            <h2>Results</h2>
            <ResultsList event={event} results={eventResults} prId={pr.id} />
          </div>
        </>
      )}
    </div>
  )
}
