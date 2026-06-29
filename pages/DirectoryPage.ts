import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { AppLayout } from './AppLayout';

export class DirectoryPage extends BasePage {
  private layout: AppLayout;

  pageHeading = this.page.getByRole('heading', { name: 'Directory', level: 5 });
  employeeCards = this.page.locator('.orangehrm-directory-card');
  recordsFound = this.page.getByText(/\(\d+\) Records Found/);

  constructor(page: Page) {
    super(page);
    this.layout = new AppLayout(page);
  }

  async verifyDirectoryLoaded() {
    await expect(this.page).toHaveURL(/directory\/viewDirectory/);
    await this.layout.verifyLoggedIn();
    await expect(this.pageHeading).toBeVisible();
    await expect(this.recordsFound).toBeVisible();
    await expect(this.employeeCards.first()).toBeVisible();
    await expect(this.employeeCards.first().getByRole('paragraph').first()).toHaveText(/\S+/);
  }
}
