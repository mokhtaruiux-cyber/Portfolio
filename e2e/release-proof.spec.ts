import { expect, test } from '@playwright/test';

test('project detail clean URL serves prerendered metadata', async ({ request }) => {
  const response = await request.get('/projects/nodel-restaurant-system');
  expect(response.status()).toBe(200);

  const html = await response.text();
  expect(html).toContain('Nodel Restaurant App');
  expect(html).toContain('/projects/nodel-restaurant-system');
});

test('blog article clean URL serves article metadata', async ({ request }) => {
  const response = await request.get('/blog/how-social-media-is-reshaping-your-brain');
  expect(response.status()).toBe(200);

  const html = await response.text();
  expect(html).toContain('How Social Media Is Reshaping Your Brain');
  expect(html).toContain('content="article"');
  expect(html).toContain('/blog/how-social-media-is-reshaping-your-brain');
});

test('sitemap excludes draft project routes', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.status()).toBe(200);

  const xml = await response.text();
  expect(xml).not.toContain('dashboard-placeholder');
});

test('unknown routes return 404 from the release preview server', async ({ request }) => {
  const response = await request.get('/does-not-exist');
  expect(response.status()).toBe(404);
});
