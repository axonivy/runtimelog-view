import { test } from '@playwright/test';
import { LogView } from '../page-objects/log-view';
import { screenshot } from './screenshot-util';

test('Runtime Log View', async ({ page }) => {
  await LogView.openMock(page);
  await screenshot(page, 'view');
});

test('Runtime Log View Detail View', async ({ page }) => {
  await LogView.openMock(page);
  await page.getByRole('cell', { name: 'INFO' }).click();
  await screenshot(page, 'view');
});
