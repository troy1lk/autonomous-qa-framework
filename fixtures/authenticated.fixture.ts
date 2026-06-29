import { test as base, expect, Page } from '@playwright/test';

type AuthenticatedFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<AuthenticatedFixtures>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/web/index.php/dashboard/index');
    await page.waitForURL(/dashboard/);
    await use(page);
  },
});

export { expect };
