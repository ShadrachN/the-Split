import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import HomePage from './pages/HomePage.jsx'
import EventPage from './pages/EventPage.jsx'
import LogResultPage from './pages/LogResultPage.jsx'
import ResultSavedPage from './pages/ResultSavedPage.jsx'
import OfficialLinksPage from './pages/OfficialLinksPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

// One route per screen in the wireflow.
export default function App() {
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
