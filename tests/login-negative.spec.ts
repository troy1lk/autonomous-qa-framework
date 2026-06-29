import { test } from '@playwright/test';
import { requireAuthEnv } from '../helpers/auth.helper';
import { LoginPage } from '../pages/LoginPage';

test('SMK-06 Login fails with invalid credentials @smoke', async ({ page }) => {
  requireAuthEnv();

  const loginPage = new LoginPage(page);
  await loginPage.open();

  await loginPage.loginExpectingFailure(
    process.env.LOGIN_USERNAME!,
    'wrong-password'
  );

  await loginPage.verifyInvalidCredentials();
});
