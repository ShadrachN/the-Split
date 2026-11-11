// Turning what the athlete types into a number, and back again.

const SECONDS = /^\d{1,3}(\.\d{1,2})?$/
const MIN_SEC = /^(\d{1,2}):([0-5]\d(\.\d{1,2})?)$/
const METERS = /^\d{1,2}(\.\d{1,2})?$/

// Returns { value } when the mark is valid, or { error } with a message to show.
export function parseMark(event, text) {
  const input = text.trim()
  if (input === '') {
    return { error: 'Enter a mark before saving.' }
  }

  if (event.type === 'time') {
    const ms = input.match(MIN_SEC)
    if (ms) {
      return { value: Number(ms[1]) * 60 + Number(ms[2]) }
    }
    if (SECONDS.test(input) && Number(input) > 0) {
      return { value: Number(input) }
    }
    return { error: `"${input}" is not a time. Use seconds like 12.84 or minutes and seconds like 1:02.40.` }
  }

  if (METERS.test(input) && Number(input) > 0) {
    return { value: Number(input) }
  }
  return { error: `"${input}" is not a distance. Use meters like 6.45.` }
}

export function formatMark(event, value) {
  if (event.type === 'distance') return `${value.toFixed(2)}m`
  if (value < 60) return value.toFixed(2)
  const min = Math.floor(value / 60)
  const sec = (value - min * 60).toFixed(2).padStart(5, '0')
  return `${min}:${sec}`
}

export function isBetter(event, a, b) {
  return event.type === 'time' ? a < b : a > b
}

// Best result first.
export function rankResults(event, results) {
  return [...results].sort((a, b) => (event.type === 'time' ? a.value - b.value : b.value - a.value))
}

export function findPR(event, results) {
  return results.length ? rankResults(event, results)[0] : null
}

export function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
