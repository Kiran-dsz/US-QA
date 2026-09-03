class HomePage {
  get sidebarButton() {
    return $('~sidebar-button');
  }

  get previewCardContainer() {
    return $('~preview-card-bottom');
  }

  get balanceDisplay() {
    return $('~credits-balance');
  }

  get balanceValue() {
    return $('~balance-value');
  }

  get creditUsagePercentage() {
    return $('~balance-percentage');
  }

  async openSidebar() {
    await this.sidebarButton.click();
    await driver.pause(500);
  }

  async getBalanceText() {
    const text = await this.balanceValue.getText();
    return text;
  }

  async parseBalance(balanceText) {
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
