import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { AppLayout } from './AppLayout';

export class PimPage extends BasePage {
  private layout: AppLayout;

  pageHeading = this.page.getByRole('heading', { name: 'Employee Information' });
  employeeTable = this.page.getByRole('table');
  idColumnHeader = this.page.getByRole('columnheader', { name: /^Id/ });
  nameColumnHeader = this.page.getByRole('columnheader', {
    name: /First.*Name/,
  });
  recordsFound = this.page.getByText(/\(\d+\) Records Found/);
  employeeTableRows = this.page.locator('.oxd-table-body .oxd-table-row');

  constructor(page: Page) {
    super(page);
    this.layout = new AppLayout(page);
  }

  async verifyEmployeeListLoaded() {
    await expect(this.page).toHaveURL(/pim\/viewEmployeeList/);
    await this.layout.verifyLoggedIn();
    await expect(this.pageHeading).toBeVisible();
    await expect(this.employeeTable).toBeVisible();
    await expect(this.idColumnHeader).toBeVisible();
    await expect(this.nameColumnHeader).toBeVisible();
    await expect(this.recordsFound).toBeVisible();
    await expect(this.employeeTableRows.first()).toBeVisible();
  }
}
