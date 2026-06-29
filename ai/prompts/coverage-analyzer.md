# AI Coverage Analyzer

Act as a Senior QA Architect and AI Coverage Analyst.

Goal:
Analyse the current OrangeHRM Playwright framework and identify test coverage gaps.

Inputs:
- `tests/e2e/`
- `pages/`
- `fixtures/`
- `helpers/`
- `ai/reports/orangehrm-test-plan.md`
- `ai/reports/orangehrm-execution-summary.md`

Tasks:
1. Inspect existing smoke tests.
2. Inspect existing page objects.
3. Identify which OrangeHRM areas are currently covered.
4. Identify which areas are not covered.
5. Classify gaps by priority:
   - High
   - Medium
   - Low
6. Recommend the next 5 tests to add.
7. Do not modify code yet.

Output:
Create a report at:

`ai/reports/coverage-analysis.md`

Report format:
- Current coverage summary
- Covered areas
- Missing areas
- High-priority gaps
- Medium-priority gaps
- Low-priority gaps
- Recommended next tests
- Suggested page objects/helpers needed