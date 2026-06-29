import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { AppLayout } from './AppLayout';

export class TimePage extends BasePage {
  private layout: AppLayout;

  pageHeading = this.page.getByRole('heading', {
    name: 'Timesheets Pending Action',
  });
  selectEmployeeHeading = this.page.getByRole('heading', {
    name: 'Select Employee',
  });
  pendingTable = this.page.getByRole('table');

  constructor(page: Page) {
    super(page);
    this.layout = new AppLayout(page);
  }

  async verifyTimesheetsLoaded() {
    await expect(this.page).toHaveURL(/time\//);
    await this.layout.verifyLoggedIn();
    await expect(this.pageHeading).toBeVisible();
    await expect(this.selectEmployeeHeading).toBeVisible();
    await expect(this.pendingTable).toBeVisible();
  }
}
