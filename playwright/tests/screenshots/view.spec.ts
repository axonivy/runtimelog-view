import { test } from '@playwright/test';
import { screenshot } from './screenshot-util';
import { LogView } from '../page-objects/log-view';


test('screenshot', async ({ page }) => {
  await LogView.openMock(page);
  await screenshot(page, 'view-properties', { height: 550, width: 1000 });
});
