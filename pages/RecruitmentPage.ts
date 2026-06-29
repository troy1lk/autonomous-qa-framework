import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { AppLayout } from './AppLayout';

export class RecruitmentPage extends BasePage {
  private layout: AppLayout;

  pageHeading = this.page.getByRole('heading', { name: 'Candidates' });
  candidatesTable = this.page.getByRole('table');
  recordsFound = this.page.getByText(/\(\d+\) Records Found/);

  constructor(page: Page) {
    super(page);
    this.layout = new AppLayout(page);
  }

  async verifyCandidatesListLoaded() {
    await expect(this.page).toHaveURL(/recruitment\/viewCandidates/);
    await this.layout.verifyLoggedIn();
    await expect(this.pageHeading).toBeVisible();
    await expect(this.candidatesTable).toBeVisible();
    await expect(this.recordsFound).toBeVisible();
  }
}
