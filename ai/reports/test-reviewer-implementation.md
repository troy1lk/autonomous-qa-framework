# Test Reviewer — Implementation Report

**Date:** 2026-06-29  
**Status:** All recommended improvements applied and verified.

---

## Test Results

```
5 passed (full suite)
4 passed (npm run test:smoke)
```

| Test | Result |
|------|--------|
| authenticate as admin (setup) | Pass |
| Admin can login successfully | Pass |
| SMK-01 Dashboard widgets | Pass |
| SMK-02 PIM Employee List | Pass |
| SMK-03 Employee Directory | Pass |

---

## Changes Applied

### Auth & fixtures
- `helpers/auth.helper.ts` — `requireAuthEnv()`, `AUTH_STORAGE_PATH`
- `tests/auth.setup.ts` — saves `storageState` once per run
- `fixtures/authenticated.fixture.ts` — `authenticatedPage` fixture
- `playwright.config.ts` — `setup`, `chromium`, and `e2e` projects

### Page objects
- `pages/AppLayout.ts` — shared logged-in user menu check
- `pages/DashboardPage.ts` — widget regions scoped with `.first()`, user menu via `AppLayout`
- `pages/PimPage.ts` — semantic `table` + `columnheader` locators, records count assertion
- `pages/DirectoryPage.ts` — records count + employee name paragraph in first card
- `pages/SideNav.ts` — tightened `goToLeave` URL; removed redundant constructors
- `pages/LoginPage.ts` — URL assertion kept in `verifyLoginSuccessful` only

### Tests
- All e2e specs use `authenticatedPage` fixture (no per-test login)
- Wrapped in `test.describe('OrangeHRM Smoke @smoke')` with serial mode
- `login.spec.ts` calls `requireAuthEnv()`
- `example.spec.ts` excluded from chromium project

### Tooling
- `package.json` — added `test:smoke` script

---

## Locator Notes Discovered During Fix

| Page | Actual DOM | Locator used |
|------|------------|--------------|
| PIM table | Column is **Id**, not "Employee Id" | `getByRole('columnheader', { name: /^Id/ })` |
| PIM table | **First (& Middle) Name** column | `getByRole('columnheader', { name: /First.*Name/ })` |
| Directory | Names in `<p>` tags, not `.orangehrm-directory-card-name` | `card.getByRole('paragraph').first()` |
| Dashboard | Nested widget containers | `.filter({ hasText: /^Time at Work$/ }).first()` |
