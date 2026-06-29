# OrangeHRM Test Coverage Analysis

**Date:** 2026-06-29  
**Analyst:** AI Coverage Analyzer  
**Application:** [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com)  
**Framework:** Playwright + TypeScript (Page Object Model)

---

## Current Coverage Summary

The framework has **4 functional tests** (1 login + 3 smoke) supported by **7 page objects**, **1 helper**, and **1 fixture**. Coverage is intentionally narrow: read-only smoke validation of authentication and three post-login areas.

| Metric | Value |
|--------|-------|
| Total automated tests | 4 (+ 1 auth setup) |
| OrangeHRM side-nav modules | 12 |
| Modules with smoke coverage | 3 (Dashboard, PIM, Directory) |
| Module coverage rate | **25%** (3 of 12) |
| Negative / error-path tests | 0 |
| Data-mutation tests | 0 |
| CI smoke pipeline | Yes (`.github/workflows/playwright-smoke.yml`) |

**Overall assessment:** Solid smoke foundation for login and three core modules. Large gaps remain across HR workflows, admin configuration, search/filter behaviour, session management, and failure scenarios.

---

## Covered Areas

### Authentication
| Area | Test | Page Object | Depth |
|------|------|-------------|-------|
| Valid admin login | `tests/login.spec.ts` | `LoginPage` | URL + Dashboard heading |
| Session reuse for smoke | `tests/auth.setup.ts` | `auth.helper` | `storageState` saved once per run |

### Dashboard (SMK-01)
| Assertion | Covered |
|-----------|---------|
| User menu visible | Yes (`AppLayout`) |
| Dashboard heading | Yes |
| Time at Work widget | Yes |
| Quick Launch widget | Yes |
| Buzz Latest Posts widget | Yes |
| Employee distribution charts | No |
| My Actions / punch status | No |

### PIM — Employee List (SMK-02)
| Assertion | Covered |
|-----------|---------|
| Navigation via side panel | Yes (`SideNav.goToPim`) |
| Employee Information heading | Yes |
| Semantic table visible | Yes |
| Column headers (Id, First Name) | Yes |
| Records count | Yes |
| At least one table row | Yes |
| Search / filter | No |
| Add Employee | No |
| Employee detail view | No |
| PIM Configuration / Reports sub-menus | No |

### Directory (SMK-03)
| Assertion | Covered |
|-----------|---------|
| Navigation via side panel | Yes (`SideNav.goToDirectory`) |
| Directory heading | Yes |
| Records count | Yes |
| At least one employee card | Yes |
| Employee name on card | Yes |
| Search by name / job title / location | No |
| Card detail navigation | No |

### Infrastructure (supporting coverage)
| Asset | Purpose |
|-------|---------|
| `fixtures/authenticated.fixture.ts` | Pre-authenticated `authenticatedPage` |
| `helpers/auth.helper.ts` | `loginAsAdmin`, `requireAuthEnv`, `AUTH_STORAGE_PATH` |
| `pages/AppLayout.ts` | Logged-in session indicator |
| `pages/BasePage.ts` | Shared navigation utilities |
| `pages/SideNav.ts` | Side-panel navigation (4 of 12 links wired) |

---

## Missing Areas

### OrangeHRM modules with no test coverage

| Module | Side-nav link | Page object | Test |
|--------|---------------|-------------|------|
| Admin | Yes | No | No |
| Leave | `goToLeave()` exists | No | No |
| Time | Yes | No | No |
| Recruitment | Yes | No | No |
| My Info | Yes | No | No |
| Performance | Yes | No | No |
| Maintenance | Yes | No | No |
| Claim | Yes | No | No |
| Buzz | Yes | No | No |

### Cross-cutting capabilities not tested

| Capability | Status |
|------------|--------|
| Logout | Not covered |
| Invalid login credentials | Not covered |
| Forgot password link | Not covered |
| User dropdown menu (Profile, Support, Logout) | Not covered |
| Side-panel search | Not covered |
| Top-bar sub-navigation (e.g. PIM → Add Employee, Reports) | Not covered |
| Pagination (PIM has multi-page list) | Not covered |
| Responsive / mobile layout | Not covered |
| Accessibility (axe) | Not covered |
| API layer | Not covered (`utils/` empty) |

### PIM sub-areas not covered

- Add Employee
- Employee Reports
- Configuration (Optional Fields, Custom Fields, Data Import, etc.)
- Employee record detail / personal tabs

### Leave sub-areas not covered

- Leave List (navigation method exists, no page object or test)
- Apply Leave
- My Leave
- Leave entitlements / configuration

---

## High-Priority Gaps

Gaps that represent core HR workflows or critical user journeys an admin would expect to work on day one.

| # | Gap | Risk if untested | Rationale |
|---|-----|------------------|-----------|
| H1 | **Leave module** — no smoke test despite `SideNav.goToLeave()` | High | Leave is a primary HR function; navigation method already exists but is unused |
| H2 | **Logout / session end** | High | Users must safely end sessions; no test validates logout returns to login |
| H3 | **Invalid login** | High | No negative test for wrong credentials; regression could expose auth bypass or silent failures |
| H4 | **Admin module** | High | Admin manages users, jobs, locations — central to OrangeHRM; zero coverage |
| H5 | **Buzz module** | Medium-High | Dashboard already asserts Buzz widget; full Buzz page untested — inconsistent coverage |
| H6 | **Search on PIM Employee List** | Medium-High | List has 200+ records; search is a primary interaction, currently unverified |

---

## Medium-Priority Gaps

Important functionality that extends smoke depth without requiring data mutation.

| # | Gap | Rationale |
|---|-----|-----------|
| M1 | **Time module** — timesheets, attendance | Core workforce tracking; read-only list view is feasible |
| M2 | **Recruitment** — vacancies / candidates list | Common HR module; read-only smoke viable |
| M3 | **My Info** — employee self-service view | Different user context; may need separate credentials |
| M4 | **User dropdown** — profile menu items visible | Validates authenticated chrome beyond `AppLayout.userMenu` |
| M5 | **PIM pagination** — navigate to page 2 | Ensures list interaction beyond first page |
| M6 | **Directory search/filter** | Filter form exists; read-only search with existing data is safe |
| M7 | **Performance module** | KPIs and reviews; read-only landing page smoke |
| M8 | **Dedicated login negative page object methods** | `LoginPage` has no `verifyLoginFailed()` |

---

## Low-Priority Gaps

Valuable for completeness but lower immediate risk for a demo smoke suite.

| # | Gap | Rationale |
|---|-----|-----------|
| L1 | **Maintenance module** | Often admin-only; demo may restrict access |
| L2 | **Claim module** | Newer module; lower usage on demo site |
| L3 | **Dashboard chart widgets** | Employee Distribution by Sub Unit / Location |
| L4 | **Forgot password link** | External flow; low smoke value |
| L5 | **Side-panel collapse / search** | UI chrome, not business workflow |
| L6 | **Accessibility audit** | No `@axe-core/playwright` integration yet |
| L7 | **Visual regression** | No screenshot baseline tooling |
| L8 | **API tests** | `utils/` folder empty; no REST coverage |
| L9 | **Remove `tests/example.spec.ts`** | Scaffold leftover; excluded from runs but still in repo |

---

## Recommended Next Tests

Five tests to add next, ordered by priority and feasibility (read-only, non-destructive).

### 1. SMK-04 — Admin can access Leave List

| Field | Value |
|-------|-------|
| **Priority** | High |
| **Spec** | `tests/e2e/leave.smoke.spec.ts` |
| **Steps** | Authenticated → `SideNav.goToLeave()` → verify Leave List |
| **Assertions** | URL `/leave/viewLeaveList`, heading "Leave List", records or table visible |
| **Why now** | `goToLeave()` already implemented; closes highest-priority module gap with minimal effort |

### 2. SMK-05 — Admin can logout successfully

| Field | Value |
|-------|-------|
| **Priority** | High |
| **Spec** | `tests/e2e/logout.smoke.spec.ts` |
| **Steps** | Authenticated → open user dropdown → click Logout |
| **Assertions** | Redirect to login page, login form visible, session cleared |
| **Why now** | Completes the auth lifecycle started by `login.spec.ts`; catches session/cookie regressions |

### 3. SMK-06 — Login fails with invalid credentials

| Field | Value |
|-------|-------|
| **Priority** | High |
| **Spec** | `tests/login-negative.spec.ts` |
| **Steps** | Open login → enter wrong password → submit |
| **Assertions** | Stays on login URL, "Invalid credentials" alert visible |
| **Why now** | Only negative auth test; fast to write; high security confidence value |

### 4. SMK-07 — Admin can access Admin module

| Field | Value |
|-------|-------|
| **Priority** | High |
| **Spec** | `tests/e2e/admin.smoke.spec.ts` |
| **Steps** | Authenticated → click Admin in side nav → verify landing page |
| **Assertions** | URL contains `/admin/`, Admin heading visible, User Management or System Users sub-menu present |
| **Why now** | Largest uncovered core module; admin is the default demo persona |

### 5. SMK-08 — Admin can search PIM Employee List

| Field | Value |
|-------|-------|
| **Priority** | Medium-High |
| **Spec** | `tests/e2e/pim-search.smoke.spec.ts` |
| **Steps** | Authenticated → PIM → enter known employee name from existing data → Search |
| **Assertions** | Filtered results show matching row; records count updates |
| **Why now** | Deepens PIM coverage beyond page load; uses existing demo data (read-only, no create/delete) |

---

## Suggested Page Objects / Helpers Needed

### New page objects

| Page Object | File | Methods / locators |
|-------------|------|-------------------|
| `LeavePage` | `pages/LeavePage.ts` | `verifyLeaveListLoaded()` — heading, URL, table or records count |
| `AdminPage` | `pages/AdminPage.ts` | `verifyAdminModuleLoaded()` — heading, URL, sub-nav items |
| `UserMenu` | `pages/UserMenu.ts` | `open()`, `logout()`, `verifyMenuItems()` — dropdown interactions |
| `BuzzPage` | `pages/BuzzPage.ts` | `verifyBuzzFeedLoaded()` — feed posts, compose area (read-only) |

### Extensions to existing page objects

| Page Object | Addition |
|-------------|----------|
| `LoginPage` | `loginExpectingFailure()`, `verifyInvalidCredentials()` |
| `SideNav` | `goToAdmin()`, `goToBuzz()`, `goToTime()`, `goToRecruitment()` |
| `PimPage` | `searchByEmployeeName(name)`, `verifySearchResults(name)` |
| `DirectoryPage` | `searchByEmployeeName(name)`, `verifyFilteredResults()` |

### Helpers / fixtures

| Asset | Purpose |
|-------|---------|
| `helpers/test-data.helper.ts` | Known stable employee names from demo site for search tests |
| Extend `authenticated.fixture.ts` | Optional `adminPage` vs `employeePage` contexts if My Info tests added later |
| `fixtures/logout.fixture.ts` | Optional — test logout without polluting other tests' storage state |

### No new infrastructure required for next 5 tests

Existing `auth.setup.ts`, `authenticated.fixture.ts`, and `playwright.config.ts` project split already support adding e2e specs. SMK-06 (negative login) should run in the `chromium` project without `storageState`.

---

## Coverage Map

```
OrangeHRM Module          Test    Page Object    Priority to add
─────────────────────────────────────────────────────────────────
Login / Auth              ████    LoginPage      —
Dashboard                 ████    DashboardPage  —
PIM (Employee List)       ████    PimPage        Search (SMK-08)
Directory                 ████    DirectoryPage  Filter (later)
Leave                     ░░░░    —              SMK-04 ★
Logout                    ░░░░    —              SMK-05 ★
Invalid login             ░░░░    —              SMK-06 ★
Admin                     ░░░░    —              SMK-07 ★
Buzz                      ░░░░    —              After SMK-04–07
Time                      ░░░░    —              Medium
Recruitment               ░░░░    —              Medium
My Info                   ░░░░    —              Medium (needs user creds)
Performance               ░░░░    —              Medium
Maintenance               ░░░░    —              Low
Claim                     ░░░░    —              Low

████ = smoke covered   ░░░░ = not covered   ★ = recommended next
```

---

## Alignment with Existing Reports

| Source | Alignment |
|--------|-----------|
| `orangehrm-test-plan.md` | All 3 planned scenarios (SMK-01–03) implemented |
| `orangehrm-execution-summary.md` | Recommended SMK-04 (Leave) and logout still open — confirmed as high priority |
| `test-reviewer-implementation.md` | Auth fixture and page object improvements complete; gaps identified here build on that foundation |
| CI workflow | Runs `npm run test:smoke` only — new tests should retain `@smoke` tag to stay in pipeline |

---

## Summary

The framework covers **authentication** and **three read-only module smokes** well. The next increment should focus on **Leave**, **logout**, **negative login**, and **Admin** — four high-priority gaps addressable without destructive actions. A fifth test deepening **PIM search** adds functional depth beyond navigation-only checks.

**No code was modified during this analysis.**
