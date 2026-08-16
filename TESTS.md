# Tests End-to-End — Serafima Liberman

Suite de tests automatisés Playwright couvrant l'intégralité du site en mode non-régression et détection de bugs.

---

## Installation

### 1. Installer les dépendances npm (si pas déjà fait)

```bash
npm install
```

### 2. Installer les navigateurs Playwright

```bash
npx playwright install
```

> Cela télécharge Chromium, Firefox et WebKit (~300 Mo). À faire une seule fois.

---

## Lancer les tests

### Environnement DEV (localhost:3000)

> ⚠️ Le serveur Next.js doit être démarré avant de lancer les tests.

```bash
# Terminal 1 — démarrer le serveur
npm run dev

# Terminal 2 — lancer les tests
npm run test:e2e
```

### Environnement PROD (serafima-liberman.com)

```bash
npm run test:e2e:prod
```

Ou manuellement avec n'importe quelle URL :

```bash
BASE_URL=https://staging.serafima-liberman.com npx playwright test
```

### Mode UI interactif (recommandé pour débugger)

```bash
npm run test:e2e:ui
```

Lance le Playwright Test Runner avec interface graphique : step-by-step, timeline, screenshots, vidéos.

### Voir le rapport HTML après une exécution

```bash
npm run test:e2e:report
```

---

## Options utiles

```bash
# Lancer un seul fichier de spec
npx playwright test tests/e2e/06-contact.spec.ts

# Lancer uniquement sur un navigateur
npx playwright test --project=webkit
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=mobile-safari

# Lancer un test par nom
npx playwright test -g "captcha incorrect"

# Mode headed (voir le navigateur)
npx playwright test --headed

# Arrêter au premier échec
npx playwright test --bail=1

# Générer du code en enregistrant des interactions
npx playwright codegen http://localhost:3000
```

---

## Structure des tests

```
tests/
└── e2e/
    ├── helpers/
    │   └── captcha.ts          # Résout le captcha arithmétique depuis le DOM
    │
    ├── 01-navigation.spec.ts   # Navigation & routing
    ├── 02-pages-smoke.spec.ts  # Smoke tests (chargement de chaque page)
    ├── 03-i18n.spec.ts         # Internationalisation (FR / EN / RU)
    ├── 04-repertoire.spec.ts   # Filtres interactifs du tableau de répertoire
    ├── 05-media.spec.ts        # Lecteur vidéo (MP4 + YouTube iframes)
    ├── 06-contact.spec.ts      # Formulaire de contact (captcha, validation, mock API)
    ├── 07-seo.spec.ts          # Métadonnées SEO & Open Graph
    └── 08-schedule.spec.ts     # Agenda (événements, filtres passé/à venir)
```

---

## Stratégie QA

### Philosophie générale

Les tests sont organisés selon la pyramide de tests inversée propre aux E2E :
on teste **l'expérience utilisateur réelle** plutôt que les détails d'implémentation.
Chaque spec est indépendante et peut être exécutée seule.

### Sections et couvertures

| # | Section | Priorité | Navigateurs |
|---|---------|----------|-------------|
| 01 | Navigation & routing | 🔴 Critique | Tous |
| 02 | Smoke (chargement pages) | 🔴 Critique | Tous |
| 03 | i18n (FR/EN/RU) | 🟠 Haute | Tous |
| 04 | Répertoire (filtres) | 🟠 Haute | Tous |
| 05 | Médias (vidéo + galerie) | 🟠 Haute | **Tous dont WebKit/Safari** |
| 06 | Formulaire de contact | 🔴 Critique | Tous |
| 07 | SEO & métadonnées | 🟡 Moyenne | Chromium uniquement |
| 08 | Agenda | 🟡 Moyenne | Tous |

### Gestion des cas spéciaux

#### Captcha
Le captcha est intentionnellement simple (addition de deux chiffres affichée en clair dans le DOM).
L'helper `tests/e2e/helpers/captcha.ts` lit le texte `"A + B = ?"`, calcule la somme et remplit l'input.
C'est le comportement attendu : le captcha protège contre les bots automatisés, pas contre les tests E2E.

#### API contact (Resend)
Les tests du formulaire interceptent `/api/contact` avec `page.route()` pour :
- simuler un succès `{ ok: true }` → valider l'affichage du message de confirmation
- simuler une erreur `{ ok: false }` → valider la gestion d'erreur
- simuler une latence → valider que le bouton est désactivé pendant l'envoi

Aucun email réel n'est envoyé lors des tests.

#### Google Calendar
En local sans clé API valide, la page d'accueil et `/schedule` tombent sur les données
statiques de `src/data/schedule.ts`. Les tests acceptent ce fallback et vérifient
que l'affichage ne plante pas dans les deux cas.

#### Vidéos Safari / WebKit
Safari impose des restrictions sur l'autoplay. Les tests vérifient :
- la présence de l'attribut `playsInline` (requis iOS Safari)
- la déclaration d'une `<source type="video/mp4">` (seul format universel)
- que le clic sur le bouton play (geste utilisateur simulé) démarre effectivement la vidéo

Les iframes YouTube sont testées en vérifiant leur présence et leur `src` — la lecture
réelle dans un iframe cross-origin n'est pas testable de façon fiable en headless.

### Navigateurs couverts

| Projet Playwright | Équivalent réel |
|-------------------|-----------------|
| `chromium` | Chrome / Edge |
| `firefox` | Firefox |
| `webkit` | Safari macOS |
| `mobile-safari` | Safari iOS (iPhone 13) |

---

## Interpréter les résultats

- **✅ Passed** — comportement conforme
- **❌ Failed** — régression détectée ou bug trouvé → consulter le screenshot/vidéo dans `playwright-report/`
- **⚠️ Flaky** — test instable (souvent timing / animation) → augmenter le `timeout` ou ajouter un `waitFor`

```bash
# Ouvrir le rapport détaillé
npm run test:e2e:report
```

Les artifacts (screenshots, vidéos, traces) sont dans `playwright-report/` et `test-results/`.

---

## Ajouter un nouveau test

1. Créer un fichier `tests/e2e/09-ma-feature.spec.ts`
2. Utiliser `import { test, expect } from '@playwright/test'`
3. Grouper les tests avec `test.describe()`
4. Lancer en isolé : `npx playwright test tests/e2e/09-ma-feature.spec.ts --headed`
