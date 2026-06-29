import { BasePage } from './BasePage';

export class UserMenu extends BasePage {
  userMenuTab = this.page.locator('.oxd-userdropdown-tab');
  logoutLink = this.page.getByRole('menuitem', { name: 'Logout' });

  async logout() {
    await this.userMenuTab.click();
    await this.logoutLink.click();
    await this.page.waitForURL(/auth\/login/);
  }
}
