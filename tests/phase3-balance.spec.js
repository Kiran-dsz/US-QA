import { test, expect } from '@playwright/test';
import { Phase3Page } from './helpers/phase3.helpers.js';
import fs from 'fs';
import path from 'path';

const TEST_EMAIL = 'qa-test-us-tggbvg4y@guerrillamailblock.com';
const TEST_PASSWORD = 'Qwer1234';
const BASE_URL = 'https://beta.theplaud.com';

// Create sample audio file for testing
function createSampleAudio() {
  const audioDir = path.join(process.cwd(), 'tests', 'audio');
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  const filePath = path.join(audioDir, 'sample.mp3');
  // Create a minimal MP3 file if it doesn't exist (64 bytes is minimal MP3 header)
  if (!fs.existsSync(filePath)) {
    const buffer = Buffer.from([
      0xFF, 0xFB, 0x90, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    ]);
    fs.writeFileSync(filePath, buffer);
  }
  return filePath;
}

test.describe('Phase 3 - Balance & Consumption Tests', () => {
  let page;
  let phase3;
  const audioFile = createSampleAudio();

  test.beforeAll(async () => {
    // Verify audio file exists
    if (!fs.existsSync(audioFile)) {
      throw new Error(`Sample audio file not found: ${audioFile}`);
    }
  });

  // ============================================================
  // E2E-002: Transcription deducts minutes only, credits unchanged
  // ============================================================
  test('E2E-002: Transcription deducts minutes only', async ({ browser }) => {
    page = await browser.newPage();
    phase3 = new Phase3Page(page);

    try {
      // Login
      await phase3.login(TEST_EMAIL, TEST_PASSWORD);
      console.log('✓ Logged in');

      // Get initial balance
      const initialBalance = await phase3.getBalance();
      console.log(`Initial balance: ${initialBalance.minutes} min, ${initialBalance.credits} credits`);

      const initialMinutes = initialBalance.minutes;
      const initialCredits = initialBalance.credits;

      expect(initialMinutes).toBeGreaterThan(0);
      expect(initialCredits).toBeGreaterThan(0);

      // Navigate to transcription
      await phase3.goToTranscribe();
      console.log('✓ Navigated to Transcribe');

      // Upload audio
      await phase3.uploadAudio(audioFile);
      console.log('✓ Audio uploaded');

      // Start transcription
      await phase3.startTranscription();
      console.log('✓ Transcription started');

      // Log API requests before balance check
      const apiAfterTranscribe = phase3.getApiRequests();
      console.log(`API requests made: ${apiAfterTranscribe.length}`);
      apiAfterTranscribe.slice(-5).forEach(req => console.log(`  ${req.method} ${req.url.substring(req.url.lastIndexOf('/'))}`));

      // Wait for transcription to complete
      await phase3.waitForBalanceUpdate(6000);

      // Verify balance changed correctly
      const finalBalance = await phase3.getBalance();
      console.log(`Final balance: ${finalBalance.minutes} min, ${finalBalance.credits} credits`);

      // Assert: Minutes should decrease
      expect(finalBalance.minutes).toBeLessThan(initialMinutes);
      console.log(`✓ Minutes decreased: ${initialMinutes} → ${finalBalance.minutes}`);

      // Assert: Credits should remain unchanged
      expect(finalBalance.credits).toBe(initialCredits);
      console.log(`✓ Credits unchanged: ${initialCredits} credits`);

    } finally {
      await page.close();
    }
  });

  // ============================================================
  // E2E-004: Agent work deducts credits only, minutes unchanged
  // ============================================================
  test('E2E-004: Agent work deducts credits only', async ({ browser }) => {
    page = await browser.newPage();
    phase3 = new Phase3Page(page);

    try {
      // Login
      await phase3.login(TEST_EMAIL, TEST_PASSWORD);
      console.log('✓ Logged in');

      // Get initial balance
      const initialBalance = await phase3.getBalance();
      console.log(`Initial balance: ${initialBalance.minutes} min, ${initialBalance.credits} credits`);

      const initialMinutes = initialBalance.minutes;
      const initialCredits = initialBalance.credits;

      expect(initialMinutes).toBeGreaterThan(0);
      expect(initialCredits).toBeGreaterThan(0);

      // Navigate to Agent
      await phase3.goToAgent();
      console.log('✓ Navigated to Agent');

      // Ask agent a simple question
      await phase3.askAgent('What is the capital of France?');
      console.log('✓ Question asked to agent');

      // Log API requests before balance check
      const apiAfterAgent = phase3.getApiRequests();
      console.log(`API requests made: ${apiAfterAgent.length}`);
      apiAfterAgent.slice(-5).forEach(req => console.log(`  ${req.method} ${req.url.substring(req.url.lastIndexOf('/'))}`));

      // Wait for response
      await phase3.waitForBalanceUpdate(6000);

      // Verify balance changed correctly
      const finalBalance = await phase3.getBalance();
      console.log(`Final balance: ${finalBalance.minutes} min, ${finalBalance.credits} credits`);

      // Assert: Minutes should remain unchanged
      expect(finalBalance.minutes).toBe(initialMinutes);
      console.log(`✓ Minutes unchanged: ${initialMinutes} minutes`);

      // Assert: Credits should decrease
      expect(finalBalance.credits).toBeLessThan(initialCredits);
      console.log(`✓ Credits decreased: ${initialCredits} → ${finalBalance.credits}`);

    } finally {
      await page.close();
    }
  });
});
