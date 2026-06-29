# OrangeHRM Defects

**Date:** 2026-06-29  
**Application:** https://opensource-demo.orangehrmlive.com

---

No application defects were identified during this smoke test run.

All failures encountered were test-framework issues (locator ambiguity, `networkidle` timeouts, parallel execution against a shared demo site) and were resolved without weakening assertions.

---

## Observations (not defects)

| Observation | Notes |
|-------------|-------|
| Duplicate "Directory" headings | Page has both a breadcrumb (`h6`) and filter title (`h5`) with the same text — test updated to target `level: 5` |
| Demo site latency | Shared demo instance can be slow under parallel load — tests run with `workers: 1` |
| Continuous network activity | `networkidle` never settles on OrangeHRM — replaced with `waitForURL` |
