import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export async function loginAsAdmin(page: Page) {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(
    process.env.LOGIN_USERNAME!,
    process.env.PASSWORD!
  );
  await loginPage.verifyLoginSuccessful();
}
