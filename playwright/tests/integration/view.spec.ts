import { expect, test } from '@playwright/test';
import { LogView } from '../page-objects/log-view';

test('Hello World Mock', async ({ page }) => {
  const editor = await LogView.openMock(page);
  await expect(editor.page.getByRole('heading', { name: 'Hello World' }).first()).toContainText("Hello World");
});
