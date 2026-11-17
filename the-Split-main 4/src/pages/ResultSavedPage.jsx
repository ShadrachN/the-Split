import { Link, useParams, useSearchParams } from 'react-router-dom'
import { getEvent, getPR, isBetter, formatMark, sortBestFirst } from '../data.js'
import BibCard from '../components/BibCard.jsx'
import NotFoundPage from './NotFoundPage.jsx'

// Shown right after saving. Tells you if it was a new PR or not.
export default function ResultSavedPage({ results }) {
  const { eventId } = useParams()
  const [searchParams] = useSearchParams()
  const event = getEvent(eventId)
  if (!event) return <NotFoundPage />

  const eventResults = results.filter((r) => r.eventId === event.id)
  const result = eventResults.find((r) => String(r.id) === searchParams.get('result'))

  if (!result) {
    return (
      <div className="card">
        <h1>Result not found</h1>
        <p>Results are only kept while the page is open.</p>
        <Link to={`/events/${event.id}`} className="button">Back to {event.name}</Link>
      </div>
    )
  }

  // Compare against the best result from BEFORE this one
  const otherResults = eventResults.filter((r) => r.id !== result.id)
  const oldPR = getPR(event, otherResults)
  const isNewPR = oldPR === null || isBetter(event, result.value, oldPR.value)
  const unit = event.type === 'time' ? 'seconds' : 'meters'

  let message
  if (oldPR === null) {
    message = `This is your first ${event.name} result of the season.`
  } else if (isNewPR) {
    const gap = Math.abs(result.value - oldPR.value).toFixed(2)
    message = `That beats your old PR of ${formatMark(event, oldPR.value)} by ${gap} ${unit}.`
  } else if (result.value === oldPR.value) {
    message = `That ties your PR of ${formatMark(event, oldPR.value)}.`
  } else {
    const gap = Math.abs(result.value - oldPR.value).toFixed(2)
    message = `Your PR is still ${formatMark(event, oldPR.value)}, ${gap} ${unit} better.`
  }

  // Where does this result rank this season? (1 = best)
  const rank = sortBestFirst(event, eventResults).findIndex((r) => r.id === result.id) + 1

  return (
    <div className="narrow">
      <h1>{isNewPR ? 'New personal record!' : 'Result saved'}</h1>

      {isNewPR ? (
        <BibCard event={event} result={result} label="New personal record" />
      ) : (
        <div className="card">
          <h2>{formatMark(event, result.value)} at {result.meet}</h2>
          <p>Ranked {rank} of {eventResults.length} this season.</p>
        </div>
      )}

      <p className="message">{message}</p>

      <div className="button-row">
        <Link to={`/events/${event.id}`} className="button">See {event.name} results</Link>
        <Link to={`/events/${event.id}/log`} className="button secondary">Log another</Link>
      </div>
    </div>
  )
}
