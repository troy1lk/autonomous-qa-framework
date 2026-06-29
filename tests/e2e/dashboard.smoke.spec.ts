import { test } from '../../fixtures/authenticated.fixture';
import { DashboardPage } from '../../pages/DashboardPage';

test.describe('OrangeHRM Smoke @smoke', () => {
  test.describe.configure({ mode: 'serial' });

  test('SMK-01 Dashboard displays core widgets after login', async ({
    authenticatedPage,
  }) => {
    const dashboardPage = new DashboardPage(authenticatedPage);
    await dashboardPage.verifyDashboardLoaded();
  });
});
