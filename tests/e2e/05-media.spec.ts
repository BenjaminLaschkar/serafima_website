import { test, expect } from '@playwright/test';

/**
 * SECTION 5 — Médias (vidéos & galerie)
 *
 * Architecture vidéo du site :
 * - Hero : <video autoPlay muted loop> (fond, pas de bouton play, pas de controls)
 * - VideoPlayer : <figure><video controls={playing}> (cliquable, homepage)
 *
 * Sélecteur clé : `figure video` pour cibler le VideoPlayer
 * (et non `video.first()` qui récupère la vidéo de fond Hero)
 */

// ─── VideoPlayer local (homepage) ─────────────────────────────────────────────

test.describe('Médias — lecteur vidéo MP4 (homepage)', () => {
  test('le bouton play est visible avant lecture', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: /lire la vidéo/i })).toBeVisible();
  });

  test('cliquer play masque le bouton et affiche les contrôles', async ({ page }) => {
    await page.goto('/');
    const playBtn = page.getByRole('button', { name: /lire la vidéo/i });
    await playBtn.click();

    // Le bouton play disparaît (state: playing = true)
    await expect(playBtn).not.toBeVisible({ timeout: 6_000 });

    // Le VideoPlayer est dans une <figure> — `controls` devient true
    await expect(page.locator('figure video').first()).toHaveAttribute('controls', /.*/, { timeout: 6_000 });
  });

  test('la source MP4 est déclarée dans le VideoPlayer', async ({ page }) => {
    await page.goto('/');
    const source = page.locator('figure video source[type="video/mp4"]').first();
    await expect(source).toBeAttached();
    expect(await source.getAttribute('src')).toMatch(/\.mp4/i);
  });
});

// ─── Compatibilité Safari / iOS ───────────────────────────────────────────────

test.describe('Médias — compatibilité Safari (WebKit)', () => {
  test('le VideoPlayer a l\'attribut playsInline (requis iOS Safari)', async ({ page }) => {
    await page.goto('/');
    // Le VideoPlayer (<figure> wrapping) a playsInline
    await expect(page.locator('figure video').first()).toHaveAttribute('playsinline', /.*/);
  });

  test('la source MP4 dans figure est bien déclarée', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('figure video source[type="video/mp4"]').first()).toBeAttached();
  });

  test('le bouton play déclenche la lecture sur WebKit', async ({ page }) => {
    await page.goto('/');
    const playBtn = page.getByRole('button', { name: /lire la vidéo/i });
    await expect(playBtn).toBeVisible();
    await playBtn.click();
    await expect(playBtn).not.toBeVisible({ timeout: 8_000 });
  });
});

// ─── Vidéos YouTube (/media) ──────────────────────────────────────────────────

test.describe('Médias — vidéos YouTube (/media)', () => {
  test('les iframes YouTube sont présentes et visibles', async ({ page }) => {
    await page.goto('/media');
    await expect(page.locator('iframe[src*="youtube.com"]').first()).toBeVisible();
  });

  test('chaque iframe a allowfullscreen', async ({ page }) => {
    await page.goto('/media');
    const iframes = page.locator('iframe[src*="youtube.com"]');
    const count = await iframes.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(iframes.nth(i)).toHaveAttribute('allowfullscreen', /.*/);
    }
  });

  test('les IDs YouTube correspondent aux données de media.ts', async ({ page }) => {
    await page.goto('/media');
    for (const id of ['FruRGgDDZPM', 'I4K4gC2BLFc', '21--9NR3g2k']) {
      await expect(page.locator(`iframe[src*="${id}"]`)).toBeAttached();
    }
  });

  test('le lien YouTube pointe vers la chaîne officielle', async ({ page }) => {
    await page.goto('/media');
    await expect(
      page.getByRole('link', { name: /youtube/i }).first()
    ).toHaveAttribute('href', /youtube\.com\/@serafimaliberman/i);
  });
});

// ─── Galerie photos (/media) ──────────────────────────────────────────────────

test.describe('Médias — galerie photos', () => {
  test('la section galerie est visible', async ({ page }) => {
    await page.goto('/media');
    await expect(page.getByText(/portraits.*scène|portraits.*stage|Портреты/i)).toBeVisible();
  });

  test('les images ont des attributs alt non vides', async ({ page }) => {
    await page.goto('/media');
    const images = page.locator('img[alt*="Serafima"]');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < Math.min(count, 5); i++) {
      expect(await images.nth(i).getAttribute('alt')).toBeTruthy();
    }
  });
});
