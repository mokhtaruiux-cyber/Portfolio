import { test, expect } from '@playwright/test';

test('home loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Designing Digital Products/i })).toBeVisible();
});

test('projects route loads', async ({ page }) => {
  await page.goto('/projects');
  await expect(page.getByRole('heading', { name: /The Archive/i })).toBeVisible();
});

test('project detail route loads', async ({ page }) => {
  await page.goto('/projects/nodel-restaurant-system');
  await expect(page.getByRole('heading', { name: /Nodel Restaurant App/i })).toBeVisible();
});

test('blog index route loads', async ({ page }) => {
  await page.goto('/blog');
  await expect(page.getByRole('heading', { name: /Latest Articles/i })).toBeVisible();
});

test('blog article route loads', async ({ page }) => {
  await page.goto('/blog/the-future-of-ai-in-ux');
  await expect(page.getByRole('heading', { name: /The Future of AI in UX Design/i })).toBeVisible();
});
