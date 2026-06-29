# Autonomous QA Framework

A Playwright + TypeScript test automation framework using the Page Object Model (POM). Built against the [OrangeHRM demo site](https://opensource-demo.orangehrmlive.com) as a reference application.

Use this guide to scaffold the same setup on a new project.

---

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm (included with Node.js)

---

## Phase 1 — Initialize & Configure

### Step 1 — Create the project

```bash
mkdir autonomous-qa-framework
cd autonomous-qa-framework
npm init playwright@latest
```

When prompted, choose:

| Prompt | Choice |
|--------|--------|
| Language | **TypeScript** |
| Tests folder | **tests** |
| GitHub Actions workflow | **No** |
| Install Playwright browsers | **Yes** |

Verify the install:

```bash
npx playwright test
npx playwright show-report
```

---

### Step 2 — Create folders

From the project root:

**macOS / Linux**

```bash
mkdir -p pages helpers fixtures utils docs ai/prompts ai/reports ai/workflows
```

**Windows (PowerShell)**

```powershell
mkdir pages, helpers, fixtures, utils, docs, ai, ai\prompts, ai\reports, ai\workflows
```

| Folder | Purpose |
|--------|---------|
| `pages/` | Page Object classes |
| `helpers/` | Reusable test helpers |
| `fixtures/` | Custom Playwright fixtures |
| `utils/` | Shared utilities (data builders, API clients) |
| `docs/` | Framework documentation |
| `ai/prompts/` | AI prompt templates for test generation |
| `ai/reports/` | AI-generated test reports |
| `ai/workflows/` | AI automation workflows |

---

### Step 3 — Install useful packages

```bash
npm install dotenv faker
npm install -D eslint prettier
```

| Package | Purpose |
|---------|---------|
| `dotenv` | Load environment variables from `.env` |
| `faker` | Generate test data |
| `eslint` | Linting |
| `prettier` | Code formatting |

> **Later:** add API testing, accessibility (`@axe-core/playwright`), and visual regression libraries as needed.

---

### Step 4 — Environment variables

Create a `.env` file in the project root:

```env
BASE_URL=https://opensource-demo.orangehrmlive.com
LOGIN_USERNAME=Admin
PASSWORD=admin123
```

> **Important (Windows):** Do **not** use `USERNAME` as the variable name. Windows already sets a system `USERNAME` environment variable, and `dotenv` will not override it. Your tests would log in with your Windows account name instead of `Admin`. Use `LOGIN_USERNAME` (or any prefixed name like `ORANGE_USERNAME`).

Copy `.env.example` to `.env` when starting a new machine:

```bash
cp .env.example .env
```

Add `.env` to `.gitignore` so credentials are never committed:

```gitignore
# Environment
.env
```

---

### Step 5 — Update `playwright.config.ts`

Replace the generated config with:

```ts
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',

  retries: 1,

  reporter: [
    ['list'],
    ['html']
  ],

  use: {
    baseURL: process.env.BASE_URL,

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
});
```

This gives you a clean, configurable foundation with HTML reports, traces on retry, and failure screenshots/videos.

---

### Step 6 — Add npm scripts (optional but recommended)

Add these to `package.json`:

```json
"scripts": {
  "test": "playwright test",
  "test:headed": "playwright test --headed",
  "test:ui": "playwright test --ui",
  "report": "playwright show-report"
}
```

---

## Phase 2 — Build the Framework (Page Object Model)

### Step 1 — Create `pages/BasePage.ts`

Every page class inherits common methods from a single base class instead of duplicating them.

```ts
import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async getTitle() {
    return this.page.title();
  }

  async wait(milliseconds: number) {
    await this.page.waitForTimeout(milliseconds);
  }
}
```

---

### Step 2 — Create `pages/LoginPage.ts`

```ts
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

  async open() {
    await this.page.goto('/web/index.php/auth/login');
  }

  async login(username: string, password: string) {
    await this.usernameTextbox.fill(username);
    await this.passwordTextbox.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLoginSuccessful() {
    await expect(this.page).toHaveURL(/dashboard/);
    await expect(this.dashboardTitle).toBeVisible();
  }
}
```

**Locator tips:**

- Prefer `getByRole`, `getByPlaceholder`, and `getByLabel` over CSS selectors.
- Use `getByRole('heading', { name: 'Dashboard' })` instead of `getByText('Dashboard')` when the text appears in multiple places (sidebar link + page heading).

---

### Step 3 — Create `tests/login.spec.ts`

```ts
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
```

---

### Step 4 — Remove the default example test (optional)

Playwright generates `tests/example.spec.ts` targeting playwright.dev. Delete it once you have your own tests:

```bash
rm tests/example.spec.ts
```

---

## Project Structure

```
autonomous-qa-framework/
├── ai/
│   ├── prompts/
│   ├── reports/
│   └── workflows/
├── docs/
├── fixtures/
├── helpers/
├── pages/
│   ├── BasePage.ts
│   └── LoginPage.ts
├── tests/
│   └── login.spec.ts
├── utils/
├── .env                  # local secrets (not committed)
├── .env.example          # template for new setups
├── .gitignore
├── package.json
├── playwright.config.ts
└── README.md
```

---

## Running Tests

```bash
# Run all tests (headless)
npx playwright test

# Run a single spec
npx playwright test tests/login.spec.ts

# Run with browser visible
npx playwright test --headed

# Open interactive UI mode
npx playwright test --ui

# View HTML report after a run
npx playwright show-report

# View trace from a failed retry
npx playwright show-trace test-results/<test-folder>/trace.zip
```

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `Invalid credentials` on login | `USERNAME` env var conflict on Windows | Rename to `LOGIN_USERNAME` in `.env` and tests |
| `strict mode violation` on locator | Locator matches multiple elements | Use a more specific locator (e.g. `getByRole('heading', ...)`) |
| `Executable doesn't exist` | Browsers not installed | Run `npx playwright install` |
| `BASE_URL` is undefined | `.env` not loaded or missing | Ensure `dotenv.config()` is in `playwright.config.ts` and `.env` exists |

---

## What's Next

- [ ] Add more page objects (Admin, PIM, Leave, etc.)
- [ ] Create custom fixtures for authenticated sessions
- [ ] Add API testing helpers in `utils/`
- [ ] Integrate accessibility checks with `@axe-core/playwright`
- [ ] Add visual regression testing
- [ ] Configure ESLint and Prettier rules
- [ ] Set up CI/CD (GitHub Actions, Azure DevOps, etc.)

---

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Page Object Model](https://playwright.dev/docs/pom)
- [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
