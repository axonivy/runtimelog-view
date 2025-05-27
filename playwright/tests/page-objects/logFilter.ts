import { type Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class logFilter {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openFilter() {
    await this.page.getByRole('button', { name: 'Filters' }).click();
    await expect(this.page.getByRole('menu')).toBeVisible();
  }

  async changeFilter(label: string) {
    await this.openFilter();
    await this.page.getByRole('menuitem', { name: ' Min Log Level' }).focus();
    await this.page.keyboard.press('Enter');
    await this.page.getByRole('menuitemradio', { name: label }).focus();
    await this.page.keyboard.press('Enter');
  }

  async filterUserLogs() {
    await this.openFilter();
    await this.page.getByRole('checkbox', { name: 'Show only User Logs' }).click();
  }

  async filterProject(project: string) {
    await this.openFilter();
    await this.page.getByRole('menuitem', { name: 'Project' }).focus();
    await this.page.keyboard.press('Enter');
    await this.page.getByRole('menuitemcheckbox', { name: project }).focus();
    await this.page.keyboard.press('Enter');
  }
}
