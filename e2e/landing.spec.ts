import { expect, test } from '@playwright/test'

test('visitor can move through the core journey and use browser history', async ({ page }) => {
  const consoleErrors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => consoleErrors.push(error.message))

  await page.goto('/')
  await expect(page.getByRole('heading', { name: /know what your work is really worth/i })).toBeVisible()
  await page.getByRole('link', { name: /calculate my net salary/i }).click()
  await expect(page).toHaveURL(/\/calculator$/)
  await expect(page.getByRole('heading', { name: /calculator coming next/i })).toBeVisible()

  await page.getByRole('link', { name: /^methodology$/i }).click()
  await expect(page).toHaveURL(/\/methodology$/)
  await expect(page.getByRole('heading', { name: /methodology is on its way/i })).toBeVisible()

  await page.goBack()
  await expect(page).toHaveURL(/\/calculator$/)
  await expect(page.getByRole('heading', { name: /calculator coming next/i })).toBeVisible()
  await page.goBack()
  await expect(page).toHaveURL(/\/$/)
  expect(consoleErrors).toEqual([])
})

test('valid routes survive direct access and unknown routes show a useful 404', async ({ page }) => {
  const validRoutes = [
    { path: '/calculator', heading: /calculator coming next/i },
    { path: '/methodology', heading: /methodology is on its way/i },
  ]

  for (const route of validRoutes) {
    await page.goto(route.path)
    await expect(page.getByRole('heading', { name: route.heading })).toBeVisible()
    await page.reload()
    await expect(page.getByRole('heading', { name: route.heading })).toBeVisible()
  }

  await page.goto('/does-not-exist')
  await expect(page.getByRole('heading', { name: /back to a useful number/i })).toBeVisible()
})

test('landing page remains usable at a narrow width', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  await expect(page.getByRole('link', { name: /calculate my net salary/i })).toBeVisible()
  await expect(page.getByRole('navigation', { name: /primary navigation/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /^methodology$/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: /three steps to a number/i })).toBeVisible()
  const bodyWidth = await page.locator('body').evaluate((element) => element.scrollWidth)
  const viewportWidth = await page.evaluate(() => window.innerWidth)
  expect(bodyWidth).toBeLessThanOrEqual(viewportWidth)
})
