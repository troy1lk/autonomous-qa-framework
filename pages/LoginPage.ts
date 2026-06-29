import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  usernameTextbox = this.page.getByPlaceholder('Username');
  passwordTextbox = this.page.getByPlaceholder('Password');
  loginButton = this.page.getByRole('button', { name: 'Login' });
  dashboardTitle = this.page.getByRole('heading', { name: 'Dashboard' });
  invalidCredentialsAlert = this.page
    .getByRole('alert')
    .filter({ hasText: 'Invalid credentials' });

  async open() {
    await this.page.goto('/web/index.php/auth/login');
    await this.usernameTextbox.waitFor({ state: 'visible' });
  }

  async login(username: string, password: string) {
    await this.usernameTextbox.fill(username);
    await this.passwordTextbox.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL(/dashboard/);
  }

  async verifyLoginSuccessful() {
    await expect(this.page).toHaveURL(/dashboard/);
    await expect(this.dashboardTitle).toBeVisible();
  }

  async loginExpectingFailure(username: string, password: string) {
    await this.usernameTextbox.fill(username);
    await this.passwordTextbox.fill(password);
    await this.loginButton.click();
  }

  async verifyInvalidCredentials() {
    await expect(this.page).toHaveURL(/auth\/login/);
    await expect(this.invalidCredentialsAlert).toBeVisible();
  }

  async verifyLoginPageDisplayed() {
    await expect(this.page).toHaveURL(/auth\/login/);
    await expect(this.usernameTextbox).toBeVisible();
    await expect(this.passwordTextbox).toBeVisible();
  }
}