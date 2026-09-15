export class Phase3Page {
  constructor(page) {
    this.page = page;
    this.apiRequests = [];
    this.page.on('request', req => {
      if (/api|credit|consumption|transcribe/.test(req.url())) {
        this.apiRequests.push({ method: req.method(), url: req.url() });
      }
    });
  }

  getApiRequests() { return this.apiRequests; }

  async login(email, password) {
    await this.page.goto('https://beta.theplaud.com');
    await this.page.waitForLoadState('networkidle');

    const loginBtn = this.page.locator('button:has-text("Log in"), button:has-text("Sign in")').first();
    if (await loginBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await loginBtn.click();
    }

    await this.page.fill('input[type="email"]', email);
    await this.page.fill('input[type="password"]', password);
    await this.page.click('button:has-text("Sign in"), button:has-text("Log in")');
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(3000);
    await this.closeModal();
  }

  async getBalance() {
    const text = await this.page.locator('body').textContent().catch(() => '');
    const minutes = parseInt(text.match(/(\d+)\s*min\s*left/i)?.[1] || 0);
    const credits = parseInt(text.match(/(\d+)\s*credits?\s*left/i)?.[1] || 0);
    return { minutes, credits };
  }

  async closeModal() {
    const btn = this.page.locator('button:has-text("Continue")').first();
    if (await btn.isVisible({ timeout: 1500 }).catch(() => false)) {
      await btn.click();
      await this.page.waitForTimeout(1000);
    }
  }

  async goToTranscribe() {
    await this.closeModal();
    const btn = this.page.locator('button:has-text("Transcribe")').first();
    if (await btn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await btn.click();
    }
    await this.page.waitForLoadState('networkidle');
  }

  async uploadAudio(filePath) {
    const input = this.page.locator('input[type="file"]').first();
    if (await input.isVisible({ timeout: 2000 }).catch(() => false)) {
      await input.setInputFiles(filePath);
      await this.page.waitForTimeout(1000);
    }
  }

  async startTranscription() {
    const btn = this.page.locator('button:has-text("Transcribe"), button:has-text("Start")').first();
    if (await btn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await btn.click();
      await this.page.waitForSelector('[class*="transcript"]', { timeout: 15000 }).catch(() => null);
      await this.page.waitForTimeout(2000);
    }
  }

  async goToAgent() {
    await this.closeModal();
    const btn = this.page.locator('button:has-text("Agent")').first();
    if (await btn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await btn.click();
    }
    await this.page.waitForLoadState('networkidle');
  }

  async askAgent(prompt) {
    const input = this.page.locator('textarea, input[placeholder*="ask"]').first();
    if (await input.isVisible({ timeout: 3000 }).catch(() => false)) {
      await input.fill(prompt);
      const send = this.page.locator('button:has-text("Send")').first();
      if (await send.isVisible({ timeout: 2000 }).catch(() => false)) {
        await send.click();
        await this.page.waitForSelector('[class*="message"]', { timeout: 30000 }).catch(() => null);
        await this.page.waitForTimeout(2000);
      }
    }
  }

  async waitForBalanceUpdate(timeout = 15000) {
    const start = Date.now();
    const initial = await this.getBalance();

    while (Date.now() - start < timeout) {
      await this.page.waitForTimeout(2000);
      const current = await this.getBalance();
      if (current.minutes !== initial.minutes || current.credits !== initial.credits) {
        return;
      }
    }
  }

  async clickMinutesCard() {
    // Click on the minutes left text or its container
    const minutesLocator = this.page.locator('button, div').filter({ hasText: /\d+\s*min\s*left/ }).first();
    if (await minutesLocator.count() > 0) {
      await minutesLocator.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async clickCreditsCard() {
    // Click on the credits left text or its container
    const creditsLocator = this.page.locator('button, div').filter({ hasText: /\d+\s*credits?\s*left/ }).first();
    if (await creditsLocator.count() > 0) {
      await creditsLocator.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async isOnMembershipCenter() {
    const url = this.page.url();
    const pageText = await this.page.locator('body').textContent().catch(() => '');
    return url.includes('membership') || pageText.includes('plan') || pageText.includes('upgrade');
  }
}
