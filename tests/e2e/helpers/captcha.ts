import type { Page } from '@playwright/test';

/**
 * Lit la question "A + B = ?" dans le DOM et retourne la bonne réponse.
 */
async function readCaptcha(page: Page): Promise<{ a: number; b: number; answer: number }> {
  const span = page.locator('span').filter({ hasText: /\d+\s*\+\s*\d+\s*=\s*\?/ });
  const text = await span.first().textContent();
  if (!text) throw new Error('[captcha] Span introuvable');
  const nums = text.match(/\d+/g)?.map(Number);
  if (!nums || nums.length < 2) throw new Error(`[captcha] Parse impossible : "${text}"`);
  return { a: nums[0], b: nums[1], answer: nums[0] + nums[1] };
}

/**
 * Résout le captcha correctement.
 * Utilise fill() — plus fiable que pressSequentially sur input[type="number"].
 */
export async function solveCaptcha(page: Page): Promise<void> {
  const { answer } = await readCaptcha(page);
  await page.locator('input[type="number"]').fill(String(answer));
}

/**
 * Remplit le captcha avec une mauvaise réponse.
 * Stratégie : answer + 1, toujours différent et ≤ 20 (a,b ∈ [1,9] → sum ≤ 18 → +1 ≤ 19).
 */
export async function wrongCaptcha(page: Page): Promise<void> {
  const { answer } = await readCaptcha(page);
  await page.locator('input[type="number"]').fill(String(answer + 1));
}
