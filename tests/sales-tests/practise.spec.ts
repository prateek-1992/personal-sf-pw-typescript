import { test, expect } from '@playwright/test';

test.describe.fixme(`Debugging demo/practise`, async () => {
  test(`TC001 - verfying navigation from pw home page using get started`, async ({ page }) => {
    let a = 1;
    await page.goto('https://playwright.dev/');
    a++;
    await page.getByText('Started').click();
    await expect(page).toHaveURL('https://playwright.dev/docs/intro');
  });
});
