import { Link } from 'react-router-dom'
import './Button.css'

// A real <button> for actions, a real <a> (Link) when it goes to another screen.
export default function Button({ to, variant = 'primary', children, ...rest }) {
  const className = `button button--${variant}`
  if (to) return <Link to={to} className={className} {...rest}>{children}</Link>
  return <button className={className} {...rest}>{children}</button>
}
