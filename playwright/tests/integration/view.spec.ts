import { expect, test } from '@playwright/test';
import { LogView } from '../page-objects/log-view';

test('should render table and rows correctly', async ({ page }) => {
  await LogView.openMock(page);
  const table = page.locator('table');
  await expect(table).toBeVisible();

  const header = page.locator('table thead');
  await expect(header).toBeVisible();

  const rows = page.locator('table tbody tr');
  await expect(rows).toHaveCount(7);
});

test.describe('DataTable filter & sorting', () => {
  test('should filter rows by log level', async ({ page }) => {
    const view = await LogView.openMock(page);
    view.logFilter.changeFilter('ERROR');
    const rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(4);
  });

  test('should filter user Logs', async ({ page }) => {
    const view = await LogView.openMock(page);
    const rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(7);
    view.logFilter.filterUserLogs();
    await expect(rows).toHaveCount(4);
  });

  test('should filter rows by log level and user logs', async ({ page }) => {
    const view = await LogView.openMock(page);
    view.logFilter.changeFilter('ERROR');
    const rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(4);
    view.logFilter.filterUserLogs();
    await expect(rows).toHaveCount(1);
  });

  test('should sort', async ({ page }) => {
    await LogView.openMock(page);
    const searchInput = page.getByPlaceholder('Search');
    await searchInput.fill('ERROR');
    const rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(3);
  });
});
