import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { AppLayout } from './AppLayout';

export class LeavePage extends BasePage {
  private layout: AppLayout;

  pageHeading = this.page.getByRole('heading', { name: 'Leave List' });
  leaveTable = this.page.getByRole('table');

  constructor(page: Page) {
    super(page);
    this.layout = new AppLayout(page);
  }

  async verifyLeaveListLoaded() {
    await expect(this.page).toHaveURL(/leave\/viewLeaveList/);
    await this.layout.verifyLoggedIn();
    await expect(this.pageHeading).toBeVisible();
    await expect(this.leaveTable).toBeVisible();
  }
}
