import { formatMark, formatDate } from '../data.js'

// Table of every result, newest first. The PR row is bold.
export default function ResultsList({ event, results, prId }) {
  const newestFirst = [...results].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <table className="results">
      <thead>
        <tr>
          <th>Date</th>
          <th>Meet</th>
          <th>Mark</th>
        </tr>
      </thead>
      <tbody>
        {newestFirst.map((result) => (
          <tr key={result.id} className={result.id === prId ? 'pr-row' : ''}>
            <td>{formatDate(result.date)}</td>
            <td>{result.meet}</td>
            <td>
              {formatMark(event, result.value)}
              {result.id === prId && <span className="badge">PR</span>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
