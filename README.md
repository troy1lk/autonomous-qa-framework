# Autonomous QA Framework

A Playwright + TypeScript test automation framework using the Page Object Model (POM). Built against the [OrangeHRM demo site](https://opensource-demo.orangehrmlive.com) as a reference application.

Includes an **autonomous QA workflow** — an AI-driven prompt that explores the app, writes smoke tests, runs them, and produces reports.

Use this guide to scaffold the same setup on a new project, or to understand how this repo is organized.

---

## Current Test Suite

| Test ID | Spec | Description |
|---------|------|-------------|
| — | `tests/login.spec.ts` | Admin can login successfully |
| SMK-01 | `tests/e2e/dashboard.smoke.spec.ts` | Dashboard displays core widgets after login |
| SMK-02 | `tests/e2e/pim.smoke.spec.ts` | Admin can access PIM Employee List |
| SMK-03 | `tests/e2e/directory.smoke.spec.ts` | Admin can access Employee Directory |

```bash
npm test                  # run all tests
npx playwright test tests/e2e/   # smoke tests only
npm run report            # open HTML report
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm (included with Node.js)

---

## Quick Start (existing clone)

```bash
cp .env.example .env      # macOS / Linux
# copy .env.example .env  # Windows
npm install
npx playwright install
npm test
```

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
mkdir -p pages helpers fixtures utils docs ai/prompts ai/reports ai/workflows .cursor/rules
```

**Windows (PowerShell)**

```powershell
mkdir pages, helpers, fixtures, utils, docs, ai, ai\prompts, ai\reports, ai\workflows, .cursor, .cursor\rules
```

| Folder | Purpose |
|--------|---------|
| `pages/` | Page Object classes |
| `helpers/` | Reusable test helpers (e.g. login) |
| `fixtures/` | Custom Playwright fixtures |
| `utils/` | Shared utilities (data builders, API clients) |
| `docs/` | Framework documentation |
| `tests/e2e/` | End-to-end smoke and regression tests |
| `ai/prompts/` | AI prompt templates for test generation |
| `ai/reports/` | AI-generated test plans, defect logs, summaries |
| `ai/workflows/` | AI automation workflows |
| `.cursor/rules/` | Cursor agent rules for autonomous QA |

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

  workers: 1,

  timeout: 60_000,

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

| Setting | Why |
|---------|-----|
| `workers: 1` | OrangeHRM demo is a shared instance — parallel runs cause flaky logins |
| `timeout: 60_000` | Demo site can be slow; 30s default is often too short |
| `retries: 1` | One automatic retry on transient failures |
| `trace: 'on-first-retry'` | Captures trace only when a retry is needed |

---

### Step 6 — Add npm scripts

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
}
```

**Locator tips:**

- Prefer `getByRole`, `getByPlaceholder`, and `getByLabel` over CSS selectors.
- Use `getByRole('heading', { name: 'Dashboard' })` instead of `getByText('Dashboard')` when the text appears in multiple places (sidebar link + page heading).
- Avoid `waitForLoadState('networkidle')` on OrangeHRM — the app has continuous network activity. Use `waitForURL()` instead.

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

## Phase 3 — Smoke Tests & Helpers

### Auth helper — `helpers/auth.helper.ts`

Reuses `LoginPage` so smoke tests don't duplicate login logic:

```ts
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
```

---

### Side navigation — `pages/SideNav.ts`

Shared navigation for modules accessed from the left menu:

```ts
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SideNav extends BasePage {
  dashboardLink = this.page.getByRole('link', { name: 'Dashboard', exact: true });
  pimLink = this.page.getByRole('link', { name: 'PIM', exact: true });
  directoryLink = this.page.getByRole('link', { name: 'Directory', exact: true });

  async goToPim() {
    await this.pimLink.click();
    await this.page.waitForURL(/pim\/viewEmployeeList/);
  }

  async goToDirectory() {
    await this.directoryLink.click();
    await this.page.waitForURL(/directory\/viewDirectory/);
  }
}
```

---

### Module page objects

| Page Object | File | Verifies |
|-------------|------|----------|
| `DashboardPage` | `pages/DashboardPage.ts` | Dashboard URL, heading, Time at Work / Quick Launch / Buzz widgets |
| `PimPage` | `pages/PimPage.ts` | PIM Employee List URL, heading, table has rows |
| `DirectoryPage` | `pages/DirectoryPage.ts` | Directory URL, heading, employee cards visible |

---

### E2E smoke tests — `tests/e2e/`

Example (`tests/e2e/pim.smoke.spec.ts`):

```ts
import { test } from '@playwright/test';
import { loginAsAdmin } from '../../helpers/auth.helper';
import { PimPage } from '../../pages/PimPage';
import { SideNav } from '../../pages/SideNav';

test('SMK-02 Admin can access PIM Employee List', async ({ page }) => {
  await loginAsAdmin(page);

  const sideNav = new SideNav(page);
  await sideNav.goToPim();

  const pimPage = new PimPage(page);
  await pimPage.verifyEmployeeListLoaded();
});
```

All smoke tests are **read-only** — no employee data is created, edited, or deleted.

---

## Phase 4 — Autonomous QA Workflow

This repo includes an AI-driven workflow for generating and validating tests automatically.

### Cursor rule

`.cursor/rules/autonomous-qa-agent.mdc` — instructs the Cursor agent to follow POM conventions, use resilient locators, run tests after changes, and avoid destructive actions.

### Workflow prompt

`ai/prompts/autonomous-orangehrm-workflow.md` — paste or reference this in Cursor to trigger the full autonomous cycle:

1. Inspect project structure
2. Reuse existing `LoginPage`
3. Explore the OrangeHRM dashboard after login
4. Identify 3 important smoke test scenarios
5. Create a test plan in `ai/reports/orangehrm-test-plan.md`
6. Generate Playwright tests in `tests/e2e/`
7. Run the generated tests
8. Fix locator/wait issues on failure
9. Document real app bugs in `ai/reports/orangehrm-defects.md`
10. Produce a summary in `ai/reports/orangehrm-execution-summary.md`

**To run it in Cursor:**

```
Read and execute the workflow in @ai/prompts/autonomous-orangehrm-workflow.md
```

### Generated reports

| Report | Purpose |
|--------|---------|
| `ai/reports/orangehrm-test-plan.md` | Smoke test plan with scenarios and expected results |
| `ai/reports/orangehrm-defects.md` | Application defects found during runs |
| `ai/reports/orangehrm-execution-summary.md` | Final run results, files created, fixes applied |

---

## Project Structure

```
autonomous-qa-framework/
├── .cursor/
│   └── rules/
│       └── autonomous-qa-agent.mdc
├── ai/
│   ├── prompts/
│   │   └── autonomous-orangehrm-workflow.md
│   ├── reports/
│   │   ├── orangehrm-test-plan.md
│   │   ├── orangehrm-defects.md
│   │   └── orangehrm-execution-summary.md
│   └── workflows/
├── docs/
├── fixtures/
├── helpers/
│   └── auth.helper.ts
├── pages/
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   ├── PimPage.ts
│   ├── DirectoryPage.ts
│   └── SideNav.ts
├── tests/
│   ├── login.spec.ts
│   └── e2e/
│       ├── dashboard.smoke.spec.ts
│       ├── pim.smoke.spec.ts
│       └── directory.smoke.spec.ts
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
npm test

# Run smoke tests only
npx playwright test tests/e2e/

# Run a single spec
npx playwright test tests/login.spec.ts

# Run with browser visible
npm run test:headed

# Open interactive UI mode
npm run test:ui

# View HTML report after a run
npm run report

# View trace from a failed retry
npx playwright show-trace test-results/<test-folder>/trace.zip
```

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `Invalid credentials` on login | `USERNAME` env var conflict on Windows | Rename to `LOGIN_USERNAME` in `.env` and tests |
| `strict mode violation` on locator | Locator matches multiple elements | Use a more specific locator (e.g. `getByRole('heading', { level: 5 })`) |
| Test timeout on navigation | `networkidle` never settles on OrangeHRM | Replace with `waitForURL()` or wait for a specific element |
| Flaky login under parallel runs | Shared demo site overloaded | Set `workers: 1` in `playwright.config.ts` |
| `Executable doesn't exist` | Browsers not installed | Run `npx playwright install` |
| `BASE_URL` is undefined | `.env` not loaded or missing | Ensure `dotenv.config()` is in `playwright.config.ts` and `.env` exists |

---

## What's Next

- [x] Add page objects for Dashboard, PIM, Directory
- [x] Add auth helper for reusable login
- [x] Add read-only smoke tests in `tests/e2e/`
- [x] Add autonomous QA workflow prompt and reports
- [ ] Create custom fixtures for authenticated sessions (avoid repeated logins)
- [ ] Add Leave module smoke test (SMK-04)
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
