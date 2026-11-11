import { formatMark, formatDate } from '../data/marks.js'
import './ProgressChart.css'

const W = 600, H = 220, PAD_X = 48, PAD_TOP = 32, PAD_BOTTOM = 40

// Season progress as a line chart. For running events lower times are drawn higher,
// so "up" always means "better".
export default function ProgressChart({ event, results, prId }) {
  const points = [...results].sort((a, b) => a.date.localeCompare(b.date))
  const score = (v) => (event.type === 'time' ? -v : v)
  const scores = points.map((p) => score(p.value))
  const min = Math.min(...scores), max = Math.max(...scores)

  const x = (i) => (points.length === 1 ? W / 2 : PAD_X + (i * (W - 2 * PAD_X)) / (points.length - 1))
  const y = (s) => (max === min ? H / 2 : PAD_TOP + ((max - s) * (H - PAD_TOP - PAD_BOTTOM)) / (max - min))

  const summary = `${event.name} marks in date order: ` +
    points.map((p) => `${formatMark(event, p.value)} on ${formatDate(p.date)}`).join(', ')

  return (
    <figure className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={summary}>
        <line x1={PAD_X} x2={W - PAD_X} y1={H - PAD_BOTTOM + 8} y2={H - PAD_BOTTOM + 8} className="chart__axis" />
        <polyline className="chart__line"
          points={points.map((p, i) => `${x(i)},${y(score(p.value))}`).join(' ')} />
        {points.map((p, i) => {
          const cx = x(i), cy = y(score(p.value)), isPR = p.id === prId
          return (
            <g key={p.id}>
              <circle cx={cx} cy={cy} r={isPR ? 8 : 5} className={isPR ? 'chart__dot chart__dot--pr' : 'chart__dot'} />
              <text x={cx} y={cy - 14} textAnchor="middle" className="chart__value">{formatMark(event, p.value)}</text>
              <text x={cx} y={H - 8} textAnchor="middle" className="chart__date">{formatDate(p.date)}</text>
            </g>
          )
        })}
      </svg>
      <figcaption>
        {event.type === 'time' ? 'Faster times are drawn higher.' : 'Longer marks are drawn higher.'}
      </figcaption>
    </figure>
  )
}
