// The fixed list of events. "time" events: lower is better. "distance": higher is better.
export const EVENTS = [
  { id: '100m', name: '100m', type: 'time', hint: 'Time in seconds, e.g. 12.41' },
  { id: '400m', name: '400m', type: 'time', hint: 'Seconds or m:ss, e.g. 58.20 or 1:02.40' },
  { id: '1600m', name: '1600m', type: 'time', hint: 'Minutes and seconds, e.g. 5:12.30' },
  { id: 'long-jump', name: 'Long jump', type: 'distance', hint: 'Meters, e.g. 6.45' },
  { id: 'shot-put', name: 'Shot put', type: 'distance', hint: 'Meters, e.g. 13.20' },
]

export function findEvent(id) {
  return EVENTS.find((e) => e.id === id)
}
