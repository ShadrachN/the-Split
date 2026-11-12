import { useState } from 'react'
import { useSplits } from '../SplitsContext.jsx'
import Card from '../components/Card.jsx'
import FormField from '../components/FormField.jsx'
import Button from '../components/Button.jsx'
import './OfficialLinksPage.css'

const SITES = [
  { host: 'tfrrs.org', name: 'TFRRS' },
  { host: 'milesplit.com', name: 'MileSplit' },
  { host: 'athletic.net', name: 'Athletic.net' },
]

// Returns the site name for a valid profile link, or null.
function matchSite(text) {
  let url
  try {
    url = new URL(text.trim())
  } catch {
    return null
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null
  const host = url.hostname.toLowerCase()
  const site = SITES.find((s) => host === s.host || host.endsWith(`.${s.host}`))
  // A bare home page (https://www.tfrrs.org/) is not a profile.
  if (!site || url.pathname.replace(/\/+$/, '') === '') return null
  return site.name
}

export default function OfficialLinksPage() {
  const { links, addLink, removeLink } = useSplits()
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const site = matchSite(url)
    // Decision: is it a TFRRS, MileSplit or Athletic.net link?
    if (!site) {
      setStatus('')
      setError('Paste the full link to your profile page on TFRRS, MileSplit or Athletic.net, starting with https://.')
      return
    }
    addLink({ site, url: url.trim() })
    setUrl('')
    setError('')
    setStatus(`${site} link saved. Open it to check it is your profile.`)
  }

  return (
    <div className="stack links-page">
      <h1>Official results</h1>
      <p>Save links to your official profiles so you can check your results against them.</p>

      <Card>
        <h2>Saved links</h2>
        {links.length === 0 ? (
          <p>No links saved yet.</p>
        ) : (
          <ul className="links-page__list">
            {links.map((l) => (
              <li key={l.id}>
                <a href={l.url} target="_blank" rel="noreferrer">
                  View on {l.site}<span className="visually-hidden"> (opens in a new tab)</span>
                </a>
                <Button variant="secondary" onClick={() => removeLink(l.id)}
                  aria-label={`Remove ${l.site} link`}>Remove</Button>
              </li>
            ))}
          </ul>
        )}
        <p role="status" className="links-page__status">{status}</p>
      </Card>

      <Card>
        <h2>Add a link</h2>
        <form onSubmit={handleSubmit} noValidate>
          <FormField id="url" type="url" label="Profile link"
            hint="From TFRRS, MileSplit or Athletic.net" placeholder="https://"
            value={url} onChange={(e) => setUrl(e.target.value)} error={error} announce />
          <div className="button-row links-page__actions">
            <Button type="submit">Add link</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
