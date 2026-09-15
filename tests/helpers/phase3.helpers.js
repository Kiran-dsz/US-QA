/**
 * Phase 3 Web App E2E Test Helpers
 * Login, balance checking, consumption flows
 */

export class Phase3Page {
  constructor(page) {
    this.page = page;
    this.apiRequests = [];

    // Capture all API requests
    this.page.on('request', request => {
      if (request.url().includes('api') || request.url().includes('credit') || request.url().includes('consumption') || request.url().includes('transcribe')) {
        this.apiRequests.push({
          method: request.method(),
          url: request.url(),
          time: new Date().toISOString()
        });
      }
    });
  }

  getApiRequests() {
    return this.apiRequests;
  }

  // Login
  async login(email, password) {
    await this.page.goto('https://beta.theplaud.com');
    await this.page.waitForLoadState('networkidle');

    // Look for login button or form
    const loginBtn = this.page.locator('button:has-text("Log in"), a:has-text("Log in"), button:has-text("Sign in")').first();
    if (await loginBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await loginBtn.click();
    }

    // Fill email
    await this.page.fill('input[type="email"], input[placeholder*="email" i]', email);
    await this.page.fill('input[type="password"], input[placeholder*="password" i]', password);

    // Submit
    await this.page.click('button:has-text("Sign in"), button:has-text("Log in"), button[type="submit"]');
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(3000);

    // Wait for page to stabilize before closing modal
    await this.page.waitForSelector('[class*="sidebar"], [class*="nav"], body', { timeout: 5000 }).catch(() => null);

    // Close modal if it appears after login
    await this.closeModal();
    await this.page.waitForTimeout(1000);
  }

  // Get current balance (minutes, credits)
  async getBalance() {
    try {
      const pageText = await this.page.locator('body').textContent();

      // Extract numbers matching "XXX min left" and "XXX credits left"
      const minuteMatch = pageText.match(/(\d+)\s*min\s*left/i);
      const creditMatch = pageText.match(/(\d+)\s*credits?\s*left/i);

      const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0;
      const credits = creditMatch ? parseInt(creditMatch[1]) : 0;

      console.log(`Balance extracted: ${minutes} min, ${credits} credits`);
      return { minutes, credits };
    } catch (e) {
      console.log('Error extracting balance:', e.message);
      return { minutes: 0, credits: 0 };
    }
  }

  // Close modal if present
  async closeModal() {
    try {
      const continueBtn = this.page.locator('button:has-text("Continue")').first();
      if (await continueBtn.isVisible({ timeout: 1500 }).catch(() => false)) {
        await continueBtn.click();
        await this.page.waitForTimeout(1000);
        return true;
      }
    } catch (e) {
      console.log('No modal to close');
    }
    return false;
  }

  // Navigate to transcription
  async goToTranscribe() {
    await this.closeModal();
    const transcribeBtn = this.page.locator('button:has-text("Transcribe"), a:has-text("Transcribe"), [data-testid="transcribe-nav"]').first();
    if (await transcribeBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await transcribeBtn.click();
    }
    await this.page.waitForLoadState('networkidle');
  }

  // Upload audio file
  async uploadAudio(filePath) {
    const fileInput = this.page.locator('input[type="file"]').first();
    if (await fileInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await fileInput.setInputFiles(filePath);
      await this.page.waitForTimeout(1000);
    }
  }

  // Start transcription and wait for completion
  async startTranscription() {
    const transcribeBtn = this.page.locator('button:has-text("Transcribe"), button:has-text("Start")').first();
    if (await transcribeBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await transcribeBtn.click();
      // Wait for transcription to complete - look for transcript text or completion indicator
      await this.page.waitForSelector('[class*="transcript"], [class*="transcription"], text=/words?/', { timeout: 15000 }).catch(() => null);
      await this.page.waitForTimeout(2000);
    }
  }

  // Navigate to Agent
  async goToAgent() {
    await this.closeModal();

    const agentBtn = this.page.locator('a:has-text("Agent"), button:has-text("Agent"), [data-testid="agent-nav"], [data-testid="sidebar-nav-ask-link"]').first();
    if (await agentBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await agentBtn.click();
    }
    await this.page.waitForLoadState('networkidle');
  }

  // Ask agent a question and wait for response
  async askAgent(prompt) {
    const inputField = this.page.locator('textarea, input[placeholder*="ask"], input[placeholder*="message"]').first();
    if (await inputField.isVisible({ timeout: 3000 }).catch(() => false)) {
      await inputField.fill(prompt);
      await this.page.waitForTimeout(500);
    }

    const sendBtn = this.page.locator('button:has-text("Send"), button[type="submit"]').first();
    if (await sendBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await sendBtn.click();
      // Wait for agent response to appear - look for message bubble or response text
      await this.page.waitForSelector('[class*="message"], [class*="response"], [class*="chat"], text=/[a-z]/', { timeout: 30000 }).catch(() => null);
      await this.page.waitForTimeout(2000);
    }
  }

  // Wait for balance update with polling
  async waitForBalanceUpdate(timeout = 15000) {
    const startTime = Date.now();
    const initialBalance = await this.getBalance();

    // Poll for balance change
    while (Date.now() - startTime < timeout) {
      await this.page.waitForTimeout(2000);
      const currentBalance = await this.getBalance();

      // If balance changed, we're done
      if (currentBalance.minutes !== initialBalance.minutes || currentBalance.credits !== initialBalance.credits) {
        console.log(`Balance changed detected: ${JSON.stringify(initialBalance)} → ${JSON.stringify(currentBalance)}`);
        await this.page.waitForTimeout(1000);
        return;
      }
    }

    console.log('Balance update timeout - no change detected');
    await this.page.waitForTimeout(1000);
  }
}
