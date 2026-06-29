import { test } from '../../fixtures/authenticated.fixture';
import { SideNav } from '../../pages/SideNav';
import { TimePage } from '../../pages/TimePage';

test.describe('OrangeHRM Smoke @smoke', () => {
  test.describe.configure({ mode: 'serial' });

  test('SMK-10 Admin can access Time timesheets', async ({
    authenticatedPage,
  }) => {
    const sideNav = new SideNav(authenticatedPage);
    await sideNav.goToTime();

    const timePage = new TimePage(authenticatedPage);
    await timePage.verifyTimesheetsLoaded();
  });
});
