import { test } from '../../fixtures/authenticated.fixture';
import { DirectoryPage } from '../../pages/DirectoryPage';
import { SideNav } from '../../pages/SideNav';

test.describe('OrangeHRM Smoke @smoke', () => {
  test.describe.configure({ mode: 'serial' });

  test('SMK-03 Admin can access Employee Directory', async ({
    authenticatedPage,
  }) => {
    const sideNav = new SideNav(authenticatedPage);
    await sideNav.goToDirectory();

    const directoryPage = new DirectoryPage(authenticatedPage);
    await directoryPage.verifyDirectoryLoaded();
  });
});
