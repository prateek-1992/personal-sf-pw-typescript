import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../basePage';
import { AccountHomePage } from '../accountHomePage';
import { TabNameConstants } from '../../constants/tabNameConstants';
import { AppLauncher } from './appLauncherComponent';

export class NavBarComponent extends BaseComponent {
  readonly appLauncher: Locator;
  readonly searchInputBoxInAppLauncher: Locator;
  readonly viewAllButtonInAppLauncher: Locator;
  readonly expandedAppLauncher: Locator;
  readonly searchInputBoxInExapndedAppLauncher: Locator;
  readonly tabLocator: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.appLauncher = this.page.locator('div.slds-icon-waffle');
    this.tabLocator = this.page.locator('one-app-nav-bar-item-root');
  }

  async clickOnAppLauncher() {
    await this.clickOn(this.appLauncher);
    return new AppLauncher(this.page);
  }

  async switchToTabWithName(tabName: TabNameConstants) {
    await this.tabLocator.filter({ hasText: tabName }).click();
    if (tabName === TabNameConstants.ACCOUNT_TAB) {
      return new AccountHomePage(this.page);
    } else {
      throw new Error(`No Page implementated for tab : ${tabName}`);
    }
  }
}
