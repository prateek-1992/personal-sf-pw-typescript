import { BrowserContext, Page, test as base } from '@playwright/test';
import { AppTestData, FrameWorkUtil } from '../utils/frameworkUtil';
import { Environment } from '../constants/envConstants';

export const loggedInTests = base.extend<{
  appTestData: AppTestData;
  loggedInContext: BrowserContext;
  loggedInPage: Page;
}>({
  appTestData: async ({}, use) => {
    const appTestData = FrameWorkUtil.loadAppTestData(Environment.STAGE);
    await use(appTestData);
  },
  context: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: '.auth/credentials.json' });
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },
});
