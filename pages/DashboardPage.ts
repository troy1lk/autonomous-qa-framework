import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  pageHeading = this.page.getByRole('heading', { name: 'Dashboard' });
  timeAtWorkWidget = this.page.getByText('Time at Work', { exact: true });
  quickLaunchWidget = this.page.getByText('Quick Launch', { exact: true });
  buzzWidget = this.page.getByText('Buzz Latest Posts', { exact: true });

  constructor(page: Page) {
    super(page);
  }

  async verifyDashboardLoaded() {
    await expect(this.page).toHaveURL(/dashboard/);
    await expect(this.pageHeading).toBeVisible();
    await expect(this.timeAtWorkWidget).toBeVisible();
    await expect(this.quickLaunchWidget).toBeVisible();
    await expect(this.buzzWidget).toBeVisible();
  }
}
