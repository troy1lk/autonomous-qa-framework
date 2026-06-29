import { test } from '@playwright/test';
import { loginAsAdmin } from '../helpers/auth.helper';
import { LoginPage } from '../pages/LoginPage';
import { UserMenu } from '../pages/UserMenu';

test('SMK-05 Admin can logout successfully @smoke', async ({ page }) => {
  await loginAsAdmin(page);

  const userMenu = new UserMenu(page);
  await userMenu.logout();

  const loginPage = new LoginPage(page);
  await loginPage.verifyLoginPageDisplayed();
});
