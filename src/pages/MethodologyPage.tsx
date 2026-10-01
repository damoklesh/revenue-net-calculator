import { Link } from 'react-router-dom'
import { ArrowIcon } from '../components/ArrowIcon'

export function MethodologyPage() {
  return (
    <div className="placeholder-page content-grid">
      <div className="placeholder-card methodology-placeholder">
        <p className="eyebrow">How it works</p>
        <h1>Methodology is on its way.</h1>
        <p>
          This space will explain the country-specific rules, assumptions and official sources behind each estimate.
        </p>
        <div className="methodology-points">
          <span><i /> Country-specific rules</span>
          <span><i /> Clear assumptions</span>
          <span><i /> Versioned sources</span>
        </div>
        <div className="placeholder-actions">
          <Link className="button button-primary" to="/calculator">Go to calculator <ArrowIcon /></Link>
          <Link className="text-link" to="/">Back to home <ArrowIcon direction="left" /></Link>
        </div>
        <div className="placeholder-label"><span aria-hidden="true">◌</span> Methodology — next story</div>
      </div>
    </div>
  )
}
