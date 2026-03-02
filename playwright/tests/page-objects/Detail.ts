import { type Locator, type Page } from '@playwright/test';

export class Detail {
  readonly page: Page;
  readonly locator: Locator;
  readonly close: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locator = this.page.locator('#log-view-detail');
    this.close = this.locator.getByRole('button', { name: 'Close' });
  }
}
