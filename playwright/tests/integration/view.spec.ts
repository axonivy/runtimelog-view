import { expect, test } from '@playwright/test';
import { LogView } from '../page-objects/LogView';

test('should render table and rows correctly', async ({ page }) => {
  const view = await LogView.openMock(page);
  const rows = view.main.table.getByRole('row');
  await expect(rows).toHaveCount(7);
});

test('should filter rows by log level', async ({ page }) => {
  const view = await LogView.openMock(page);
  await view.main.logFilter.changeFilter('ERROR');
  const rows = view.main.table.getByRole('row');
  await expect(rows).toHaveCount(4);
});

test('should filter user Logs', async ({ page }) => {
  const view = await LogView.openMock(page);
  const rows = view.main.table.getByRole('row');
  await expect(rows).toHaveCount(7);
  await view.main.logFilter.filterUserLogs();
  await expect(rows).toHaveCount(4);
});

test('should filter rows by Project', async ({ page }) => {
  const view = await LogView.openMock(page);
  await view.main.logFilter.filterProject('Portal');
  const rows = view.main.table.getByRole('row');
  await expect(rows).toHaveCount(2);
});

test('should filter rows by log level and user logs', async ({ page }) => {
  const view = await LogView.openMock(page);
  await view.main.logFilter.changeFilter('ERROR');
  const rows = view.main.table.getByRole('row');
  await expect(rows).toHaveCount(4);
  await view.main.logFilter.filterUserLogs();
  await expect(rows).toHaveCount(2);
});

test('should sort', async ({ page }) => {
  const view = await LogView.openMock(page);
  await view.main.search.fill('ERROR');
  const rows = view.main.table.getByRole('row');
  await expect(rows).toHaveCount(3);
});

test('should remove all filters', async ({ page }) => {
  const view = await LogView.openMock(page);
  await view.main.logFilter.changeFilter('ERROR');
  await view.main.logFilter.filterProject('Portal');
  const rows = view.main.table.getByRole('row');
  await expect(rows).toHaveCount(1);
  await view.main.logFilter.removeAllFilters();
  await expect(rows).toHaveCount(7);
});

test('should delete all Logs', async ({ page }) => {
  const view = await LogView.openMock(page);
  const rows = view.main.table.getByRole('row');
  await expect(rows).toHaveCount(7);

  await view.main.locator.getByRole('button', { name: 'Menu' }).click();
  await page.getByRole('menuitem', { name: 'Delete All Logs' }).click();
  await expect(rows).toHaveCount(0);
});
