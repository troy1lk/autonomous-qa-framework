import { BasePage } from './BasePage';

export class SideNav extends BasePage {
  dashboardLink = this.page.getByRole('link', { name: 'Dashboard', exact: true });
  pimLink = this.page.getByRole('link', { name: 'PIM', exact: true });
  leaveLink = this.page.getByRole('link', { name: 'Leave', exact: true });
  directoryLink = this.page.getByRole('link', { name: 'Directory', exact: true });

  async goToDashboard() {
    await this.dashboardLink.click();
    await this.page.waitForURL(/dashboard/);
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
}
