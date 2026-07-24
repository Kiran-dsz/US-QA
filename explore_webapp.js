const puppeteer = require('puppeteer');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  
  try {
    console.log('🔐 Logging in...');
    await page.goto('https://test.theplaud.com/', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.type('input[placeholder*="Email"]', 'vobev94770@kingcq.com', { delay: 50 });
    await page.type('input[placeholder*="Password"]', 'Test1234', { delay: 50 });
    await page.keyboard.press('Enter');
    await delay(5000);
    
    // Close the popup
    console.log('❌ Closing device popup...');
    await page.evaluate(() => {
      const closeBtn = document.querySelector('[aria-label="Close"], button:has(svg)');
      if (closeBtn) closeBtn.click();
      else {
        const modals = document.querySelectorAll('[role="dialog"]');
        if (modals.length > 0) modals[0].remove();
      }
    });
    await delay(2000);
    
    // Take screenshot of home page
    console.log('\n📸 Screenshot 1: Home page (closed popup)');
    await page.screenshot({ path: '/tmp/webapp_01_home.png', fullPage: false });
    
    // Click on "Ask Plaud" section
    console.log('\n🔍 Clicking "Ask Plaud"...');
    await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      const askPlaud = elements.find(el => el.textContent.trim() === 'Ask Plaud');
      if (askPlaud) {
        const clickable = askPlaud.closest('button, a, [role="button"], div[role="button"]') || askPlaud.parentElement;
        clickable.click();
      }
    });
    await delay(3000);
    console.log('✓ Screenshot 2: Ask Plaud section');
    await page.screenshot({ path: '/tmp/webapp_02_askplaud.png', fullPage: false });
    
    // Go back to home
    console.log('\n🏠 Going back to Home...');
    await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      const home = elements.find(el => el.textContent.trim() === 'Home');
      if (home) {
        const clickable = home.closest('button, a, [role="button"], div[role="button"]') || home.parentElement;
        clickable.click();
      }
    });
    await delay(2000);
    
    // Click on "Template Community"
    console.log('\n🎯 Clicking "Template Community"...');
    await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      const templates = elements.find(el => el.textContent.includes('Template Community'));
      if (templates) {
        const clickable = templates.closest('button, a, [role="button"], div[role="button"]') || templates.parentElement;
        clickable.click();
      }
    });
    await delay(3000);
    console.log('✓ Screenshot 3: Template Community');
    await page.screenshot({ path: '/tmp/webapp_03_templates.png', fullPage: false });
    
    // Go back to home
    console.log('\n🏠 Going back to Home...');
    await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      const home = elements.find(el => el.textContent.trim() === 'Home');
      if (home) {
        const clickable = home.closest('button, a, [role="button"], div[role="button"]') || home.parentElement;
        clickable.click();
      }
    });
    await delay(2000);
    
    // Click on "Explore"
    console.log('\n🚀 Clicking "Explore"...');
    await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      const explore = elements.find(el => el.textContent.trim() === 'Explore');
      if (explore) {
        const clickable = explore.closest('button, a, [role="button"], div[role="button"]') || explore.parentElement;
        clickable.click();
      }
    });
    await delay(3000);
    console.log('✓ Screenshot 4: Explore section');
    await page.screenshot({ path: '/tmp/webapp_04_explore.png', fullPage: false });
    
    // Go back to home
    console.log('\n🏠 Going back to Home...');
    await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      const home = elements.find(el => el.textContent.trim() === 'Home');
      if (home) {
        const clickable = home.closest('button, a, [role="button"], div[role="button"]') || home.parentElement;
        clickable.click();
      }
    });
    await delay(2000);
    
    // Click on "Search"
    console.log('\n🔎 Clicking "Search"...');
    await page.evaluate(() => {
      const searchBtn = document.querySelector('[aria-label*="Search"], button:has(svg)');
      if (searchBtn) searchBtn.click();
    });
    await delay(2000);
    console.log('✓ Screenshot 5: Search');
    await page.screenshot({ path: '/tmp/webapp_05_search.png', fullPage: false });
    
    // Click on user profile/settings dropdown
    console.log('\n👤 Clicking profile dropdown...');
    await page.evaluate(() => {
      const profileElements = Array.from(document.querySelectorAll('*'));
      const profile = profileElements.find(el => el.textContent.includes('Personal workspace') || el.getAttribute('role') === 'button');
      if (profile) profile.click();
    });
    await delay(2000);
    console.log('✓ Screenshot 6: Profile menu');
    await page.screenshot({ path: '/tmp/webapp_06_profile.png', fullPage: false });
    
    // Get page content for analysis
    console.log('\n📋 Analyzing page content...\n');
    const content = await page.evaluate(() => document.body.innerText);
    
    // Check for common UI issues
    console.log('🔍 CHECKING FOR ISSUES:\n');
    
    const issues = [];
    
    // Check 1: Broken images
    const brokenImages = await page.evaluate(() => {
      const imgs = document.querySelectorAll('img');
      return Array.from(imgs).filter(img => !img.complete || img.naturalHeight === 0).length;
    });
    if (brokenImages > 0) {
      issues.push(`⚠️ ${brokenImages} broken images found`);
    }
    
    // Check 2: Console errors
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    
    // Check 3: 404 errors in network
    const responses = [];
    page.on('response', response => {
      if (response.status() === 404) {
        responses.push(`404: ${response.url()}`);
      }
    });
    
    // Check 4: Text overflow or rendering issues
    const overflowElements = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      let count = 0;
      elements.forEach(el => {
        if (el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight) {
          if (el.textContent.length > 0) count++;
        }
      });
      return count;
    });
    
    if (overflowElements > 5) {
      issues.push(`⚠️ ${overflowElements} elements with text overflow detected`);
    }
    
    // Check 5: Missing alt text on images
    const missingAlt = await page.evaluate(() => {
      const imgs = document.querySelectorAll('img');
      return Array.from(imgs).filter(img => !img.alt && img.naturalHeight > 0).length;
    });
    
    if (missingAlt > 0) {
      issues.push(`ℹ️ ${missingAlt} images missing alt text (accessibility issue)`);
    }
    
    if (issues.length === 0) {
      console.log('✅ No obvious issues detected!\n');
    } else {
      console.log('Found issues:');
      issues.forEach(issue => console.log(issue));
      console.log();
    }
    
    console.log('📊 Page Analysis:');
    console.log(`   - Total images: ${await page.evaluate(() => document.querySelectorAll('img').length)}`);
    console.log(`   - Total buttons: ${await page.evaluate(() => document.querySelectorAll('button').length)}`);
    console.log(`   - Total links: ${await page.evaluate(() => document.querySelectorAll('a').length)}`);
    console.log(`   - Page length: ${content.length} characters\n`);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    console.log('✅ All screenshots saved to /tmp/webapp_*.png');
    await delay(5000);
    await browser.close();
  }
})();
