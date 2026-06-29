# Orchestrator Execution Plan

**Date:** 2026-06-29  
**Orchestrator:** Autonomous QA Orchestrator  
**User constraint:** Do not add new tests unless clearly necessary

---

## Current State Summary

| Metric | Value |
|--------|-------|
| Smoke tests (`@smoke`) | 12 (setup + 11 SMK scenarios) |
| Full suite | 13 (+ 1 positive login, not `@smoke`) |
| Page objects | 13 |
| Module coverage | 9 / 12 (75%) |
| Last smoke run | 12/12 passed |
| Open defects | 0 |

**Sources reviewed:**
- `ai/reports/application-map.md` — 12 modules mapped; Phase 1 (Buzz, Time, Recruitment) implemented
- `ai/reports/coverage-analysis.md` — **stale** (still reflects 25% / 4-test baseline)
- `ai/reports/release-qa-report.md` — **stale** (still reflects 50% / 9-smoke baseline)
- `tests/`, `pages/`, `fixtures/`, `helpers/`, `playwright.config.ts`

---

## Decision

**Action: Produce reports only — refresh coverage analysis and release QA report**

| Option considered | Why not chosen |
|-------------------|----------------|
| Add SMK-12 Performance smoke | User requested no new tests unless clearly necessary; 75% coverage is adequate for current release |
| Add Directory search smoke | Functional depth improvement, not required for report refresh |
| Heal flaky tests | All 12 smoke + 13 full-suite tests passing |
| CI/reporting changes | Pipeline already aligned with `@smoke` |
| Page object improvements | No failures or gaps blocking release |

**Rationale:** Coverage and release reports are materially out of date after SMK-09–11. Refreshing documentation is the highest-value, lowest-risk action. The suite is green; no code changes are warranted.

---

## Implementation Plan

### 1. Refresh `ai/reports/coverage-analysis.md`

- Update metrics to 12-test smoke / 13-test full suite
- Document all 11 SMK scenarios and covered modules (75%)
- Revise gap analysis: remaining uncovered modules (My Info, Performance, Maintenance, Claim)
- Update recommended next tests (de-prioritise already-implemented items)

### 2. Refresh `ai/reports/release-qa-report.md`

- Re-run `npm run test:smoke` and `npm test` for current pass/fail evidence
- Update executive summary, test inventory, coverage summary, risks
- Maintain **GO** recommendation with updated 75% module coverage

### 3. Test execution (verification only)

```bash
npm run test:smoke
npm test
```

### 4. Deliverables

- `ai/reports/coverage-analysis.md` (refreshed)
- `ai/reports/release-qa-report.md` (refreshed)
- `ai/reports/orchestrator-execution-summary.md` (post-run)

---

## Safety

- No test code changes
- No application interaction beyond existing automated runs

---

## Success Criteria

- Coverage analysis reflects current 12-test smoke suite and 75% module coverage
- Release QA report reflects latest test results and GO recommendation
- All smoke tests pass (no regressions)
