import { BasePage } from './BasePage';

export class SideNav extends BasePage {
  adminLink = this.page.getByRole('link', { name: 'Admin', exact: true });
  dashboardLink = this.page.getByRole('link', { name: 'Dashboard', exact: true });
  pimLink = this.page.getByRole('link', { name: 'PIM', exact: true });
  leaveLink = this.page.getByRole('link', { name: 'Leave', exact: true });
  directoryLink = this.page.getByRole('link', { name: 'Directory', exact: true });
  timeLink = this.page.getByRole('link', { name: 'Time', exact: true });
  recruitmentLink = this.page.getByRole('link', { name: 'Recruitment', exact: true });
  buzzLink = this.page.getByRole('link', { name: 'Buzz' });

  async goToDashboard() {
    await this.dashboardLink.click();
    await this.page.waitForURL(/dashboard/);
  }

  async goToAdmin() {
    await this.adminLink.click();
    await this.page.waitForURL(/admin\//);
  }

  async goToPim() {
    await this.pimLink.click();
    await this.page.waitForURL(/pim\/viewEmployeeList/);
  }

  async goToLeave() {
    await this.leaveLink.click();
    await this.page.waitForURL(/leave\/viewLeaveList/);
  }

  async goToDirectory() {
    await this.directoryLink.click();
    await this.page.waitForURL(/directory\/viewDirectory/);
  }

  async goToTime() {
    await this.timeLink.click();
    await this.page.waitForURL(/time\//);
  }

  async goToRecruitment() {
    await this.recruitmentLink.click();
    await this.page.waitForURL(/recruitment\/viewCandidates/);
  }

  async goToBuzz() {
    await this.buzzLink.click();
    await this.page.waitForURL(/buzz/);
  }
}
