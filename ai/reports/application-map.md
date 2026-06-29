# OrangeHRM Application Map

**Date:** 2026-06-29  
**Explorer:** AI Application Explorer  
**Application:** [OrangeHRM Open Source Demo](https://opensource-demo.orangehrmlive.com)  
**Method:** Playwright browser exploration via `loginAsAdmin` credentials  
**Raw data:** `ai/reports/application-explore-raw.json`

---

## Executive Overview

OrangeHRM OS 5.8 is a modular HRIS with **12 side-panel modules**, top-bar sub-navigation within each module, list/table views with search filters, and role-based admin workflows. Exploration was performed as Admin with read-only navigation.

| Metric | Value |
|--------|-------|
| Side-nav modules discovered | 12 |
| Modules with page objects | 6 |
| Modules with automated tests | 6 (+ auth flows) |
| Coverage rate | **50%** |

---

## Site Map

```
OrangeHRM Demo
├── /web/index.php/auth/login          Login
├── /web/index.php/dashboard/index     Dashboard
├── /web/index.php/admin/              Admin (System Users default)
├── /web/index.php/pim/                  PIM (Employee List default)
├── /web/index.php/leave/                Leave (Leave List default)
├── /web/index.php/time/                 Time (Employee Timesheet default)
├── /web/index.php/recruitment/          Recruitment (Candidates default)
├── /web/index.php/pim/viewMyDetails/    My Info (Personal Details)
├── /web/index.php/performance/          Performance (Manage Reviews)
├── /web/index.php/directory/            Directory
├── /web/index.php/maintenance/          Maintenance (Admin Access gate)
├── /web/index.php/claim/                Claim (Assign Claim default)
└── /web/index.php/buzz/                 Buzz (Social feed)
```

---

## Navigation Tree

### Side panel (global)

| # | Module | Default URL | Page title |
|---|--------|-------------|------------|
| 1 | Admin | `/admin/viewSystemUsers` | OrangeHRM |
| 2 | PIM | `/pim/viewEmployeeList` | OrangeHRM |
| 3 | Leave | `/leave/viewLeaveList` | OrangeHRM |
| 4 | Time | `/time/viewEmployeeTimesheet` | OrangeHRM |
| 5 | Recruitment | `/recruitment/viewCandidates` | OrangeHRM |
| 6 | My Info | `/pim/viewPersonalDetails/empNumber/7` | OrangeHRM |
| 7 | Performance | `/performance/searchEvaluatePerformanceReview` | OrangeHRM |
| 8 | Dashboard | `/dashboard/index` | OrangeHRM |
| 9 | Directory | `/directory/viewDirectory` | OrangeHRM |
| 10 | Maintenance | `/maintenance/purgeEmployee` | OrangeHRM |
| 11 | Claim | `/claim/viewAssignClaim` | OrangeHRM |
| 12 | Buzz | `/buzz/viewBuzz` | OrangeHRM |

### Module detail — sections, UI elements, workflows

#### 1. Admin
| Attribute | Details |
|-----------|---------|
| **Headings** | Admin · User Management · System Users |
| **Top nav** | Nationalities, Corporate Branding (+ collapsed menus: User Management, Job, Organization, Qualifications, Configuration) |
| **Table** | Yes — system users (4 records) |
| **Search / filters** | Username textbox, User Role dropdown, Employee Name hints, Status dropdown |
| **Buttons** | Reset, Search, Add |
| **Business workflow** | Manage system users, roles, org structure, qualifications, branding |

#### 2. PIM
| Attribute | Details |
|-----------|---------|
| **Headings** | PIM · Employee Information |
| **Top nav** | Employee List, Add Employee, Reports |
| **Table** | Yes — employees (~95 records) |
| **Search / filters** | Employee Name hints, Employee Id, Employment Status, Job Title, Sub Unit, Supervisor Name |
| **Buttons** | Reset, Search, Add |
| **Business workflow** | Employee CRUD, reporting, configuration |

#### 3. Leave
| Attribute | Details |
|-----------|---------|
| **Headings** | Leave · Leave List |
| **Top nav** | Apply, My Leave, Leave List, Assign Leave |
| **Table** | Yes (0 records at time of exploration) |
| **Search / filters** | Date range (From/To), Employee Name hints, Sub Unit, Leave Type, Leave Status, Include Past Employees |
| **Buttons** | Reset, Search |
| **Business workflow** | Apply/approve/assign leave, view entitlements |

#### 4. Time
| Attribute | Details |
|-----------|---------|
| **Headings** | Time · Timesheets · Select Employee · Timesheets Pending Action |
| **Top nav** | (none visible on landing) |
| **Table** | Yes — pending timesheets (3 records) |
| **Search / filters** | Employee Name hints |
| **Buttons** | View |
| **Business workflow** | Select employee timesheet, approve pending actions |

#### 5. Recruitment
| Attribute | Details |
|-----------|---------|
| **Headings** | Recruitment · Candidates |
| **Top nav** | Candidates, Vacancies |
| **Table** | Yes — candidates (63 records) |
| **Search / filters** | Candidate Name hints, keywords, date range, status, vacancy |
| **Buttons** | Reset, Search, Add |
| **Business workflow** | Manage candidates and job vacancies |

#### 6. My Info
| Attribute | Details |
|-----------|---------|
| **Headings** | PIM · Personal Details · Attachments |
| **Top nav** | (employee sub-tabs: Personal Details, Contact, Emergency, Dependents, etc.) |
| **Table** | Yes — attachments |
| **Forms** | First/Middle/Last Name, DOB, gender, marital status, nationality |
| **Buttons** | Save, Add |
| **Business workflow** | Employee self-service profile management |

#### 7. Performance
| Attribute | Details |
|-----------|---------|
| **Headings** | Performance · Manage Reviews · Employee Reviews |
| **Top nav** | My Trackers, Employee Trackers |
| **Table** | Yes (0 records) |
| **Search / filters** | Employee Name hints, job title, sub unit, review status, date range |
| **Buttons** | Reset, Search |
| **Business workflow** | Performance review cycles, trackers, KPI management |

#### 8. Dashboard
| Attribute | Details |
|-----------|---------|
| **Headings** | Dashboard |
| **Sections** | Time at Work, My Actions, Quick Launch, Buzz Latest Posts, Employees on Leave, Employee Distribution charts |
| **Tables** | No |
| **Buttons** | Upgrade |
| **Business workflow** | At-a-glance HR metrics and quick actions |

#### 9. Directory
| Attribute | Details |
|-----------|---------|
| **Headings** | Directory (×2 — breadcrumb + filter title) |
| **Sections** | Employee card grid |
| **Search / filters** | Employee Name hints, Job Title, Location |
| **Buttons** | Reset, Search |
| **Business workflow** | Browse/search employee directory |

#### 10. Maintenance
| Attribute | Details |
|-----------|---------|
| **Headings** | Administrator Access |
| **Forms** | Re-authentication (username, password) |
| **Buttons** | Cancel, Confirm |
| **Business workflow** | Destructive admin ops (purge employee) — **gated behind second login** |
| **Note** | Entering Maintenance hides side nav; blocks subsequent navigation until cancelled |

#### 11. Claim
| Attribute | Details |
|-----------|---------|
| **URL** | `/claim/viewAssignClaim` |
| **Business workflow** | Employee expense / claim assignment and submission |
| **Note** | SPA content; headings not in standard `role=heading` at load time |

#### 12. Buzz
| Attribute | Details |
|-----------|---------|
| **URL** | `/buzz/viewBuzz` |
| **Sections** | Social feed (posts, likes, comments visible on Dashboard widget) |
| **Business workflow** | Internal social network / announcements |
| **Note** | SPA content; explore separately from Dashboard widget |

---

## Business Workflows Identified

| Workflow | Module(s) | Type | Automation status |
|----------|-----------|------|-------------------|
| Admin login | Auth | Core | Tested (`login.spec.ts`) |
| Invalid login rejection | Auth | Negative | Tested (SMK-06) |
| Admin logout | Auth | Core | Tested (SMK-05) |
| View dashboard widgets | Dashboard | Read | Tested (SMK-01) |
| Browse employee list | PIM | Read | Tested (SMK-02) |
| Search employees by ID | PIM | Read | Tested (SMK-08) |
| Add/edit employee | PIM | Write | **Not tested** (destructive) |
| Browse employee directory | Directory | Read | Tested (SMK-03) |
| Search directory | Directory | Read | **Not tested** |
| View leave list | Leave | Read | Tested (SMK-04) |
| Apply / assign leave | Leave | Write | **Not tested** |
| Manage system users | Admin | Read/Write | Partially tested (SMK-07 landing only) |
| Timesheet approval | Time | Read/Write | **Not tested** |
| Recruitment pipeline | Recruitment | Read/Write | **Not tested** |
| Performance reviews | Performance | Read/Write | **Not tested** |
| Self-service profile | My Info | Read/Write | **Not tested** |
| Social buzz feed | Buzz | Read/Write | **Not tested** |
| Expense claims | Claim | Read/Write | **Not tested** |
| Maintenance / purge | Maintenance | Destructive | **Not tested** (by design) |

---

## Existing Coverage

### Page objects (`pages/`)

| Page object | Module | Methods |
|-------------|--------|---------|
| `LoginPage` | Auth | open, login, verifyLoginSuccessful, verifyInvalidCredentials |
| `UserMenu` | Auth | logout |
| `DashboardPage` | Dashboard | verifyDashboardLoaded |
| `PimPage` | PIM | verifyEmployeeListLoaded, searchByEmployeeId |
| `DirectoryPage` | Directory | verifyDirectoryLoaded |
| `LeavePage` | Leave | verifyLeaveListLoaded |
| `AdminPage` | Admin | verifyAdminModuleLoaded |
| `SideNav` | Global | goToAdmin, goToPim, goToLeave, goToDirectory, goToDashboard |
| `AppLayout` | Global | verifyLoggedIn |
| `BasePage` | Global | navigate, getTitle, wait |

### Tests (`tests/`)

| Test ID | Spec | Module |
|---------|------|--------|
| — | `login.spec.ts` | Auth (positive) |
| SMK-05 | `logout.spec.ts` | Auth (logout) |
| SMK-06 | `login-negative.spec.ts` | Auth (negative) |
| SMK-01 | `e2e/dashboard.smoke.spec.ts` | Dashboard |
| SMK-02 | `e2e/pim.smoke.spec.ts` | PIM list |
| SMK-08 | `e2e/pim-search.smoke.spec.ts` | PIM search |
| SMK-03 | `e2e/directory.smoke.spec.ts` | Directory |
| SMK-04 | `e2e/leave.smoke.spec.ts` | Leave |
| SMK-07 | `e2e/admin.smoke.spec.ts` | Admin |

### SideNav wiring vs discovered modules

| Side-nav link | `SideNav` method | Test |
|---------------|------------------|------|
| Admin | `goToAdmin()` | SMK-07 |
| PIM | `goToPim()` | SMK-02, SMK-08 |
| Leave | `goToLeave()` | SMK-04 |
| Dashboard | `goToDashboard()` | SMK-01 (via fixture) |
| Directory | `goToDirectory()` | SMK-03 |
| Time | — | — |
| Recruitment | — | — |
| My Info | — | — |
| Performance | — | — |
| Maintenance | — | — |
| Claim | — | — |
| Buzz | — | — |

---

## Missing Page Objects

| Priority | Page object | Module | Key locators needed |
|----------|-------------|--------|---------------------|
| **High** | `BuzzPage` | Buzz | Feed posts, compose area |
| **High** | `TimePage` | Time | Employee selector, pending timesheets table |
| **High** | `RecruitmentPage` | Recruitment | Candidates table, Vacancies link |
| **Medium** | `PerformancePage` | Performance | Employee Reviews table, filters |
| **Medium** | `ClaimPage` | Claim | Assign claim view |
| **Medium** | `MyInfoPage` | My Info | Personal details form, tabs |
| **Low** | `MaintenancePage` | Maintenance | Admin access gate (avoid destructive flows) |

### SideNav extensions needed

`goToTime()`, `goToRecruitment()`, `goToPerformance()`, `goToBuzz()`, `goToClaim()`, `goToMyInfo()`

---

## Missing Tests

| Priority | Suggested test | Type | Rationale |
|----------|----------------|------|-----------|
| **High** | SMK-09 Buzz feed loads | Smoke | Dashboard widget references Buzz; module untested |
| **High** | SMK-10 Time timesheets list accessible | Smoke | Core workforce feature |
| **High** | SMK-11 Recruitment candidates list accessible | Smoke | High-value HR module |
| **Medium** | Directory search by employee name | Smoke | Extends SMK-03 |
| **Medium** | SMK-12 Performance reviews list accessible | Smoke | Closes module gap |
| **Medium** | Leave Apply page navigation | Smoke | Top-nav sub-route |
| **Low** | My Info personal details visible | Smoke | Different user context |
| **Low** | Claim assign view accessible | Smoke | Newer module |
| **Regression** | PIM pagination (page 2) | Regression | List interaction |
| **Regression** | Admin add user form opens (no submit) | Regression | Modal/form validation |
| **Regression** | Recruitment vacancy list | Regression | Second top-nav route |

---

## Suggested Priorities

### Phase 1 — Close module smoke gaps (next sprint)
1. **Buzz** — SMK-09; `BuzzPage` + `SideNav.goToBuzz()`
2. **Time** — SMK-10; `TimePage` + `SideNav.goToTime()`
3. **Recruitment** — SMK-11; `RecruitmentPage` + `SideNav.goToRecruitment()`

### Phase 2 — Deepen existing module coverage
4. Directory search/filter smoke
5. Performance reviews list smoke
6. Leave Apply navigation (read-only)

### Phase 3 — Regression & edge cases
7. PIM pagination
8. Admin sub-routes (Nationalities, Job Titles)
9. Multi-role testing (non-Admin user)

### Do not automate (safety)
- Maintenance purge / destructive operations
- Add Employee / Add User submit flows on shared demo
- Claim submission with real data

---

## Candidate Smoke Tests

| ID | Name | Steps | Assertions |
|----|------|-------|------------|
| SMK-09 | Buzz feed accessible | Login → Buzz | URL `/buzz/`, feed content visible |
| SMK-10 | Time timesheets accessible | Login → Time | URL `/time/`, pending table or employee selector |
| SMK-11 | Recruitment candidates accessible | Login → Recruitment | URL `/recruitment/`, candidates table, records count |
| SMK-12 | Performance reviews accessible | Login → Performance | URL `/performance/`, reviews table visible |
| SMK-13 | Directory search filters | Login → Directory → search | Filtered cards or records text updates |

---

## Candidate Regression Tests

| ID | Name | Scope |
|----|------|-------|
| REG-01 | PIM pagination | Navigate to page 2, verify rows load |
| REG-02 | PIM Add Employee form | Click Add, verify form fields (no save) |
| REG-03 | Leave Apply form | Navigate Apply tab, verify form (no submit) |
| REG-04 | Recruitment Vacancies | Switch top nav to Vacancies, verify table |
| REG-05 | Admin Nationalities | Navigate Nationalities sub-route, verify list |
| REG-06 | User dropdown menu items | Profile, Support links visible |
| REG-07 | Side panel search | Global search box accepts input |

---

## Exploration Notes

| Observation | Impact on testing |
|-------------|-------------------|
| Maintenance requires re-authentication | Side nav hidden; avoid in serial smoke runs |
| Claim link needs `exact: false` (contains icon) | Update `SideNav` when adding Claim |
| Buzz/Claim are SPAs with minimal heading roles | Use content/text locators, not headings alone |
| Demo data counts fluctuate (PIM 95 vs 213 earlier) | Avoid hard-coded record counts; use regex patterns |
| My Info lands on empNumber/7 for Admin | May differ per user; assert form not specific data |
| All pages titled "OrangeHRM" | Use URL + heading for page identification, not `title()` |

---

## Coverage Matrix

```
Module          Explored  Page Object  Test    Priority
──────────────────────────────────────────────────────
Login/Auth        ✓         ✓          ✓         —
Dashboard         ✓         ✓          ✓         —
PIM               ✓         ✓          ✓         —
PIM Search        ✓         ✓          ✓         —
Directory         ✓         ✓          ✓       Search
Leave             ✓         ✓          ✓       Apply nav
Admin             ✓         ✓          ✓       Sub-routes
Time              ✓         ✗          ✗       ★ High
Recruitment       ✓         ✗          ✗       ★ High
Buzz              ✓         ✗          ✗       ★ High
Performance       ✓         ✗          ✗       Medium
Claim             ✓         ✗          ✗       Low
My Info           ✓         ✗          ✗       Medium
Maintenance       ✓         ✗          ✗       Skip (destructive)
```

---

*Generated by AI Application Explorer. No test or page object code was modified.*
