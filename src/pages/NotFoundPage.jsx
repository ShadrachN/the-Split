import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'

export default function NotFoundPage() {
  return (
    <Card>
      <h1>Page not found</h1>
      <p>There is no screen at this address.</p>
      <Button to="/">Back to events</Button>
    </Card>
  )
}
