# QA Workflow Guide

## Purpose

This document explains how QA engineers should use the Autonomous QA Framework during normal development.

The framework combines automated Playwright testing with AI-assisted analysis and orchestration.

---

# Standard Development Workflow

## Step 1 – Developer pushes code

A developer commits and pushes changes to the repository.

Example:

```
git add .
git commit -m "Update PIM employee search"
git push
```

---

## Step 2 – GitHub Actions starts automatically

GitHub Actions will:

* Check out the repository
* Install dependencies
* Install Playwright browsers
* Load repository secrets
* Execute the smoke test suite
* Upload the Playwright HTML report

No manual QA action is required during this step.

---

## Step 3 – Review the CI result

### If the pipeline passes

Proceed to the AI Orchestrator.

### If the pipeline fails

Proceed to the AI Orchestrator before creating defects or modifying tests.

Do not immediately assume the application is broken.

---

# Step 4 – Run the AI Orchestrator

Open the project in Cursor.

Switch to **Agent Mode**.

Run:

```
Read and execute @ai/prompts/autonomous-qa-orchestrator.md
```

---

# What the AI Orchestrator does

The orchestrator automatically:

1. Reviews the current framework.
2. Reads previous QA reports.
3. Reviews current coverage.
4. Determines the highest-value QA action.
5. Decides whether new tests are required.
6. Runs the appropriate Playwright suite.
7. Analyses failures.
8. Heals framework issues where appropriate.
9. Produces updated QA documentation.

---

# Typical Decisions

## Scenario 1 – Everything passes

Result:

* No framework changes required.
* Release report refreshed.
* Coverage confirmed.

QA Action:

Review the report and continue.

---

## Scenario 2 – Locator changed

Result:

* AI updates the locator.
* Tests are re-executed.
* Framework is repaired.

QA Action:

Review the changes before committing.

---

## Scenario 3 – New functionality discovered

Result:

* AI detects missing coverage.
* Recommends or generates new smoke tests.
* Updates coverage analysis.

QA Action:

Review and approve the new tests.

---

## Scenario 4 – Possible application defect

Result:

* AI determines the issue is unlikely to be a framework problem.
* Defect information is documented.

QA Action:

Review the evidence and raise a defect if confirmed.

---

# QA Responsibilities

The AI assists with analysis and automation, but QA engineers remain responsible for:

* Reviewing generated code.
* Validating business rules.
* Confirming application defects.
* Approving framework changes.
* Deciding release readiness.

The AI should support QA decision-making, not replace it.

---

# Daily Workflow

```
Developer pushes code
        │
        ▼
GitHub Actions
        │
        ▼
Smoke Tests
        │
        ▼
PASS / FAIL
        │
        ▼
QA runs AI Orchestrator
        │
        ▼
AI analyses changes
        │
        ▼
AI heals framework issues (if appropriate)
        │
        ▼
AI updates reports
        │
        ▼
QA reviews results
        │
        ▼
Merge or raise defect
```

---

# Current Scope

The framework currently includes:

* Playwright + TypeScript
* Page Object Model
* Authentication setup
* Storage state reuse
* GitHub Actions CI/CD
* Smoke testing
* AI Application Explorer
* AI Coverage Analyzer
* AI Test Planner
* AI Test Generator
* AI Test Runner
* AI Test Healer
* AI Test Reviewer
* AI Release Reporter
* AI QA Orchestrator

---

# Future Vision

The long-term goal is to make the AI Orchestrator execute automatically after every successful CI pipeline.

Future workflow:

```
Developer Push
      │
      ▼
GitHub Actions
      │
      ▼
AI Orchestrator (automatic)
      │
      ▼
Impact Analysis
      │
      ▼
Test Execution
      │
      ▼
Healing
      │
      ▼
Release Report
      │
      ▼
Pull Request Comment
```

At that stage, QA engineers will primarily review AI decisions rather than manually coordinate the testing workflow.
