import { test, expect } from '@playwright/test';
import { solveCaptcha, wrongCaptcha } from './helpers/captcha';

/**
 * SECTION 6 — Formulaire de contact
 *
 * - getByPlaceholder() pour les champs (floating label pattern)
 * - Captcha mauvais = '1' (toujours faux car sum ≥ 2, dans max=20 HTML5)
 * - API mockée pour éviter les vrais emails
 */

const VALID = {
  name:    'Jean Testeur',
  email:   'jean.testeur@example.com',
  subject: 'Demande de collaboration',
  message: 'Bonjour, je souhaite prendre contact pour une collaboration artistique.',
};

async function fillForm(page: Parameters<typeof solveCaptcha>[0]) {
  await page.getByPlaceholder('Nom').fill(VALID.name);
  await page.getByPlaceholder('Email').fill(VALID.email);
  await page.getByPlaceholder('Objet').fill(VALID.subject);
  await page.getByPlaceholder('Message').fill(VALID.message);
}

// ─── Validation HTML5 ─────────────────────────────────────────────────────────

test.describe('Formulaire de contact — validation HTML5', () => {
  test('soumettre vide ne déclenche pas l\'API', async ({ page }) => {
    let apiCalled = false;
    await page.route('/api/contact', () => { apiCalled = true; });
    await page.goto('/contact');
    await page.getByRole('button', { name: /envoyer|send|отправить/i }).click();
    expect(apiCalled).toBe(false);
  });

  test('un email invalide bloque la soumission HTML5', async ({ page }) => {
    let apiCalled = false;
    await page.route('/api/contact', () => { apiCalled = true; });
    await page.goto('/contact');
    await page.getByPlaceholder('Nom').fill('Test');
    await page.getByPlaceholder('Email').fill('pas-un-email');
    await page.getByRole('button', { name: /envoyer|send|отправить/i }).click();
    expect(apiCalled).toBe(false);
  });

  test('l\'API mockée renvoie une erreur pour un message trop court', async ({ page }) => {
    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ ok: false, error: 'String must contain at least 10 character(s)' }),
      });
    });
    await page.goto('/contact');
    await page.getByPlaceholder('Nom').fill('Test');
    await page.getByPlaceholder('Email').fill('test@example.com');
    await page.getByPlaceholder('Message').fill('Court valid');
    await solveCaptcha(page);
    await page.getByRole('button', { name: /envoyer|send|отправить/i }).click();
    await expect(page.getByText(/String must contain|erreur|error/i)).toBeVisible({ timeout: 8_000 });
  });
});

// ─── Captcha ──────────────────────────────────────────────────────────────────

test.describe('Formulaire de contact — captcha', () => {
  test('un captcha incorrect affiche le message d\'erreur', async ({ page }) => {
    await page.goto('/contact');
    await page.getByPlaceholder('Nom').fill(VALID.name);
    await page.getByPlaceholder('Email').fill(VALID.email);
    await page.getByPlaceholder('Message').fill(VALID.message);
    // '1' est toujours faux (sum ≥ 2) et dans le range max=20
    await wrongCaptcha(page);
    await page.getByRole('button', { name: /envoyer|send|отправить/i }).click();
    await expect(
      page.getByText(/réponse incorrecte|incorrect answer|Неверный ответ/i)
    ).toBeVisible({ timeout: 5_000 });
  });

  test('le champ captcha est réinitialisé après une erreur', async ({ page }) => {
    await page.goto('/contact');
    await page.getByPlaceholder('Nom').fill(VALID.name);
    await page.getByPlaceholder('Email').fill(VALID.email);
    await page.getByPlaceholder('Message').fill(VALID.message);
    await wrongCaptcha(page);
    await page.getByRole('button', { name: /envoyer|send|отправить/i }).click();

    // Le message d'erreur doit apparaître ET rester visible (bug corrigé)
    await expect(page.getByText(/réponse incorrecte|incorrect answer|Неверный ответ/i)).toBeVisible({ timeout: 5_000 });
    // Le champ est réinitialisé à '' (setCaptchaInput('') dans le fix)
    await expect(page.locator('input[type="number"]')).toHaveValue('');
  });
});

// ─── Envoi réussi ─────────────────────────────────────────────────────────────

test.describe('Formulaire de contact — envoi réussi', () => {
  test('message valide + captcha correct → confirmation', async ({ page }) => {
    await page.route('/api/contact', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) });
    });
    await page.goto('/contact');
    await fillForm(page);
    await solveCaptcha(page);
    await page.getByRole('button', { name: /envoyer|send|отправить/i }).click();
    await expect(
      page.getByText(/merci.*message|thank you.*message|Спасибо/i)
    ).toBeVisible({ timeout: 10_000 });
  });

  test('après succès, les champs sont réinitialisés', async ({ page }) => {
    await page.route('/api/contact', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) });
    });
    await page.goto('/contact');
    await fillForm(page);
    await solveCaptcha(page);
    await page.getByRole('button', { name: /envoyer|send|отправить/i }).click();
    await expect(page.getByText(/merci|thank you|Спасибо/i)).toBeVisible({ timeout: 10_000 });
    await expect(page.getByPlaceholder('Nom')).toHaveValue('');
  });
});

// ─── Erreurs API ──────────────────────────────────────────────────────────────

test.describe('Formulaire de contact — erreurs API', () => {
  test('une erreur 400 affiche un message d\'erreur', async ({ page }) => {
    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ ok: false, error: 'Erreur serveur simulée.' }),
      });
    });
    await page.goto('/contact');
    await fillForm(page);
    await solveCaptcha(page);
    await page.getByRole('button', { name: /envoyer|send|отправить/i }).click();
    await expect(page.getByText(/erreur|error/i)).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText(/merci|thank you|Спасибо/i)).not.toBeVisible();
  });

  test('le bouton est désactivé pendant l\'envoi', async ({ page }) => {
    await page.route('/api/contact', async (route) => {
      // 600ms : assez long pour que le bouton disabled soit visible, assez court pour WebKit
      await new Promise((r) => setTimeout(r, 600));
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) });
    });
    await page.goto('/contact');
    await fillForm(page);
    await solveCaptcha(page);
    const btn = page.getByRole('button', { name: /envoyer|send|отправить/i });
    await btn.click();
    // Le bouton doit être disabled immédiatement après le clic (setStatus('loading'))
    await expect(btn).toBeDisabled({ timeout: 3_000 });
    await expect(page.getByText(/merci|thank you|Спасибо/i)).toBeVisible({ timeout: 10_000 });
  });
});

// ─── Sécurité ─────────────────────────────────────────────────────────────────

test.describe('Formulaire de contact — sécurité', () => {
  test('le honeypot est dans le DOM mais invisible et aria-hidden', async ({ page }) => {
    await page.goto('/contact');
    const honeypot = page.locator('input[name="company"]');
    await expect(honeypot).toBeAttached();
    await expect(honeypot).toBeHidden();
    await expect(honeypot).toHaveAttribute('aria-hidden', 'true');
    await expect(honeypot).toHaveAttribute('tabindex', '-1');
  });
});
