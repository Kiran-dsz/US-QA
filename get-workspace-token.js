const { chromium } = require('@playwright/test');

async function getWorkspaceToken() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  let authToken = null;

  // Intercept API responses to capture auth token
  await page.route('**/*', route => {
    const request = route.request();
    if (request.url().includes('/api/') || request.url().includes('auth')) {
      route.continue().then(response => {
        if (response && response.status() === 200) {
          response.json().then(data => {
            if (data.token || data.auth_token || data.access_token) {
              authToken = data.token || data.auth_token || data.access_token;
              console.log(`Found token in response: ${authToken.substring(0, 50)}...`);
            }
          }).catch(() => {});
        }
      }).catch(() => {});
    } else {
      route.continue();
    }
  });

  try {
    console.log('Navigating to login...');
    await page.goto('https://beta-staging.plaud.ai');
    await page.waitForLoadState('networkidle');

    // Click login
    const loginBtn = page.locator('button:has-text("Log in"), button:has-text("Sign in")').first();
    if (await loginBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log('Clicking login button...');
      await loginBtn.click();
      await page.waitForTimeout(1000);
    }

    // Fill form
    console.log('Entering credentials...');
    await page.fill('input[type="email"]', 'qa-test-us-tggbvg4y@guerrillamailblock.com');
    await page.fill('input[type="password"]', 'Qwer1234');

    // Submit
    await page.click('button:has-text("Sign in"), button:has-text("Log in")');
    console.log('Waiting for dashboard...');

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Close modal if present
    const continueBtn = page.locator('button:has-text("Continue")').first();
    if (await continueBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.log('Closing modal...');
      await continueBtn.click();
      await page.waitForTimeout(1000);
    }

    console.log('✓ Login successful');

    // Get tokens from all sources
    const cookies = await context.cookies();
    console.log('\n=== Auth Cookies ===');
    cookies.forEach(cookie => {
      if (cookie.name.toLowerCase().includes('auth') ||
          cookie.name.toLowerCase().includes('token') ||
          cookie.name.toLowerCase().includes('session')) {
        console.log(`${cookie.name}: ${cookie.value.substring(0, 60)}...`);
        if (cookie.name === 'auth_token' || cookie.name === 'access_token') {
          authToken = cookie.value;
        }
      }
    });

    // Check localStorage
    const storage = await page.evaluate(() => {
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        data[key] = localStorage.getItem(key);
      }
      return data;
    });

    console.log('\n=== Auth in Local Storage ===');
    Object.keys(storage).forEach(key => {
      if (key.toLowerCase().includes('token') ||
          key.toLowerCase().includes('auth') ||
          key.toLowerCase().includes('workspace')) {
        const val = storage[key];
        if (val && val.length > 10) {
          console.log(`${key}: ${val.substring(0, 60)}...`);
          if (key === 'auth_token' || key === 'token' || key === 'workspace_token') {
            try {
              const parsed = JSON.parse(val);
              if (parsed && parsed.token) {
                authToken = parsed.token;
              } else if (typeof parsed === 'string') {
                authToken = parsed;
              }
            } catch {
              authToken = val;
            }
          }
        }
      }
    });

    console.log('\n=== Current URL ===');
    console.log(page.url());

    console.log('\n=== Extracted Auth Token ===');
    if (authToken) {
      console.log(`✓ Token: ${authToken.substring(0, 80)}...`);
      console.log(`\nFull Token (first 100 chars): ${authToken.substring(0, 100)}`);
    } else {
      console.log('✗ No token found');
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

getWorkspaceToken().catch(console.error);
