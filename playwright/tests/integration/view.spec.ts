import { expect, test } from '@playwright/test';
import { LogView } from '../page-objects/log-view';

test.beforeEach(async ({ page }) => {
  await LogView.openMock(page);
});

test('should render table and rows correctly', async ({ page }) => {
  const table = page.locator('table');
  await expect(table).toBeVisible();

  const header = page.locator('table thead');
  await expect(header).toBeVisible();

  const rows = page.locator('table tbody tr');
  await expect(rows).toHaveCount(7);
});

test.describe('DataTable filter & sorting', () => {
  test('should filter rows by log level', async ({ page }) => {
    const filter = page.locator('button').getByText('Filters');

    await filter.click();
    await page.getByRole('menuitemcheckbox', { name: 'ERROR' }).click();

    const rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(4);
  });

  test('should filter user Logs', async ({ page }) => {
    const rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(7);
    const filter = page.locator('button').getByText('Filters');

    await filter.click();
    await page.getByRole('checkbox', { name: 'Show only User Logs' }).click();

    await expect(rows).toHaveCount(4);
  });

  test('should filter rows by log level and user logs', async ({ page }) => {
    const filter = page.locator('button').getByText('Filters');
    await filter.click();
    await page.getByRole('menuitemcheckbox', { name: 'ERROR' }).click();
    await filter.click();
    await page.getByRole('checkbox', { name: 'Show only User Logs' }).click();

    const rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(1);
  });

  test('should sort', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search');
    await searchInput.fill('ERROR');
    const rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(3);
  });
});
