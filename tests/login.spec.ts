import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { requireAuthEnv } from '../helpers/auth.helper';

test('Admin can login successfully', async ({ page }) => {
  requireAuthEnv();

  const loginPage = new LoginPage(page);

  await loginPage.open();

  await loginPage.login(
    process.env.LOGIN_USERNAME!,
    process.env.PASSWORD!
  );

  await loginPage.verifyLoginSuccessful();
});