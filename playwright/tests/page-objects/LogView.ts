import type { Page } from '@playwright/test';
import { Detail } from './Detail';
import { Main } from './Main';

export const server = process.env.BASE_URL ?? 'http://localhost:8080/~Developer-log-test-project';
export const user = 'Developer';
export const ws = process.env.TEST_WS ?? '';
const app = process.env.TEST_APP ?? 'Developer-log-test-project';
const pmv = 'log-test-project';

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

  static async openLog(page: Page, options?: { theme?: string }) {
    const serverUrl = server.replace(/^https?:\/\//, '');
    let url = `?server=${serverUrl}${ws}&app=${app}&pmv=${pmv}`;
    if (options) {
      url += Object.entries(options)
        .map(([key, value]) => `&${key}=${value}`)
        .join('');
    }
    return await this.open(page, url);
  }

  static async openMock(page: Page) {
    return await this.open(page, 'mock.html');
  }

  get main() {
    return new Main(this.page);
  }

  get detail() {
    return new Detail(this.page);
  }
}
