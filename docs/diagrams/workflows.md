# Workflow Diagrams

AI agent and QA cycle workflow diagrams. These supplement [AI-WORKFLOW.md](../../AI-WORKFLOW.md).

---

## Full Autonomous QA Cycle

```mermaid
flowchart TB
    Start([Start QA cycle]) --> Explore[Application Explorer]
    Explore --> Map[application-map.md]

    Map --> Analyze[Coverage Analyzer]
    Analyze --> Coverage[coverage-analysis.md]

    Coverage --> Orchestrate[QA Orchestrator]
    Orchestrate --> Decision{What to do?}

    Decision -->|New tests| Generate[Generator]
    Decision -->|Flaky tests| Heal[Healer]
    Decision -->|Reports only| ReportOnly[Refresh reports]
    Decision -->|CI changes| CI[Update workflow]

    Generate --> Run[Runner: npm test]
    Heal --> Run
    ReportOnly --> Release

    Run --> Pass{All pass?}
    Pass -->|No| Diagnose{Failure type?}
    Diagnose -->|Framework| Heal
    Diagnose -->|App bug| Defect[orangehrm-defects.md]
    Diagnose -->|Config| Stop([Stop — human needed])

    Pass -->|Yes| Review[Test Reviewer]
    Review --> Release[Release Reporter]
    Defect --> Release
    Release --> Summary[release-qa-report.md]
    Summary --> End([End cycle])
    CI --> End
```

---

## OrangeHRM Initial Workflow

From [`autonomous-orangehrm-workflow.md`](../../ai/prompts/autonomous-orangehrm-workflow.md):

```mermaid
flowchart LR
    A[Inspect project] --> B[Reuse LoginPage]
    B --> C[Explore dashboard]
    C --> D[Identify 3 smokes]
    D --> E[orangehrm-test-plan.md]
    E --> F[Generate e2e tests]
    F --> G[Run tests]
    G --> H{Pass?}
    H -->|No| I[Heal locators]
    I --> G
    H -->|Yes| J[orangehrm-execution-summary.md]
```

---

## Coverage Gap Implementation

From [`implement-coverage-gaps.md`](../../ai/prompts/implement-coverage-gaps.md):

```mermaid
flowchart TB
    CA[coverage-analysis.md] --> IMP[Implement SMK-04 to SMK-08]
    IMP --> PO[New page objects]
    IMP --> TS[New test specs]
    PO --> RUN[npm run test:smoke]
    TS --> RUN
    RUN --> H{Pass?}
    H -->|No| Heal[Heal locators]
    Heal --> RUN
    H -->|Yes| RPT[coverage-gap-implementation.md]
```

---

## Orchestrator Decision Tree

```mermaid
flowchart TD
    O[QA Orchestrator] --> R[Read reports + code]
    R --> G[Identify highest-value improvement]
    G --> D{Decision}

    D -->|High value, low risk| T[Add smoke tests]
    D -->|Failures exist| F[Heal flaky tests]
    D -->|Stale docs| DOC[Report refresh only]
    D -->|POM gaps| POM[Improve page objects]
    D -->|CI drift| CICD[Update workflow]

    T --> P[orchestrator-plan.md]
    F --> P
    DOC --> P
    POM --> P
    CICD --> P

    P --> I{Code changes?}
    I -->|Yes| Code[Implement]
    I -->|No| Skip[Skip implementation]
    Code --> Run[Run tests]
    Skip --> Run
    Run --> S[orchestrator-execution-summary.md]
```

---

## Test Reviewer Flow

```mermaid
flowchart LR
    TR[Test Reviewer] --> Scan[Scan tests/e2e/]
    Scan --> Check[Check locators assertions waits]
    Check --> Out[Review report]
    Out --> Approve{Human approves?}
    Approve -->|Yes| Impl[test-reviewer-implementation.md]
    Approve -->|No| End([No changes])
    Impl --> Run[Re-run tests]
```

---

## Release Decision Flow

```mermaid
flowchart TD
    RR[Release Reporter] --> Results[Test results]
    RR --> Cov[coverage-analysis.md]
    Results --> Eval{All smoke pass?}
    Eval -->|No| NOGO[NO-GO recommendation]
    Eval -->|Yes| Risks[Assess risks]
    Risks --> GO[GO with conditions]
    GO --> RPT[release-qa-report.md]
    NOGO --> RPT
```

---

## Agent Invocation Sequence

```mermaid
sequenceDiagram
    participant E as Engineer
    participant C as Cursor
    participant P as ai/prompts/
    participant R as ai/reports/
    participant T as Playwright

    E->>C: Execute agent prompt
    C->>P: Read instructions
    C->>C: Analyse codebase
    opt Browser exploration
        C->>C: Explore live app
    end
    opt Code changes
        C->>C: Implement tests/POM
        C->>T: npm run test:smoke
        T-->>C: Results
    end
    C->>R: Write report
    C-->>E: Summary
```

---

Back to [docs index](../README.md) · [AI-WORKFLOW.md](../../AI-WORKFLOW.md)
