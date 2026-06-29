# AI Application Explorer

Act as an autonomous QA Explorer.

Goal:
Understand this application before writing any tests.

Use Playwright MCP/browser capabilities to inspect the application.

Tasks:

1. Login using the existing login helper.
2. Visit every side navigation item.
3. Record:
   - page title
   - URL
   - major sections
   - tables
   - forms
   - search fields
   - filters
   - buttons
   - modals
4. Identify business workflows.
5. Compare discovered pages with:
   - existing page objects
   - existing tests
6. Produce:

ai/reports/application-map.md

Include:

- Site map
- Navigation tree
- Existing coverage
- Missing page objects
- Missing tests
- Suggested priorities
- Candidate smoke tests
- Candidate regression tests

Do not modify any code.