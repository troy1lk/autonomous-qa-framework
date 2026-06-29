import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Admin can login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();

  await loginPage.login(
    process.env.LOGIN_USERNAME!,
    process.env.PASSWORD!
  );

  await loginPage.verifyLoginSuccessful();
});