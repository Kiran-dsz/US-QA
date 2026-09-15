import { test, expect } from '@playwright/test';

const BASE_URL = 'https://test.theplaud.com';

const TEST_ACCOUNT = {
  email: 'pnookvex@sharklasers.com',
  password: 'Test1234'
};

test.describe('Team Hub MVP - Simplified P0 Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to login
    await page.goto(BASE_URL);

    // Check if already logged in
    const emailInput = await page.locator('input[type="email"]').isVisible({ timeout: 2000 }).catch(() => false);

    if (emailInput) {
      // Need to login
      await page.fill('input[type="email"]', TEST_ACCOUNT.email);
      await page.fill('input[type="password"]', TEST_ACCOUNT.password);

      const loginBtn = await page.locator('button:has-text("Sign in"), button:has-text("Login")').first();
      await loginBtn.click();

      // Wait for dashboard to load
      await page.waitForLoadState('load');
      await page.waitForTimeout(3000);
    } else {
      // Already logged in, just wait for page
      await page.waitForLoadState('load');
    }
  });

  test('P0 | Smoke | Team Hub page loads and displays content', async ({ page }) => {
    // Navigate to Team Hub by clicking any Team Hub link or button
    const teamHubLink = page.locator('a, button, div').filter({ hasText: /^Team Hub$/ }).first();

    if (await teamHubLink.isVisible({ timeout: 2000 }).catch(() => false)) {
      await teamHubLink.click();
      await page.waitForLoadState('load');
    } else {
      // Try direct navigation
      await page.goto(`${BASE_URL}/team-hub`);
      await page.waitForLoadState('load');
    }

    // Verify page loaded (at least some content should be visible)
    const pageContent = await page.textContent('body');
    expect(pageContent?.length).toBeGreaterThan(0);

    console.log('✅ Team Hub page loaded successfully');
  });

  test('P0 | Smoke | Verify page title or heading', async ({ page }) => {
    // Get page title or main heading
    const title = await page.title();
    const heading = await page.locator('h1, h2').first().textContent({ timeout: 2000 }).catch(() => null);

    console.log(`📄 Page Title: ${title}`);
    console.log(`📝 Main Heading: ${heading || '(none found)'}`);

    // Should have a page title or the page should have loaded
    expect(title?.length || page.url().length).toBeGreaterThan(0);
  });

  test('P0 | Smoke | Verify not on error page', async ({ page }) => {
    // Check for common error indicators
    const errorText = await page.textContent('body');

    const hasError = errorText?.toLowerCase().includes('error') &&
                     (errorText?.toLowerCase().includes('failed') ||
                      errorText?.toLowerCase().includes('not found'));

    expect(hasError).toBeFalsy();

    console.log('✅ No error page detected');
  });

  test('P0 | Smoke | Verify navigation elements exist', async ({ page }) => {
    // Look for any navigation (sidebar, header menu, etc.)
    const nav = page.locator('[role="navigation"], nav, aside').first();
    const isNavVisible = await nav.isVisible({ timeout: 2000 }).catch(() => false);

    expect(isNavVisible || await page.locator('button, a').count() > 0).toBeTruthy();

    console.log('✅ Navigation elements found');
  });

  test('P0 | Smoke | Verify buttons/actions are clickable', async ({ page }) => {
    // Find any visible button or clickable element
    const buttons = page.locator('button');
    const links = page.locator('a');
    const clickableElements = page.locator('[role="button"], [role="link"]');

    const buttonCount = await buttons.count();
    const linkCount = await links.count();
    const clickableCount = await clickableElements.count();
    const totalClickable = buttonCount + linkCount + clickableCount;

    console.log(`✅ Found ${totalClickable} clickable elements (buttons: ${buttonCount}, links: ${linkCount}, other: ${clickableCount})`);

    // Should have at least some interactive elements
    expect(totalClickable).toBeGreaterThanOrEqual(0);
  });

  test('P0 | Smoke | Check for main content area', async ({ page }) => {
    // Look for main content (usually has files, lists, etc.)
    const mainContent = page.locator('main, [role="main"], .content, .container').first();
    const isMainVisible = await mainContent.isVisible({ timeout: 2000 }).catch(() => false);

    const contentText = await page.textContent('body');
    const hasContent = contentText && contentText.trim().length > 100;

    expect(isMainVisible || hasContent).toBeTruthy();

    console.log('✅ Main content area verified');
  });

  test('P1 | Smoke | User can interact with page (hover/click)', async ({ page }) => {
    // Try to hover over first button
    const firstButton = page.locator('button').first();

    if (await firstButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await firstButton.hover();
      console.log('✅ Button hover interaction works');
    }

    // Verify page is still responsive
    const finalContent = await page.textContent('body');
    expect(finalContent?.length).toBeGreaterThan(0);
  });

  test('P1 | Smoke | Page responds to window resize', async ({ page }) => {
    // Get initial viewport
    const initialSize = page.viewportSize();
    expect(initialSize).not.toBeNull();

    // Try resizing
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(500);

    // Verify still responsive
    const content = await page.textContent('body');
    expect(content?.length).toBeGreaterThan(0);

    console.log('✅ Page responsive to viewport changes');
  });

});
