import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { AppLayout } from './AppLayout';

export class AdminPage extends BasePage {
  private layout: AppLayout;

  pageHeading = this.page.getByRole('heading', { name: 'Admin' });
  systemUsersHeading = this.page.getByRole('heading', {
    name: 'System Users',
    level: 5,
  });
  usersTable = this.page.getByRole('table');

  constructor(page: Page) {
    super(page);
    this.layout = new AppLayout(page);
  }

  async verifyAdminModuleLoaded() {
    await expect(this.page).toHaveURL(/admin\//);
    await this.layout.verifyLoggedIn();
    await expect(this.pageHeading).toBeVisible();
    await expect(this.systemUsersHeading).toBeVisible();
    await expect(this.usersTable).toBeVisible();
  }
}
