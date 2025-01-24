import test, { expect } from '@playwright/test';

test('should have a button with the text "FOO"', async ({ page, request }) => {
  const i18n = await request.get('http://localhost:4200/i18n/en.json');
  const translations = (await i18n.json()) as Record<string, string>;

  await page.goto('http://localhost:4200');

  await expect(
    page.getByText(translations['PAGE.COMMON.FOO'], { exact: true })
  ).toBeVisible();
});
