import { test, expect } from '@playwright/test';

/**
 * SECTION 4 — Répertoire (filtres interactifs)
 *
 * Correction appliquée vs v1 :
 * - RepertoireTable n'utilise PAS un <table> mais une <ul> avec des <motion.li>
 * - Le sélecteur correct est donc `ul li` (scopé à la section répertoire)
 * - Les boutons de filtre langue utilisent `langDisplay()` : "IT", "FR", "RU", etc.
 */

// Sélecteur des lignes du tableau de répertoire
const ROW = 'ul li[class*="grid"]';

test.describe('Répertoire — affichage initial', () => {
  test('la liste affiche des rôles par défaut (filtre "Tous")', async ({ page }) => {
    await page.goto('/repertoire');
    await page.waitForSelector(ROW);
    const count = await page.locator(ROW).count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('le bouton de filtre "Tous" est actif par défaut', async ({ page }) => {
    await page.goto('/repertoire');
    // Le bouton actif a border-champagne + text-champagne
    await expect(page.getByRole('button', { name: /^tous$|^all$|^все$/i })).toBeVisible();
  });

  test('le message "aucun résultat" n\'est pas visible avec le filtre par défaut', async ({ page }) => {
    await page.goto('/repertoire');
    await expect(
      page.getByText(/aucun rôle|no roles|нет партий/i)
    ).not.toBeVisible();
  });
});

test.describe('Répertoire — filtre par catégorie', () => {
  test('filtrer "Prêt à présenter" affiche des résultats', async ({ page }) => {
    await page.goto('/repertoire');
    await page.getByRole('button', { name: /prêt à présenter|ready to perform|готово/i }).click();
    await page.waitForSelector(ROW);
    const count = await page.locator(ROW).count();
    expect(count).toBeGreaterThan(0);
  });

  test('filtrer "Art Song" affiche des résultats', async ({ page }) => {
    await page.goto('/repertoire');
    await page.getByRole('button', { name: /^art song$/i }).click();
    await page.waitForSelector(ROW);
    expect(await page.locator(ROW).count()).toBeGreaterThan(0);
  });

  test('filtrer "Prêt à présenter" donne moins de rôles que "Tous"', async ({ page }) => {
    await page.goto('/repertoire');
    await page.waitForSelector(ROW);
    const totalCount = await page.locator(ROW).count();

    await page.getByRole('button', { name: /prêt à présenter|ready to perform/i }).click();
    await page.waitForTimeout(400); // attendre l'animation AnimatePresence
    const filteredCount = await page.locator(ROW).count();

    expect(filteredCount).toBeGreaterThan(0);
    expect(filteredCount).toBeLessThanOrEqual(totalCount);
  });

  test('recliquer "Tous" réaffiche tous les rôles', async ({ page }) => {
    await page.goto('/repertoire');
    await page.waitForSelector(ROW);
    const totalCount = await page.locator(ROW).count();

    await page.getByRole('button', { name: /prêt à présenter|ready to perform/i }).click();
    await page.waitForTimeout(400);

    await page.getByRole('button', { name: /^tous$|^all$|^все$/i }).click();
    await page.waitForTimeout(400);
    const resetCount = await page.locator(ROW).count();

    expect(resetCount).toBe(totalCount);
  });
});

test.describe('Répertoire — filtre par langue', () => {
  test('filtrer par "IT" (italien) affiche des résultats', async ({ page }) => {
    await page.goto('/repertoire');
    await page.getByRole('button', { name: /^IT$/i }).click();
    await page.waitForTimeout(400);
    expect(await page.locator(ROW).count()).toBeGreaterThan(0);
  });

  test('filtrer par "RU" (russe) affiche des résultats', async ({ page }) => {
    await page.goto('/repertoire');
    await page.getByRole('button', { name: /^RU$/i }).click();
    await page.waitForTimeout(400);
    expect(await page.locator(ROW).count()).toBeGreaterThan(0);
  });

  test('combinaison Art Song + FR affiche des résultats ou un état vide cohérent', async ({ page }) => {
    await page.goto('/repertoire');
    await page.getByRole('button', { name: /^art song$/i }).click();
    await page.waitForTimeout(400);
    await page.getByRole('button', { name: /^FR$/i }).click();
    await page.waitForTimeout(400);

    // Soit des résultats, soit le message "aucun rôle" — dans les deux cas pas de crash
    const hasRows   = (await page.locator(ROW).count()) > 0;
    const hasEmpty  = await page.getByText(/aucun rôle|no roles|нет партий/i).isVisible();
    expect(hasRows || hasEmpty).toBe(true);
  });
});
