import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('Canetaazul@gmail.com');
  await page.getByPlaceholder('Senha').click();
  await page.getByPlaceholder('Senha').fill('azulcaneta');
  await page.getByRole('button', { name: 'Entrar' }).click();})