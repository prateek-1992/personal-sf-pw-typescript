import { expect, test } from '@playwright/test';
import { LoginPage } from '../../page-objects/loginPage';
import { AppConstants } from '../../constants/appConstants';
import { FrameWorkUtil } from '../../utils/frameworkUtil';
import { Environment } from '../../constants/envConstants';
import { FeatureTags } from '../../constants/featureTags';

test.describe(`SalesForce ${FeatureTags.LOGIN}`, async () => {
  test(`TC001: Verify Salesforce Login with valid credentials`, async ({ page }) => {
    const appData = FrameWorkUtil.loadAppTestData(Environment.STAGE);
    const sfLoginPage = new LoginPage(page);
    await sfLoginPage.load();
    await sfLoginPage.verifyIfPageHasLoaded();
    await sfLoginPage.doLogin(appData.adminUserName, appData.admingPasswrd);
    await sfLoginPage.verifyPageHasNavigatedTo(AppConstants.INSTANCE_URL);
    await page.context().storageState({ path: '.auth/credentials.json' });
  });
});
