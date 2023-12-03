import { Page, test, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { AppConstants } from '../constants/appConstants';

export class LoginPage extends BasePage {
  //locators
  readonly userNameIpField: Locator;
  readonly passwordIpField: Locator;
  readonly loginButton: Locator;
  readonly sfLogoLocaotr: Locator;
  readonly rememberMeCheckbox: Locator;

  constructor(readonly page: Page) {
    super(page);
    //initalising the locator
    this.userNameIpField = this.page.locator("input[name='username']");
    this.passwordIpField = this.page.locator('#password');
    this.loginButton = this.page.locator('#Login');
    this.sfLogoLocaotr = this.page.locator('.standard_logo');
    this.rememberMeCheckbox = this.page.locator('#rememberUn');
  }

  async verifyIfPageHasLoaded(): Promise<void> {
    await this.isLocatorVisible(this.loginButton, {
      assertionStatement: 'Expecting login page to be loaded',
    });
  }

  async load(): Promise<void> {
    await this.loadUrl(AppConstants.LOGIN_PAGE_URL);
  }

  public async doLogin(userName: string, password: string) {
    await test.step(`Doing salesfroce login for user name ${userName}`, async () => {
      await this.fillIn(this.userNameIpField, userName);
      await this.fillIn(this.passwordIpField, password);
      await this.clickOn(this.loginButton);
    });
  }
}
