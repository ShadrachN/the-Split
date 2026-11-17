import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="card">
      <h1>Page not found</h1>
      <p>There is nothing at this address.</p>
      <Link to="/" className="button">Back to events</Link>
    </div>
  )
}
