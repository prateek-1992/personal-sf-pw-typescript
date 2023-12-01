import { faker } from '@faker-js/faker';
import { loggedInTests as test } from '../fixtures';
import { FeatureTags } from '../../constants/featureTags';
import { TestPriorityTags } from '../../constants/testPriorityTags';
import { SalesAppAccountHelper } from '../../utils/accountsHelper';
import { SetupHomePage } from '../../page-objects/setupHomePage';
import { AppNameConstants } from '../../constants/appNameConstants';
import { TabNameConstants } from '../../constants/tabNameConstants';

test.describe(`SalesForce ${FeatureTags.DELETE_ACCOUNT}`, async () => {
  let accountNameToAdd: string;
  let salesAccountHelper: SalesAppAccountHelper;

  test.beforeEach('Adding new account to use in delete account flow', async ({ page }) => {
    accountNameToAdd = faker.person.middleName();
    console.log(`Adding account : ${accountNameToAdd} for edit flow`);
    salesAccountHelper = new SalesAppAccountHelper(page);
    await salesAccountHelper.addNewAccount(false, accountNameToAdd);
  });

  test(`verify admin is able to delete a record from menu options from list of records : ${TestPriorityTags.PO}`, async ({
    page,
  }) => {
    const homepage = new SetupHomePage(page);
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

    //open this account for editing
    await accountHomePage.deleteTheRecord(accountNameToAdd);

    //verify the record do not appear in the list
    await accountHomePage.verifyRecordDoNotExistsInListOfRecords(accountNameToAdd);
  });
});
