import { formatMark, formatDate } from '../data/marks.js'
import './BibCard.css'

// The race-bib card that shows the personal record.
export default function BibCard({ event, result, label = 'Personal record' }) {
  return (
    <div className="bib">
      <p className="bib__label">{label}</p>
      <p className="bib__mark">{formatMark(event, result.value)}</p>
      <p className="bib__meta">{result.meet}, {formatDate(result.date)}</p>
    </div>
  )
}
