import { test } from '../../fixtures/authenticated.fixture';
import { BuzzPage } from '../../pages/BuzzPage';
import { SideNav } from '../../pages/SideNav';

test.describe('OrangeHRM Smoke @smoke', () => {
  test.describe.configure({ mode: 'serial' });

  test('SMK-09 Admin can access Buzz feed', async ({ authenticatedPage }) => {
    const sideNav = new SideNav(authenticatedPage);
    await sideNav.goToBuzz();

    const buzzPage = new BuzzPage(authenticatedPage);
    await buzzPage.verifyBuzzFeedLoaded();
  });
});
