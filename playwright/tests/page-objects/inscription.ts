import { expect, type Locator, type Page } from '@playwright/test';
import { Outline } from './outline';
import { Browser } from './browser';
import { DisableInput, RequiredInput, VisibleInput } from './behaviourSection';

export class Inscription {
  protected readonly page: Page;
  public readonly view: Locator;

  constructor(page: Page) {
    this.page = page;
    this.view = page.locator('#properties');
  }

  get header() {
    return this.view.locator('.sidebar-header');
  }

  get messages() {
    return this.view.locator('.properties > .ui-flex > .ui-message');
  }

  section(title: string) {
    return new Accordion(this.page, this.view, title);
  }

  async toggleOutline() {
    const outline = new Outline(this.page, this.view);
    await outline.open();
    return outline;
  }

  async expectHeader(title: string) {
    await expect(this.view.locator('.sidebar-header')).toContainText(title);
  }

  async expectEmptyPage() {
    await expect(this.view).toContainText('Select an Element to edit its properties.');
  }
}

class Accordion {
  protected readonly page: Page;
  readonly item: Locator;
  readonly trigger: Locator;
  protected readonly content: Locator;

  constructor(page: Page, parent: Locator, title: string) {
    this.page = page;
    this.item = parent.locator(`.ui-accordion-item:has(.ui-accordion-trigger:has-text("${title}"))`);
    this.trigger = this.item.locator('.ui-accordion-trigger');
    this.content = this.item.locator('.ui-accordion-content');
  }

  async toggle() {
    await this.trigger.click();
  }

  collapsible(title: string) {
    return new Collapsible(this.page, this.content, title);
  }

  behaviour() {
    const behaviourSection = this.collapsible('Behaviour');
    return new RequiredInput(behaviourSection);
  }

  disabledBehaviour() {
    const behaviourSection = this.collapsible('Behaviour');
    return new DisableInput(behaviourSection);
  }

  visibleBehaviour() {
    const behaviourSection = this.collapsible('Behaviour');
    return new VisibleInput(behaviourSection);
  }
}

export class Collapsible {
  protected readonly page: Page;
  protected readonly collapsible: Locator;
  protected readonly trigger: Locator;
  protected readonly control: Locator;
  protected readonly content: Locator;

  constructor(page: Page, parent: Locator, title: string) {
    this.page = page;
    this.collapsible = parent.locator(`.ui-collapsible:has(.ui-collapsible-trigger:has-text("${title}"))`);
    this.trigger = this.collapsible.locator('.ui-collapsible-trigger');
    this.control = this.collapsible.locator('.ui-button');
    this.content = this.collapsible.locator('.ui-collapsible-content');
  }

  select(options?: { label?: string; nth?: number }) {
    return new Select(this.page, this.content, options);
  }

  input(options?: { label?: string; nth?: number; type?: 'text' | 'number' }) {
    return new Input(this.page, this.content, options);
  }

  checkbox(options?: { label?: string; nth?: number }) {
    return new Checkbox(this.page, this.content, options);
  }

  table(columns: ColumnType[]) {
    return new Table(this.page, this.content, columns);
  }
  async toggleControl() {
    await this.control.click();
  }
}

class Select {
  readonly locator: Locator;

  constructor(
    readonly page: Page,
    readonly parentLocator: Locator,
    options?: { label?: string; nth?: number }
  ) {
    if (options?.label) {
      this.locator = parentLocator.getByRole('combobox', { name: options.label }).first();
    } else {
      this.locator = parentLocator.getByRole('combobox').nth(options?.nth ?? 0);
    }
  }

  async clear() {
    await this.choose('');
  }

  async choose(value: string | RegExp) {
    await this.locator.click();
    await this.page.getByRole('option', { name: value, exact: true }).first().click();
  }

  async expectOptions(options: Array<string | RegExp>) {
    await this.locator.click();
    await expect(this.page.getByRole('option')).toHaveCount(options.length);
    for (const option of options) {
      await expect(this.page.getByRole('option', { name: option, exact: true }).first()).toBeVisible();
    }
    await this.page.keyboard.press('Escape');
  }

  async expectValue(value: string | RegExp) {
    await expect(this.locator).toHaveText(value);
  }
}

export class Input {
  readonly locator: Locator;
  readonly outputLocator: Locator;
  readonly inputLocator: Locator;

  constructor(
    readonly page: Page,
    readonly parentLocator: Locator,
    options?: { label?: string; nth?: number; type?: 'text' | 'number' }
  ) {
    const role = options?.type === 'number' ? 'spinbutton' : 'textbox';
    const badgeLocator = parentLocator.locator('.badge-field');
    if (options?.type) {
      if (options.label) {
        this.locator = parentLocator.getByRole(role, { name: options.label }).first();
      } else {
        this.locator = parentLocator.getByRole(role).nth(options.nth ?? 0);
      }
      this.inputLocator = this.locator;
    } else if (options?.label) {
      this.locator = badgeLocator.filter({ has: page.locator('.ui-fieldset-label', { hasText: options.label }) }).first();
      this.inputLocator = this.locator.getByRole(role, { name: options.label }).first();
      this.outputLocator = this.locator.locator('output').first();
    } else {
      this.locator = badgeLocator.locator('.badge-field').nth(options?.nth ?? 0);
      this.inputLocator = this.locator.getByRole(role).first();
      this.outputLocator = this.locator.locator('output').first();
    }
  }

  async focus() {
    if (!(await this.inputLocator.isVisible())) {
      await this.locator.click();
    }
  }

  async blur() {
    if (await this.inputLocator.isVisible()) {
      await this.inputLocator.blur();
    }
  }

  async clear() {
    await this.focus();
    await this.inputLocator.clear();
  }

  async fill(value: string) {
    await this.focus();
    await this.clear();
    await this.inputLocator.fill(value);
  }

  async openBrowser() {
    await this.focus();
    await this.inputLocator.locator('+ .ui-button').click();
    const browser = new Browser(this.page);
    await expect(browser.view).toBeVisible();
    return browser;
  }

  async expectValue(value: string | RegExp) {
    if (this.outputLocator) {
      await this.blur();
      await expect(this.outputLocator).toContainText(value, { useInnerText: true });
    } else {
      await this.expectInputValue(value);
    }
  }

  async expectInputValue(value: string | RegExp) {
    await this.focus();
    await expect(this.inputLocator).toHaveValue(value);
  }

  async expectEmpty() {
    await this.focus();
    await expect(this.inputLocator).toBeEmpty();
  }

  async selectText() {
    await this.focus();
    await this.inputLocator.dblclick();
  }

  async openQuickfix() {
    await this.page.getByRole('button', { name: 'CMS-Quickfix' }).click();

    const popover = this.page.locator('[role="dialog"][data-state="open"]').nth(1);
    await expect(popover).toBeVisible();

    const localButton = popover.getByRole('button', { name: 'CMS-Quickfix-local' });
    const globalButton = popover.getByRole('button', { name: 'CMS-Quickfix-global' });

    await expect(localButton).toBeVisible();
    await expect(globalButton).toBeVisible();

    await globalButton.click();
    await expect(popover).toBeHidden();
  }
}

class Checkbox {
  readonly locator: Locator;

  constructor(
    readonly page: Page,
    readonly parentLocator: Locator,
    options?: { label?: string; nth?: number }
  ) {
    if (options?.label) {
      this.locator = parentLocator.getByRole('checkbox', { name: options.label }).first();
    } else {
      this.locator = parentLocator.getByRole('checkbox').nth(options?.nth ?? 0);
    }
  }

  async check() {
    await this.locator.check();
  }

  async uncheck() {
    await this.locator.uncheck();
  }

  async expectValue(value: boolean) {
    if (value) {
      await expect(this.locator).toBeChecked();
    } else {
      await expect(this.locator).not.toBeChecked();
    }
  }
}

export type ColumnType = 'text' | 'input' | 'select';

export class Table {
  private readonly rows: Locator;
  private readonly header: Locator;
  private readonly locator: Locator;

  constructor(
    readonly page: Page,
    parentLocator: Locator,
    readonly columns: ColumnType[],
    label?: string
  ) {
    if (label === undefined) {
      this.locator = parentLocator;
    } else {
      this.locator = parentLocator.getByLabel(label);
    }
    this.rows = this.locator.locator('tbody tr:not(.ui-message-row)');
    this.header = this.locator.locator('thead tr');
  }

  async addRow() {
    const totalRows = await this.rows.count();
    await this.locator.getByRole('button', { name: 'Add row' }).click();
    return this.row(totalRows);
  }

  row(row: number) {
    return new Row(this.page, this.rows, this.header, row, this.columns);
  }

  cell(row: number, column: number) {
    return this.row(row).column(column);
  }

  async clear() {
    let totalRows = await this.rows.count();
    while (totalRows > 0) {
      await this.row(0).remove();
      await expect(this.rows).toHaveCount(totalRows - 1);
      totalRows = await this.rows.count();
    }
  }

  async expectEmpty() {
    await this.expectRowCount(0);
  }

  async expectRowCount(rows: number) {
    await expect(this.rows).toHaveCount(rows);
  }
}

export class Row {
  public readonly locator: Locator;
  public readonly header: Locator;

  constructor(
    readonly page: Page,
    rowsLocator: Locator,
    headerLocator: Locator,
    row: number,
    readonly columns: ColumnType[]
  ) {
    this.locator = rowsLocator.nth(row);
    this.header = headerLocator.nth(0);
  }

  async fill(values: string[]) {
    let value = 0;
    for (let column = 0; column < this.columns.length; column++) {
      if (this.columns[column] !== 'input') {
        const cell = this.column(column);
        await cell.fill(values[value++]);
      }
    }
  }

  column(column: number) {
    return new Cell(this.page, this.locator, column, this.columns[column]);
  }

  async expectValues(values: string[]) {
    let value = 0;
    for (let column = 0; column < this.columns.length; column++) {
      if (this.columns[column] !== 'input') {
        const cell = this.column(column);
        await cell.expectValue(values[value++]);
      }
    }
  }

  async remove(withoutHeader?: boolean) {
    await this.locator.click();
    await this.page.keyboard.press('Escape');
    await this.page.getByRole('button', { name: 'Remove row' }).click();
    if (!withoutHeader) {
      await this.header.click();
    }
  }

  async dragTo(targetRow: Row) {
    const source = this.locator.locator('.ui-dnd-row-handleicon');
    const target = targetRow.locator.locator('.ui-dnd-row-handleicon');
    await source.dragTo(target);
  }
}

export class Cell {
  private readonly locator: Locator;
  private readonly textbox: Locator;
  private readonly select: Select;

  constructor(
    readonly page: Page,
    rowLocator: Locator,
    column: number,
    readonly columnType: ColumnType
  ) {
    this.locator = rowLocator.getByRole('cell').nth(column);
    this.textbox = this.locator.getByRole('textbox');
    this.select = new Select(page, this.locator);
  }

  async fill(value: string) {
    switch (this.columnType) {
      case 'text':
        throw new Error('This column is not editable');
      case 'input':
        await this.fillText(value);
        break;
      case 'select':
        await this.select.choose(value);
        break;
    }
  }

  async expectValue(value: string) {
    switch (this.columnType) {
      case 'select':
        await this.select.expectValue(value);
        break;
      default:
        await expect(this.textbox).toHaveValue(value);
    }
  }

  async expectEmpty() {
    await expect(this.textbox).toBeEmpty();
  }

  private async fillText(value: string) {
    const input = this.textbox;
    await input.fill(value);
    await input.blur();
  }
}
