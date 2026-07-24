const puppeteer = require('puppeteer');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  
  try {
    console.log('Logging in...');
    await page.goto('https://test.theplaud.com/', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.type('input[placeholder*="Email"]', 'vobev94770@kingcq.com', { delay: 50 });
    await page.type('input[placeholder*="Password"]', 'Test1234', { delay: 50 });
    await page.keyboard.press('Enter');
    await delay(5000);
    
    // Close popup if present
    await page.evaluate(() => {
      const modals = document.querySelectorAll('[role="dialog"]');
      if (modals.length > 0) modals[0].remove();
    });
    await delay(2000);
    
    console.log('Navigating to plan page...');
    await page.goto('https://test.theplaud.com/member/workspace/plan', { waitUntil: 'networkidle2', timeout: 30000 });
    await delay(3000);
    
    // Get page content
    const content = await page.evaluate(() => document.body.innerText);
    console.log('\n=== PAGE CONTENT ===\n');
    console.log(content);
    console.log('\n=== END CONTENT ===\n');
    
    // Take screenshot
    await page.screenshot({ path: '/tmp/plan_page.png', fullPage: true });
    console.log('✅ Screenshot saved to /tmp/plan_page.png');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
