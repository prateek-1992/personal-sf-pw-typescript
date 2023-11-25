import { expect } from '@playwright/test';
import { NewAccountFormPage } from '../../page-objects/newAccountFormPage';
import { faker } from '@faker-js/faker';
import { loggedInTests as test } from '../fixtures';
import { FeatureTags } from '../../constants/featureTags';
import { TestPriorityTags } from '../../constants/testPriorityTags';
import { SalesAppAccountHelper } from '../../utils/accountsHelper';
import { SetupHomePage } from '../../page-objects/setupHomePage';
import { AppNameConstants } from '../../constants/appNameConstants';
import { TabNameConstants } from '../../constants/tabNameConstants';

test.describe(`SalesForce ${FeatureTags.EDIT_ACCOUNT}`, async () => {
  let accountNameToAdd: string;
  let salesAccountHelper: SalesAppAccountHelper;

  test.beforeEach('Adding new account to use in edit account flow', async ({ loggedInPage }) => {
    accountNameToAdd = faker.person.fullName();
    console.log(`Adding account : ${accountNameToAdd} for edit flow`);
    salesAccountHelper = new SalesAppAccountHelper(loggedInPage);
    await salesAccountHelper.addNewAccount(false, accountNameToAdd);
  });

  test(`verify admin is able to edit the account and able to view updated record : ${TestPriorityTags.P1}`, async ({
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

    //open this account for editing
    const editAccountFormPage = await accountHomePage.openRecordForEditing(accountNameToAdd);

    //change the account name
    const updatedAccountName = faker.person.fullName();
    console.log(`Attempt to edit account name ${accountNameToAdd} to ${updatedAccountName}`);

    await editAccountFormPage.updateAccountName(updatedAccountName);

    //save the form
    await editAccountFormPage.saveButton.click();

    //verify the updated record exists in the record list
    await accountHomePage.verifyRecordExistsInListOfRecords(updatedAccountName);
  });
});
