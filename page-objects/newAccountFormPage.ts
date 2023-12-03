import { Locator, Page, expect } from '@playwright/test';

import { AppConstants } from '../constants/appConstants';
import { BasePage } from './basePage';

export class NewAccountFormPage extends BasePage {
  async verifyIfPageHasLoaded(): Promise<void> {
    await this.verifyPageHasNavigatedTo(AppConstants.NEW_ACCOUNT_FORM_PAGE, {
      assertionStatement: 'Verify if page has navigated to New Account form',
    });
  }
  async load(): Promise<void> {
    await this.loadUrl(AppConstants.NEW_ACCOUNT_FORM_PAGE);
  }

  readonly accountName: Locator;
  readonly saveAndNewButton: Locator;
  readonly saveButton: Locator;
  readonly closeButton: Locator;
  readonly toastMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.accountName = this.page.locator("input[name='Name']");
    this.saveAndNewButton = this.page.locator('lightning-button').filter({ hasText: 'Save & New' });
    this.saveButton = this.page.locator("button[name='SaveEdit']");
    this.closeButton = this.page.locator("button[title='Close this window']");
    this.toastMessage = this.page.getByRole('alertdialog');
  }

  async fillAccountForm(options: { accountNameToFill: string }) {
    await this.fillIn(this.accountName, options.accountNameToFill);
    await this.clickOn(this.saveAndNewButton);
    await expect(this.accountName).toBeEmpty();
    await this.clickOn(this.closeButton);
    // await this.isLocatorVisible(this.toastMessage,{assertionStatement:`expecting toast message to be visible`})
  }

  async updateAccountName(updatedAccountName: string) {
    await this.accountName.clear();
    await this.accountName.fill(updatedAccountName);
  }
}
