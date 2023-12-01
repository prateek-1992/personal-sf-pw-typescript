import { Locator, Page, expect, test } from '@playwright/test';
import { BaseComponent } from './basePage';
import { IPageActions } from './IPageActions';
import { AppConstants } from '../constants/appConstants';
import { NewAccountFormPage } from './newAccountFormPage';

export class AccountHomePage extends BaseComponent implements IPageActions {
  async load(): Promise<void> {
    await this.loadUrl(AppConstants.ACCOUNT_PAGE);
  }
  async verifyIfPageHasLoaded(): Promise<void> {
    await this.verifyPageHasNavigatedTo(AppConstants.ACCOUNT_PAGE, {
      assertionStatement: 'Verifying if page has navigated to Account page',
    });
  }

  //locators
  readonly newButton: Locator;
  readonly importButton: Locator;
  readonly editButtonOnMenuOptions: Locator;
  readonly deleteButtonOnMenuOptions: Locator;

  //confirmation prompt  for delete
  readonly confirmDeleteButton: Locator;
  readonly cancelDeleteButton: Locator;

  constructor(page: Page) {
    super(page);
    this.newButton = this.page
      .locator("ul[class^='branding-actions'] a")
      .filter({ hasText: 'New' });
    this.importButton = this.page
      .locator("ul[class^='branding-actions'] a")
      .filter({ hasText: 'Import' });
    this.editButtonOnMenuOptions = this.page.locator("a[title='Edit']");
    this.deleteButtonOnMenuOptions = this.page.locator("a[title='Delete']");

    //confirmation prompt  for delete
    this.confirmDeleteButton = this.page
      .locator("div[class*='slds-modal__footer']")
      .getByText('Delete');
    this.cancelDeleteButton = this.page
      .locator("div[class*='slds-modal__footer']")
      .getByText('Cancel');
  }

  async clickOnNewButton() {
    await test.step('Going to click on new button to open new account form', async () => {
      await this.clickOn(this.newButton);
    });
    return new NewAccountFormPage(this.page);
  }

  async clickOnImportButton() {
    await test.step(`Clicking on import button`, async () => {
      await this.clickOn(this.importButton);
    });
  }

  async openRecordForEditing(accountNameToEdit: string) {
    await test.step(`Opening record with name: ${accountNameToEdit} for editing`, async () => {
      const userRecord = this.page.locator('tr').filter({ hasText: accountNameToEdit });
      const utilityDropdown = userRecord.locator("span[class$='slds-icon-utility-down']");
      await expect(utilityDropdown).toBeVisible();
      await utilityDropdown.click({ timeout: 15000 });
      await this.editButtonOnMenuOptions.click();
    });

    return new NewAccountFormPage(this.page);
  }

  async deleteTheRecord(accountNameToDelete: string) {
    await test.step(`Attempting to delete record by name: ${accountNameToDelete}`, async () => {
      const userRecord = this.page.locator('tr').filter({ hasText: accountNameToDelete });
      const utilityDropdown = userRecord.locator("span[class$='slds-icon-utility-down']");
      await expect(utilityDropdown).toBeVisible();
      await utilityDropdown.click({ timeout: 15000 });
      await this.deleteButtonOnMenuOptions.click();
      await this.confirmDeleteButton.click();
    });
  }

  async verifyRecordExistsInListOfRecords(userName: string) {
    await expect(
      this.page.locator("a[data-refid='recordId']").filter({ hasText: userName }).nth(0),
    ).toBeVisible({ timeout: 15000 });
  }

  async verifyRecordDoNotExistsInListOfRecords(userName: string) {
    await expect(
      this.page.locator("a[data-refid='recordId']").filter({ hasText: userName }).nth(0),
    ).toBeHidden({ timeout: 15000 });
  }
}
