import { Locator, Page } from '@playwright/test';
import { AppConstants } from '../constants/appConstants';
import { NavBarComponent } from './ui-components/navBarComponent';
import { BasePage } from './basePage';

export class SetupHomePage extends BasePage {
  async verifyIfPageHasLoaded(): Promise<void> {
    await this.isLocatorVisible(this.pageAnchorLocator, {
      thresholdTimeout: 15000,
      assertionStatement: 'Verifying if setup home page url is loaded',
    });
  }

  async load(): Promise<void> {
    await this.loadUrl(AppConstants.SETUP_HOMEPAGE_URL);
  }

  //locators
  readonly pageAnchorLocator: Locator;
  private readonly _navBar: NavBarComponent;

  constructor(readonly page: Page) {
    super(page);
    this.pageAnchorLocator = this.page
      .locator('div.tileTitle')
      .filter({ hasText: 'Get Started with Einstein Bots' });
    this._navBar = new NavBarComponent(page);
  }

  get navBar() {
    return this._navBar;
  }
}
