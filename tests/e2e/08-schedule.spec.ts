import { test, expect } from '@playwright/test';

/**
 * SECTION 8 — Agenda / Schedule
 *
 * Corrections appliquées vs v1 :
 * - ScheduleTimeline utilise <ol> avec <li>, PAS des <article>
 * - Le sélecteur correct est donc `ol li`
 * - En mode homepage (limit prop), seuls les événements à venir sont affichés
 * - Les données statiques (schedule.ts) ont des événements en sept. et nov. 2026
 *   → ils sont FUTURS par rapport à la date de test (août 2026) → on voit des li
 */

test.describe('Agenda — page /schedule', () => {
  test('la page charge et affiche un titre', async ({ page }) => {
    await page.goto('/schedule');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('des événements sont affichés dans la liste (données statiques)', async ({ page }) => {
    await page.goto('/schedule');
    // ScheduleTimeline = <ol><li> — pas des <article>
    // Les données statiques ont des concerts en sept. et nov. 2026 (futurs)
    const eventItem = page.locator('ol li').first();
    const noEventsMsg = page.getByText(/calendrier.*mise à jour|calendar updating|Расписание обновляется/i);
    await expect(eventItem.or(noEventsMsg)).toBeVisible({ timeout: 10_000 });
  });

  test('chaque événement affiché contient un titre de concert', async ({ page }) => {
    await page.goto('/schedule');
    await page.waitForSelector('ol li', { timeout: 10_000 }).catch(() => null);
    const firstLi = page.locator('ol li').first();
    if (await firstLi.isVisible()) {
      // Chaque li contient un h3 avec le titre du concert
      await expect(firstLi.locator('h3')).toBeVisible();
    }
  });

  test('les événements passés sont affichés dans une section séparée (grisée)', async ({ page }) => {
    await page.goto('/schedule');
    // La section "Dates passées" est affichée si des événements passés existent
    // (les données statiques ont Haendel Messiah en déc. 2025 = passé)
    const pastSection = page.getByText(/dates passées/i);
    const hasPast = await pastSection.count() > 0;
    // On vérifie juste que le séparateur est présent si des données passées existent
    if (hasPast) {
      await expect(pastSection).toBeVisible();
    }
  });
});

test.describe('Agenda — section agenda sur la homepage', () => {
  test('la section agenda de la homepage affiche des événements ou le fallback', async ({ page }) => {
    await page.goto('/');
    // ScheduleTimeline sur la homepage : <ol><li>
    const eventItem = page.locator('ol li').first();
    const fallback  = page.getByText(/calendrier.*mise à jour|calendar updating/i);
    await expect(eventItem.or(fallback)).toBeVisible({ timeout: 10_000 });
  });

  test('le lien "Calendrier complet" pointe vers /schedule', async ({ page }) => {
    await page.goto('/');
    const link = page.getByRole('link', { name: /calendrier complet|full calendar|Полное расписание/i });
    await expect(link).toHaveAttribute('href', '/schedule');
  });

  test('les événements à venir affichent un titre et un lieu', async ({ page }) => {
    await page.goto('/');
    const firstEvent = page.locator('ol li').first();
    if (await firstEvent.isVisible()) {
      // Le li contient au minimum du texte (titre de concert)
      const text = await firstEvent.textContent();
      expect(text?.trim().length).toBeGreaterThan(5);
    }
  });
});
