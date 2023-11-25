import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../basePage';
import { AppNameConstants } from '../../constants/appNameConstants';
import { SalesHomePage } from '../salesHomePage';

export class AppLauncher extends BaseComponent {
  //locators
  readonly searchInputBoxInAppLauncher: Locator;
  readonly viewAllButtonInAppLauncher: Locator;
  readonly expandedAppLauncher: Locator;
  readonly searchInputBoxInExapndedAppLauncher: Locator;
  readonly appTilesInExpandedAppLauncher: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInputBoxInAppLauncher = this.page.getByPlaceholder('Search apps and items...');
    this.viewAllButtonInAppLauncher = this.page.locator('button').filter({ hasText: 'View All' });
    this.expandedAppLauncher = this.page.locator('one-app-launcher-modal');
    this.searchInputBoxInExapndedAppLauncher =
      this.page.getByPlaceholder('Search apps or items...');
    this.appTilesInExpandedAppLauncher = this.page.locator('one-app-launcher-app-tile');
  }

  async clickOnViewAll() {
    await this.clickOn(this.viewAllButtonInAppLauncher);
    await this.isExpandedAppLauncherVisible();
  }

  async isExpandedAppLauncherVisible() {
    await this.isLocatorVisible(this.expandedAppLauncher);
  }

  async openAppTileFromExpandedLauncher(appName: AppNameConstants) {
    const appTileLocator = this.appTilesInExpandedAppLauncher.filter({
      has: this.page.getByText(appName, { exact: true }),
    });
    await this.clickOn(appTileLocator);
    return this.getPageObjectForApp(appName);
  }

  async getPageObjectForApp(appName: AppNameConstants) {
    if (appName === AppNameConstants.SALES_APP) {
      return new SalesHomePage(this.page);
    } else {
      throw new Error(`Page object for app : ${appName} is not yet implemented`);
    }
  }
}
