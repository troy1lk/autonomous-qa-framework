# Changelog

All notable changes to the Autonomous QA Framework are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [1.0.0] - 2026-06-29

### Added

#### Framework foundation
- Playwright 1.61 + TypeScript project scaffold
- Page Object Model with `BasePage`, `AppLayout`, `LoginPage`
- `helpers/auth.helper.ts` — `loginAsAdmin`, `requireAuthEnv`, `AUTH_STORAGE_PATH`
- `fixtures/authenticated.fixture.ts` — pre-authenticated page fixture
- `playwright.config.ts` — setup / chromium / e2e project split with `storageState`
- `.env.example` with `BASE_URL`, `LOGIN_USERNAME`, `PASSWORD`
- `.cursor/rules/autonomous-qa-agent.mdc` — global Cursor agent constraints

#### Initial smoke tests (SMK-01–03)
- SMK-01 Dashboard core widgets (`DashboardPage`)
- SMK-02 PIM Employee List (`PimPage`, `SideNav`)
- SMK-03 Employee Directory (`DirectoryPage`)
- `tests/auth.setup.ts` — session bootstrap
- `tests/login.spec.ts` — positive login (full suite)

#### Test reviewer improvements
- `pages/UserMenu.ts` — logout dropdown
- Improved locators across page objects
- `@smoke` tags on all smoke scenarios
- `npm run test:smoke` script
- Logout isolated to `chromium` project (session invalidation fix)

#### Coverage gap implementation (SMK-04–08)
- SMK-04 Leave List (`LeavePage`)
- SMK-05 Admin logout (`UserMenu`)
- SMK-06 Invalid credentials (`login-negative.spec.ts`)
- SMK-07 Admin module (`AdminPage`)
- SMK-08 PIM employee search (`helpers/test-data.helper.ts`, `PIM_SEARCH_EMPLOYEE_ID = '0312'`)

#### Phase 1 module expansion (SMK-09–11)
- SMK-09 Buzz feed (`BuzzPage`, `SideNav.goToBuzz()`)
- SMK-10 Time timesheets (`TimePage`, `SideNav.goToTime()`)
- SMK-11 Recruitment candidates (`RecruitmentPage`, `SideNav.goToRecruitment()`)

#### CI/CD
- `.github/workflows/playwright-smoke.yml` — smoke on push/PR to `main`
- GitHub secrets verification step
- Playwright report and test-results artifact upload

#### AI agents and reports
- Application Explorer prompt → `application-map.md`
- Coverage Analyzer prompt → `coverage-analysis.md`
- Autonomous OrangeHRM Workflow → initial test plan and e2e specs
- Implement Coverage Gaps prompt → SMK-04–08
- Test Reviewer prompt → reviewer recommendations
- Release Reporter prompt → `release-qa-report.md`
- QA Orchestrator prompt → plan and execution summaries
- Documentation Generator prompt → project documentation

### Fixed

- Login tests: `LOGIN_USERNAME` env var (Windows `USERNAME` conflict)
- `LoginPage`: `waitForURL` instead of `networkidle` on OrangeHRM SPA
- Dashboard heading locator after login
- Logout invalidating shared `storageState` for e2e tests
- PIM search using Employee Id `0312` instead of unstable name search
- Buzz locator strict-mode violation (`.orangehrm-buzz-post` instead of `.orangehrm-buzz`)
- Time locator strict-mode violation (`Timesheets Pending Action` heading)

### Changed

- Module coverage increased from 25% → 50% → **75%** across development cycles
- Smoke suite grew from 4 → 9 → **12** tests
- Coverage analysis and release QA report refreshed to reflect SMK-01–11

### Documentation

- Initial `README.md` project overview
- Full documentation suite: `ARCHITECTURE.md`, `AI-WORKFLOW.md`, `ROADMAP.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `docs/`

---

## [Unreleased]

### Planned
- SMK-12 Performance module smoke
- Directory search/filter depth
- Claim module smoke (SMK-13)
- API test layer in `utils/`
- Accessibility audits with `@axe-core/playwright`
- Visual regression baselines
- LICENSE file in repo root
- Real screenshots for `docs/images/`

See [ROADMAP.md](ROADMAP.md).

---

[1.0.0]: https://github.com/YOUR_USERNAME/autonomous-qa-framework/releases/tag/v1.0.0
[Unreleased]: https://github.com/YOUR_USERNAME/autonomous-qa-framework/compare/v1.0.0...HEAD
