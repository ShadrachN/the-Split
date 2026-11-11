import { formatMark, formatDate } from '../data/marks.js'
import './ResultsList.css'

// Newest first; the PR row is bold and labelled "PR" in text.
export default function ResultsList({ event, results, prId }) {
  const newestFirst = [...results].sort((a, b) => b.date.localeCompare(a.date))
  return (
    <table className="results">
      <caption className="visually-hidden">All {event.name} results, newest first</caption>
      <thead>
        <tr><th scope="col">Date</th><th scope="col">Meet</th><th scope="col">Mark</th></tr>
      </thead>
      <tbody>
        {newestFirst.map((r) => (
          <tr key={r.id} className={r.id === prId ? 'results__pr' : ''}>
            <td>{formatDate(r.date)}</td>
            <td>{r.meet}</td>
            <td>
              {formatMark(event, r.value)}
              {r.id === prId && <span className="results__badge">PR</span>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
