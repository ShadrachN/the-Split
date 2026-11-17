// The events you can track.
// "time" events: a smaller number is better.
// "distance" events: a bigger number is better.
export const events = [
  { id: '100m', name: '100m', type: 'time', hint: 'Seconds, like 12.41' },
  { id: '400m', name: '400m', type: 'time', hint: 'Seconds or minutes:seconds, like 58.20 or 1:02.40' },
  { id: '1600m', name: '1600m', type: 'time', hint: 'Minutes:seconds, like 5:12.30' },
  { id: 'long-jump', name: 'Long jump', type: 'distance', hint: 'Meters, like 6.45' },
  { id: 'shot-put', name: 'Shot put', type: 'distance', hint: 'Meters, like 13.20' },
]

export function getEvent(id) {
  return events.find((event) => event.id === id)
}

// Turns what the athlete typed into a number (seconds or meters).
// Returns null if it isn't a real mark.
export function parseMark(event, text) {
  text = text.trim()
  if (text === '') return null

  // Times like 1:02.40 (minutes:seconds)
  if (event.type === 'time' && text.includes(':')) {
    const parts = text.split(':')
    if (parts.length !== 2 || parts[0] === '' || parts[1] === '') return null
    const minutes = Number(parts[0])
    const seconds = Number(parts[1])
    if (isNaN(minutes) || isNaN(seconds) || minutes < 0 || seconds < 0 || seconds >= 60) return null
    return minutes * 60 + seconds
  }

  // Plain numbers like 12.41 or 6.45
  const number = Number(text)
  if (isNaN(number) || number <= 0) return null
  return number
}

// Turns a number back into text, like 12.41, 1:02.40 or 6.45m
export function formatMark(event, value) {
  if (event.type === 'distance') return value.toFixed(2) + 'm'
  if (value < 60) return value.toFixed(2)

  const minutes = Math.floor(value / 60)
  let seconds = (value - minutes * 60).toFixed(2)
  if (seconds < 10) seconds = '0' + seconds
  return minutes + ':' + seconds
}

// Is mark a better than mark b?
export function isBetter(event, a, b) {
  if (event.type === 'time') return a < b
  return a > b
}

// Returns the results sorted best first.
export function sortBestFirst(event, results) {
  const copy = [...results]
  if (event.type === 'time') {
    copy.sort((a, b) => a.value - b.value)
  } else {
    copy.sort((a, b) => b.value - a.value)
  }
  return copy
}

// Personal record = the best result (or null if there are none).
export function getPR(event, results) {
  if (results.length === 0) return null
  return sortBestFirst(event, results)[0]
}

// "2026-04-12" -> "Apr 12"
export function formatDate(dateText) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const parts = dateText.split('-')
  return months[Number(parts[1]) - 1] + ' ' + Number(parts[2])
}

// Today's date as "YYYY-MM-DD" so we can compare it with the date input.
export function today() {
  const d = new Date()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return d.getFullYear() + '-' + month + '-' + day
}
