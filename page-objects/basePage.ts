import { Page, test } from '@playwright/test';
import { IPageActions } from './IPageActions';
import { BaseComponent } from './baseComponent';

export abstract class BasePage extends BaseComponent implements IPageActions {
  abstract load(): Promise<void>;
  abstract verifyIfPageHasLoaded(): Promise<void>;

  constructor(readonly page: Page) {
    super(page);
  }

  async reload(): Promise<void> {
    await test.step(`Reloading the current page`, async () => {
      await this.page.reload();
    });
  }

  async loadUrl(url: string): Promise<void> {
    await test.step(`Loading given url:  ${url}`, async () => {
      await this.page.goto(url);
    });
  }
}
