import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import HomePage from './pages/HomePage.jsx'
import EventPage from './pages/EventPage.jsx'
import LogResultPage from './pages/LogResultPage.jsx'
import ResultSavedPage from './pages/ResultSavedPage.jsx'
import OfficialLinksPage from './pages/OfficialLinksPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

// One route per screen in the wireflow.
export default function App() {
  const { pathname } = useLocation()
  const firstRender = useRef(true)

  // After each screen change: name the browser tab after the screen, and move
  // focus to its heading so keyboard and screen-reader users start at the top.
  useEffect(() => {
    const h1 = document.querySelector('main h1')
    document.title = h1 ? `${h1.textContent} - Splits` : 'Splits'
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (h1) {
      h1.tabIndex = -1
      h1.focus()
    }
  }, [pathname])

  return (
    <>
      <Header />
      <main className="page">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events/:eventId" element={<EventPage />} />
          <Route path="/events/:eventId/log" element={<LogResultPage />} />
          <Route path="/events/:eventId/saved" element={<ResultSavedPage />} />
          <Route path="/links" element={<OfficialLinksPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  )
}
