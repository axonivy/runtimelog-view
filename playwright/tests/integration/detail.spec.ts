import { expect, test } from '@playwright/test';
import { LogView } from '../page-objects/log-view';

test('should render detail table', async ({ page }) => {
  await LogView.openMock(page);
  await page.getByRole('cell', { name: 'INFO' }).click();
  await expect(page.locator('.master-content-container.detail-view')).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.locator('.master-content-container.detail-view')).toBeHidden();
});

test('should assert data in Detail view', async ({ page }) => {
  await LogView.openMock(page);
  await page.getByRole('cell', { name: 'INFO' }).click();
  const test = page.locator('.master-content-container.detail-view');

  await expect(test.getByText('Time')).toBeVisible();
  await expect(test.getByText('Request')).toBeVisible();

  await expect(test.getByText('INFO')).toBeVisible();
});
