# Implement Coverage Gaps

Act as a Senior QA Automation Engineer.

Use the coverage report:
`ai/reports/coverage-analysis.md`

Implement the next 5 recommended tests:

- SMK-04 — Leave List accessible
- SMK-05 — Admin can logout
- SMK-06 — Invalid credentials rejected
- SMK-07 — Admin module accessible
- SMK-08 — PIM employee search read-only

Rules:
- Reuse existing fixtures and auth setup.
- Use Page Object Model.
- Add new page objects only where useful.
- Keep tests read-only.
- Do not create, edit, or delete employee data.
- Use resilient locators.
- Do not use fixed waits.
- Run the tests after implementation.
- If tests fail, heal locator/test issues.
- Do not remove meaningful assertions.
- If a real app issue is found, document it.

Expected outputs:
- New/updated page objects
- New/updated tests
- Updated report at `ai/reports/coverage-gap-implementation.md`
- All smoke tests passing