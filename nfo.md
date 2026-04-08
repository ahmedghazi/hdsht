# HDSHT.pink

Site vitrine pour HDSHT, construit avec Nuxt 4 + Sanity CMS. Multilingue FR/EN, focus animations GSAP, système de filtres projets, lecture vidéo Mux.

## Tech Stack

### Frontend
- **Nuxt 4** - Vue framework (App Router)
- **Vue 3** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling (via `@theme static`)
- **SASS** - Styles complémentaires (`assets/css/index.scss`)

### Animation & Interaction
- **GSAP 3** - Animations (scroll-triggered, page transitions)
- **PhiberMouse** - Curseur custom (composant interne)

### Media
- **@mux/mux-player** - Lecteur vidéo Mux
- **@selemondev/vue3-marquee** - Marquee animé
- **vue-marquee-slider** - Marquee alternatif

### Content Management
- **url**: https://hdshtpink--studio.sanity.studio/
- **Sanity CMS** - Headless CMS
  - Project ID: `9t2gkolo`
  - Dataset: `production`
  - Preview: `https://hdsht-preprod.vercel.app`
- **@nuxtjs/sanity** - Nuxt integration
- **@sanity/client** - Sanity JS client
- **@sanity/image-url** - Image URL builder (CDN)
- **@portabletext/vue** - Rich text rendering
- **sanity-plugin-mux-input** - Gestion vidéos Mux dans Studio

### Internationalisation
- **@nuxtjs/i18n** - FR/EN, strategy `no_prefix`, cookie-based

### UI
- **@nuxt/ui** - Composants UI
- **@nuxt/fonts** - Fonts locales auto-découverte (`public/fonts/`)

### Outils
- **pnpm** - Package manager
- **ESLint + Prettier** - Linting/formatting

## Project Structure

```
www/
├── web/                              # Nuxt 4 application
│   ├── app/
│   │   ├── components/
│   │   │   ├── modules/             # Content modules (ContentModules.vue)
│   │   │   ├── ui/                  # UI components
│   │   │   ├── ProjectsFilters/     # Système de filtres projets
│   │   │   ├── Header.vue / Footer.vue / Nav.vue
│   │   │   ├── ProjectCard.vue / ProjectCardImg.vue / ProjectCardTxt.vue
│   │   │   ├── CardImg.vue / CardVid.vue
│   │   │   ├── ListProjectsImg.vue / ListProjectsTxt.vue
│   │   │   └── PhiberMouse.vue      # Curseur custom
│   │   ├── pages/
│   │   │   ├── index.vue            # Home
│   │   │   ├── [slug].vue           # Pages modulaires dynamiques
│   │   │   ├── prjct/[slug].vue     # Pages projet
│   │   │   ├── system.vue           # Design system / debug
│   │   │   └── sample.vue
│   │   ├── composables/             # Composables Vue
│   │   ├── plugins/
│   │   │   └── localize.ts          # Plugin localisation
│   │   ├── config/                  # Config partagée
│   │   ├── layouts/                 # Layouts Nuxt
│   │   ├── utils/                   # Utilitaires
│   │   └── assets/
│   │       └── css/
│   │           ├── main.css         # Tailwind + @theme static + CSS vars
│   │           └── index.scss       # Styles globaux SASS
│   ├── public/
│   │   └── fonts/                   # Fonts locales (auto-découverte @nuxt/fonts)
│   ├── nuxt.config.ts
│   └── .env
├── studio/                           # Sanity Studio
│   ├── schemaTypes/
│   │   ├── documents/               # project, pageModulaire, person, client,
│   │   │                            # contribution, location, service, tag
│   │   ├── singletons/              # home, infos, settings
│   │   ├── objects/                 # Objets réutilisables
│   │   ├── features/                # Features Sanity
│   │   ├── fields/                  # Champs partagés
│   │   ├── locale/                  # Champs localisés FR/EN
│   │   └── misc/
│   ├── scripts/
│   │   └── auto-extend-types.js     # Post-typegen: extend sanity.types.ts
│   └── sanity.config.ts
├── memory/                           # Notes projet locales
├── DOC.md                            # Documentation complémentaire
└── nfo.md                            # Ce fichier
```

## Content Modules System

Modules rendus via `app/components/ContentModules.vue` :

| # | Composant | Description |
|---|-----------|-------------|
| 1 | ModuleTextUI | Bloc texte |
| 2 | ModuleImagesUI | Galerie images |
| 3 | ModuleMediaUI | Média (image/vidéo) |
| 4 | ModuleVideoUI | Vidéo Mux |
| 5 | ModuleServicesUI | Liste services |
| 6 | ModuleClientsUI | Grille clients |
| 7 | ModuleContactsUI | Contacts / team |
| 8 | ModuleLocationMapUI | Carte / localisation |
| 9 | ModuleGranularStripeUI | Stripe décoratif |
| 10 | ModuleListProjectsUI | Liste projets filtrés |

### Sanity Document Types

**Documents**
- `project` — Projets (avec `imageCover`, `media` Mux, `tags`, `relatedProjects`)
- `pageModulaire` — Pages génériques modulaires
- `person` — Membres d'équipe
- `client` — Clients
- `contribution` — Contributions
- `location` — Localisations
- `service` — Services proposés
- `tag` — Tags projets (pour filtres)

**Singletons**
- `home` — Page d'accueil
- `infos` — Page infos / about
- `settings` — Paramètres globaux (nav, footer, SEO)

## Key Features

### Animations & UX
- GSAP animations (scroll-triggered, entrées de page)
- Curseur custom PhiberMouse
- Page transitions

### Système de filtres projets
- Composant `ProjectsFilters/` avec `FilterSelect`
- Filtres par tags + tri (sort)
- Vues : image (`ListProjectsImg`) ou texte (`ListProjectsTxt`)

### Internationalisation
- FR/EN via `@nuxtjs/i18n`
- Plugin `localize.ts` pour helpers de localisation Sanity
- Champs Sanity localisés (`locale/`)

### Design System (CSS Custom Properties)
Défini dans `app/assets/css/main.css` via `@theme static` :

```css
/* Colors */
--color-black: rgba(44, 44, 44, 1)
--color-white: rgba(254, 254, 254, 1)
--color-bg: rgba(44, 44, 44, 1)      /* fond sombre */
--color-primary: rgba(254, 254, 254, 1)

/* Fonts */
--font-primary: CooperHewitt-Book (locale)
--font-secondary: Display Dots (locale)
--font-tertiary: Helvetica Neue
--font-quaternary: Instrument Serif (Google)

/* Spacing */
--spacing-xs / --spacing-sm / --spacing-md / --spacing-lg / --spacing-xl

/* Layout */
--gutter: 1rem
--header-h: 43.5px
```

## Environment Variables

```env
SANITY_PROJECT_ID=9t2gkolo
SANITY_DATASET=production
SANITY_API_READ_TOKEN=
```

## Scripts

```bash
# Web (Nuxt)
pnpm dev          # Dev server
pnpm build        # Build production
pnpm preview      # Preview build
pnpm lint         # ESLint
pnpm typecheck    # Vue/TS typecheck

# Studio (Sanity)
pnpm dev          # Studio dev
pnpm build        # Build Studio
pnpm deploy       # Deploy Studio + typegen
pnpm typegen      # Générer sanity.types.ts + auto-extend-types.js
pnpm d            # deploy + typegen (alias)
```

## Deployment
- **Web** : Vercel — `https://hdsht-preprod.vercel.app` (preprod)
- **Studio** : Sanity hosted — `https://hdshtpink--studio.sanity.studio/`

## Typegen Flow

```
sanity typegen generate
  → studio/sanity.types.ts (auto-généré, NE PAS ÉDITER)
  → scripts/auto-extend-types.js
    → web/app/config/sanity-expanded.types.ts (NE PAS ÉDITER)
```

Pour modifier les types : modifier la query GROQ → relancer `pnpm typegen`.

---

## Recent Updates

### Avril 2026

1. **Filtres projets & vues liste** (`297b1e3d`)
   - Hover states sur `ProjectCardTxt`, `FilterSelect`, `ProjectsFilters`
   - Vues image/texte (`ListProjectsImg`, `ListProjectsTxt`)
   - `ModuleListProjectsUI` : logique filtres + sort

2. **Projets liés & curseur custom** (`f9949a62`, `2e5f1109`)
   - `relatedProjects` dans les pages projet
   - Composant `PhiberMouse` (curseur magnétique)

3. **Animations GSAP v1** (`d27f2557`)
   - Scroll-triggered, entrées de page

4. **Lecteur vidéo Mux** (`6560be1b`)
   - `CardVid` avec aspect ratio correct
   - `ModuleVideoUI`

5. **Navigation & footer** (`8ba7823b`)
   - Nav, Footer, structure layout

6. **Init projet** (`44597aad`)
   - Setup Nuxt 4 + Sanity + i18n + GSAP

<!-- Format : titre descriptif + hash git court + bullet points des changements clés -->
