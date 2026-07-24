const puppeteer = require('puppeteer');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  
  try {
    console.log('Loading homepage...');
    await page.goto('https://test.theplaud.com/', { waitUntil: 'networkidle2', timeout: 30000 });
    await delay(2000);
    
    // Get page content BEFORE login
    console.log('\n=== HOMEPAGE CONTENT (Before Login) ===\n');
    const homeContent = await page.evaluate(() => document.body.innerText);
    console.log(homeContent.substring(0, 2000)); // First 2000 chars
    
    // Take screenshot
    await page.screenshot({ path: '/tmp/homepage_login.png', fullPage: true });
    console.log('\n✅ Screenshot 1: Homepage login page saved\n');
    
    // Login
    console.log('Logging in...');
    await page.type('input[placeholder*="Email"]', 'vobev94770@kingcq.com', { delay: 50 });
    await page.type('input[placeholder*="Password"]', 'Test1234', { delay: 50 });
    await page.keyboard.press('Enter');
    await delay(5000);
    
    // Get content after login
    console.log('\n=== HOMEPAGE CONTENT (After Login) ===\n');
    const afterLoginContent = await page.evaluate(() => document.body.innerText);
    console.log(afterLoginContent);
    
    // Take screenshot after login
    await page.screenshot({ path: '/tmp/homepage_loggedin.png', fullPage: true });
    console.log('\n✅ Screenshot 2: Homepage logged in saved\n');
    
    // Check for any console errors
    page.on('console', msg => console.log('CONSOLE:', msg.text()));
    page.on('error', err => console.log('PAGE ERROR:', err));
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
