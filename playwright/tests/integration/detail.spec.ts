import { expect, test } from '@playwright/test';
import { LogView } from '../page-objects/log-view';

test.describe('should Test Detail View', () => {
  test('should render detail table', async ({ page }) => {
    await LogView.openMock(page);
    await page.getByRole('cell', { name: 'INFO' }).click();
    await expect(page.getByLabel('detail-view-table')).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByLabel('detail-view-table')).toBeHidden();
  });

  test('should assert data in Detail view', async ({ page }) => {
    await LogView.openMock(page);
    await page.getByRole('cell', { name: 'INFO' }).click();

    await expect(page.getByRole('row', { name: 'Severity' })).toHaveText('SeverityINFO');
    await expect(page.getByRole('row', { name: 'Category' })).toHaveText('CategoryUser');
  });
});
