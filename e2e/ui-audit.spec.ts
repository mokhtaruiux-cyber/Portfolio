import { expect, test, type Locator, type Page } from '@playwright/test';

const viewports = [
  { name: 'mobile-390x844', width: 390, height: 844 },
  { name: 'tablet-768x1024', width: 768, height: 1024 },
  { name: 'desktop-1440x900', width: 1440, height: 900 },
];

const routes = {
  projects: '/projects',
  projectDetail: '/projects/nodel-restaurant-system',
  blog: '/blog',
};

const outPath = (name: string) => `test-results/ui-audit/${name}.png`;

async function shot(page: Page, name: string) {
  await page.screenshot({ path: outPath(name), fullPage: true });
}

async function clipNavZone(
  page: Page,
  label: string,
  target: Locator,
) {
  const nav = page.locator('nav').first();
  await expect(nav).toBeVisible();

  const navBox = await nav.boundingBox();
  const targetBox = (await target.count()) ? await target.boundingBox() : null;
  const navZ = await nav.evaluate((el: HTMLElement) => getComputedStyle(el).zIndex);
  const targetZ = await target.evaluate((el: HTMLElement) => getComputedStyle(el).zIndex);

  console.log(`[${label}] nav bbox:`, navBox);
  console.log(`[${label}] target bbox:`, targetBox);
  console.log(`[${label}] nav z-index:`, navZ);
  console.log(`[${label}] target z-index:`, targetZ);

  if (navBox && targetBox) {
    const navBottom = navBox.y + navBox.height;
    const overlap = targetBox.y < navBottom;
    console.log(
      `[${label}] overlap: target.top (${targetBox.y.toFixed(1)}) < nav.bottom (${navBottom.toFixed(1)}) => ${overlap}`,
    );
  } else {
    console.log(`[${label}] overlap: could not resolve both bounding boxes.`);
  }

  const viewport = page.viewportSize();
  if (!viewport || !navBox) return;

  const clipHeight = Math.min(
    viewport.height,
    Math.ceil(((targetBox?.y ?? (navBox.y + navBox.height)) + (targetBox?.height ?? 0)) + 120),
  );

  await page.screenshot({
    path: outPath(`${label}-clip-nav-zone`),
    clip: { x: 0, y: 0, width: viewport.width, height: clipHeight },
  });
}

test.describe('UI audit (read-only visual proof)', () => {
  test('A) navbar overlap proof on home work sticky bar', async ({ page }) => {
    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(300);

      // Move into the work section so the sticky filter bar can pin under the navbar.
      await page.evaluate(() => {
        document.getElementById('work')?.scrollIntoView({ behavior: 'auto', block: 'start' });
        window.scrollBy(0, 220);
      });
      await page.waitForTimeout(200);
      await page.mouse.wheel(0, 600);
      await page.waitForTimeout(200);

      await shot(page, `A-${vp.name}-work-full`);
      const stickyBar = page.locator('main div.sticky').first();
      await expect(stickyBar).toBeVisible();
      await clipNavZone(page, `A-${vp.name}-work`, stickyBar);
    }
  });

  test('B) duplicate back controls on project detail', async ({ page }) => {
    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(routes.projectDetail, { waitUntil: 'networkidle' });
      await page.waitForTimeout(300);

      const backButton = page.locator('button', { hasText: /back/i });
      const backToTop = page.locator('button', { hasText: /top/i });
      const fixedFloating = page.locator('[class*="fixed"][class*="bottom"]');

      console.log(`[B-${vp.name}] back count:`, await backButton.count());
      console.log(`[B-${vp.name}] top count:`, await backToTop.count());
      console.log(`[B-${vp.name}] fixed-bottom count:`, await fixedFloating.count());

      const fixedBox = (await fixedFloating.count()) ? await fixedFloating.first().boundingBox() : null;
      console.log(`[B-${vp.name}] fixed-bottom bbox:`, fixedBox);

      await shot(page, `B-${vp.name}-detail-full`);

      const topLeftWidth = Math.min(520, vp.width);
      const topLeftHeight = Math.min(520, vp.height);
      await page.screenshot({
        path: outPath(`B-${vp.name}-detail-clip-top-left`),
        clip: { x: 0, y: 0, width: topLeftWidth, height: topLeftHeight },
      });

      const clipWidth = Math.min(520, vp.width);
      const clipHeight = Math.min(520, vp.height);
      await page.screenshot({
        path: outPath(`B-${vp.name}-detail-clip-bottom-right`),
        clip: {
          x: Math.max(0, vp.width - clipWidth),
          y: Math.max(0, vp.height - clipHeight),
          width: clipWidth,
          height: clipHeight,
        },
      });
    }
  });

  test('C) card media sizing proof on desktop', async ({ page }) => {
    const desktop = viewports[2];
    if (!desktop) return;
    await page.setViewportSize({ width: desktop.width, height: desktop.height });

    await page.goto(routes.projects, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);

    const firstProjectCard = page.locator('main button:has(img)').first();
    await expect(firstProjectCard).toBeVisible();

    const projectImg = firstProjectCard.locator('img').first();
    const projectCardBox = await firstProjectCard.boundingBox();
    const projectImgBox = await projectImg.boundingBox();

    console.log('[C-projects] card bbox:', projectCardBox);
    console.log('[C-projects] img bbox:', projectImgBox);
    if (projectImgBox) {
      console.log('[C-projects] img aspect:', (projectImgBox.width / projectImgBox.height).toFixed(3));
    }

    await shot(page, 'C-desktop-projects-full');
    await firstProjectCard.screenshot({ path: outPath('C-desktop-projects-card') });

    await page.goto(routes.blog, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);

    const firstBlogCard = page.locator('main button:has(img)').first();
    await expect(firstBlogCard).toBeVisible();

    const blogImg = firstBlogCard.locator('img').first();
    const blogCardBox = await firstBlogCard.boundingBox();
    const blogImgBox = await blogImg.boundingBox();

    console.log('[C-blog] card bbox:', blogCardBox);
    console.log('[C-blog] img bbox:', blogImgBox);
    if (blogImgBox) {
      console.log('[C-blog] img aspect:', (blogImgBox.width / blogImgBox.height).toFixed(3));
    }

    await shot(page, 'C-desktop-blog-full');
    await firstBlogCard.screenshot({ path: outPath('C-desktop-blog-card') });
  });
});
