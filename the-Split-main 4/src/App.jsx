import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import HomePage from './pages/HomePage.jsx'
import EventPage from './pages/EventPage.jsx'
import LogResultPage from './pages/LogResultPage.jsx'
import ResultSavedPage from './pages/ResultSavedPage.jsx'
import LinksPage from './pages/LinksPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  // All the results and links live here and get passed down to the pages.
  // They are only kept while the tab is open (saving them is a later feature).
  const [results, setResults] = useState([])
  const [links, setLinks] = useState([])

  function addResult(result) {
    const newResult = { ...result, id: Date.now() }
    setResults([...results, newResult])
    return newResult.id
  }

  function addLink(link) {
    setLinks([...links, { ...link, id: Date.now() }])
  }

  function removeLink(id) {
    setLinks(links.filter((link) => link.id !== id))
  }

  return (
    <>
      <Header />
      <main className="page">
        <Routes>
          <Route path="/" element={<HomePage results={results} />} />
          <Route path="/events/:eventId" element={<EventPage results={results} />} />
          <Route path="/events/:eventId/log" element={<LogResultPage addResult={addResult} />} />
          <Route path="/events/:eventId/saved" element={<ResultSavedPage results={results} />} />
          <Route
            path="/links"
            element={<LinksPage links={links} addLink={addLink} removeLink={removeLink} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  )
}
