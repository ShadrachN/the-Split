import { useParams, useSearchParams } from 'react-router-dom'
import { findEvent } from '../data/events.js'
import { rankResults, isBetter, formatMark } from '../data/marks.js'
import { useSplits } from '../SplitsContext.jsx'
import BibCard from '../components/BibCard.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import './ResultSavedPage.css'

export default function ResultSavedPage() {
  const { eventId } = useParams()
  const [params] = useSearchParams()
  const event = findEvent(eventId)
  const { results } = useSplits()
  if (!event) return <NotFoundPage />

  const eventResults = results.filter((r) => r.eventId === event.id)
  const result = eventResults.find((r) => String(r.id) === params.get('result'))

  if (!result) {
    return (
      <Card>
        <h1>Result not found</h1>
        <p>This result may not have been saved. Results are kept only while the page is open.</p>
        <Button to={`/events/${event.id}`}>Back to {event.name}</Button>
      </Card>
    )
  }

  const others = eventResults.filter((r) => r.id !== result.id)
  const previousBest = rankResults(event, others)[0]
  // Decision: is it a new PR?
  const isPR = !previousBest || isBetter(event, result.value, previousBest.value)
  const rank = rankResults(event, eventResults).findIndex((r) => r.id === result.id) + 1
  const gap = previousBest && Math.abs(result.value - previousBest.value)

  return (
    <div className="stack saved-page">
      <h1>{isPR ? 'New personal record!' : 'Result saved'}</h1>
      {isPR ? (
        <>
          <BibCard event={event} result={result} label="New personal record" />
          <p>
            {previousBest
              ? `That beats your old PR of ${formatMark(event, previousBest.value)} by ${gap.toFixed(2)}${event.type === 'time' ? ' seconds' : ' meters'}.`
              : `This is your first ${event.name} result of the season.`}
          </p>
        </>
      ) : (
        <Card>
          <h2>{formatMark(event, result.value)} at {result.meet}</h2>
          <p>
            Ranked {rank} of {eventResults.length} this season.{' '}
            {gap === 0
              ? `That ties your PR of ${formatMark(event, previousBest.value)}.`
              : `Your PR is still ${formatMark(event, previousBest.value)}, ${gap.toFixed(2)}${event.type === 'time' ? ' seconds faster' : ' meters farther'}.`}
          </p>
        </Card>
      )}
      <div className="button-row">
        <Button to={`/events/${event.id}`}>See {event.name} results</Button>
        <Button to={`/events/${event.id}/log`} variant="secondary">Log another</Button>
      </div>
    </div>
  )
}
