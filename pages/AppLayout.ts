import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AppLayout extends BasePage {
  userMenu = this.page.locator('.oxd-userdropdown-tab');

  async verifyLoggedIn() {
    await expect(this.userMenu).toBeVisible();
  }
}
