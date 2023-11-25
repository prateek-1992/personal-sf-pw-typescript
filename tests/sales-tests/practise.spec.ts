import { test, expect } from '@playwright/test';

test.describe(`Debugging demo/practise`, async () => {
  test(`@Demo TC001 - verfying navigation from pw home page using get started`, async ({
    page,
  }) => {
    console.log(`Environment coming from CI is ${process.env['PRIORITY']}`);
    await page.goto('https://playwright.dev/');
    await page.getByText('Get Started').click();
    await expect(page).toHaveURL('https://playwright.dev/docs/intro');
  });
});
