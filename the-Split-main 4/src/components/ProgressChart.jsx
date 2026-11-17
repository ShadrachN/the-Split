import { formatMark, formatDate } from '../data.js'

// A simple line chart of the season, oldest result on the left.
// Better marks are always drawn higher, so for times a smaller number goes up.
export default function ProgressChart({ event, results, prId }) {
  const width = 600
  const height = 220
  const padding = 40

  const sorted = [...results].sort((a, b) => a.date.localeCompare(b.date))
  const values = sorted.map((result) => result.value)
  const min = Math.min(...values)
  const max = Math.max(...values)

  function getX(index) {
    if (sorted.length === 1) return width / 2
    return padding + (index * (width - padding * 2)) / (sorted.length - 1)
  }

  function getY(value) {
    if (max === min) return height / 2
    let percent = (value - min) / (max - min) // 0 = worst, 1 = best (for distances)
    if (event.type === 'time') percent = 1 - percent // flip it for times
    return height - padding - percent * (height - padding * 2)
  }

  const linePoints = sorted.map((result, i) => getX(i) + ',' + getY(result.value)).join(' ')

  return (
    <div className="chart">
      <svg viewBox={`0 0 ${width} ${height}`}>
        <polyline points={linePoints} className="chart-line" />
        {sorted.map((result, i) => (
          <g key={result.id}>
            <circle
              cx={getX(i)}
              cy={getY(result.value)}
              r={result.id === prId ? 8 : 5}
              className={result.id === prId ? 'chart-dot pr-dot' : 'chart-dot'}
            />
            <text x={getX(i)} y={getY(result.value) - 14} textAnchor="middle" className="chart-value">
              {formatMark(event, result.value)}
            </text>
            <text x={getX(i)} y={height - 8} textAnchor="middle">
              {formatDate(result.date)}
            </text>
          </g>
        ))}
      </svg>
      <p>{event.type === 'time' ? 'Faster times are higher.' : 'Longer marks are higher.'}</p>
    </div>
  )
}
