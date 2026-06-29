import { test as setup } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { AUTH_STORAGE_PATH, loginAsAdmin } from '../helpers/auth.helper';

setup('authenticate as admin', async ({ page }) => {
  fs.mkdirSync(path.dirname(AUTH_STORAGE_PATH), { recursive: true });
  await loginAsAdmin(page);
  await page.context().storageState({ path: AUTH_STORAGE_PATH });
});
