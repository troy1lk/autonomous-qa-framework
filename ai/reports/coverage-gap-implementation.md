# Coverage Gap Implementation Report

**Date:** 2026-06-29  
**Source:** `ai/reports/coverage-analysis.md`  
**Status:** Complete — all 5 recommended tests implemented and passing

---

## Test Results

```
10 passed (full suite, ~30s)
9 passed (npm run test:smoke)
```

| Test ID | Test Name | Spec | Result |
|---------|-----------|------|--------|
| SMK-04 | Admin can access Leave List | `tests/e2e/leave.smoke.spec.ts` | Pass |
| SMK-05 | Admin can logout successfully | `tests/logout.spec.ts` | Pass |
| SMK-06 | Login fails with invalid credentials | `tests/login-negative.spec.ts` | Pass |
| SMK-07 | Admin can access Admin module | `tests/e2e/admin.smoke.spec.ts` | Pass |
| SMK-08 | Admin can search PIM Employee List | `tests/e2e/pim-search.smoke.spec.ts` | Pass |

---

## Files Created

### Page objects

| File | Purpose |
|------|---------|
| `pages/LeavePage.ts` | Leave List URL, heading, table assertions |
| `pages/AdminPage.ts` | Admin module — System Users heading and users table |
| `pages/UserMenu.ts` | User dropdown logout action |

### Helpers

| File | Purpose |
|------|---------|
| `helpers/test-data.helper.ts` | Stable `PIM_SEARCH_EMPLOYEE_ID` for read-only search |

### Tests

| File | Project | Notes |
|------|---------|-------|
| `tests/e2e/leave.smoke.spec.ts` | e2e | SMK-04 |
| `tests/logout.spec.ts` | chromium | SMK-05 — fresh login, not storageState |
| `tests/login-negative.spec.ts` | chromium | SMK-06 — no auth state |
| `tests/e2e/admin.smoke.spec.ts` | e2e | SMK-07 |
| `tests/e2e/pim-search.smoke.spec.ts` | e2e | SMK-08 |

---

## Files Updated

| File | Changes |
|------|---------|
| `pages/LoginPage.ts` | `loginExpectingFailure()`, `verifyInvalidCredentials()`, `verifyLoginPageDisplayed()` |
| `pages/PimPage.ts` | `searchByEmployeeId()`, `verifySearchResultsContain()` |
| `pages/SideNav.ts` | `goToAdmin()` |

---

## Issues Encountered & Fixes

### 1. Logout invalidated shared storageState

**Problem:** SMK-05 in `tests/e2e/` logged out using `storageState` cookies, invalidating the server session for all subsequent e2e tests.

**Fix:** Moved logout test to `tests/logout.spec.ts` in the `chromium` project — performs fresh `loginAsAdmin()` then logout.

### 2. Admin module lands on System Users

**Problem:** `getByRole('link', { name: 'System Users' })` not found — Admin module default view is already the System Users page.

**Fix:** Assert `heading` "System Users" (level 5) and users `table` instead of a nav link.

### 3. Leave List has no records count

**Problem:** `(N) Records Found` text not present on Leave List page.

**Fix:** Assert Leave List heading and table only.

### 4. PIM name search returned no results

**Problem:** Searching "Williams" in Employee Name field returned "No Records Found" — autocomplete/name matching behaves differently on demo data.

**Fix:** Switched to Employee Id search using stable demo id `0312` via filter-scoped locator.

### 5. Employee Id locator strict mode violation

**Problem:** `.oxd-form-row` filter matched multiple textboxes.

**Fix:** Scoped to `.oxd-table-filter input.oxd-input:not([placeholder])`.

---

## Coverage After Implementation

| Area | Before | After |
|------|--------|-------|
| Functional tests | 4 | 9 (+ setup) |
| Modules with smoke coverage | 3 | 6 (Dashboard, PIM, Directory, Leave, Admin, Auth) |
| Negative auth tests | 0 | 1 |
| Logout flow | 0 | 1 |
| PIM search | 0 | 1 |

### Still uncovered (future work)

- Buzz, Time, Recruitment, My Info, Performance, Maintenance, Claim
- Directory search/filter
- PIM pagination
- Accessibility and API testing

---

## Safety Compliance

- All new tests are read-only
- No employee data created, edited, or deleted
- PIM search uses existing demo employee id `0312`

---

## Run Commands

```bash
npm test              # all 10 tests
npm run test:smoke    # 9 @smoke tests (CI pipeline)
```

---

## Defects Found

No application defects identified. All failures were test design/locator issues resolved during implementation.
