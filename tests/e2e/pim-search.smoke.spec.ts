import { test } from '../../fixtures/authenticated.fixture';
import { PIM_SEARCH_EMPLOYEE_ID } from '../../helpers/test-data.helper';
import { PimPage } from '../../pages/PimPage';
import { SideNav } from '../../pages/SideNav';

test.describe('OrangeHRM Smoke @smoke', () => {
  test.describe.configure({ mode: 'serial' });

  test('SMK-08 Admin can search PIM Employee List', async ({
    authenticatedPage,
  }) => {
    const sideNav = new SideNav(authenticatedPage);
    await sideNav.goToPim();

    const pimPage = new PimPage(authenticatedPage);
    await pimPage.verifyEmployeeListLoaded();
    await pimPage.searchByEmployeeId(PIM_SEARCH_EMPLOYEE_ID);
    await pimPage.verifySearchResultsContain(PIM_SEARCH_EMPLOYEE_ID);
  });
});
