import { test, expect } from '@playwright/test';

/**
 * SECTION 1 — Navigation & Routing
 *
 * Bug connu corrigé : les liens de navigation apparaissent 2× dans le DOM
 * (header nav + footer). On scope toujours à `header nav` pour éviter les
 * "strict mode violations" de Playwright.
 */

const ROUTES = [
  { path: '/',            label: 'Accueil' },
  { path: '/bio',         label: 'Biographie' },
  { path: '/repertoire',  label: 'Répertoire' },
  { path: '/media',       label: 'Médias' },
  { path: '/press',       label: 'Presse' },
  { path: '/schedule',    label: 'Agenda' },
  { path: '/contact',     label: 'Contact' },
];

// ─── Desktop ──────────────────────────────────────────────────────────────────

test.describe('Navigation desktop', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('le logo dans le header renvoie vers la page d\'accueil', async ({ page }) => {
    await page.goto('/bio');
    await page.locator('header').getByRole('link', { name: /serafima.*liberman/i }).click();
    await expect(page).toHaveURL('/');
  });

  for (const route of ROUTES) {
    test(`lien nav "${route.label}" navigue vers ${route.path}`, async ({ page }) => {
      await page.goto('/');
      // Scoper à header nav pour éviter le footer (doublon de liens)
      await page.locator('header nav').getByRole('link', { name: route.label, exact: true }).click();
      await expect(page).toHaveURL(route.path);
    });
  }

  test('le lien actif est mis en évidence (classe text-champagne)', async ({ page }) => {
    await page.goto('/bio');
    const activeLink = page.locator('header nav a.text-champagne');
    await expect(activeLink).toBeVisible();
    await expect(activeLink).toHaveAttribute('href', '/bio');
  });
});

// ─── Mobile ───────────────────────────────────────────────────────────────────

test.describe('Navigation mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('le menu hamburger s\'ouvre et se ferme', async ({ page }) => {
    await page.goto('/');
    const hamburger = page.getByRole('button', { name: /ouvrir le menu/i });
    await expect(hamburger).toBeVisible();
    await hamburger.click();

    // On attend que le label change — plus robuste que aria-expanded en parallèle
    const closeBtn = page.getByRole('button', { name: /fermer le menu/i });
    await expect(closeBtn).toBeVisible({ timeout: 5_000 });

    await closeBtn.click();
    await expect(hamburger).toBeVisible({ timeout: 5_000 });
    await expect(closeBtn).not.toBeVisible();
  });

  test('cliquer sur un lien dans l\'overlay mobile navigue vers la bonne page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /ouvrir le menu/i }).click();
    await expect(page.getByRole('button', { name: /fermer le menu/i })).toBeVisible({ timeout: 5_000 });

    // L'overlay mobile (div.fixed) contient les liens de nav
    await page.locator('div.fixed.inset-0').getByRole('link', { name: 'Biographie' }).click();
    await expect(page).toHaveURL('/bio');
    // useEffect([pathname]) → setOpen(false)
    await expect(page.getByRole('button', { name: /fermer le menu/i })).not.toBeVisible({ timeout: 5_000 });
  });

  test('les 3 boutons de langue sont accessibles dans le menu mobile', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /ouvrir le menu/i }).click();
    await expect(page.getByRole('button', { name: /fermer le menu/i })).toBeVisible({ timeout: 5_000 });

    // Sur mobile (390px) les boutons desktop (hidden lg:flex) ne sont PAS visibles
    // Les boutons de langue visibles appartiennent uniquement à l'overlay
    const overlay = page.locator('div.fixed.inset-0');
    await expect(overlay.getByRole('button', { name: 'FR' })).toBeVisible();
    await expect(overlay.getByRole('button', { name: 'EN' })).toBeVisible();
    await expect(overlay.getByRole('button', { name: 'RU' })).toBeVisible();
  });
});

// ─── Routing ──────────────────────────────────────────────────────────────────

test.describe('Routing', () => {
  test('une URL inconnue affiche la page 404 personnalisée', async ({ page }) => {
    const res = await page.goto('/cette-page-nexiste-pas');
    expect(res?.status()).toBe(404);
    await expect(page.locator('body')).not.toBeEmpty();
  });

  for (const route of ROUTES) {
    test(`${route.path} répond avec 200`, async ({ page }) => {
      const res = await page.goto(route.path);
      expect(res?.status()).toBe(200);
    });
  }
});
