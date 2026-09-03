class HomePage {
  // Locators for iOS
  get sidebarButton() {
    return $('~sidebar-button'); // Accessibility ID
  }

  get previewCardContainer() {
    return $('~preview-card-bottom'); // Accessibility ID for the bottom card
  }

  get balanceDisplay() {
    return $('~credits-balance'); // Accessibility ID for balance text
  }

  get balanceValue() {
    return $('~balance-value'); // e.g., "1,050/1,050"
  }

  get creditUsagePercentage() {
    return $('~balance-percentage');
  }

  async openSidebar() {
    await this.sidebarButton.click();
    await driver.pause(500); // Wait for sidebar animation
  }

  async getBalanceText() {
    const text = await this.balanceValue.getText();
    return text; // Returns "1,050/1,050" format
  }

  async parseBalance(balanceText) {
    // Parse "1,050/1,050" into { used: 1050, total: 1050 }
    const [used, total] = balanceText.split('/').map(s =>
      parseInt(s.replace(/,/g, ''), 10)
    );
    return { used, total };
  }

  async getPercentageUsed() {
    const text = await this.getBalanceText();
    const { used, total } = await this.parseBalance(text);
    return (used / total) * 100;
  }

  async isPreviewCardVisible() {
    try {
      await this.previewCardContainer.waitForDisplayed({ timeout: 3000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  async waitForBalanceUpdate(previousBalance, timeout = 5000) {
    // Wait for balance to change
    const startTime = Date.now();
    let currentBalance = previousBalance;

    while (Date.now() - startTime < timeout) {
      const newBalance = await this.getBalanceText();
      if (newBalance !== currentBalance) {
        return newBalance;
      }
      await driver.pause(500);
    }

    throw new Error(`Balance did not update within ${timeout}ms`);
  }
}

module.exports = new HomePage();
