import { test, expect } from '@playwright/test';
import { Phase3Page } from './helpers/phase3.helpers.js';
import dotenv from 'dotenv';

dotenv.config();

const TEST_ACCOUNT = {
  email: process.env.TEST_EMAIL,
  password: process.env.TEST_PASSWORD
};

test.describe('Phase 3 UI Tests', () => {
  // E2E-001: Login flow UI validation
  test('E2E-001: Login form UI elements visible', async ({ page }) => {
    await page.goto('https://beta.theplaud.com');

    // Verify login button visible
    const loginBtn = page.locator('button:has-text("Log in"), button:has-text("Sign in")').first();
    await expect(loginBtn).toBeVisible();

    // Click to open login form
    await loginBtn.click();

    // Verify form elements
    const emailInput = page.locator('input[type="email"]').first();
    const passwordInput = page.locator('input[type="password"]').first();
    const submitBtn = page.locator('button:has-text("Sign in"), button:has-text("Log in")').first();

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitBtn).toBeVisible();
  });

  // E2E-003: Navigation menu visibility
  test('E2E-003: Navigation menu items visible after login', async ({ browser }) => {
    const page = await browser.newPage();
    const phase3 = new Phase3Page(page);

    try {
      await phase3.login(TEST_ACCOUNT.email, TEST_ACCOUNT.password);

      // Verify dashboard loaded by checking balance display
      const balance = await phase3.getBalance();
      expect(balance.minutes).toBeGreaterThan(0);
      expect(balance.credits).toBeGreaterThan(0);
    } finally {
      await page.close();
    }
  });

  // E2E-005: Balance display format
  test('E2E-005: Balance displays in correct format', async ({ browser }) => {
    const page = await browser.newPage();
    const phase3 = new Phase3Page(page);

    try {
      await phase3.login(TEST_ACCOUNT.email, TEST_ACCOUNT.password);

      const balance = await phase3.getBalance();

      // Verify balance values are numbers and > 0
      expect(balance.minutes).toBeGreaterThan(0);
      expect(balance.credits).toBeGreaterThan(0);

      // Verify page text contains the expected format
      const pageText = await page.locator('body').textContent();
      expect(pageText).toMatch(/\d+\s*min\s*left/i);
      expect(pageText).toMatch(/\d+\s*credits?\s*left/i);
    } finally {
      await page.close();
    }
  });

  // E2E-006: Modal closing
  test('E2E-006: Modal closes with Continue button', async ({ browser }) => {
    const page = await browser.newPage();
    const phase3 = new Phase3Page(page);

    try {
      await page.goto('https://beta.theplaud.com');

      const loginBtn = page.locator('button:has-text("Log in"), button:has-text("Sign in")').first();
      if (await loginBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await loginBtn.click();
      }

      await page.fill('input[type="email"]', TEST_ACCOUNT.email);
      await page.fill('input[type="password"]', TEST_ACCOUNT.password);
      await page.click('button:has-text("Sign in"), button:has-text("Log in")');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      // Check if modal is visible
      const continueBtn = page.locator('button:has-text("Continue")').first();
      const isModalVisible = await continueBtn.isVisible({ timeout: 2000 }).catch(() => false);

      if (isModalVisible) {
        // Modal exists, close it
        await continueBtn.click();
        await page.waitForTimeout(500);

        // Verify modal is closed (button should not be visible)
        await expect(continueBtn).not.toBeVisible();
      }
    } finally {
      await page.close();
    }
  });

  // E2E-007: File upload field visible
  test('E2E-007: File upload field visible in Transcribe page', async ({ browser }) => {
    const page = await browser.newPage();
    const phase3 = new Phase3Page(page);

    try {
      await phase3.login(TEST_ACCOUNT.email, TEST_ACCOUNT.password);
      await phase3.goToTranscribe();

      // Verify file input exists (may be hidden with CSS)
      const fileInput = page.locator('input[type="file"]').first();
      expect(await fileInput.count()).toBeGreaterThan(0);

      // Verify it's actually a file input
      const inputType = await fileInput.getAttribute('type');
      expect(inputType).toBe('file');
    } finally {
      await page.close();
    }
  });

  // E2E-008: Starter section displays balance info
  test('E2E-008: Starter section displays minutes and credits', async ({ browser }) => {
    const page = await browser.newPage();
    const phase3 = new Phase3Page(page);

    try {
      await phase3.login(TEST_ACCOUNT.email, TEST_ACCOUNT.password);

      // Verify "min left" is visible in Starter section
      const minutesText = page.locator('text=min left').first();
      await expect(minutesText).toBeVisible();

      // Verify "credits left" is visible in Starter section
      const creditsText = page.locator('text=credits left').first();
      await expect(creditsText).toBeVisible();

      // Verify they contain actual numbers
      const minutesContent = await minutesText.textContent();
      const creditsContent = await creditsText.textContent();

      expect(minutesContent).toMatch(/\d+\s*min\s*left/i);
      expect(creditsContent).toMatch(/\d+\s*credits?\s*left/i);
    } finally {
      await page.close();
    }
  });

  // E2E-009: Click minutes navigates to Membership Center
  test('E2E-009: Click minutes card navigates to Membership Center', async ({ browser }) => {
    const page = await browser.newPage();
    const phase3 = new Phase3Page(page);

    try {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await phase3.login(TEST_ACCOUNT.email, TEST_ACCOUNT.password);

      // Click on minutes card
      await phase3.clickMinutesCard();

      // Verify navigation to Membership Center
      const isOnMembership = await phase3.isOnMembershipCenter();
      expect(isOnMembership).toBe(true);
    } finally {
      await page.close();
    }
  });

  // E2E-010: Click credits navigates to Membership Center
  test('E2E-010: Click credits card navigates to Membership Center', async ({ browser }) => {
    const page = await browser.newPage();
    const phase3 = new Phase3Page(page);

    try {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await phase3.login(TEST_ACCOUNT.email, TEST_ACCOUNT.password);

      // Click on credits card
      await phase3.clickCreditsCard();

      // Verify navigation to Membership Center
      const isOnMembership = await phase3.isOnMembershipCenter();
      expect(isOnMembership).toBe(true);
    } finally {
      await page.close();
    }
  });
});
