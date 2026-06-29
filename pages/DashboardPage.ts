import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { AppLayout } from './AppLayout';

export class DashboardPage extends BasePage {
  private layout: AppLayout;

  pageHeading = this.page.getByRole('heading', { name: 'Dashboard' });
  timeAtWorkWidget = this.page
    .locator('.orangehrm-dashboard-widget')
    .filter({ hasText: /^Time at Work$/ })
    .first();
  quickLaunchWidget = this.page
    .locator('.orangehrm-dashboard-widget')
    .filter({ hasText: /^Quick Launch$/ })
    .first();
  buzzWidget = this.page
    .locator('.orangehrm-dashboard-widget')
    .filter({ hasText: /^Buzz Latest Posts$/ })
    .first();

  constructor(page: Page) {
    super(page);
    this.layout = new AppLayout(page);
  }

  async open() {
    await this.page.goto('/web/index.php/dashboard/index');
    await this.page.waitForURL(/dashboard/);
  }

  async verifyDashboardLoaded() {
    await this.layout.verifyLoggedIn();
    await expect(this.pageHeading).toBeVisible();
    await expect(this.timeAtWorkWidget).toBeVisible();
    await expect(this.quickLaunchWidget).toBeVisible();
    await expect(this.buzzWidget).toBeVisible();
  }
}
