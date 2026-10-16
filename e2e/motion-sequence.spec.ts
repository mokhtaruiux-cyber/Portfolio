import { expect, test } from '@playwright/test';

test('home sections enter in document order without overlapping', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.waitForFunction(() => document.body.classList.contains('dark') || document.body.classList.contains('light'));

  const sections = page.locator('[data-motion-section-state]');
  await expect(sections.first()).not.toHaveAttribute('data-motion-section-state', 'pending');

  await page.evaluate(() => {
    const sample = () => {
      const stages = [...document.querySelectorAll('[data-motion-section-state]')].map(
        (node) => node.getAttribute('data-motion-section-state')
      );
      const activeIndex = stages.indexOf('active');
      if (stages.filter((stage) => stage === 'active').length > 1) {
        document.documentElement.dataset.motionOverlap = 'true';
      }
      if (activeIndex > 0 && stages.slice(0, activeIndex).some((stage) => stage !== 'complete' && stage !== 'skipped')) {
        document.documentElement.dataset.motionOutOfOrder = 'true';
      }
    };
    new MutationObserver(sample).observe(document.body, {
      attributes: true,
      attributeFilter: ['data-motion-section-state'],
      subtree: true,
    });
    sample();
  });

  for (const position of [1100, 1350, 2250, 3350, 4450]) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), position);
    await page.waitForTimeout(250);
  }

  await expect.poll(async () => sections.nth(5).getAttribute('data-motion-section-state')).not.toBe('pending');
  await expect(page.locator('html')).not.toHaveAttribute('data-motion-overlap', 'true');
  await expect(page.locator('html')).not.toHaveAttribute('data-motion-out-of-order', 'true');
});

test('reduced motion shows the headline immediately', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const firstWord = page.locator('[data-title-word]').first();
  await expect(firstWord).toBeVisible();
  const style = await firstWord.evaluate((node) => ({
    opacity: getComputedStyle(node).opacity,
    filter: getComputedStyle(node).filter,
  }));
  expect(style.opacity).toBe('1');
  expect(style.filter).toBe('none');
});

test('project showcase screens reveal in order as the gallery is browsed', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/projects/dawwem-hr-platform');
  await page.waitForFunction(() => document.body.classList.contains('dark') || document.body.classList.contains('light'));

  const sections = page.locator('[data-motion-section-state]');
  expect(await sections.count()).toBeGreaterThan(10);
  const targetTop = await sections.nth(4).evaluate((node) => window.scrollY + node.getBoundingClientRect().top);
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), targetTop);

  await expect.poll(async () => sections.nth(4).getAttribute('data-motion-section-state')).not.toBe('pending');
  await expect.poll(async () => sections.nth(4).evaluate((node) => node.getBoundingClientRect().top)).toBeLessThan(900);
  const states = await sections.evaluateAll((nodes) => nodes.map((node) => node.getAttribute('data-motion-section-state')));
  expect(states.slice(0, 4).every((state) => state === 'complete' || state === 'skipped')).toBe(true);
  expect(states.filter((state) => state === 'active').length).toBeLessThanOrEqual(1);
});

test('archive cards reveal when each card reaches the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/projects');
  const cards = page.locator('.space-y-12 > div');
  await expect(cards).toHaveCount(9);
  await expect(cards.nth(1)).toHaveCSS('opacity', '0');

  await cards.nth(1).scrollIntoViewIfNeeded();
  await expect(cards.nth(1)).toHaveCSS('opacity', '1', { timeout: 7000 });
});

test('process progress advances without a frame-by-frame React update', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.waitForFunction(() => document.body.classList.contains('dark') || document.body.classList.contains('light'));

  const process = page.locator('#process');
  const targetTop = await process.evaluate((node) => window.scrollY + node.getBoundingClientRect().top);
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), targetTop);
  await expect(process.locator('.process-progress')).toHaveCount(1);

  const activeTab = process.locator('[role="tab"][aria-selected="true"]');
  const firstId = await activeTab.getAttribute('id');
  // The process autoplay waits while the next section takes its entrance turn.
  await expect.poll(async () => activeTab.getAttribute('id'), { timeout: 15000 }).not.toBe(firstId);
});
