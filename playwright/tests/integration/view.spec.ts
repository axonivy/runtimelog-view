import { expect, test } from '@playwright/test';
import { LogView } from '../page-objects/log-view';

test('title', async ({ page }) => {
  await LogView.openMock(page);
  await expect(page).toHaveTitle('Log View Mock');
});
