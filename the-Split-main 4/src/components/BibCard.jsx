import { formatMark, formatDate } from '../data.js'

// Yellow card that looks like a race bib and shows the personal record.
export default function BibCard({ event, result, label }) {
  return (
    <div className="bib">
      <p className="bib-label">{label}</p>
      <p className="bib-mark">{formatMark(event, result.value)}</p>
      <p>{result.meet}, {formatDate(result.date)}</p>
    </div>
  )
}
