import { expect, test } from '@playwright/test';
import { LogView } from '../page-objects/log-view';
import { screenshot } from './screenshot-util';

test('view', async ({ page }) => {
  const view = await LogView.openLog(page, 'src_hd/log/test/project/free/free');
  await view.canvas.blockByNth(0).select();
  await screenshot(page, 'view', { height: 550, width: 1000 });
});

test('preview mode', async ({ page }) => {
  const view = await LogView.openLog(page, 'src_hd/log/test/project/free/free');
  await expect(view.canvas.blockByNth(0).block).toBeVisible();
  await view.toolbar.helpPaddings.click();
  await screenshot(page, 'view-preview', { height: 550, width: 1000 });
});

test('mobile mode', async ({ page }) => {
  const view = await LogView.openLog(page, 'src_hd/log/test/project/free/free');
  await expect(view.canvas.blockByNth(0).block).toBeVisible();
  await view.toolbar.deviceModeButton.click();
  await view.toolbar.deviceModeButton.click();
  await screenshot(page, 'view-mobile', { height: 550, width: 1000 });
});
