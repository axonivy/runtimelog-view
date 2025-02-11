import { type Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class logFilter {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openFilter() {
    await this.page.locator('button').getByText('Filters').click();
    await expect(this.page.getByRole('menu')).toBeVisible();
  }

  async changeFilter(label: string) {
    await this.openFilter();
    await this.page.getByRole('menuitemradio').getByText(label).click();
  }

  async filterUserLogs() {
    await this.openFilter();
    await this.page.getByRole('checkbox', { name: 'Show only User Logs' }).click();
  }
}
