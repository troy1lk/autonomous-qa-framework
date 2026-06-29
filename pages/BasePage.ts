import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async getTitle() {
    return this.page.title();
  }

  async wait(milliseconds: number) {
    await this.page.waitForTimeout(milliseconds);
  }
}