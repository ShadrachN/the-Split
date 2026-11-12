import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { findEvent } from '../data/events.js'
import { parseMark } from '../data/marks.js'
import { useSplits } from '../SplitsContext.jsx'
import Card from '../components/Card.jsx'
import FormField from '../components/FormField.jsx'
import Button from '../components/Button.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import './LogResultPage.css'

function today() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default function LogResultPage() {
  const { eventId } = useParams()
  const event = findEvent(eventId)
  const navigate = useNavigate()
  const { addResult } = useSplits()
  const [form, setForm] = useState({ date: '', meet: '', mark: '' })
  const [errors, setErrors] = useState({})
  if (!event) return <NotFoundPage />

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const next = {}
    if (!form.date) next.date = 'Choose the date of the meet.'
    else if (form.date > today()) next.date = 'The date cannot be in the future.'
    if (!form.meet.trim()) next.meet = 'Enter the name of the meet.'
    const mark = parseMark(event, form.mark)
    if (mark.error) next.mark = mark.error

    // Decision: is the result valid?
    if (Object.keys(next).length > 0) {
      setErrors(next) // No: stay here and show the errors.
      // Move focus to the first field to fix, so keyboard and screen-reader users land on it.
      document.getElementById(Object.keys(next)[0])?.focus()
      return
    }
    // Yes: save it and go to the confirmation screen.
    const saved = addResult({ eventId: event.id, date: form.date, meet: form.meet.trim(), value: mark.value })
    navigate(`/events/${event.id}/saved?result=${saved.id}`)
  }

  const errorCount = Object.keys(errors).length

  return (
    <div className="log-page">
      <h1>Log a {event.name} result</h1>
      <Card>
        {errorCount > 0 && (
          <div className="log-page__summary" role="alert">
            <h2>Error: please fix {errorCount === 1 ? '1 field' : `${errorCount} fields`}</h2>
          </div>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <FormField id="date" name="date" type="date" label="Date" max={today()}
            value={form.date} onChange={update} error={errors.date} />
          <FormField id="meet" name="meet" type="text" label="Meet"
            value={form.meet} onChange={update} error={errors.meet} autoComplete="off" />
          <FormField id="mark" name="mark" type="text" inputMode="decimal"
            label={event.type === 'time' ? 'Time' : 'Distance'} hint={event.hint}
            value={form.mark} onChange={update} error={errors.mark} autoComplete="off" />
          <div className="button-row log-page__actions">
            <Button type="submit">Save result</Button>
            <Button to={`/events/${event.id}`} variant="secondary">Cancel</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
