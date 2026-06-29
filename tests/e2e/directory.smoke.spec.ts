import { test } from '@playwright/test';
import { loginAsAdmin } from '../../helpers/auth.helper';
import { DirectoryPage } from '../../pages/DirectoryPage';
import { SideNav } from '../../pages/SideNav';

test('SMK-03 Admin can access Employee Directory', async ({ page }) => {
  await loginAsAdmin(page);

  const sideNav = new SideNav(page);
  await sideNav.goToDirectory();

  const directoryPage = new DirectoryPage(page);
  await directoryPage.verifyDirectoryLoaded();
});
