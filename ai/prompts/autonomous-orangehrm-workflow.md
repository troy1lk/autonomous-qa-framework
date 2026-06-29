# Autonomous OrangeHRM QA Workflow

Act as an autonomous QA automation agent for this Playwright TypeScript project.

Target application:
https://opensource-demo.orangehrmlive.com

Use the existing framework:
- Page Object Model
- `.env` variables
- `pages/`
- `helpers/`
- `fixtures/`
- `tests/`

Workflow:
1. Inspect the project structure.
2. Reuse existing `LoginPage`.
3. Explore the OrangeHRM dashboard after login.
4. Identify 3 important smoke test scenarios.
5. Create a short test plan in `ai/reports/orangehrm-test-plan.md`.
6. Generate Playwright tests inside `tests/e2e/`.
7. Run the generated tests.
8. If a test fails, fix locator/wait/test issue.
9. Do not remove useful assertions just to pass.
10. If it looks like a real app bug, document it in `ai/reports/orangehrm-defects.md`.
11. Produce a final summary in `ai/reports/orangehrm-execution-summary.md`.

Safety:
- Do not create, edit, or delete real employee data.
- Do not perform destructive actions.
- Read-only navigation and assertions only.