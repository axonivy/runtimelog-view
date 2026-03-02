import { expect, test } from '@playwright/test';
import { LogView } from '../page-objects/LogView';

test('should render detail', async ({ page }) => {
  const view = await LogView.openMock(page);
  await expect(view.detail.locator).toBeHidden();
  await view.main.table.getByRole('row').first().click();
  await expect(view.detail.locator).toBeVisible();
  await view.detail.close.click();
  await expect(view.detail.locator).toBeHidden();
});

test('should assert data in Detail view', async ({ page }) => {
  const view = await LogView.openMock(page);
  await view.main.table.getByRole('row').first().click();
  await expect(view.detail.locator).toBeVisible();

  await expect(view.detail.locator.getByText('Time')).toBeVisible();
  await expect(view.detail.locator.getByText('Wed Jan 22 16:11:52 CET 2025')).toBeVisible();

  await expect(view.detail.locator.getByText('Request')).toBeVisible();
  await expect(view.detail.locator.getByText('HTTP GET rest/approval.p.json/createApprovalViaREST.ivp(4.4.0.0)')).toBeVisible();

  await expect(view.detail.locator.getByText('Level')).toBeVisible();
  await expect(view.detail.locator.getByText('INFO')).toBeVisible();

  await expect(view.detail.locator.getByText('Category')).toBeVisible();
  await expect(view.detail.locator.getByText('USER')).toBeVisible();

  await expect(view.detail.locator.getByText('Message')).toBeVisible();
  await expect(view.detail.locator.getByText('Process intermediate event')).toBeVisible();
});
