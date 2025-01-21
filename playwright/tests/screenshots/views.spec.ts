import { test } from '@playwright/test';
import { LogView } from '../page-objects/log-view';
import { screenshot } from './screenshot-util';

test('properties', async ({ page }) => {
  const view = await LogView.openLog(page, 'src_hd/log/test/project/free/free');
  await screenshot(page, 'view-properties', { height: 550, width: 1000 });
});

test('outline', async ({ page }) => {
  const view = await LogView.openLog(page, 'src_hd/log/test/project/free/free');
  await screenshot(page, 'view-outline', { height: 550, width: 1000 });
});
