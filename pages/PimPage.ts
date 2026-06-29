import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PimPage extends BasePage {
  pageHeading = this.page.getByRole('heading', { name: 'Employee Information' });
  employeeTableRows = this.page.locator('.oxd-table-body .oxd-table-row');

  constructor(page: Page) {
    super(page);
  }

  async verifyEmployeeListLoaded() {
    await expect(this.page).toHaveURL(/pim\/viewEmployeeList/);
    await expect(this.pageHeading).toBeVisible();
    await expect(this.employeeTableRows.first()).toBeVisible();
    await expect(this.employeeTableRows).not.toHaveCount(0);
  }
}
