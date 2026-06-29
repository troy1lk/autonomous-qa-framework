# Architecture Diagrams

Mermaid diagrams for the Autonomous QA Framework. These supplement [ARCHITECTURE.md](../../ARCHITECTURE.md).

---

## System Context

```mermaid
C4Context
    title System Context — Autonomous QA Framework

    Person(engineer, "QA Engineer", "Runs agents and reviews reports")
    System(framework, "Autonomous QA Framework", "Playwright + TypeScript + AI prompts")
    System_Ext(orangehrm, "OrangeHRM Demo", "Application under test")
    System_Ext(cursor, "Cursor IDE", "AI agent execution")
    System_Ext(gha, "GitHub Actions", "CI smoke pipeline")

    Rel(engineer, cursor, "Executes prompts")
    Rel(cursor, framework, "Reads/writes code and reports")
    Rel(framework, orangehrm, "E2E tests")
    Rel(gha, framework, "npm run test:smoke")
    Rel(engineer, gha, "Reviews CI results")
```

> Note: C4Context requires Mermaid 9+ / compatible renderer. Fallback: see layered diagram in [ARCHITECTURE.md](../../ARCHITECTURE.md).

---

## Test Project Dependency

```mermaid
flowchart TB
    subgraph Playwright Projects
        direction TB
        S[setup]
        C[chromium]
        E[e2e]
    end

    S -->|"storageState: admin.json"| E

    S -.->|"no dependency"| C

    S_T["auth.setup.ts\n1 test"]
    C_T["login.spec.ts\nlogout.spec.ts\nlogin-negative.spec.ts"]
    E_T["e2e/*.smoke.spec.ts\nSMK-01 to SMK-11"]

    S --- S_T
    C --- C_T
    E --- E_T
```

---

## Page Object Composition

```mermaid
flowchart TB
    subgraph Tests
        T[e2e smoke spec]
    end

    subgraph Page Objects
        SN[SideNav]
        MP[Module Page]
        AL[AppLayout]
        BP[BasePage]
    end

    T --> SN
    T --> MP
    SN --> BP
    MP --> AL
    MP --> BP
    AL --> BP
```

---

## Data Flow — Auth Setup

```mermaid
flowchart LR
    ENV[".env credentials"] --> AH["auth.helper.ts"]
    AH --> LP["LoginPage"]
    LP --> APP["OrangeHRM Dashboard"]
    APP --> SS["playwright/.auth/admin.json"]
    SS --> FIX["authenticated.fixture"]
    FIX --> E2E["e2e tests"]
```

---

## Report Artefact Flow

```mermaid
flowchart LR
    EXP[Explorer] --> MAP[application-map.md]
    MAP --> COV[coverage-analysis.md]
    COV --> PLAN[orchestrator-plan.md]
    PLAN --> IMPL[Code changes]
    IMPL --> EXEC[orchestrator-execution-summary.md]
    COV --> REL[release-qa-report.md]
    EXEC --> REL
```

---

## CI Pipeline

```mermaid
flowchart TD
    A[Trigger: push / PR / dispatch] --> B[Checkout]
    B --> C[Node 22 + npm ci]
    C --> D[Playwright browsers]
    D --> E{Secrets present?}
    E -->|No| F[Fail fast]
    E -->|Yes| G[npm run test:smoke]
    G --> H{Pass?}
    H -->|Yes| I[Upload artifacts]
    H -->|No| I
    I --> J[Workflow complete]
```

---

## Locator Strategy Decision Tree

```mermaid
flowchart TD
    Start[Need a locator] --> Role{Accessible role?}
    Role -->|Yes| UseRole["getByRole(name, exact)"]
    Role -->|No| Label{Label text?}
    Label -->|Yes| UseLabel[getByLabel]
    Label -->|No| Text{Visible text?}
    Text -->|Yes| UseText[getByText / getByPlaceholder]
    Text -->|No| CSS[CSS class as last resort]
    UseRole --> Multi{Multiple matches?}
    UseLabel --> Multi
    UseText --> Multi
    CSS --> Multi
    Multi -->|Yes| First[.first or more specific name]
    Multi -->|No| Done[Use locator]
    First --> Done
```

---

Back to [docs index](../README.md) · [ARCHITECTURE.md](../../ARCHITECTURE.md)
