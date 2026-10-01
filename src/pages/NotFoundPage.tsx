import { Link } from 'react-router-dom'
import { ArrowIcon } from '../components/ArrowIcon'

export function NotFoundPage() {
  return (
    <div className="not-found-page content-grid">
      <div className="not-found-mark" aria-hidden="true">404</div>
      <div className="not-found-copy">
        <p className="eyebrow">This page took a wrong turn</p>
        <h1>Let’s get you back to a useful number.</h1>
        <p>The page you’re looking for doesn’t exist, or the link may have changed.</p>
        <Link className="button button-primary" to="/">Return home <ArrowIcon direction="left" /></Link>
      </div>
    </div>
  )
}
