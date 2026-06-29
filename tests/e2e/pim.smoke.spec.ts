import { test } from '@playwright/test';
import { loginAsAdmin } from '../../helpers/auth.helper';
import { PimPage } from '../../pages/PimPage';
import { SideNav } from '../../pages/SideNav';

test('SMK-02 Admin can access PIM Employee List', async ({ page }) => {
  await loginAsAdmin(page);

  const sideNav = new SideNav(page);
  await sideNav.goToPim();

  const pimPage = new PimPage(page);
  await pimPage.verifyEmployeeListLoaded();
});
