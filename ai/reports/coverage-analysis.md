# OrangeHRM Test Coverage Analysis

**Date:** 2026-06-29 (refreshed)  
**Analyst:** AI Coverage Analyzer / Autonomous QA Orchestrator  
**Application:** [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com)  
**Framework:** Playwright + TypeScript (Page Object Model)

---

## Current Coverage Summary

The framework has **11 smoke scenarios (SMK-01–SMK-11)** plus **1 auth setup**, **1 positive login** (full suite only), supported by **13 page objects**, **1 helper**, and **1 fixture**. Coverage is read-only smoke validation across authentication lifecycle and nine OrangeHRM side-nav modules.

| Metric | Value |
|--------|-------|
| Smoke tests (`@smoke`) | 12 (setup + 11 SMK) |
| Full suite tests | 13 (+ positive login, not `@smoke`) |
| OrangeHRM side-nav modules | 12 |
| Modules with smoke coverage | 9 |
| Module coverage rate | **75%** (9 of 12) |
| Negative / error-path tests | 1 (SMK-06) |
| Data-mutation tests | 0 |
| CI smoke pipeline | Yes (`.github/workflows/playwright-smoke.yml`) |

**Overall assessment:** Mature read-only smoke suite covering auth lifecycle and most core HR modules. Remaining gaps are My Info (employee context), Performance, Maintenance, and Claim. Cross-cutting depth (search/filter beyond PIM, pagination, multi-role) is still limited.

---

## Covered Areas

### Authentication

| Area | Test | Page Object | Depth |
|------|------|-------------|-------|
| Valid admin login | `tests/login.spec.ts` (full suite only) | `LoginPage` | URL + Dashboard heading |
| Session reuse for smoke | `tests/auth.setup.ts` | `auth.helper` | `storageState` saved once per run |
| Logout | SMK-05 `tests/logout.spec.ts` | `UserMenu`, `LoginPage` | Redirect to login form |
| Invalid credentials | SMK-06 `tests/login-negative.spec.ts` | `LoginPage` | Stays on login; error alert |

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

### PIM — Employee List (SMK-02, SMK-08)

| Assertion | Covered |
|-----------|---------|
| Navigation via side panel | Yes (`SideNav.goToPim`) |
| Employee Information heading | Yes |
| Semantic table visible | Yes |
| Column headers (Id, First Name) | Yes |
| Records count | Yes |
| At least one table row | Yes |
| Search by Employee Id | Yes (SMK-08, id `0312`) |
| Add Employee | No |
| Employee detail view | No |
| PIM Configuration / Reports sub-menus | No |
| Pagination (page 2+) | No |

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

### Leave (SMK-04)

| Assertion | Covered |
|-----------|---------|
| Navigation via side panel | Yes (`SideNav.goToLeave`) |
| Leave List heading | Yes |
| Leave table visible | Yes |
| Apply Leave / My Leave sub-menus | No |

### Admin (SMK-07)

| Assertion | Covered |
|-----------|---------|
| Navigation via side panel | Yes (`SideNav.goToAdmin`) |
| Admin heading | Yes |
| System Users sub-heading | Yes |
| Users table visible | Yes |
| User search / Add user | No |

### Buzz (SMK-09)

| Assertion | Covered |
|-----------|---------|
| Navigation via side panel | Yes (`SideNav.goToBuzz`) |
| URL contains `/buzz/` | Yes |
| At least one post card visible | Yes |
| Compose / post creation | No |

### Time (SMK-10)

| Assertion | Covered |
|-----------|---------|
| Navigation via side panel | Yes (`SideNav.goToTime`) |
| URL contains `/time/` | Yes |
| Timesheets Pending Action heading | Yes |
| Select Employee heading | Yes |
| Pending table visible | Yes |
| Timesheet entry / submit | No |

### Recruitment (SMK-11)

| Assertion | Covered |
|-----------|---------|
| Navigation via side panel | Yes (`SideNav.goToRecruitment`) |
| Candidates heading | Yes |
| Candidates table visible | Yes |
| Records count | Yes |
| Vacancies sub-menu | No |
| Add candidate | No |

### Infrastructure (supporting coverage)

| Asset | Purpose |
|-------|---------|
| `fixtures/authenticated.fixture.ts` | Pre-authenticated `authenticatedPage` |
| `helpers/auth.helper.ts` | `loginAsAdmin`, `requireAuthEnv`, `AUTH_STORAGE_PATH` |
| `helpers/test-data.helper.ts` | `PIM_SEARCH_EMPLOYEE_ID = '0312'` |
| `pages/AppLayout.ts` | Logged-in session indicator |
| `pages/BasePage.ts` | Shared navigation utilities |
| `pages/SideNav.ts` | Side-panel navigation (8 of 12 links wired) |
| `pages/UserMenu.ts` | Logout dropdown interactions |

---

## Missing Areas

### OrangeHRM modules with no test coverage

| Module | Side-nav link | Page object | Test |
|--------|---------------|-------------|------|
| My Info | Yes | No | No |
| Performance | Yes | No | No |
| Maintenance | Yes | No | No |
| Claim | Yes | No | No |

### Cross-cutting capabilities not tested

| Capability | Status |
|------------|--------|
| Forgot password link | Not covered |
| User dropdown beyond logout (Profile, Support) | Partial (`UserMenu` used for logout only) |
| Side-panel search | Not covered |
| Top-bar sub-navigation (e.g. PIM → Add Employee, Reports) | Not covered |
| Directory search/filter | Not covered |
| PIM pagination | Not covered |
| Multi-user / role-based access (employee vs admin) | Not covered |
| Responsive / mobile layout | Not covered |
| Accessibility (axe) | Not covered |
| API layer | Not covered (`utils/` empty) |

### Submodule workflows not covered

- PIM: Add Employee, Reports, Configuration, employee detail tabs
- Leave: Apply Leave, My Leave, entitlements
- Time: Employee timesheet entry, attendance
- Recruitment: Vacancies, add candidate
- Admin: User search, add user, job/org configuration
- Buzz: Post creation, comments, likes

---

## High-Priority Gaps

| # | Gap | Risk if untested | Rationale |
|---|-----|------------------|-----------|
| H1 | **Directory search/filter** | Medium-High | SMK-03 is navigation-only; filter form exists and is read-only safe |
| H2 | **Performance module** | Medium | Phase 1 remainder per application map; read-only landing smoke viable |
| H3 | **My Info** (employee self-service) | Medium | Different user context; may need separate credentials |
| H4 | **PIM pagination** | Medium | 200+ records; page-2 navigation unverified |

---

## Medium-Priority Gaps

| # | Gap | Rationale |
|---|-----|-----------|
| M1 | **Claim module** | Newer module; read-only assign-claim list smoke feasible |
| M2 | **User dropdown** — Profile, Support menu items | Validates authenticated chrome beyond logout |
| M3 | **PIM sub-menus** — Reports, Configuration (read-only) | Extends PIM beyond Employee List |
| M4 | **Recruitment Vacancies** sub-menu | Complements SMK-11 candidates coverage |
| M5 | **Time attendance** sub-menu | Complements SMK-10 timesheets coverage |
| M6 | **Dedicated `LoginPage.verifyLoginFailed()`** | Negative login works; method could consolidate assertions |

---

## Low-Priority Gaps

| # | Gap | Rationale |
|---|-----|-----------|
| L1 | **Maintenance module** | Destructive purge workflows; demo may gate access — avoid in smoke |
| L2 | **Dashboard chart widgets** | Employee Distribution by Sub Unit / Location |
| L3 | **Forgot password link** | External flow; low smoke value |
| L4 | **Side-panel collapse / search** | UI chrome, not business workflow |
| L5 | **Accessibility audit** | No `@axe-core/playwright` integration |
| L6 | **Visual regression** | No screenshot baseline tooling |
| L7 | **API tests** | `utils/` folder empty |
| L8 | **Remove `tests/example.spec.ts`** | Scaffold leftover if still present |

---

## Recommended Next Tests

Ordered by priority. **SMK-01–11 are implemented** — these are the next increment only if coverage expansion is approved.

### 1. SMK-12 — Admin can access Performance module (read-only)

| Field | Value |
|-------|-------|
| **Priority** | Medium-High |
| **Spec** | `tests/e2e/performance.smoke.spec.ts` |
| **Steps** | Authenticated → Performance side nav → verify landing page |
| **Assertions** | URL `/performance/`, Manage Reviews or equivalent heading, table or list visible |
| **Why next** | Closes Phase 1 remainder; read-only, non-destructive |

### 2. Directory search by employee name

| Field | Value |
|-------|-------|
| **Priority** | Medium-High |
| **Spec** | Extend `tests/e2e/directory.smoke.spec.ts` or new spec |
| **Steps** | Directory → enter known employee name → Search |
| **Assertions** | Filtered card(s) visible; records count updates |
| **Why next** | Adds functional depth to existing SMK-03 without new module |

### 3. SMK-13 — Claim module landing (read-only)

| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Spec** | `tests/e2e/claim.smoke.spec.ts` |
| **Steps** | Authenticated → Claim side nav → verify assign-claim list |
| **Assertions** | URL `/claim/`, heading visible, table or records count |

### 4. PIM pagination — navigate to page 2

| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Spec** | `tests/e2e/pim-pagination.smoke.spec.ts` |
| **Steps** | PIM Employee List → click page 2 |
| **Assertions** | URL or table updates; different rows visible |

### 5. My Info — employee self-service (separate credentials)

| Field | Value |
|-------|-------|
| **Priority** | Medium (blocked on credentials) |
| **Spec** | `tests/e2e/my-info.smoke.spec.ts` |
| **Steps** | Login as employee → My Info → Personal Details |
| **Assertions** | URL `/pim/viewMyDetails`, personal details visible |
| **Why later** | Requires non-admin test user in `.env` |

---

## Coverage Map

```
OrangeHRM Module          Test    Page Object    Status
─────────────────────────────────────────────────────────────────
Login / Auth              ████    LoginPage      Covered (login, logout, negative)
Dashboard                 ████    DashboardPage  SMK-01
PIM (Employee List)       ████    PimPage        SMK-02, SMK-08 (search)
Directory                 ████    DirectoryPage  SMK-03 (search: gap)
Leave                     ████    LeavePage      SMK-04
Admin                     ████    AdminPage      SMK-07
Buzz                      ████    BuzzPage       SMK-09
Time                      ████    TimePage       SMK-10
Recruitment               ████    RecruitmentPage SMK-11
Performance               ░░░░    —              SMK-12 candidate
My Info                   ░░░░    —              Needs employee creds
Maintenance               ░░░░    —              Low (destructive)
Claim                     ░░░░    —              SMK-13 candidate

████ = smoke covered   ░░░░ = not covered
```

---

## Test Inventory (SMK-01–SMK-11)

| ID | Name | Spec | Project |
|----|------|------|---------|
| — | authenticate as admin | `tests/auth.setup.ts` | setup |
| SMK-06 | Login fails with invalid credentials | `tests/login-negative.spec.ts` | chromium |
| SMK-05 | Admin can logout successfully | `tests/logout.spec.ts` | chromium |
| SMK-07 | Admin can access Admin module | `tests/e2e/admin.smoke.spec.ts` | e2e |
| SMK-09 | Admin can access Buzz feed | `tests/e2e/buzz.smoke.spec.ts` | e2e |
| SMK-01 | Dashboard displays core widgets | `tests/e2e/dashboard.smoke.spec.ts` | e2e |
| SMK-03 | Admin can access Employee Directory | `tests/e2e/directory.smoke.spec.ts` | e2e |
| SMK-04 | Admin can access Leave List | `tests/e2e/leave.smoke.spec.ts` | e2e |
| SMK-08 | Admin can search PIM Employee List | `tests/e2e/pim-search.smoke.spec.ts` | e2e |
| SMK-02 | Admin can access PIM Employee List | `tests/e2e/pim.smoke.spec.ts` | e2e |
| SMK-11 | Admin can access Recruitment candidates | `tests/e2e/recruitment.smoke.spec.ts` | e2e |
| SMK-10 | Admin can access Time timesheets | `tests/e2e/time.smoke.spec.ts` | e2e |

Additional (full suite only): `tests/login.spec.ts` — positive admin login (not `@smoke`).

---

## Alignment with Existing Reports

| Source | Alignment |
|--------|-----------|
| `application-map.md` | Phase 1 (Buzz, Time, Recruitment) — **implemented** (SMK-09–11) |
| `orchestrator-execution-summary.md` (prior) | SMK-09–11 added; locator heals documented |
| `release-qa-report.md` | Refreshed in same orchestrator run |
| CI workflow | Runs `npm run test:smoke` — 12 tests aligned |

---

## Summary

The framework covers **authentication lifecycle** (login, logout, negative) and **nine read-only module smokes** at **75% side-nav coverage**. The highest-value next increments are **Directory search**, **Performance module smoke**, and **PIM pagination** — all read-only. **Maintenance** should remain excluded from smoke due to destructive workflows.

**No test code was modified during this analysis.**
