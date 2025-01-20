import type { Locator, Page } from '@playwright/test';
import { Toolbar } from './toolbar';
import { Canvas } from './canvas';
import { Inscription } from './inscription';
import { randomUUID } from 'crypto';

export const testLog = 'src_hd/log/test/project/test/test';
export const server = process.env.BASE_URL ?? 'http://localhost:8081';
export const user = 'Developer';
const ws = process.env.TEST_WS ?? '';
const app = process.env.TEST_APP ?? 'designer';
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

  static async openLog(page: Page, file = testLog, options?: { readonly?: boolean; theme?: string }) {
    const serverUrl = server.replace(/^https?:\/\//, '');
    let url = `?server=${serverUrl}${ws}&app=${app}&pmv=${pmv}&file=${file}.f.json`;
    if (options) {
      url += Object.entries(options)
        .map(([key, value]) => `&${key}=${value}`)
        .join('');
    }
    return await this.open(page, url);
  }

  static async openNewLog(page: Page, options?: { block?: string }) {
    const name = `tmp${randomUUID().replaceAll('-', '')}`;
    const namespace = 'temp';
    const result = await fetch(`${server}${ws}/api/web-ide/hd`, {
      method: 'POST',
      headers: {
        'X-Requested-By': 'log-view-tests',
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + Buffer.from(user + ':' + user).toString('base64')
      },
      body: JSON.stringify({ namespace, name, type: 'Log', project: { app, pmv } })
    });
    if (!result.ok) {
      console.log(`Failed to create log: ${result.status}`);
    }
    const view = await this.openLog(page, `src_hd/${namespace}/${name}/${name}`);
    if (options?.block) {
      await view.createBlock(options.block);
    }
    return view;
  }

  static async openMock(page: Page) {
    return await this.open(page, 'mock.html');
  }

  get toolbar() {
    return new Toolbar(this.page);
  }

  get canvas() {
    return new Canvas(this.page);
  }

  get inscription() {
    return new Inscription(this.page);
  }

  async createBlock(block: string, target?: Locator) {
    const palette = await this.toolbar.openPalette('All Components');
    await palette.dndTo(block, target ?? this.canvas.dropZone);
  }
}
