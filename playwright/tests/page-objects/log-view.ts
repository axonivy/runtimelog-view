import type { Page } from '@playwright/test';
import { logFilter } from './logFilter';

export class LogView {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private static async open(page: Page, url = '') {
    await page.goto(url);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addStyleTag({ content: `.tsqd-parent-container { display: none; }` });
    return new LogView(page);
  }

  static async openMock(page: Page) {
    return await this.open(page, 'mock.html');
  }

  get logFilter() {
    return new logFilter(this.page);
  }
}
