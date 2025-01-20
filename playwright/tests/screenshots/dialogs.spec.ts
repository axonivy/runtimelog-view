import { test, expect } from '@playwright/test';
import { LogView } from '../page-objects/log-view';
import { screenshotElement } from './screenshot-util';

test('create from data', async ({ page }) => {
  const view = await LogView.openLog(page, 'src_hd/log/test/project/test/test');
  await view.toolbar.dataButton.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('row', { name: 'address' })).toBeVisible();
  await screenshotElement(dialog, 'dialog-create-from-data');
});

test('cms browser', async ({ page }) => {
  const view = await LogView.openLog(page, 'src_hd/log/test/project/free/free');
  await view.canvas.blockByText('Address').inscribe();
  const browser = await view.inscription.section('Properties').collapsible('General').input({ label: 'Label' }).openBrowser();
  await browser.expectEntries(['log-test-project', 'greetings']);
  await screenshotElement(browser.view, 'dialog-cms-browser');
});

test('logic browser', async ({ page }) => {
  const view = await LogView.openLog(page, 'src_hd/log/test/project/free/free');
  await view.canvas.blockByText('Proceed').inscribe();
  const browser = await view.inscription.section('Properties').collapsible('General').input({ label: 'Action' }).openBrowser();
  await browser.expectEntries(['Events', 'close', 'Methods']);
  await screenshotElement(browser.view, 'dialog-logic-browser');
});

test('data browser', async ({ page }) => {
  const view = await LogView.openLog(page, 'src_hd/log/test/project/test/test');
  await view.canvas.blockByText('City').inscribe();
  const browser = await view.inscription.section('Properties').collapsible('General').input({ label: 'Value' }).openBrowser();
  await browser.expectEntries(['data', 'address', 'age', 'name', 'person']);
  await screenshotElement(browser.view, 'dialog-data-browser');
});
