import { test } from '@playwright/test';
import { loginAsAdmin } from '../../helpers/auth.helper';
import { DashboardPage } from '../../pages/DashboardPage';

test('SMK-01 Dashboard displays core widgets after login', async ({ page }) => {
  await loginAsAdmin(page);

  const dashboardPage = new DashboardPage(page);
  await dashboardPage.verifyDashboardLoaded();
});
