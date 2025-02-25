import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/home');
  await page.getByRole('textbox', { name: 'E-mail' }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill('Canetaazul@gmail.com');
  await page.locator('#tipo').selectOption('denuncia');
  await page.getByRole('textbox', { name: 'Descrição' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill('Teste');
  await page.getByRole('button', { name: 'Enviar' }).click();
  await expect(page).toHaveURL('http://localhost:3000/contato');

  await page.goto('http://localhost:3000/home');
  await page.getByRole('textbox', { name: 'E-mail' }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill('Canetaazul@gmail.com');
  await page.locator('#tipo').selectOption('duvida');
  await page.getByRole('textbox', { name: 'Descrição' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill('Teste');
  await page.getByRole('button', { name: 'Enviar' }).click();
  await expect(page).toHaveURL('http://localhost:3000/contato');
  
  await page.goto('http://localhost:3000/home');
  await page.getByRole('textbox', { name: 'E-mail' }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill('Canetaazul@gmail.com');
  await page.locator('#tipo').selectOption('erro');
  await page.getByRole('textbox', { name: 'Descrição' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill('Teste');
  await page.getByRole('button', { name: 'Enviar' }).click();
  await expect(page).toHaveURL('http://localhost:3000/contato');
});