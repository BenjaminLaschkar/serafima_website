import { test, expect } from '@playwright/test';

/**
 * SECTION 3 — Internationalisation (i18n)
 *
 * Corrections :
 * - Liens nav scopés à "header nav" (doublons footer)
 * - Overlay mobile : attendre que l'overlay soit visible avant d'interagir
 */

test.describe('i18n — changement de langue (desktop)', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('passer en EN traduit les liens de navigation', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Switch to EN' }).click();
    const nav = page.locator('header nav');
    await expect(nav.getByRole('link', { name: 'Biography', exact: true })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Schedule', exact: true })).toBeVisible();
  });

  test('passer en RU traduit les liens de navigation en cyrillique', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Switch to RU' }).click();
    const nav = page.locator('header nav');
    await expect(nav.getByRole('link', { name: 'Биография', exact: true })).toBeVisible();
  });

  test('repasser en FR restaure les labels français', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Switch to EN' }).click();
    await page.getByRole('button', { name: 'Switch to FR' }).click();
    const nav = page.locator('header nav');
    await expect(nav.getByRole('link', { name: 'Biographie', exact: true })).toBeVisible();
  });

  test('la langue persiste lors d\'une navigation entre pages', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Switch to EN' }).click();
    await page.locator('header nav').getByRole('link', { name: 'Biography', exact: true }).click();
    await expect(page).toHaveURL('/bio');
    await expect(page.locator('header nav').getByRole('link', { name: 'Schedule', exact: true })).toBeVisible();
  });

  test('EN : les placeholders du formulaire contact sont en anglais', async ({ page }) => {
    await page.goto('/contact');
    await page.getByRole('button', { name: 'Switch to EN' }).click();
    await expect(page.getByPlaceholder('Name')).toBeVisible();
    await expect(page.getByPlaceholder('Message')).toBeVisible();
    await expect(page.getByRole('button', { name: /^Send/i })).toBeVisible();
  });

  test('RU : le bouton d\'envoi est en russe', async ({ page }) => {
    await page.goto('/contact');
    await page.getByRole('button', { name: 'Switch to RU' }).click();
    await expect(page.getByRole('button', { name: /отправить/i })).toBeVisible();
  });
});

test.describe('i18n — changement de langue (mobile)', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('les 3 boutons de langue sont présents dans le menu mobile', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /ouvrir le menu/i }).click();
    await expect(page.getByRole('button', { name: /fermer le menu/i })).toBeVisible({ timeout: 5_000 });

    // Sur mobile (390px) les boutons desktop sont hidden — seul l'overlay est visible
    const overlay = page.locator('div.fixed.inset-0');
    await expect(overlay.getByRole('button', { name: 'FR' })).toBeVisible();
    await expect(overlay.getByRole('button', { name: 'EN' })).toBeVisible();
    await expect(overlay.getByRole('button', { name: 'RU' })).toBeVisible();
  });

  test('switcher EN depuis le menu mobile traduit la navigation', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /ouvrir le menu/i }).click();
    await expect(page.getByRole('button', { name: /fermer le menu/i })).toBeVisible({ timeout: 5_000 });

    const overlay = page.locator('div.fixed.inset-0');
    await overlay.getByRole('button', { name: 'EN' }).click();

    // Vérifier dans l'overlay (pour éviter la strict mode violation avec nav desktop + footer)
    await expect(overlay.getByRole('link', { name: 'Biography' })).toBeVisible({ timeout: 5_000 });
    await expect(overlay.getByRole('link', { name: 'Schedule' })).toBeVisible();
  });
});
