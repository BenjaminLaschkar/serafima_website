import { defineConfig, devices } from '@playwright/test';

/**
 * Paramétrer l'environnement cible via la variable d'env BASE_URL.
 *
 * Dev  (défaut) : npx playwright test
 * Prod          : BASE_URL=https://www.serafima-liberman.com npx playwright test
 */
const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  /* Interdit les `.only` en CI pour éviter les oublis */
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30_000,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],

  use: {
    baseURL: BASE_URL,
    /* Capture automatique en cas d'échec */
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    trace: 'on-first-retry',
    /**
     * Désactive les animations Framer Motion (via prefers-reduced-motion).
     * Cela évite que les éléments dans les Reveal restent à opacity:0
     * et élimine les faux échecs liés aux animations.
     */
    // @ts-ignore — propriété BrowserContext valide à runtime
    reducedMotion: 'reduce',
  },

  webServer: {
    command: 'npm run dev',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        /* Mute audio — évite que les vidéos jouent du son pendant les tests */
        launchOptions: { args: ['--mute-audio'] },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        launchOptions: { firefoxUserPrefs: { 'media.volume_scale': '0.0' } },
      },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      // WebKit ne joue pas d'audio en headless par défaut
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 13'] },
    },
  ],
});
