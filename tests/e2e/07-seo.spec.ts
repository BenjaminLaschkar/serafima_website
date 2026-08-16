import { test, expect } from '@playwright/test';

/**
 * SECTION 7 — SEO & Métadonnées
 *
 * Corrections appliquées vs v1 :
 * - robots.txt : le fichier statique public/robots.txt est servi par Next.js.
 *   En dev, la route dynamique app/robots.ts peut retourner 500 si Next.js
 *   préfère le fichier statique mais la route dynamic échoue.
 *   → on vérifie le CONTENU plutôt que le status code exact.
 * - sitemap.xml : généré par app/sitemap.ts, vérifié via le contenu.
 */

const PAGES = [
  { path: '/',           titleContains: 'Serafima Liberman' },
  { path: '/bio',        titleContains: 'Serafima Liberman' },
  { path: '/repertoire', titleContains: 'Serafima Liberman' },
  { path: '/media',      titleContains: 'Serafima Liberman' },
  { path: '/press',      titleContains: 'Serafima Liberman' },
  { path: '/schedule',   titleContains: 'Serafima Liberman' },
  { path: '/contact',    titleContains: 'Serafima Liberman' },
];

test.describe('SEO — balises <title>', () => {
  for (const p of PAGES) {
    test(`${p.path} contient "${p.titleContains}" dans le title`, async ({ page }) => {
      await page.goto(p.path);
      await expect(page).toHaveTitle(new RegExp(p.titleContains, 'i'));
    });
  }
});

test.describe('SEO — meta description', () => {
  test('la page d\'accueil a une meta description non vide (≥ 20 chars)', async ({ page }) => {
    await page.goto('/');
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /.{20,}/);
  });
});

test.describe('SEO — Open Graph', () => {
  test('la page d\'accueil a un og:title', async ({ page }) => {
    await page.goto('/');
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /serafima/i);
  });

  test('la page d\'accueil a un og:description', async ({ page }) => {
    await page.goto('/');
    const ogDesc = page.locator('meta[property="og:description"]');
    await expect(ogDesc).toHaveAttribute('content', /.{10,}/);
  });

  test('la page d\'accueil a un og:image', async ({ page }) => {
    await page.goto('/');
    const ogImage = page.locator('meta[property="og:image"]');
    // Accepter une URL absolue ou un chemin absolu
    await expect(ogImage).toHaveAttribute('content', /https?:\/\/.+|\/opengraph/i);
  });
});

test.describe('SEO — canonical', () => {
  test('la page d\'accueil a un lien canonical', async ({ page }) => {
    await page.goto('/');
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /serafima-liberman|localhost/i);
  });
});

test.describe('SEO — fichiers robots & sitemap', () => {
  test('/robots.txt est accessible et contient des directives', async ({ page }) => {
    const res = await page.goto('/robots.txt');
    // Accepter 200 (fichier statique) ou 308/301 (redirection)
    // En cas de 500 (route dynamique qui échoue), le test échoue → bug à corriger
    expect(res?.status()).toBeLessThan(400);
    const body = await page.content();
    expect(body).toMatch(/user-agent|disallow|sitemap/i);
  });

  test('/sitemap.xml est accessible et contient des URLs', async ({ page }) => {
    const res = await page.goto('/sitemap.xml');
    expect(res?.status()).toBeLessThan(400);
    const body = await page.content();
    expect(body).toMatch(/<url>|serafima|urlset/i);
  });
});

test.describe('SEO — page 404', () => {
  test('la page 404 a un title non vide', async ({ page }) => {
    await page.goto('/page-introuvable-xyz');
    const title = await page.title();
    expect(title.length).toBeGreaterThan(3);
  });
});
