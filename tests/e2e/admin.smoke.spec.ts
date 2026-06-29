import { test } from '../../fixtures/authenticated.fixture';
import { AdminPage } from '../../pages/AdminPage';
import { SideNav } from '../../pages/SideNav';

test.describe('OrangeHRM Smoke @smoke', () => {
  test.describe.configure({ mode: 'serial' });

  test('SMK-07 Admin can access Admin module', async ({ authenticatedPage }) => {
    const sideNav = new SideNav(authenticatedPage);
    await sideNav.goToAdmin();

    const adminPage = new AdminPage(authenticatedPage);
    await adminPage.verifyAdminModuleLoaded();
  });
});
