import { test } from '../../fixtures/authenticated.fixture';
import { RecruitmentPage } from '../../pages/RecruitmentPage';
import { SideNav } from '../../pages/SideNav';

test.describe('OrangeHRM Smoke @smoke', () => {
  test.describe.configure({ mode: 'serial' });

  test('SMK-11 Admin can access Recruitment candidates list', async ({
    authenticatedPage,
  }) => {
    const sideNav = new SideNav(authenticatedPage);
    await sideNav.goToRecruitment();

    const recruitmentPage = new RecruitmentPage(authenticatedPage);
    await recruitmentPage.verifyCandidatesListLoaded();
  });
});
