import { test, expect } from '@playwright/test';

test('shall github username not visible without session token', async ({
  page,
  context,
}) => {
  await context.clearCookies();
  await page.goto('/');
  await expect(page.getByRole('heading')).toHaveText('Hello World');
  await expect(page.getByText('userA')).not.toBeVisible();
});

test('shall github username visible session token', async ({
  context,
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('heading')).toHaveText('Hello World');
  await expect(page.getByText('userA')).toBeVisible();
});
