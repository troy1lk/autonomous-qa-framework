import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export function requireAuthEnv() {
  if (!process.env.LOGIN_USERNAME || !process.env.PASSWORD) {
    throw new Error(
      'LOGIN_USERNAME and PASSWORD must be set in .env (copy from .env.example)'
    );
  }
}

export async function loginAsAdmin(page: Page) {
  requireAuthEnv();

  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(
    process.env.LOGIN_USERNAME!,
    process.env.PASSWORD!
  );
  await loginPage.verifyLoginSuccessful();
}

export const AUTH_STORAGE_PATH = 'playwright/.auth/admin.json';
