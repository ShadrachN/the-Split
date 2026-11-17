import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getEvent, parseMark, today } from '../data.js'
import NotFoundPage from './NotFoundPage.jsx'

// Form to add a new result.
export default function LogResultPage({ addResult }) {
  const { eventId } = useParams()
  const event = getEvent(eventId)
  const navigate = useNavigate()

  const [date, setDate] = useState('')
  const [meet, setMeet] = useState('')
  const [mark, setMark] = useState('')
  const [errors, setErrors] = useState({})

  if (!event) return <NotFoundPage />

  function handleSubmit(e) {
    e.preventDefault()

    // Check each field and collect any problems
    const newErrors = {}
    if (date === '') {
      newErrors.date = 'Choose the date of the meet.'
    } else if (date > today()) {
      newErrors.date = 'The date cannot be in the future.'
    }
    if (meet.trim() === '') {
      newErrors.meet = 'Enter the name of the meet.'
    }
    const value = parseMark(event, mark)
    if (value === null) {
      newErrors.mark = event.type === 'time'
        ? 'Enter a time like 12.84 or 1:02.40.'
        : 'Enter a distance in meters like 6.45.'
    }

    // If something is wrong, show the errors and stop here
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Everything is good: save it and go to the "saved" screen
    const id = addResult({ eventId: event.id, date: date, meet: meet.trim(), value: value })
    navigate(`/events/${event.id}/saved?result=${id}`)
  }

  return (
    <div className="narrow">
      <h1>Log a {event.name} result</h1>

      <form className="card" onSubmit={handleSubmit} noValidate>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" max={today()} value={date}
          onChange={(e) => setDate(e.target.value)} />
        {errors.date && <p className="error" role="alert">Error: {errors.date}</p>}

        <label htmlFor="meet">Meet</label>
        <input id="meet" type="text" value={meet}
          onChange={(e) => setMeet(e.target.value)} />
        {errors.meet && <p className="error" role="alert">Error: {errors.meet}</p>}

        <label htmlFor="mark">{event.type === 'time' ? 'Time' : 'Distance'}</label>
        <p className="hint">{event.hint}</p>
        <input id="mark" type="text" inputMode="decimal" value={mark}
          onChange={(e) => setMark(e.target.value)} />
        {errors.mark && <p className="error" role="alert">Error: {errors.mark}</p>}

        <div className="button-row">
          <button type="submit" className="button">Save result</button>
          <Link to={`/events/${event.id}`} className="button secondary">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
