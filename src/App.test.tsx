import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from './App'

function renderApp(initialEntry = '/') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <App />
    </MemoryRouter>,
  )
}

describe('app navigation', () => {
  it('renders the landing value proposition, countries and three steps', () => {
    renderApp()

    expect(screen.getByRole('heading', { name: /know what your work is really worth/i })).toBeInTheDocument()
    expect(screen.getAllByText(/France/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Spain/).length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { name: /three steps to a number/i })).toBeInTheDocument()
    expect(screen.getByText(/calculations run locally/i)).toBeInTheDocument()
    expect(screen.getByText(/no registration required/i)).toBeInTheDocument()
    expect(screen.getAllByText(/No account needed/i).length).toBeGreaterThan(0)
  })

  it('navigates through the primary CTA and returns home', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('link', { name: /calculate my net salary/i }))
    expect(screen.getByRole('heading', { name: /calculator coming next/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /calculator/i })).toHaveClass('active')

    await user.click(screen.getByRole('link', { name: /back to home/i }))
    expect(screen.getByRole('heading', { name: /know what your work is really worth/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^home$/i })).toHaveClass('active')
  })

  it('shows the useful 404 view for unknown routes', () => {
    renderApp('/never-heard-of-it')

    expect(screen.getByRole('heading', { name: /back to a useful number/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /return home/i })).toBeInTheDocument()
  })

  it.each([
    ['/', /^home$/i],
    ['/calculator', /^calculator$/i],
    ['/methodology', /^methodology$/i],
  ])('marks %s as the active navigation route', (route, linkName) => {
    renderApp(route)

    const activeLink = screen.getByRole('link', { name: linkName })
    expect(activeLink).toHaveClass('active')
    expect(activeLink).toHaveAttribute('aria-current', 'page')
  })

  it('highlights methodology and supports keyboard activation', async () => {
    const user = userEvent.setup()
    renderApp()
    const methodologyLink = screen.getByRole('link', { name: /^methodology$/i })

    methodologyLink.focus()
    expect(methodologyLink).toHaveFocus()
    await user.keyboard('{Enter}')

    expect(screen.getByRole('heading', { name: /methodology is on its way/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^methodology$/i })).toHaveClass('active')
  })

  it('activates the primary CTA from the keyboard', async () => {
    const user = userEvent.setup()
    renderApp()
    const primaryCta = screen.getByRole('link', { name: /calculate my net salary/i })

    primaryCta.focus()
    expect(primaryCta).toHaveFocus()
    await user.keyboard('{Enter}')

    expect(screen.getByRole('heading', { name: /calculator coming next/i })).toBeInTheDocument()
  })
})
