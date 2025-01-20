import { expect, test, type Page } from '@playwright/test';
import { FormEditor } from '../page-objects/form-editor';

test.describe('Condition Builder', () => {
  test('Add Condition', async ({ page }) => {
    const editor = await FormEditor.openMock(page);
    await editor.canvas.blockByNth(0).inscribe();
    await editor.inscription.expectHeader('Input');
    const properties = editor.inscription.section('Properties');
    const behaviour = properties.behaviour();

    await page.getByText('Visible').click();
    await behaviour.openConditionBuilder();
    await applyConditionBuilder(page);
    await page.getByText('Visible').click();
    await behaviour.expectVisibleAfterBuilder();
  });
});

export async function applyConditionBuilder(page: Page) {
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByText('Condition').first().click();
  const condition = page.locator('.ui-condition-builder-condition');
  const group = page.locator('.ui-condition-builder-group');

  await expect(page.getByRole('dialog').getByRole('combobox').nth(0)).toHaveText('Basic Condition');
  await expect(condition).toHaveCount(1);
  await expect(condition.locator('output')).toHaveCount(2);

  await condition.first().locator('output').first().click();
  await condition.locator('.ui-input').nth(0).fill('data.value1');
  await condition.first().getByRole('combobox').click();
  await page.getByRole('option', { name: 'equal to', exact: true }).first().click();
  await condition.first().locator('output').nth(1).click();
  await condition.locator('.ui-input').nth(0).fill('10');

  await page.getByLabel('Add Condition').click();
  await expect(condition).toHaveCount(2);
  await condition.nth(1).locator('output').nth(0).click();
  await condition.nth(1).locator('.ui-input').nth(0).fill('data.value2');
  await condition.nth(1).getByRole('combobox').click();
  await page.getByRole('option', { name: 'greater than', exact: true }).first().click();
  await condition.nth(1).locator('output').nth(1).click();
  await condition.nth(1).locator('.ui-input').nth(0).fill('5');

  await page.getByRole('dialog').getByRole('combobox').nth(0).click();
  await page.getByRole('option', { name: 'Nested Condition', exact: true }).first().click();

  await expect(group).toHaveCount(1);
  await page.getByLabel('Add Condition Group').click();
  await expect(group).toHaveCount(2);
  await page.locator('.ui-dialog-content').getByRole('combobox').nth(4).click();
  await page.getByRole('option', { name: 'or', exact: true }).first().click();

  await condition.nth(2).locator('output').nth(0).click();
  await condition.nth(2).locator('.ui-input').nth(0).fill('data.value3');
  await page.locator('.ui-condition-builder-condition').nth(2).getByRole('combobox').click();
  await page.getByRole('option', { name: 'less than', exact: true }).first().click();
  await condition.nth(2).locator('output').nth(1).click();
  await condition.nth(2).locator('.ui-input').nth(0).fill('6');

  await page.getByRole('button', { name: 'Apply' }).click();
}
