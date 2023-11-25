import { Locator, Page, test, expect } from '@playwright/test';
import { IComponentActions } from './IComponentActions';

export abstract class BaseComponent implements IComponentActions {
  constructor(readonly page: Page) {
    this.page = page;
  }

  /**
   * Generates a Playwright Locator based on the provided identifier, which can be either a string selector or an existing Playwright Locator.
   * If the identifier is a string, it constructs the Locator using the `getLocator` method.
   *
   * @param locateUsing - The string selector or Playwright Locator used to generate the Playwright Locator.
   *
   * @returns A Playwright Locator based on the provided identifier.
   *
   * @example
   * // Example 1: Generating a locator with a string selector
   * const selector: string = /* your selector
   * const generatedLocator1: Locator = elementInteractor.generateLocator(selector);
   *
   * // Example 2: Passing an existing Playwright Locator
   * const existingLocator: Locator = /* your existing Locator
   * const generatedLocator2: Locator = elementInteractor.generateLocator(existingLocator);
   */

  protected generateLocator(locateUsing: string | Locator): Locator {
    return typeof locateUsing === 'string' ? this.getLocator(locateUsing) : locateUsing;
  }

  async loadUrl(url: string): Promise<void> {
    await test.step(`Loading url ${url}`, async () => {
      await this.page.goto(url);
    });
  }

  getLocator(selector: string): Locator {
    console.log(`INFO: Constructing the locator based on given selector ${selector}`);
    return this.page.locator(selector);
  }

  async clickOn(locateUsing: Locator | string, thresholdTimeout?: number): Promise<void> {
    await test.step(`Attempting to click on the given locator`, async () => {
      await this.generateLocator(locateUsing).click({
        timeout: thresholdTimeout,
      });
    });
  }

  async fillIn(
    locateUsing: Locator | string,
    textToEnter: string,
    thresholdTimeout?: number,
  ): Promise<void> {
    await test.step(`Attempting to fill in ${textToEnter} in the given locator`, async () => {
      await this.generateLocator(locateUsing).fill(textToEnter, {
        timeout: thresholdTimeout,
      });
    });
  }

  async isLocatorVisible(
    locateUsing: Locator | string,
    options?: {
      thresholdTimeout?: number | undefined;
      assertionStatement?: string;
    },
  ) {
    await test.step(`Checking if the locator is visible with given timeout: ${options?.thresholdTimeout}`, async () => {
      await expect(this.generateLocator(locateUsing), options?.assertionStatement).toBeVisible({
        timeout: options?.thresholdTimeout,
      });
    });
  }

  public async verifyPageHasNavigatedTo(
    url: string,
    options?: {
      thresholdTimeout?: number;
      assertionStatement?: string;
    },
  ) {
    await test.step(`Expecting page to navigate to ${url}`, async () => {
      await expect
        .poll(
          () => {
            const pageUrl = this.page.url();
            return pageUrl;
          },
          {
            timeout: options?.thresholdTimeout,
            message: options?.assertionStatement,
          },
        )
        .toContain(url);
    });
  }
}
