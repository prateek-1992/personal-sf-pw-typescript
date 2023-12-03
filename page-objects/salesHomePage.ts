import { Locator, Page, expect } from '@playwright/test';
import { AppConstants } from '../constants/appConstants';
import { NavBarComponent } from './ui-components/navBarComponent';

import { BasePage } from './basePage';

export class SalesHomePage extends BasePage {
  async verifyIfPageHasLoaded(): Promise<void> {
    await expect(
      this.anchorLocator,
      `expecting sales page anchor element to be visible`,
    ).toBeVisible();
  }

  async load(): Promise<void> {
    await this.loadUrl(AppConstants.SALES_HOMEPAGE_URL);
  }

  //locators
  readonly navBarComponent: NavBarComponent;
  readonly anchorLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.anchorLocator = this.page.getByText('Quarterly Performance', { exact: true });
    this.navBarComponent = new NavBarComponent(this.page);
  }
}
