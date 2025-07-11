import { test } from '@playwright/test';
import { LogView } from '../page-objects/log-view';
import { screenshot } from './screenshot-util';

test('screenshot', async ({ page }) => {
  await LogView.openMock(page);
  await screenshot(page, 'view-properties', { height: 550, width: 1000 });
});
