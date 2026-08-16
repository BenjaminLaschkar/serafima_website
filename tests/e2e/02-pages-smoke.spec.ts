import { test, expect } from '@playwright/test';

/**
 * SECTION 2 — Smoke tests de chaque page
 *
 * Corrections appliquées vs v1 :
 * - RepertoireTable : utilise <ul><li>, pas <tbody><tr>
 * - ScheduleTimeline : utilise <ol><li>, pas <article>
 * - BioContent : texte dans Reveal animations — reducedMotion: 'reduce' (config)
 *   rend le contenu immédiatement visible
 */

test.describe('Smoke — Accueil', () => {
  test('la page charge et affiche le nom de l\'artiste', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/serafima liberman/i).first()).toBeVisible();
  });

  test('le Hero contient les deux CTA principaux', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /prochaines dates|upcoming dates|Ближайшие/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /voir.*écouter|watch.*listen|Смотреть/i })).toBeVisible();
  });

  test('la section agenda affiche au moins un événement ou le message de fallback', async ({ page }) => {
    await page.goto('/');
    // ScheduleTimeline utilise <ol><li> — pas <article>
    const eventItem = page.locator('ol li').first();
    const fallback  = page.getByText(/calendrier.*mise à jour|calendar updating|Расписание обновляется/i);
    await expect(eventItem.or(fallback)).toBeVisible({ timeout: 10_000 });
  });

  test('la section média affiche le lecteur vidéo local', async ({ page }) => {
    await page.goto('/');
    // Le VideoPlayer est sur la homepage, pas sur /media
    const playBtn = page.getByRole('button', { name: /lire la vidéo/i });
    await expect(playBtn).toBeVisible();
  });
});

test.describe('Smoke — Biographie', () => {
  test('la page charge avec un h1 visible', async ({ page }) => {
    await page.goto('/bio');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('le texte biographique contient des références aux institutions', async ({ page }) => {
    await page.goto('/bio');
    // Avec reducedMotion: 'reduce', les Reveal affichent le contenu directement
    // Le texte GITIS est dans bioLong (paragraphes de la bio complète)
    await expect(page.getByText(/GITIS|Cortot|Jerusalem/i).first()).toBeVisible();
  });
});

test.describe('Smoke — Répertoire', () => {
  test('la page charge et affiche la liste de rôles', async ({ page }) => {
    await page.goto('/repertoire');
    await expect(page.locator('h1')).toBeVisible();
    // RepertoireTable utilise <ul><li>, pas un <table>
    await expect(page.locator('ul li').first()).toBeVisible();
  });

  test('la liste de rôles contient au moins 10 entrées', async ({ page }) => {
    await page.goto('/repertoire');
    // Attendre que les li soient rendus (AnimatePresence peut avoir un délai)
    await page.waitForSelector('ul li');
    const count = await page.locator('ul li').count();
    expect(count).toBeGreaterThanOrEqual(10);
  });
});

test.describe('Smoke — Médias', () => {
  test('la page charge avec le heading principal', async ({ page }) => {
    await page.goto('/media');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('les iframes YouTube sont présentes sur la page médias', async ({ page }) => {
    await page.goto('/media');
    await expect(page.locator('iframe[src*="youtube"]').first()).toBeVisible();
  });
});

test.describe('Smoke — Presse', () => {
  test('la page charge et affiche au moins une citation presse', async ({ page }) => {
    await page.goto('/press');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('blockquote').first()).toBeVisible();
  });
});

test.describe('Smoke — Agenda', () => {
  test('la page charge et affiche le titre', async ({ page }) => {
    await page.goto('/schedule');
    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('Smoke — Contact', () => {
  test('la page charge et affiche le formulaire', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('form')).toBeVisible();
  });
});
