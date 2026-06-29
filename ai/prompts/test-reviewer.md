# AI Test Reviewer

Act as a senior QA automation reviewer.

Review the Playwright tests in `tests/e2e/`.

Check for:
- brittle locators
- weak assertions
- unnecessary waits
- duplicated logic
- missing reusable page object methods
- poor test names
- flaky test risks
- tests that only check navigation but not useful business outcomes

Output:
1. Summary of test quality
2. Issues found
3. Recommended improvements
4. Files to change
5. Do not modify files until I approve