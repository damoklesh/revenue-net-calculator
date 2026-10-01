import { test, expect } from '@playwright/test';
test('landing, calculator, methodology and return navigation', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Del bruto al neto');
  await expect(page.locator('.countries')).toContainText('España');
  await expect(page.locator('.countries')).toContainText('Francia');
  await expect(page.locator('.steps li')).toHaveCount(3);
  await expect(page.locator('.privacy')).toContainText('Sin registro');
  await expect(page.locator('.privacy')).toContainText('en tu dispositivo');
  await page.getByRole('link', { name: 'Calcular mi salario neto' }).click();
  await expect(page).toHaveURL(/\/calculator$/);
  await page.getByRole('navigation').getByRole('link', { name: 'Metodología' }).click();
  await expect(page).toHaveURL(/\/methodology$/);
  await page.getByRole('link', { name: 'Volver al inicio' }).click();
  await expect(page).toHaveURL(/\/$/);
});
for (const route of ['/calculator', '/methodology']) {
  test(`direct load and reload ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(route === '/calculator' ? 'Calculadora' : 'Metodología');
  });
}
test('unknown route offers recovery and focuses content', async ({ page }) => {
  await page.goto('/unknown/page');
  await expect(page.getByRole('heading', { name: 'Página no encontrada' })).toBeVisible();
  await expect(page.locator('main')).toBeFocused();
  await page.getByRole('link', { name: 'Volver al inicio' }).click();
  await expect(page).toHaveURL(/\/$/);
});
test('new interface is available in Spanish, French and English', async ({ page }) => {
  await page.goto('/');
  for (const [language, cta] of [['fr', 'Calculer mon salaire net'], ['en', 'Calculate my net salary'], ['es', 'Calcular mi salario neto']]) {
    await page.getByRole('combobox').selectOption(language);
    await expect(page.locator('html')).toHaveAttribute('lang', language);
    await page.getByRole('link', { name: cta }).click();
    await expect(page).toHaveURL(/\/calculator$/);
    await page.getByRole('navigation').getByRole('link').first().click();
  }
});

test('landing remains usable on a narrow screen', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Calcular mi salario neto' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('landing-mobile.png'), fullPage: true });
});
