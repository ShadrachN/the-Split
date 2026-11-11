import { createContext, useContext, useState } from 'react'

// Shared app state. Kept in memory only; saving in the browser is a later feature.
const SplitsContext = createContext(null)

export function SplitsProvider({ children }) {
  const [results, setResults] = useState([])
  const [links, setLinks] = useState([])

  function addResult(result) {
    const saved = { ...result, id: Date.now() }
    setResults((prev) => [...prev, saved])
    return saved
  }

  function addLink(link) {
    setLinks((prev) => [...prev, { ...link, id: Date.now() }])
  }

  function removeLink(id) {
    setLinks((prev) => prev.filter((l) => l.id !== id))
  }

  return (
    <SplitsContext.Provider value={{ results, addResult, links, addLink, removeLink }}>
      {children}
    </SplitsContext.Provider>
  )
}

export function useSplits() {
  return useContext(SplitsContext)
}
