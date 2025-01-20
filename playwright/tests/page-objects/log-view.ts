import type { Page } from '@playwright/test';

export const testLog = 'src_hd/log/test/project/test/test';
export const server = process.env.BASE_URL ?? 'http://localhost:8081';
export const user = 'Developer';

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
}
