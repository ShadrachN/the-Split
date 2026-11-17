import { useState } from 'react'

// The official results sites we accept links from.
const sites = [
  { name: 'TFRRS', domain: 'tfrrs.org' },
  { name: 'MileSplit', domain: 'milesplit.com' },
  { name: 'Athletic.net', domain: 'athletic.net' },
]

// Returns the site name if the link is from one of the sites above, otherwise null.
function getSiteName(link) {
  if (!link.startsWith('https://') && !link.startsWith('http://')) return null
  for (const site of sites) {
    if (link.includes(site.domain + '/')) return site.name
  }
  return null
}

export default function LinksPage({ links, addLink, removeLink }) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const siteName = getSiteName(url.trim())

    if (siteName === null) {
      setMessage('')
      setError('Paste the full link to your profile on TFRRS, MileSplit or Athletic.net, starting with https://')
      return
    }

    addLink({ site: siteName, url: url.trim() })
    setUrl('')
    setError('')
    setMessage(siteName + ' link saved!')
  }

  return (
    <div className="narrow">
      <h1>Official results</h1>
      <p>Save links to your official profiles so you can check your results against them.</p>

      <div className="card">
        <h2>Saved links</h2>
        {links.length === 0 && <p>No links saved yet.</p>}
        <ul className="link-list">
          {links.map((link) => (
            <li key={link.id}>
              <a href={link.url} target="_blank" rel="noreferrer">View on {link.site}</a>
              <button className="button secondary" onClick={() => removeLink(link.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        {message && <p className="success" role="status">{message}</p>}
      </div>

      <form className="card" onSubmit={handleSubmit} noValidate>
        <h2>Add a link</h2>
        <label htmlFor="url">Profile link</label>
        <p className="hint">From TFRRS, MileSplit or Athletic.net</p>
        <input id="url" type="url" placeholder="https://" value={url}
          onChange={(e) => setUrl(e.target.value)} />
        {error && <p className="error" role="alert">Error: {error}</p>}

        <div className="button-row">
          <button type="submit" className="button">Add link</button>
        </div>
      </form>
    </div>
  )
}
