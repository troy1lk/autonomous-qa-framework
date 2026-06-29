import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { AppLayout } from './AppLayout';

export class BuzzPage extends BasePage {
  private layout: AppLayout;

  postCards = this.page.locator('.orangehrm-buzz-post');

  constructor(page: Page) {
    super(page);
    this.layout = new AppLayout(page);
  }

  async verifyBuzzFeedLoaded() {
    await expect(this.page).toHaveURL(/buzz/);
    await this.layout.verifyLoggedIn();
    await expect(this.postCards.first()).toBeVisible();
  }
}
