import { expect, type Locator, type Page } from '@playwright/test';
import { LogFilter } from './LogFilter';

export class Main {
  readonly locator: Locator;
  readonly logFilter: LogFilter;
  readonly search: Locator;
  readonly table: Locator;

  constructor(readonly page: Page) {
    this.locator = page.locator('#log-view-main');
    this.logFilter = new LogFilter(page);
    this.search = this.locator.getByRole('textbox').first();
    this.table = this.locator.getByRole('table').locator('tbody');
  }

  async cleanAllLogs() {
    await this.locator.getByRole('button', { name: 'Menu' }).click();
    await this.page.getByRole('menuitem', { name: 'Delete All Logs' }).click();
    await expect(this.table.getByRole('row')).toHaveCount(0);
  }
}
