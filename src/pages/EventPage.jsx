import { useParams } from 'react-router-dom'
import { findEvent } from '../data/events.js'
import { findPR } from '../data/marks.js'
import { useSplits } from '../SplitsContext.jsx'
import EventTabs from '../components/EventTabs.jsx'
import BibCard from '../components/BibCard.jsx'
import ProgressChart from '../components/ProgressChart.jsx'
import ResultsList from '../components/ResultsList.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import './EventPage.css'

export default function EventPage() {
  const { eventId } = useParams()
  const event = findEvent(eventId)
  const { results } = useSplits()
  if (!event) return <NotFoundPage />

  const eventResults = results.filter((r) => r.eventId === event.id)
  const pr = findPR(event, eventResults)

  return (
    <div className="stack">
      <EventTabs />
      <div className="event-page__heading">
        <h1>{event.name}</h1>
        <Button to={`/events/${event.id}/log`}>Log a result</Button>
      </div>

      {eventResults.length === 0 ? (
        // Empty state
        <Card>
          <h2>No results yet</h2>
          <p>Log your first {event.name} mark and it will become your personal record.</p>
        </Card>
      ) : (
        <>
          <div className="event-page__top">
            <BibCard event={event} result={pr} />
            <Card>
              <h2>Season progress</h2>
              <ProgressChart event={event} results={eventResults} prId={pr.id} />
            </Card>
          </div>
          <Card>
            <h2>Results</h2>
            <ResultsList event={event} results={eventResults} prId={pr.id} />
          </Card>
        </>
      )}
    </div>
  )
}
