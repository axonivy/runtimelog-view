import { test } from '@playwright/test';
import { screenshot } from './screenshot-util';
import { LogView } from '../page-objects/log-view';

test('Runtime Log View', async ({ page }) => {
  await LogView.openMock(page);
  await screenshot(page, 'view');
});

