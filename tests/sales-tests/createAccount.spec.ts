import { faker } from '@faker-js/faker';
import { loggedInTests as test } from '../fixtures';
import { FeatureTags } from '../../constants/featureTags';
import { TestPriorityTags } from '../../constants/testPriorityTags';
import { SetupHomePage } from '../../page-objects/setupHomePage';
import { AppNameConstants } from '../../constants/appNameConstants';
import { TabNameConstants } from '../../constants/tabNameConstants';

test.describe(`SalesForce ${FeatureTags.CREATE_ACCOUNT}`, async () => {
  let accountNameToAdd: string;
  test.beforeEach(async () => {
    accountNameToAdd = faker.person.firstName();
    console.log(`INFO: Running create account flow to add user with name  : ${accountNameToAdd}`);
  });
  test(`verify admin is able to add new account on salesforce account tab : ${TestPriorityTags.PO}`, async ({
    loggedInPage,
  }) => {
    const homepage = new SetupHomePage(loggedInPage);
    await homepage.load();
    await homepage.verifyIfPageHasLoaded();
    const appLauncher = await homepage.navBar.clickOnAppLauncher();
    await appLauncher.clickOnViewAll();
    const salesHomePage = await appLauncher.openAppTileFromExpandedLauncher(
      AppNameConstants.SALES_APP,
    );
    await salesHomePage.verifyIfPageHasLoaded();

    //open account tab
    const accountHomePage = await salesHomePage.navBarComponent.switchToTabWithName(
      TabNameConstants.ACCOUNT_TAB,
    );
    const newAccountFormPage = await accountHomePage.clickOnNewButton();

    //fill up the account form
    await newAccountFormPage.fillAccountForm({ accountNameToFill: accountNameToAdd });

    //check if the account is created

    await salesHomePage.navBarComponent.switchToTabWithName(TabNameConstants.ACCOUNT_TAB);
    await accountHomePage.verifyRecordExistsInListOfRecords(accountNameToAdd);
  });
});
