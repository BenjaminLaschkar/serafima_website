# Serafima Liberman — Site officiel

> Refonte complète, premium et cinématographique du site de la soprano
> **Serafima Liberman**.
> Stack moderne, performante, déployable en une commande sur n’importe quel VPS.

**Stack** : Next.js 15 · React 19 · TypeScript · TailwindCSS · Framer Motion · Resend · Docker · Nginx
**Cible** : Lighthouse 95+ · WCAG AA · SEO international · Mobile-first

---

## Table des matières

1. [Audit du site existant](#1-audit-du-site-existant)
2. [Direction artistique](#2-direction-artistique)
3. [Identité visuelle & système de design](#3-identité-visuelle--système-de-design)
4. [Architecture du site](#4-architecture-du-site)
5. [Wireframes textuels](#5-wireframes-textuels)
6. [Animations & interactions](#6-animations--interactions)
7. [Stack technique](#7-stack-technique)
8. [Organisation du code Next.js](#8-organisation-du-code-nextjs)
9. [SEO & performance](#9-seo--performance)
10. [Responsive & accessibilité](#10-responsive--accessibilité)
11. [Migration depuis WordPress](#11-migration-depuis-wordpress)
12. [Démarrage local](#12-démarrage-local)
13. [Déploiement VPS — pas à pas](#13-déploiement-vps--pas-à-pas)
14. [Roadmap & estimation](#14-roadmap--estimation)
15. [Recommandations premium](#15-recommandations-premium)

---

## 1. Audit du site existant

**URL** : <https://www.serafima-liberman.com> (WordPress · thème générique)

### Problèmes UX / UI / Branding identifiés

| Catégorie | Constat |
|---|---|
| **Identité** | Aucune direction artistique forte. Le site ressemble à un template gratuit (Astra/OceanWP). Pas d’univers visuel d’opéra ni de luxe. |
| **Hiérarchie** | Pas de typographie d’affichage. Tout est en sans-serif aplati. Pas de respiration éditoriale. |
| **Storytelling** | Le récit artistique est noyé dans une page-vitrine plate. Aucune progression émotionnelle. |
| **Imagerie** | Photos sous-exploitées, formats hétérogènes, pas de fullscreen, pas de mise en scène. |
| **Navigation** | Menu plat, sans état actif, sans micro-interaction. CTAs noyés. |
| **Médias** | Pas de player vidéo premium. Aucun extrait sonore intégré. Pas de galerie. |
| **Agenda** | Plugin de calendrier daté, peu lisible mobile, sans timeline éditoriale. |
| **Performance** | Bundle WordPress lourd, Lighthouse mobile estimé < 60. Pas d’AVIF/WebP, pas de lazy intelligent. |
| **SEO** | Pas de schema.org `Person` / `Event`. OpenGraph par défaut. |
| **i18n** | FR/EN mélangés sans architecture i18n claire. |
| **Sécurité** | Surface d’attaque WordPress (plugins, comptes admin, XML-RPC). |
| **Édition** | L’éditeur Gutenberg ne permet pas une cohérence éditoriale de niveau maison d’opéra. |

### Synthèse
Le site actuel **dessert** la signature artistique d’une soprano internationale. La refonte ne doit pas être un *re-skin* : c’est un changement de **catégorie**, du site PME au **portfolio éditorial de niveau maison de luxe**.

---

## 2. Direction artistique

### Concept créatif — *« La scène intérieure »*

> Une soprano n’est pas une photo : c’est une présence, un silence, un théâtre.
> Le site doit faire **respirer** ce théâtre intérieur — par la lumière, l’espace
> et le rythme du regard.

### Références
- Maisons d’opéra modernes : Opéra de Paris (refonte 2020), Wiener Staatsoper, Royal Opera House (éditorial).
- Marques de luxe discrètes : Hermès Éditeur, Loro Piana, Bottega Veneta (épure, ivoire/noir).
- Photographie éditoriale : Paolo Roversi, Peter Lindbergh, Annie Leibovitz (séries opéra).
- Portfolios premium : sites de Joana Mallwitz, Asmik Grigorian, Lise Davidsen.

### Ce que le site n’est *pas*
- Un site WordPress / Wix / Squarespace.
- Un thème ThemeForest.
- Un portfolio Behance générique avec gros titres animés inutiles.
- Un site corporate.

### Moodboard textuel
- Lumière de scène **chaude et latérale**, contrastes profonds.
- Velours **ivoire** sur **noir d’encre**.
- Rideau de théâtre qui se lève (curtain reveal à l’entrée).
- Typographie **serif italique** comme une signature manuscrite.
- Grain photographique fin (subtil, jamais texturé).
- Espaces blancs **immenses** — comme le silence avant le premier air.

---

## 3. Identité visuelle & système de design

### Palette de couleurs

| Token | Hex | Usage |
|---|---|---|
| `ink` | `#0B0B0C` | Fond principal — noir d’encre, profondeur |
| `ink-800` | `#141416` | Surfaces secondaires |
| `stage` | `#2A2622` | Gris théâtre — cartouches, hover |
| `ivory` | `#F4EFE6` | Texte principal — ivoire chaud |
| `ivory-50` | `#FBF8F2` | Texte sur fond sombre, lumière |
| `champagne` | `#C9A86B` | Or discret — accent éditorial, liens actifs |
| `champagne-dark` | `#8C7240` | Or profond — hover / typographique |

> **Règle** : un seul accent doré par bloc visible. Le luxe naît de la **rareté** de la couleur.

### Typographie

| Rôle | Police | Poids | Usage |
|---|---|---|---|
| **Display** | Cormorant Garamond | 300 / 400 italic | Titres, citations, signature |
| **Serif** | EB Garamond | 400 / italic | Corps éditorial long (biographie, presse) |
| **Sans** | Inter | 300 / 400 / 500 | UI, eyebrows, métadonnées |

- Tracking ultra (`0.42em`) pour les *eyebrows* en majuscules.
- Tailles fluides via `clamp()` (`text-display-xl`, `text-display-lg`).
- Italique **systématique** pour l’accent émotionnel.

### Tokens UI

- **Espacement** : grille 12 colonnes, gouttière 32–64 px, container max 1680 px.
- **Easings** : `velvet = cubic-bezier(0.22, 1, 0.36, 1)`, `curtain = cubic-bezier(0.77, 0, 0.175, 1)`.
- **Durées** : 500 ms (micro), 700 ms (hover), 1100 ms (reveal), 1600 ms (rideau).
- **Élévations** : aucune ombre — le contraste est porté par la lumière et la typographie.
- **Coins** : aucun radius. L’angle vif = précision éditoriale.

### Composants signature
- `Hero` : vidéo plein écran avec parallaxe, dégradés masqués, texte par mots révélés.
- `CurtainIntro` : rideau noir qui se lève à la première peinture.
- `Marquee` : nom des compositeurs en défilement lent (60 s/loop).
- `RepertoireTable` : tableau éditorial filtrable (rôle/langue), animé par `layout`.
- `ScheduleTimeline` : agenda type *programme de saison*, date typographique géante.
- `Reveal` / `RevealText` : *fade-up* + masque de texte ligne par ligne.

---

## 4. Architecture du site

```
/                  Accueil — hero + intro + portrait + répertoire + vidéo + agenda + cta
/bio               Biographie courte + longue + timeline + langues
/repertoire        Tableau filtrable (catégorie × langue)
/media             Vidéo featured + autres extraits + galerie photo (masonry)
/press             Citations presse + dossier de presse
/schedule          Agenda complet (JSON-LD Event[])
/contact           Email direct + formulaire (Resend)
/sitemap.xml       Auto
/robots.txt        Auto
/opengraph-image   Auto-généré (edge runtime)
```

Choix volontaires :
- Pas de blog (un soprano international ne tient pas un blog — il a un agenda et de la presse).
- Pas de boutique.
- Pas de page « services » (impensable pour cette catégorie).
- Pas de pop-up newsletter (cassure de l’expérience).

---

## 5. Wireframes textuels

### Homepage — narration en 6 mouvements

1. **Lever de rideau** (curtain intro 1,6 s).
2. **Hero plein écran** : `home.mp4` en boucle silencieuse, dégradé ink, *eyebrow* doré, nom géant « Serafima · *Liberman* » révélé mot à mot, 2 CTAs : *Prochaines dates* / *Voir & écouter*.
3. **Intro éditoriale** : *eyebrow* « I. Introduction » à gauche, citation tonale + paragraphe bio + lien vers /bio.
4. **Portrait diptyque** : image parallaxe 7 col + citation italique 5 col en bas de bloc.
5. **Marquee répertoire** : noms des compositeurs en *display* 8xl défilant lentement.
6. **Vidéo featured** : *Manon — Adieu, notre petite table*, player premium avec halo doré.
7. **Agenda — 3 prochaines dates** dans timeline éditoriale.
8. **Institutions** : 5 logos textuels (typographie, pas d’images) — Opéra Fuoco, Cortot, GITIS, Lyric Opera Studio Weimar, Jerusalem Academy.
9. **CTA contact** centré, baseline italique dorée.

### Pages secondaires
Toutes suivent le même schéma : **héro typographique** (h1 italique doré, eyebrow filet doré) → **contenu en 12 colonnes** → **section bordée haut** par filet ivoire 10%.

---

## 6. Animations & interactions

| Élément | Animation | Easing | Durée |
|---|---|---|---|
| Premier paint | Rideau noir `scaleY 1→0` (origine haut) | curtain | 1600 ms |
| Texte révélé | Mot par mot, *mask + translateY 110%→0* | velvet | 1100 ms (stagger 45 ms) |
| Sections | *fade-up* à l’apparition (`whileInView`) | velvet | 1100 ms |
| Images héros | Parallaxe `y: -8% → 8%` + scale 1→1.08 | linéaire (scroll) | continu |
| Liens | Soulignement qui **disparaît** (sortie élégante) | velvet | 700 ms |
| Boutons | Inversion fond/texte | velvet | 700 ms |
| Menu mobile | Plein écran, items en stagger 60 ms | velvet | 800 ms |
| Marquee | Translation infinie -50% | linéaire | 60 s |
| Vidéo play | Halo doré pulsant `border-champagne` | ease-in-out | 2,4 s alterné |

**Ce que l’on s’interdit** : aucun *scroll hijacking*, aucun *cursor follower* gadget, aucun *split-text* sur le corps long, aucune transition « waahou » qui ralentit l’usage.

**Reduced motion** : tout l’ensemble respecte `prefers-reduced-motion` — fallback immédiat sans translation.

---

## 7. Stack technique

### Frontend
- **Next.js 15** (App Router, React Server Components, output `standalone`).
- **TypeScript** strict.
- **TailwindCSS** + tokens custom.
- **Framer Motion** (animation déclarative + `useReducedMotion`).
- **next/font** (Google Fonts auto-hébergés, zero CLS).
- **next/image** (AVIF/WebP, lazy par défaut).

### Backend / data
- **Données locales typées** (`src/data/*.ts`) — édition par PR sur Git.
- Évolution possible : **Directus** ou **Sanity** comme CMS headless (cf. § 15).
- **Resend** pour le formulaire de contact (`src/app/api/contact/route.ts`).
- **Zod** pour validation + honeypot anti-spam.

### Infra
- **VPS Hetzner CX22** (2 vCPU / 4 Go) — 4,50 €/mois — Ubuntu 24.04 LTS.
- **Docker** + **docker compose**.
- **Nginx** en reverse proxy (TLS + cache assets + headers sécurité).
- **Let’s Encrypt** via certbot.
- **Cloudflare** (DNS + CDN + WAF gratuit).
- **Coolify** (option) pour déploiement git-push automatique.

### Médias
- Servis depuis `/public/media` (cache `immutable 1 an` géré par Next + Nginx).
- Migration future possible vers **BunnyCDN** ou **Cloudinary** (transformations à la volée).

### Observabilité
- **Plausible** (ou Umami) — analytics privacy-first, sans bannière cookies.
- Logs `docker compose logs -f web`.
- Healthcheck HTTP intégré au Dockerfile + compose.

---

## 8. Organisation du code Next.js

```
serafimawebsite/
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Shell, polices, JSON-LD Person, nav, footer
│   │   ├── page.tsx              # Homepage
│   │   ├── globals.css           # Tokens + utilitaires Tailwind
│   │   ├── opengraph-image.tsx   # OG dynamique (edge)
│   │   ├── sitemap.ts            # Sitemap auto
│   │   ├── robots.ts
│   │   ├── not-found.tsx
│   │   ├── bio/page.tsx
│   │   ├── repertoire/page.tsx
│   │   ├── media/page.tsx
│   │   ├── press/page.tsx
│   │   ├── schedule/page.tsx     # + JSON-LD Event[]
│   │   ├── contact/page.tsx
│   │   └── api/contact/route.ts  # Resend + Zod + honeypot
│   ├── components/
│   │   ├── Nav.tsx               # Header + menu mobile plein écran
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx              # Hero vidéo parallaxe
│   │   ├── CurtainIntro.tsx      # Lever de rideau
│   │   ├── Reveal.tsx            # Reveal + RevealText
│   │   ├── SectionTitle.tsx
│   │   ├── Marquee.tsx
│   │   ├── ParallaxImage.tsx
│   │   ├── VideoPlayer.tsx
│   │   ├── RepertoireTable.tsx
│   │   ├── ScheduleTimeline.tsx
│   │   └── ContactForm.tsx
│   ├── data/
│   │   ├── site.ts               # Config site (nom, nav, social)
│   │   ├── bio.ts                # Bio courte/longue + timeline
│   │   ├── repertoire.ts         # Tableau de rôles
│   │   ├── schedule.ts           # Événements
│   │   ├── press.ts              # Citations
│   │   └── media.ts              # Vidéos + galerie
│   └── lib/
│       └── fonts.ts
├── public/
│   └── media/                    # Photos + vidéos
├── nginx/
│   └── serafima.conf
├── Dockerfile                    # Multi-stage, standalone, non-root, healthcheck
├── docker-compose.yml            # web + nginx
├── .env.example
└── README.md
```

### Conventions
- **Server Components par défaut** ; `"use client"` uniquement pour les composants animés / interactifs.
- Pas de dépendance UI lourde (pas de Radix, pas de shadcn) — chaque composant est *crafted*.
- Pas de CSS-in-JS — Tailwind + tokens uniquement.
- Pas d’`any` — TypeScript strict.

---

## 9. SEO & performance

### SEO
- **Metadata API** Next.js 15 par page (titre, description, canonical, OG).
- **OG image dynamique** typographique générée à l’edge (`opengraph-image.tsx`).
- **Schema.org** :
  - `Person` (layout racine) — nom, langues, alumniOf, sameAs.
  - `Event[]` (page /schedule) — date, lieu, performer.
- `sitemap.xml` auto, `robots.txt` clair.
- URLs **propres** et **stables** (pas de slugs WordPress historiques — voir § 11 pour redirections).
- Multilingue : v1 en français. v2 préparée pour `app/[locale]/` (FR/EN).

### Performance (objectifs Lighthouse mobile)
- **Performance ≥ 95** : RSC, `next/font`, `next/image` (AVIF/WebP), pas de JS inutile, Framer Motion *tree-shaken*.
- **Accessibilité ≥ 95** : focus visibles dorés, contraste AA, `prefers-reduced-motion`, skip-link.
- **Best Practices = 100** : headers de sécurité, HTTPS strict, pas de `console.error`.
- **SEO = 100**.
- **Compression** : Brotli/gzip par Nginx.
- **Cache** : `immutable 1 an` sur `/_next/static/*` et `/media/*`.

---

## 10. Responsive & accessibilité

### Breakpoints
- `sm` 640 px · `md` 768 px · `lg` 1024 px · `xl` 1280 px · `2xl` 1536 px.
- **Mobile first** : tout est conçu d’abord en 375 px, puis enrichi.

### Mobile signature
- Menu plein écran avec items en *display* 6xl.
- Hero : `100svh` (correctif iOS Safari).
- Tableaux : *reflow* en cartes empilées au-dessous de `md`.
- Galerie : *masonry* en 1 col → 2 col → 3 col.

### Accessibilité
- WCAG **AA** ciblé (AAA sur les corps texte).
- Tous les états `:focus-visible` dorés à 1 px / offset 4 px.
- Toutes les images : `alt` descriptif.
- Vidéos : `controls` apparaissent dès la lecture.
- `aria-label` sur tous les boutons icône.
- Skip-link `Aller au contenu`.
- `prefers-reduced-motion` neutralise toutes les animations.

---

## 11. Migration depuis WordPress

### Étape 1 — Export
1. Export WP `Outils → Exporter → Tout le contenu` (XML).
2. Récupération des médias via `wp-content/uploads/` (FTP/SSH).
3. Récupération des dates d’agenda (plugin actuel) : export CSV/ICS.

### Étape 2 — Réécriture éditoriale
Le contenu actuel est **trop court** pour un site premium. Demander à l’artiste :
- Biographie longue retravaillée (≈ 600 mots, FR + EN).
- 10 à 20 rôles précis du répertoire (compositeur · œuvre · rôle · langue).
- 4 à 8 citations presse vérifiables avec source + date + URL.
- Agenda confirmé sur 12 mois (date · titre · programme · lieu · URL billetterie).
- 15 à 30 photos retenues (orientation, droits d’usage).

### Étape 3 — Redirections 301 (nginx)
À ajouter dans `nginx/serafima.conf` quand les anciennes URLs seront connues :

```nginx
location ~* ^/(wp-admin|wp-login|wp-content|wp-includes|xmlrpc\.php) {
    return 410;
}
location = /biography/ { return 301 /bio; }
location = /presse/    { return 301 /press; }
# … etc.
```

### Étape 4 — DNS
1. Baisser le TTL à 300 s 24 h avant la bascule.
2. Préparer le nouveau VPS et tester via `serafima-liberman.com` en `/etc/hosts`.
3. Bascule DNS Cloudflare en mode proxy (orange).
4. Émission Let’s Encrypt.
5. Test complet (Lighthouse, redirections, formulaire, OG, schema).
6. Décommissionnement WordPress après 7 jours.

---

## 12. Démarrage local

### Prérequis
- **Node.js 20+**
- **npm 10+** (ou pnpm / bun)
- Les médias sont déjà copiés dans `public/media/`.

### Installation
```bash
npm install
cp .env.example .env.local      # éditer les valeurs
npm run dev                     # http://localhost:3000
```

### Scripts
| Commande | Action |
|---|---|
| `npm run dev` | Serveur de dev (HMR) |
| `npm run build` | Build de production (`output: standalone`) |
| `npm start` | Sert le build (port 3000) |
| `npm run lint` | ESLint Next.js core-web-vitals |
| `npm run typecheck` | TypeScript strict, no-emit |

### Variables d’environnement

| Clé | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canonique (ex. `https://www.serafima-liberman.com`) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Domaine Plausible (optionnel) |
| `RESEND_API_KEY` | Clé Resend pour le formulaire de contact |
| `CONTACT_TO_EMAIL` | Destinataire (par défaut `serafimaliberman@gmail.com`) |
| `CONTACT_FROM_EMAIL` | Émetteur vérifié sur Resend |

---

## 13. Déploiement VPS — pas à pas

> Cible : **VPS Hetzner CX22** (4,50 €/mois), Ubuntu 24.04 LTS, IPv4/IPv6.
> Option recommandée : **Coolify** pour un déploiement git-push.
> Option pure : Docker compose en SSH.

### A. Préparation du serveur (5 min)

```bash
ssh root@<VPS_IP>

# Mises à jour + outils
apt update && apt upgrade -y
apt install -y curl ufw fail2ban git

# Firewall
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Docker + Compose plugin (officiel)
curl -fsSL https://get.docker.com | sh
apt install -y docker-compose-plugin

# Utilisateur non-root
adduser --disabled-password --gecos "" deploy
usermod -aG docker deploy
mkdir -p /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
```

### B. DNS — Cloudflare

| Type | Nom | Valeur | Proxy |
|---|---|---|---|
| A | `@` | `<VPS_IP>` | 🟠 |
| A | `www` | `<VPS_IP>` | 🟠 |
| CAA | `@` | `0 issue "letsencrypt.org"` | — |

### C. Certificats Let’s Encrypt

```bash
# Sur Ubuntu 24.04 — snap est la méthode recommandée par Canonical
snap install --classic certbot
ln -s /snap/bin/certbot /usr/bin/certbot

systemctl stop nginx 2>/dev/null || true
certbot certonly --standalone \
  -d serafima-liberman.com -d www.serafima-liberman.com \
  -m serafimaliberman@gmail.com --agree-tos --no-eff-email

# Renouvellement auto (snap le gère nativement via systemd timer — rien à faire)
# Vérification : systemctl status snap.certbot.renew.timer
```

### D. Déploiement applicatif

```bash
su - deploy
git clone https://github.com/<vous>/serafimawebsite.git serafima
cd serafima
cp .env.example .env
# éditer .env : RESEND_API_KEY etc.

docker compose up -d --build
docker compose ps
docker compose logs -f web
```

L’app écoute sur `127.0.0.1:3000`, Nginx termine TLS sur `443`, redirige `apex → www` et `http → https`, et met en cache `/media/*` et `/_next/static/*` pendant 1 an.

### E. Mise à jour ultérieure

```bash
cd /home/deploy/serafima
git pull
docker compose build web
docker compose up -d web
docker image prune -f
```

### F. Option Coolify (recommandée pour l’artiste)

1. `bash -c "$(curl -fsSL https://cdn.coollabs.io/coolify/install.sh)"` sur le VPS.
2. Coolify → New Resource → **Public Repository** → URL GitHub.
3. Build pack : **Dockerfile**.
4. Renseigner les variables d’environnement.
5. Activer auto-deploy sur `push main`.
6. Coolify gère TLS, healthchecks, rollbacks et logs depuis une UI.

### G. Sauvegardes
- Backup quotidien Hetzner (1,30 €/mois) — **à activer**.
- Snapshot avant chaque mise à jour majeure.
- Le site est *stateless* : seules `/etc/letsencrypt` et `.env` doivent être sauvegardés hors VPS.

---

## 14. Roadmap & estimation

### Sprint 0 — Cadrage (3 j)
Audit livré, validation DA, choix typo, palette.

### Sprint 1 — Design system & shell (5 j)
Tokens, polices, layout, nav, footer, curtain, hero, animations de base.

### Sprint 2 — Pages éditoriales (5 j)
Bio, Répertoire, Presse — contenu réel à intégrer.

### Sprint 3 — Médias & agenda (4 j)
Vidéo featured, galerie masonry, timeline événements, JSON-LD Event.

### Sprint 4 — Contact & SEO (2 j)
Resend, validation, anti-spam, OG dynamique, sitemap, schema.

### Sprint 5 — Performance & QA (3 j)
Lighthouse run, accessibilité, recettage cross-device, copywriting final.

### Sprint 6 — Déploiement & migration (2 j)
VPS, certbot, Cloudflare, redirections 301, monitoring.

### Sprint 7 — Soft launch (1 j) + suivi (1 mois)
Bascule DNS, surveillance, ajustements.

**Total : ~25 jours · ~5 semaines.**

### Estimation budgétaire indicative
| Poste | Fourchette |
|---|---|
| Direction artistique + design | 4 000 – 6 000 € |
| Développement Next.js | 6 000 – 9 000 € |
| Photo/vidéo additionnelle (recommandée) | 2 500 – 5 000 € |
| Copywriting éditorial FR/EN | 1 500 – 2 500 € |
| Infra & déploiement | 600 – 1 000 € |
| **Total agence premium** | **14 600 – 23 500 €** |

**Coûts récurrents** : VPS 4,50 €/mois · Domaine 12 €/an · Resend gratuit < 3 000 mails/mois · Plausible 9 €/mois · Sauvegardes 1,30 €/mois.

---

## 15. Recommandations premium

1. **Shooting photo dédié** (½ journée studio + ½ journée scène) — c’est le **levier #1** d’élévation. Direction artistique noir/ivoire/lumière de scène. Budget 2,5–4 k€.
2. **Captation vidéo 1 air par saison** (4K, son pro, 2 caméras) — pour alimenter `/media`. Sans cela le site reste élégant mais silencieux.
3. **Voix off intro** (option) : 8–12 secondes de l’artiste sur le hero, *opt-in* utilisateur. Très rare, très signature.
4. **Mode FR/EN dès la v1.1** — public international.
5. **EPK PDF généré** côté serveur (route `/epk/[id].pdf`) — utile aux agents.
6. **CMS Directus** quand l’agenda dépasse 15 dates/an et que l’artiste veut éditer sans dev. Sinon, garder l’édition Git (plus rapide, plus sûr).
7. **Newsletter Buttondown** discrète — un seul mail par programmation, jamais de pop-up.
8. **Page presse protégée** (`/press/private?token=…`) avec photos HD + bio + technical rider — sur invitation.
9. **Réseau de redirections sociales propres** : `serafima-liberman.com/instagram`, `/youtube`, `/spotify`.
10. **Refus assumé du tracking publicitaire** — Plausible, pas de cookies, pas de bannière. C’est un **statement de marque**.

---

## Crédits

- Conception & développement : équipe digitale dédiée.
- Direction artistique : référents maisons d’opéra contemporaines.
- Typographies : Cormorant Garamond, EB Garamond, Inter (Google Fonts, open source).
- Hébergement médias : `/public/media` (assets fournis par l’artiste).

---

© Serafima Liberman. Tous droits réservés.
