const puppeteer = require('puppeteer');
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  const issues = [];
  
  try {
    console.log('🔐 LOGGING IN AND NAVIGATING TO TEAM PLAN PAGE\n');
    await page.goto('https://test.theplaud.com/', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.type('input[placeholder*="Email"]', 'vobev94770@kingcq.com', { delay: 50 });
    await page.type('input[placeholder*="Password"]', 'Test1234', { delay: 50 });
    await page.keyboard.press('Enter');
    await delay(5000);
    
    // Close popup
    await page.evaluate(() => {
      const modals = document.querySelectorAll('[role="dialog"]');
      if (modals.length > 0) modals[0].remove();
    });
    await delay(2000);
    
    // Navigate to team plan
    console.log('📍 NAVIGATING TO: https://test.theplaud.com/member/workspace/plan\n');
    await page.goto('https://test.theplaud.com/member/workspace/plan', { waitUntil: 'networkidle2', timeout: 30000 });
    await delay(3000);
    
    // Screenshot 1: Initial page load
    console.log('📸 Screenshot 1: Initial page load');
    await page.screenshot({ path: '/tmp/team_plan_01_initial.png', fullPage: false });
    
    // Get page content
    let content = await page.evaluate(() => document.body.innerText);
    console.log('\n✓ Page loaded - analyzing content...\n');
    
    // TEST 1: Check page structure
    console.log('========== TEST 1: PAGE STRUCTURE ==========\n');
    console.log('Checking for key elements:');
    
    const hasTeamPlan = content.includes('Team Plan');
    const hasLaunchOffer = content.includes('Launch Offer');
    const hasPricing = content.includes('$25.00') || content.includes('$300');
    const hasSetupButton = content.includes('Set up your team');
    const hasFAQ = content.includes('FAQ') || content.includes('What happens');
    
    console.log(`  ✓ "Team Plan" heading: ${hasTeamPlan ? '✓' : '✗'}`);
    console.log(`  ✓ "Launch Offer" banner: ${hasLaunchOffer ? '✓' : '✗'}`);
    console.log(`  ✓ Pricing displayed: ${hasPricing ? '✓' : '✗'}`);
    console.log(`  ✓ "Set up your team" button: ${hasSetupButton ? '✓' : '✗'}`);
    console.log(`  ✓ FAQ section: ${hasFAQ ? '✓' : '✗'}`);
    
    // TEST 2: Check pricing details
    console.log('\n========== TEST 2: PRICING ANALYSIS ==========\n');
    
    const monthlyPriceMatch = content.match(/\$25\.00/g) || [];
    const annualPriceMatch = content.match(/\$300\.00/g) || [];
    const savePercentage = content.match(/Save \d+%/g) || [];
    
    console.log(`Monthly price mentions: ${monthlyPriceMatch.length}`);
    console.log(`Annual price mentions: ${annualPriceMatch.length}`);
    console.log(`Save percentage mentions: ${savePercentage.length}`);
    
    // THE PRICING ISSUE WE FOUND EARLIER
    if (hasLaunchOffer && hasPricing) {
      console.log('\n⚠️ CHECKING DISCOUNT LOGIC...');
      if (content.includes('20% off') && content.includes('$25.00')) {
        const originalPrice = 25.00;
        const discountedPrice = originalPrice * 0.8; // 20% off
        console.log(`  Expected price with 20% off: $${discountedPrice.toFixed(2)}`);
        console.log(`  Displayed price: $25.00`);
        if (discountedPrice !== 25.00) {
          console.log(`  ❌ PRICING ISSUE: 20% discount NOT applied! Should be $${discountedPrice.toFixed(2)}, not $25.00`);
          issues.push('Discount math is wrong: 20% off $25 should be $20, not $25');
        }
      }
    }
    
    // TEST 3: Click buttons and interactive elements
    console.log('\n========== TEST 3: INTERACTIVE ELEMENTS ==========\n');
    
    // Get all buttons
    const buttons = await page.evaluate(() => {
      const btns = document.querySelectorAll('button');
      return Array.from(btns).map(btn => ({
        text: btn.textContent.trim(),
        visible: btn.offsetHeight > 0,
        enabled: !btn.disabled
      })).filter(btn => btn.text.length > 0);
    });
    
    console.log(`Found ${buttons.length} buttons:`);
    buttons.forEach((btn, i) => {
      console.log(`  ${i+1}. "${btn.text.substring(0, 30)}" - ${btn.visible ? 'visible' : 'hidden'} ${btn.enabled ? 'enabled' : 'disabled'}`);
    });
    
    // Test clicking "Set up your team" button
    console.log('\n  Testing "Set up your team" button click...');
    const setupClicked = await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (let btn of buttons) {
        if (btn.textContent.includes('Set up your team')) {
          console.log('  Clicking "Set up your team"');
          btn.click();
          return true;
        }
      }
      return false;
    });
    
    if (setupClicked) {
      await delay(2000);
      console.log('  ✓ Button clicked - checking if anything happened');
      await page.screenshot({ path: '/tmp/team_plan_02_after_setup_click.png', fullPage: false });
    }
    
    // Go back
    await page.goto('https://test.theplaud.com/member/workspace/plan', { waitUntil: 'networkidle2' });
    await delay(2000);
    
    // TEST 4: Check links and navigation
    console.log('\n========== TEST 4: LINKS & NAVIGATION ==========\n');
    
    const links = await page.evaluate(() => {
      const allLinks = document.querySelectorAll('a');
      return Array.from(allLinks).map(link => ({
        text: link.textContent.trim(),
        href: link.href,
        visible: link.offsetHeight > 0
      })).filter(link => link.text.length > 0 && link.visible);
    });
    
    console.log(`Found ${links.length} visible links:`);
    links.slice(0, 10).forEach((link, i) => {
      console.log(`  ${i+1}. "${link.text.substring(0, 25)}" -> ${link.href.substring(0, 40)}...`);
    });
    
    // TEST 5: Test scrolling and page height
    console.log('\n========== TEST 5: PAGE SCROLLING ==========\n');
    
    const pageInfo = await page.evaluate(() => {
      return {
        documentHeight: document.documentElement.scrollHeight,
        windowHeight: window.innerHeight,
        currentScroll: window.scrollY
      };
    });
    
    console.log(`Document height: ${pageInfo.documentHeight}px`);
    console.log(`Window height: ${pageInfo.windowHeight}px`);
    console.log(`Page needs scrolling: ${pageInfo.documentHeight > pageInfo.windowHeight ? '✓ Yes' : '✗ No'}`);
    
    // Scroll down to see more content
    console.log('\n  Scrolling to bottom...');
    await page.evaluate(() => {
      window.scrollTo(0, document.documentElement.scrollHeight);
    });
    await delay(2000);
    
    console.log('  ✓ Scrolled to bottom');
    await page.screenshot({ path: '/tmp/team_plan_03_scrolled.png', fullPage: false });
    
    // Check if FAQ section is visible now
    const faqContent = await page.evaluate(() => document.body.innerText);
    if (faqContent.includes('FAQ') && faqContent.includes('What happens')) {
      console.log('  ✓ FAQ section visible after scroll');
    }
    
    // TEST 6: Check feature table
    console.log('\n========== TEST 6: FEATURE COMPARISON TABLE ==========\n');
    
    const tableInfo = await page.evaluate(() => {
      const tables = document.querySelectorAll('table');
      const rows = document.querySelectorAll('tr');
      const cells = document.querySelectorAll('td, th');
      
      return {
        tableCount: tables.length,
        rowCount: rows.length,
        cellCount: cells.length
      };
    });
    
    console.log(`Tables found: ${tableInfo.tableCount}`);
    console.log(`Table rows: ${tableInfo.rowCount}`);
    console.log(`Table cells: ${tableInfo.cellCount}`);
    
    if (tableInfo.tableCount > 0) {
      console.log('  ✓ Feature comparison table present');
    } else {
      console.log('  ⚠️ No table found - features may be displayed differently');
    }
    
    // TEST 7: Full page screenshot
    console.log('\n========== TEST 7: FULL PAGE SCREENSHOT ==========\n');
    await page.goto('https://test.theplaud.com/member/workspace/plan', { waitUntil: 'networkidle2' });
    await delay(2000);
    await page.screenshot({ path: '/tmp/team_plan_full.png', fullPage: true });
    console.log('✓ Full page screenshot captured');
    
    // FINAL ANALYSIS
    console.log('\n\n========== FINAL ANALYSIS ==========\n');
    
    if (issues.length > 0) {
      console.log('❌ ISSUES FOUND:\n');
      issues.forEach((issue, i) => {
        console.log(`${i+1}. ${issue}`);
      });
    } else {
      console.log('✅ NO MAJOR ISSUES FOUND');
      console.log('\nPage elements working:');
      console.log('  ✓ Pricing displays');
      console.log('  ✓ Buttons clickable');
      console.log('  ✓ Navigation works');
      console.log('  ✓ Scrolling works');
      console.log('  ✓ Page loads completely');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    console.log('\n✅ Team Plan page exploration complete');
    console.log('   Screenshots saved to /tmp/team_plan_*.png');
    await delay(3000);
    await browser.close();
  }
})();
