# OrangeHRM Smoke Test Plan

**Application:** [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com)  
**Date:** 2026-06-29  
**Scope:** Read-only smoke tests — no data creation, editing, or deletion.

---

## Objective

Verify that an authenticated admin can access core OrangeHRM modules and that key UI elements load correctly after login.

---

## Test Scenarios

### SMK-01 — Dashboard loads with core widgets

| Field | Value |
|-------|-------|
| **Priority** | High |
| **Precondition** | Admin is logged in |
| **Steps** | 1. Log in as Admin<br>2. Land on Dashboard |
| **Expected** | URL contains `/dashboard/`<br>Dashboard heading is visible<br>Time at Work widget is visible<br>Quick Launch widget is visible<br>Buzz Latest Posts widget is visible |

---

### SMK-02 — PIM Employee List is accessible

| Field | Value |
|-------|-------|
| **Priority** | High |
| **Precondition** | Admin is logged in |
| **Steps** | 1. Log in as Admin<br>2. Click **PIM** in the side navigation<br>3. Observe the Employee List page |
| **Expected** | URL contains `/pim/viewEmployeeList`<br>Page heading shows **Employee Information**<br>Employee table contains at least one record |

---

### SMK-03 — Employee Directory is accessible

| Field | Value |
|-------|-------|
| **Priority** | High |
| **Precondition** | Admin is logged in |
| **Steps** | 1. Log in as Admin<br>2. Click **Directory** in the side navigation<br>3. Observe the Directory page |
| **Expected** | URL contains `/directory/viewDirectory`<br>Page heading shows **Directory**<br>At least one employee card is displayed |

---

## Out of Scope

- Creating, editing, or deleting employees
- Submitting leave requests
- Changing user settings or passwords
- Admin configuration changes

---

## Test Data

Credentials loaded from `.env`:

| Variable | Value |
|----------|-------|
| `LOGIN_USERNAME` | Admin |
| `PASSWORD` | admin123 |
| `BASE_URL` | https://opensource-demo.orangehrmlive.com |

---

## Files

| Type | Path |
|------|------|
| Auth helper | `helpers/auth.helper.ts` |
| Dashboard page | `pages/DashboardPage.ts` |
| PIM page | `pages/PimPage.ts` |
| Directory page | `pages/DirectoryPage.ts` |
| Side navigation | `pages/SideNav.ts` |
| E2E tests | `tests/e2e/` |
