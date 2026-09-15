/**
 * Team Hub Test Helpers & Page Objects
 * Reusable functions for Team Hub testing
 */

export class TeamHubPage {
  constructor(page) {
    this.page = page;
  }

  // Navigation
  async goToTeamHub() {
    await this.page.click('text=Team Hub');
    await this.page.waitForLoadState('networkidle');
  }

  async goToAllFiles() {
    await this.page.click('text=All files');
    await this.page.waitForLoadState('networkidle');
  }

  async goToTrash() {
    await this.page.click('text=Trash');
    await this.page.waitForLoadState('networkidle');
  }

  // Verification
  async verifyTeamHubVisible() {
    const entry = this.page.locator('text=Team Hub');
    return await entry.isVisible({ timeout: 5000 }).catch(() => false);
  }

  async verifyEmptyState() {
    const emptyIcon = this.page.locator('[data-testid="empty-state-icon"]');
    const emptyText = this.page.locator('text=No files here yet');

    return (
      await emptyIcon.isVisible() &&
      await emptyText.isVisible()
    );
  }

  async getFileCount() {
    const rows = this.page.locator('[data-testid="team-hub-file-row"]');
    return await rows.count();
  }

  async getFileNames() {
    const rows = this.page.locator('[data-testid="team-hub-file-row"]');
    const names = [];

    for (let i = 0; i < await rows.count(); i++) {
      const name = await rows.nth(i).locator('[data-column="name"]').textContent();
      names.push(name.trim());
    }

    return names;
  }

  async getTeamHubCountFromSidebar() {
    // Extract number from "Team Hub (N)"
    const text = await this.page.locator('text=Team Hub').textContent();
    const match = text.match(/\((\d+)\)/);
    return match ? parseInt(match[1]) : 0;
  }

  // File Operations
  async contributeFile(fileIndex = 0) {
    // Go to All files
    await this.goToAllFiles();

    // Click file
    const fileRows = this.page.locator('[data-testid="file-row"]');
    await fileRows.nth(fileIndex).click();

    // Click contribute
    await this.page.click('text=Contribute to Team Hub');

    // Confirm
    const confirmBtn = this.page.locator(
      'button:has-text("Contribute"), button:has-text("Confirm")'
    ).last();
    await confirmBtn.click();

    // Wait for success toast
    await this.page.waitForSelector('[role="status"], .toast', { timeout: 5000 });

    return {
      success: true,
      message: 'File contributed successfully'
    };
  }

  async deleteFile(fileIndex = 0) {
    await this.goToTeamHub();

    const fileRow = this.page.locator('[data-testid="team-hub-file-row"]').nth(fileIndex);
    const fileName = await fileRow.textContent();

    // Hover and open menu
    await fileRow.hover();
    const menuBtn = this.page.locator('[data-testid="file-row-menu"]');
    await menuBtn.click();

    // Click delete
    await this.page.click('text=Delete');

    // Confirm delete
    const deleteBtn = this.page.locator(
      'button.delete-btn, button:has-text("Delete")[style*="red"]'
    );
    await deleteBtn.click();

    // Wait for removal
    await this.page.waitForTimeout(1000);

    return {
      success: true,
      fileName: fileName.trim()
    };
  }

  // Permission checks
  async isFileMenuVisible(fileIndex = 0) {
    const fileRow = this.page.locator('[data-testid="team-hub-file-row"]').nth(fileIndex);
    await fileRow.hover();

    const menu = this.page.locator('[data-testid="file-row-menu"]');
    return await menu.isVisible({ timeout: 2000 }).catch(() => false);
  }

  async isTitleFieldReadOnly() {
    const titleField = this.page.locator('[data-testid="file-title-input"]').first();
    return await titleField.isDisabled();
  }

  // Modal operations
  async confirmModal() {
    const confirmBtn = this.page.locator(
      'button:has-text("Confirm"), button:has-text("Contribute"), button:has-text("Yes")'
    ).last();
    await confirmBtn.click();
  }

  async cancelModal() {
    const cancelBtn = this.page.locator('button:has-text("Cancel")');
    await cancelBtn.click();
  }

  // Toast verification
  async waitForToastMessage(expectedText) {
    const toast = this.page.locator('[role="status"], .toast');
    await toast.waitFor({ state: 'visible', timeout: 5000 });

    const text = await toast.textContent();
    return text.includes(expectedText);
  }

  // Real-time update verification
  async fileAppearsInTeamHub(fileName) {
    await this.goToTeamHub();
    const files = await this.getFileNames();
    return files.some(f => f.includes(fileName));
  }

  async fileDisappearsFromAllFiles(fileName) {
    await this.goToAllFiles();

    const element = this.page.locator(`text=${fileName}`);
    return !(await element.isVisible({ timeout: 3000 }).catch(() => false));
  }
}

/**
 * Authentication Helper
 */
export class AuthHelper {
  constructor(page) {
    this.page = page;
  }

  async login(email, password) {
    const emailInput = this.page.locator('input[type="email"]');
    const passwordInput = this.page.locator('input[type="password"]');

    await emailInput.fill(email);
    await passwordInput.fill(password);

    const loginBtn = this.page.locator(
      'button:has-text("Login"), button:has-text("Sign in")'
    );
    await loginBtn.click();

    await this.page.waitForNavigation({ timeout: 10000 });
  }

  async logout() {
    const userMenu = this.page.locator('[data-testid="user-menu"]');
    await userMenu.click();

    await this.page.click('text=Logout');
    await this.page.waitForNavigation();
  }

  async isLoggedIn() {
    const userMenu = this.page.locator('[data-testid="user-menu"]');
    return await userMenu.isVisible({ timeout: 2000 }).catch(() => false);
  }
}

/**
 * Workspace Helper
 */
export class WorkspaceHelper {
  constructor(page) {
    this.page = page;
  }

  async switchWorkspace(workspaceName) {
    const switcher = this.page.locator('[data-testid="workspace-switcher"]');
    await switcher.click();

    const option = this.page.locator(`text=${workspaceName}`);
    await option.click();

    await this.page.waitForLoadState('networkidle');
  }

  async getCurrentWorkspace() {
    const switcher = this.page.locator('[data-testid="workspace-switcher"]');
    return await switcher.textContent();
  }

  async getAvailableWorkspaces() {
    const switcher = this.page.locator('[data-testid="workspace-switcher"]');
    await switcher.click();

    const options = this.page.locator('[data-testid="workspace-option"]');
    const names = [];

    for (let i = 0; i < await options.count(); i++) {
      const name = await options.nth(i).textContent();
      names.push(name.trim());
    }

    return names;
  }
}

/**
 * Wait helpers
 */
export async function waitForElementToDisappear(page, selector, timeout = 5000) {
  const element = page.locator(selector);
  return await element.waitFor({ state: 'hidden', timeout });
}

export async function waitForToastDisappear(page) {
  const toast = page.locator('[role="status"], .toast');
  return await waitForElementToDisappear(page, '[role="status"], .toast', 8000);
}

export async function waitForFileCountChange(page, initialCount, delta = 1, timeout = 10000) {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    const rows = page.locator('[data-testid="team-hub-file-row"]');
    const currentCount = await rows.count();

    if (currentCount === initialCount + delta) {
      return true;
    }

    await page.waitForTimeout(500);
  }

  return false;
}
