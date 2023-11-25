import { Page } from '@playwright/test';
import { NewAccountFormPage } from '../page-objects/newAccountFormPage';
import { faker } from '@faker-js/faker';
import { SetupHomePage } from '../page-objects/setupHomePage';
import { TabNameConstants } from '../constants/tabNameConstants';

export class SalesAppAccountHelper {
  //first home = https://qeagle-dev-ed.lightning.force.com/lightning/setup/SetupOneHome/home
  //sales home = https://qeagle-dev-ed.lightning.force.com/lightning/page/home
  //accounts list = https://qeagle-dev-ed.lightning.force.com/lightning/o/Account/list?filterName=Recent
  //new account - https://qeagle-dev-ed.lightning.force.com/lightning/o/Account/new

  static getRandomAccountName() {
    return faker.person.fullName();
  }

  readonly setupHomePage: SetupHomePage;

  constructor(readonly loggedInPage: Page) {
    this.loggedInPage = loggedInPage;
    this.setupHomePage = new SetupHomePage(this.loggedInPage);
  }

  async addNewAccount(chooseRandom = true, accountName: undefined | string) {
    const newAccountFormPage = new NewAccountFormPage(this.loggedInPage);
    await newAccountFormPage.load();
    let accountNameToAdd = !chooseRandom
      ? accountName
      : SalesAppAccountHelper.getRandomAccountName();

    if (accountNameToAdd != undefined) {
      await newAccountFormPage.fillAccountForm({ accountNameToFill: accountNameToAdd });
    } else {
      throw new Error(`chooseRandom flag is set to false, hence accountName should be passed`);
    }
    await this.verifyAccountExistsInListOfRecords(accountNameToAdd);
  }

  async verifyAccountExistsInListOfRecords(accountNameToVerify: string) {
    const accountHomePage = await this.setupHomePage.navBar.switchToTabWithName(
      TabNameConstants.ACCOUNT_TAB,
    );
    await accountHomePage.verifyRecordExistsInListOfRecords(accountNameToVerify);
  }
}
