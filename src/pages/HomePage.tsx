import { Link } from 'react-router-dom'
import { ArrowIcon } from '../components/ArrowIcon'
import { SectionIntro } from '../components/SectionIntro'

const steps = [
  {
    number: '01',
    title: 'Choose your country',
    text: 'Pick France or Spain to start with the right local rules.',
  },
  {
    number: '02',
    title: 'Share the basics',
    text: 'Add your gross salary and a few details about your situation.',
  },
  {
    number: '03',
    title: 'See the difference',
    text: 'Get a clear estimate of what could land in your account.',
  },
]

export function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-section content-grid" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-dark">Salary, made clear.</p>
          <h1 id="hero-title">Know what your work is really worth.</h1>
          <p className="hero-description">
            A calm, clear way to estimate your take-home pay before you sign, switch or negotiate.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/calculator">
              Calculate my net salary <ArrowIcon />
            </Link>
            <Link className="text-link" to="/methodology">
              See how it works <ArrowIcon />
            </Link>
          </div>
          <div className="privacy-note">
            <span className="privacy-icon" aria-hidden="true">✦</span>
            <span><strong>Private by default.</strong> Your numbers stay on your device because calculations run locally. No registration required. No account needed.</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="Illustration of a salary estimate" role="img">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="visual-dot dot-one" />
          <div className="visual-dot dot-two" />
          <div className="estimate-card">
            <div className="estimate-card-top">
              <span>YOUR ESTIMATE</span>
              <span className="estimate-status"><i /> Ready</span>
            </div>
            <p className="estimate-label">Monthly take-home</p>
            <p className="estimate-value">€2,840<span>.00</span></p>
            <div className="estimate-rule" />
            <div className="estimate-meta"><span>Gross salary</span><strong>€48,000 / year</strong></div>
            <div className="estimate-meta"><span>Country</span><strong>France <span className="flag">🇫🇷</span></strong></div>
            <div className="estimate-sparkline" aria-hidden="true">
              <span /><span /><span /><span /><span /><span /><span /><span />
            </div>
          </div>
          <div className="floating-chip chip-country"><span className="chip-icon">◉</span> France</div>
          <div className="floating-chip chip-private"><span className="chip-icon">✦</span> No account needed</div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Supported countries and privacy promise">
        <div className="content-grid trust-grid">
          <p>Built for your next move</p>
          <div className="trust-items">
            <span><b>FR</b> France</span>
            <span><b>ES</b> Spain</span>
            <span className="trust-private"><span aria-hidden="true">◌</span> Calculations stay on your device</span>
          </div>
        </div>
      </section>

      <section className="steps-section content-grid" aria-labelledby="steps-title">
        <div className="steps-heading">
          <SectionIntro
            description="No jargon. No hidden steps. Just a better starting point for your salary conversation."
            eyebrow="A clearer way forward"
            title="Three steps to a number you can trust."
            titleId="steps-title"
          />
          <Link className="circle-link" to="/calculator" aria-label="Go to calculator">
            <ArrowIcon />
          </Link>
        </div>
        <div className="steps-list">
          {steps.map((step) => (
            <article className="step-card" key={step.number}>
              <span className="step-number">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
              <ArrowIcon />
            </article>
          ))}
        </div>
      </section>

      <section className="closing-section content-grid" aria-labelledby="closing-title">
        <div className="closing-card">
          <div>
            <p className="eyebrow">Ready when you are</p>
            <h2 id="closing-title">Start with the number that matters.</h2>
          </div>
          <Link className="button button-light" to="/calculator">Start my estimate <ArrowIcon /></Link>
        </div>
      </section>
    </div>
  )
}
