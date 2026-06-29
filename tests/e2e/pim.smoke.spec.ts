import { test } from '../../fixtures/authenticated.fixture';
import { PimPage } from '../../pages/PimPage';
import { SideNav } from '../../pages/SideNav';

test.describe('OrangeHRM Smoke @smoke', () => {
  test.describe.configure({ mode: 'serial' });

  test('SMK-02 Admin can access PIM Employee List', async ({
    authenticatedPage,
  }) => {
    const sideNav = new SideNav(authenticatedPage);
    await sideNav.goToPim();

    const pimPage = new PimPage(authenticatedPage);
    await pimPage.verifyEmployeeListLoaded();
  });
});
