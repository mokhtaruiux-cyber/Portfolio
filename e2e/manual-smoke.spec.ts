import { expect, test } from '@playwright/test';

test('theme toggle flips body theme class and persists localStorage', async ({ page }) => {
  await page.goto('/');

  const toggle = page.getByRole('button', { name: /toggle theme/i });
  const body = page.locator('body');

  await expect(toggle).toBeVisible();
  const initialIsDark = await body.evaluate((el) => el.classList.contains('dark'));

  await toggle.click();

  if (initialIsDark) {
    await expect(body).toHaveClass(/light/);
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('theme'))).toBe('light');
    return;
  }

  await expect(body).toHaveClass(/dark/);
  await expect.poll(async () => page.evaluate(() => localStorage.getItem('theme'))).toBe('dark');
});

test('companies tooltip appears when a company button is focused', async ({ page }) => {
  await page.goto('/');

  const companiesSection = page
    .getByRole('heading', { name: /Working with/i })
    .locator('xpath=ancestor::section[1]');
  const firstCompanyButton = companiesSection.locator('button[tabindex="0"]').first();

  await expect(firstCompanyButton).toBeVisible();
  await firstCompanyButton.focus();

  const tooltipId = await firstCompanyButton.getAttribute('aria-describedby');
  expect(tooltipId).toBeTruthy();
  await expect(page.locator(`#${tooltipId}`)).toBeVisible();
});
