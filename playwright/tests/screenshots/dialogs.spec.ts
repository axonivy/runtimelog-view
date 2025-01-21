import { test } from '@playwright/test';
import { LogView } from '../page-objects/log-view';

test('data browser', async ({ page }) => {
  const view = await LogView.openLog(page, 'src_hd/log/test/project/test/test');
});
