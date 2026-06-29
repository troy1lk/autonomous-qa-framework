import { test } from '../../fixtures/authenticated.fixture';
import { LeavePage } from '../../pages/LeavePage';
import { SideNav } from '../../pages/SideNav';

test.describe('OrangeHRM Smoke @smoke', () => {
  test.describe.configure({ mode: 'serial' });

  test('SMK-04 Admin can access Leave List', async ({ authenticatedPage }) => {
    const sideNav = new SideNav(authenticatedPage);
    await sideNav.goToLeave();

    const leavePage = new LeavePage(authenticatedPage);
    await leavePage.verifyLeaveListLoaded();
  });
});
