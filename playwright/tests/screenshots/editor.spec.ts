import { expect, test } from '@playwright/test';
import { LogView } from '../page-objects/LogView';
import { screenshot } from './screenshot-util';

test('Runtime Log View Detail View', async ({ page }) => {
  const view = await LogView.openMock(page);
  await view.main.table.getByRole('row').first().click();
  await expect(view.detail.locator).toBeVisible();
  await screenshot(page, 'runtime-log-view');
});
