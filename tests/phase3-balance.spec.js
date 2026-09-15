import { test, expect } from '@playwright/test';
import { Phase3Page } from './helpers/phase3.helpers.js';
import fs from 'fs';
import path from 'path';

const TEST_ACCOUNT = { email: 'qa-test-us-tggbvg4y@guerrillamailblock.com', password: 'Qwer1234' };

const createSampleAudio = () => {
  const audioDir = path.join(process.cwd(), 'tests', 'audio');
  fs.mkdirSync(audioDir, { recursive: true });
  const filePath = path.join(audioDir, 'sample.mp3');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, Buffer.from([0xFF, 0xFB, 0x90, 0x00, ...Array(56).fill(0x00)]));
  }
  return filePath;
};

test.describe('Phase 3 Balance Tests', () => {
  const audioFile = createSampleAudio();

  test.beforeAll(() => {
    if (!fs.existsSync(audioFile)) throw new Error(`Audio file not found: ${audioFile}`);
  });

  test('E2E-002: Transcription deducts minutes', async ({ browser }) => {
    const page = await browser.newPage();
    const phase3 = new Phase3Page(page);

    try {
      await phase3.login(TEST_ACCOUNT.email, TEST_ACCOUNT.password);
      const initial = await phase3.getBalance();
      expect(initial.minutes).toBeGreaterThan(0);

      await phase3.goToTranscribe();
      await phase3.uploadAudio(audioFile);
      await phase3.startTranscription();
      await phase3.waitForBalanceUpdate(6000);

      const final = await phase3.getBalance();
      expect(final.minutes).toBeLessThan(initial.minutes);
      expect(final.credits).toBe(initial.credits);
    } finally {
      await page.close();
    }
  });

  test('E2E-004: Agent work deducts credits', async ({ browser }) => {
    const page = await browser.newPage();
    const phase3 = new Phase3Page(page);

    try {
      await phase3.login(TEST_ACCOUNT.email, TEST_ACCOUNT.password);
      const initial = await phase3.getBalance();
      expect(initial.credits).toBeGreaterThan(0);

      await phase3.goToAgent();
      await phase3.askAgent('What is the capital of France?');
      await phase3.waitForBalanceUpdate(6000);

      const final = await phase3.getBalance();
      expect(final.minutes).toBe(initial.minutes);
      expect(final.credits).toBeLessThan(initial.credits);
    } finally {
      await page.close();
    }
  });
});
