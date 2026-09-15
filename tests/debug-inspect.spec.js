import { test } from '@playwright/test';
import { Phase3Page } from './helpers/phase3.helpers.js';

test('Debug: Inspect page structure', async ({ browser }) => {
  const page = await browser.newPage();
  const phase3 = new Phase3Page(page);

  try {
    await phase3.login('qa-test-us-tggbvg4y@guerrillamailblock.com', 'Qwer1234');

    // Get full page text
    const fullText = await page.locator('body').textContent();
    console.log('\n===== FULL PAGE TEXT =====');
    console.log(fullText.substring(0, 2000));

    // Get all text nodes with numbers
    const numberNodes = await page.locator('//*[contains(text(), "300") or contains(text(), "600") or contains(text(), "credit") or contains(text(), "minute")]').allTextContents();
    console.log('\n===== NUMBER NODES =====');
    numberNodes.forEach(text => console.log(text));

    // Check for specific elements
    const membershipText = await page.locator('[class*="membership"], [class*="balance"], [class*="credit"]').allTextContents();
    console.log('\n===== BALANCE ELEMENTS =====');
    membershipText.slice(0, 20).forEach(text => console.log(text));

    // Screenshot
    await page.screenshot({ path: 'debug-screenshot.png' });
    console.log('\n✓ Screenshot saved');

  } finally {
    await page.close();
  }
});
