import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DirectoryPage extends BasePage {
  pageHeading = this.page.getByRole('heading', { name: 'Directory', level: 5 });
  employeeCards = this.page.locator('.orangehrm-directory-card');

  constructor(page: Page) {
    super(page);
  }

  async verifyDirectoryLoaded() {
    await expect(this.page).toHaveURL(/directory\/viewDirectory/);
    await expect(this.pageHeading).toBeVisible();
    await expect(this.employeeCards.first()).toBeVisible();
    await expect(this.employeeCards).not.toHaveCount(0);
  }
}
