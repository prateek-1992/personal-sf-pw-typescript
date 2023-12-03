/* eslint-disable playwright/no-conditional-in-test */
import { Locator, Page, test, expect } from '@playwright/test';
import { IComponentActions } from './IComponentActions';

export abstract class BaseComponent implements IComponentActions {
  static DefaultLocatorActionTimeout = 5000; // 5 seconds
  static DefaultLocatorVerifcationTimeout = 8000; // 5 seconds

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
    console.log(
      `INFO: Generating locator if string is given otherwise return the locator instance`,
    );
    return typeof locateUsing === 'string' ? this.getLocator(locateUsing) : locateUsing;
  }

  getLocator(selector: string): Locator {
    console.log(`INFO: Constructing the locator based on given selector ${selector}`);
    return this.page.locator(selector);
  }

  async clickOn(
    locateUsing: Locator | string,
    options?: {
      thresholdTimeout?: number;
      stepStatement?: string;
    },
  ): Promise<void> {
    /**
     * options?.stepStatement ?? "" => this is null coleascing operator ,
     * if the stepstatment is null or undefined, then the default value which is "" will be printed
     * otherwise whatever its given will get printed
     */
    await test.step(`Attempting to click : ${options?.stepStatement ?? ''}`, async () => {
      await this.generateLocator(locateUsing).click({
        timeout: options?.thresholdTimeout ?? BaseComponent.DefaultLocatorActionTimeout,
      });
    });
  }

  async fillIn(
    locateUsing: Locator | string,
    textToEnter: string,
    options?: {
      thresholdTimeout?: number;
      stepStatement?: string;
    },
  ): Promise<void> {
    await test.step(`Filling in ${textToEnter}: ${options?.stepStatement ?? ''}`, async () => {
      await this.generateLocator(locateUsing).fill(textToEnter, {
        timeout: options?.thresholdTimeout ?? BaseComponent.DefaultLocatorActionTimeout,
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
    await test.step(`Verifying locator visibility: ${
      options?.assertionStatement ?? ''
    }`, async () => {
      await expect(this.generateLocator(locateUsing), options?.assertionStatement).toBeVisible({
        timeout: options?.thresholdTimeout ?? BaseComponent.DefaultLocatorActionTimeout,
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
    await test.step(`Verifying page navigation to ${url}}`, async () => {
      await expect //adding polling loop to retry
        .poll(
          () => {
            const pageUrl = this.page.url();
            return pageUrl;
          },
          {
            timeout: options?.thresholdTimeout ?? BaseComponent.DefaultLocatorVerifcationTimeout,
            message: options?.assertionStatement ?? 'Polling to verify page navigation',
          },
        )
        .toContain(url);
    });
  }

  public async verifyCountOfLocatorMatches(
    locateUsing: Locator | string,
    expectedNumberOfCount: number,
    options?: {
      thresholdTimeout?: number;
      assertionStatement?: string;
    },
  ) {
    const eleLocator = this.generateLocator(locateUsing);
    await test.step(`Verify the count of locator matches : ${expectedNumberOfCount}`, async () => {
      await expect(eleLocator, `${options?.assertionStatement ?? ''}`).toHaveCount(
        expectedNumberOfCount,
      );
    });
  }
}
