# Project Images

Placeholder directory for screenshots and visual assets. Replace placeholders with real captures before publishing to GitHub.

---

## Recommended Screenshots

| File | Description | How to capture |
|------|-------------|----------------|
| `dashboard-smoke.png` | Dashboard after login with widgets visible | Run SMK-01 headed; screenshot on pass |
| `playwright-report.png` | HTML report showing 12/12 passed | After `npm run test:smoke`; open `playwright-report/` |
| `ci-green.png` | GitHub Actions workflow success | Screenshot from Actions tab |
| `cursor-agent.png` | Cursor executing an AI prompt | Screenshot during agent run |
| `application-map.png` | Excerpt of application-map.md | Export or screenshot report |

---

## Placeholder Conventions

Until real images are added, reference this directory in README with:

```markdown
![Dashboard smoke test](docs/images/dashboard-smoke.png)
```

### Creating screenshots

```bash
# Run headed and pause for manual capture
npm run test:headed -- tests/e2e/dashboard.smoke.spec.ts

# Or use Playwright trace viewer
npx playwright show-trace test-results/.../trace.zip
```

---

## Demo GIF (optional)

| File | Description |
|------|-------------|
| `smoke-run-demo.gif` | Screen recording of full smoke suite in UI mode |

Record with Playwright UI mode (`npm run test:ui`) or OS screen recorder.

---

## Architecture Images (optional)

For README hero image or social preview:

| File | Suggested content |
|------|-------------------|
| `hero-banner.png` | Framework logo + "Autonomous QA Framework" text |
| `og-image.png` | 1200×630 Open Graph image for GitHub/social |

---

## Status

| Asset | Status |
|-------|--------|
| `dashboard-smoke.png` | Placeholder — not yet captured |
| `playwright-report.png` | Placeholder — not yet captured |
| `ci-green.png` | Placeholder — not yet captured |
| `cursor-agent.png` | Placeholder — not yet captured |
| `smoke-run-demo.gif` | Placeholder — not yet recorded |

---

Back to [docs index](../README.md)
