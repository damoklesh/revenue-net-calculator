import { Link } from 'react-router-dom'
import { ArrowIcon } from '../components/ArrowIcon'

export function CalculatorPage() {
  return (
    <div className="placeholder-page content-grid">
      <div className="placeholder-card">
        <p className="eyebrow">Your estimate</p>
        <h1>Calculator coming next.</h1>
        <p>
          The calculation experience is being prepared. This placeholder marks the route so the full salary flow can be added without changing the shared navigation.
        </p>
        <div className="placeholder-actions">
          <Link className="button button-primary" to="/">Back to home <ArrowIcon direction="left" /></Link>
          <Link className="text-link" to="/methodology">Read the methodology <ArrowIcon /></Link>
        </div>
        <div className="placeholder-label"><span aria-hidden="true">◌</span> Calculator — next story</div>
      </div>
    </div>
  )
}
