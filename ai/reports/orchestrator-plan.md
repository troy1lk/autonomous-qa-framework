# Orchestrator Execution Plan

**Date:** 2026-06-29  
**Orchestrator:** Autonomous QA Orchestrator  
**Decision:** Add Phase 1 module smoke tests (SMK-09, SMK-10, SMK-11)

---

## Current State Summary

| Metric | Value |
|--------|-------|
| Smoke tests | 9 (`@smoke`) |
| Full suite | 10 (+ setup) |
| Module coverage | 6 / 12 (50%) |
| Last release status | GO (all passing) |
| Open defects | 0 |

**Sources reviewed:**
- `ai/reports/application-map.md` — Phase 1 priorities: Buzz, Time, Recruitment
- `ai/reports/coverage-analysis.md` — 6 modules uncovered
- `ai/reports/release-qa-report.md` — recommends Buzz SMK-09 next
- `ai/reports/application-explore-raw.json` — URLs, headings, UI elements per module

---

## Decision

**Action: Add new smoke tests (SMK-09, SMK-10, SMK-11)**

| Option considered | Why not chosen |
|-------------------|----------------|
| Directory search smoke | Lower module-gap closure than 3 uncovered modules |
| Performance SMK-12 | Medium priority per application map |
| CI/reporting improvements | Tests passing; coverage gap is higher value |
| Report only | Application map already exists; implementation needed |

**Rationale:** Best value-to-risk ratio — three read-only module landing tests close 25% of the coverage gap (50% → 75%) with minimal flakiness risk. Aligns with application-map Phase 1 and release report recommendations.

---

## Implementation Plan

### 1. Page objects (new)

| File | Verifications |
|------|---------------|
| `pages/BuzzPage.ts` | URL `/buzz/`, buzz feed/post content visible |
| `pages/TimePage.ts` | URL `/time/`, Timesheets heading, pending table |
| `pages/RecruitmentPage.ts` | URL `/recruitment/viewCandidates`, Candidates heading, table |

### 2. SideNav extensions

- `goToBuzz()` → `waitForURL(/buzz/)`
- `goToTime()` → `waitForURL(/time/)`
- `goToRecruitment()` → `waitForURL(/recruitment\/viewCandidates/)`

### 3. Smoke tests (new)

| ID | File |
|----|------|
| SMK-09 | `tests/e2e/buzz.smoke.spec.ts` |
| SMK-10 | `tests/e2e/time.smoke.spec.ts` |
| SMK-11 | `tests/e2e/recruitment.smoke.spec.ts` |

### 4. Test execution

```bash
npm run test:smoke
```

### 5. Deliverables

- `ai/reports/orchestrator-execution-summary.md` (post-run)

---

## Safety

- Read-only navigation and assertions only
- No Maintenance, no Add/Submit buttons clicked
- No employee data mutation

---

## Success Criteria

- All smoke tests pass (12 total including setup)
- New page objects follow existing POM patterns
- `@smoke` tag on all new tests for CI alignment
