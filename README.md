# Portfolio — Julien Lange

Site portfolio personnel de Julien Lange, développeur JavaScript senior freelance.

**Stack :** Next.js 16 · TypeScript strict · Tailwind CSS v4 · Framer Motion · next-intl · Vercel

---

## Installation & développement

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

### Scripts disponibles

| Commande               | Description                         |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Serveur de développement            |
| `npm run build`        | Build de production                 |
| `npm run start`        | Serveur de production (après build) |
| `npm run lint`         | Linter ESLint                       |
| `npm run format`       | Formatage Prettier                  |
| `npm run format:check` | Vérification du formatage           |
| `npm test`             | Tests unitaires (Vitest)            |
| `npm run test:watch`   | Tests en mode watch                 |

---

## Variables d'environnement

Copier `.env.example` en `.env.local` et renseigner les valeurs :

```bash
cp .env.example .env.local
```

| Variable               | Obligatoire | Description                                                                                         |
| ---------------------- | ----------- | --------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Non         | URL de production (défaut : `https://julienlange.dev`)                                              |
| `RESEND_API_KEY`       | Non         | Clé API Resend pour le formulaire de contact. Si absente, le formulaire affiche un fallback mailto. |

> Le formulaire de contact inclut un rate limiting (5 requêtes/heure par IP) et une validation Zod côté serveur.

---

## Internationalisation

Le site est disponible en français (`/fr`) et en anglais (`/en`), via [next-intl](https://next-intl.dev) sans middleware — la locale est lue depuis le segment d'URL `[locale]`.

Les traductions sont dans `messages/fr.json` et `messages/en.json`.

Pour ajouter une locale : mettre à jour `routing.locales` dans `i18n/routing.ts` et créer le fichier JSON correspondant dans `messages/`.

---

## Ajouter le CV PDF

Les liens "Télécharger mon CV" pointent vers `/public/CV_Julien_Lange.pdf` (FR) et `/public/CV_Julien_Lange_EN.pdf` (EN).

Des fichiers `.docx` sont présents dans `/public/`. Pour activer les téléchargements :

1. Convertir `CV_Julien_Lange.docx` → `CV_Julien_Lange.pdf`
2. Convertir `CV_Julien_Lange_EN.docx` → `CV_Julien_Lange_EN.pdf`
3. Placer les PDFs dans `/public/`

---

## Configurer le formulaire de contact (Resend)

1. Créer un compte sur [resend.com](https://resend.com)
2. Ajouter et vérifier le domaine `julienlange.dev` (ou utiliser l'email de test Resend)
3. Créer une clé API
4. Ajouter `RESEND_API_KEY=re_xxxxx` dans `.env.local` (dev) ou dans les variables Vercel (prod)

Sans clé, le formulaire reste fonctionnel avec un fallback vers `mailto:`.

Le formulaire fonctionne également sans JavaScript : soumission native HTML (`action`/`method="POST"`) avec redirection 303 vers une page de confirmation (`/[locale]/merci`).

---

## Modifier le contenu

Tout le contenu est centralisé dans `lib/data/` — éditable en TypeScript :

| Fichier                   | Contenu                                                |
| ------------------------- | ------------------------------------------------------ |
| `lib/data/site.ts`        | Nom, email, LinkedIn, GitHub, URL du site              |
| `lib/data/experiences.ts` | Expériences professionnelles (timeline)                |
| `lib/data/skills.ts`      | Compétences par catégorie (avec `level` pour le radar) |
| `lib/data/projects.ts`    | Projets clés                                           |
| `lib/data/education.ts`   | Formation & certifications                             |

Les libellés visibles (titres de sections, labels de formulaire, etc.) sont dans `messages/fr.json` et `messages/en.json`.

---

## Déploiement sur Vercel

1. Pusher le projet sur un dépôt GitHub
2. Importer le repo sur [vercel.com/new](https://vercel.com/new)
3. Framework : **Next.js** (détecté automatiquement)
4. Ajouter les variables d'environnement dans Vercel → Settings → Environment Variables :
   - `NEXT_PUBLIC_SITE_URL` → `https://votre-domaine.com`
   - `RESEND_API_KEY` → votre clé Resend (optionnel)
5. Déployer

Le formulaire de contact utilise une API Route Next.js — Vercel la déploie automatiquement en Serverless Function.

---

## Structure du projet

```
portfolio/
├── app/
│   ├── layout.tsx              # Layout racine (fonts, analytics, classe no-js)
│   ├── globals.css             # Styles globaux + règles .no-js (progressive enhancement)
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── [locale]/
│   │   ├── layout.tsx          # Layout localisé (next-intl, generateStaticParams)
│   │   ├── page.tsx            # Page principale
│   │   └── merci/
│   │       └── page.tsx        # Page de confirmation post-formulaire (fallback no-JS)
│   └── api/contact/
│       └── route.ts            # API Resend — JSON + form-data natif, validation Zod, rate limiting
├── components/
│   ├── layout/                 # Nav sticky (focus trap mobile), LangSwitcher, Footer
│   ├── sections/               # Hero, Experience, Skills (radar SVG), Projects, Education, Contact
│   └── ui/                     # Badge, Section, TimelineItem, ThemeToggle, SkipLink, RadarChart
├── i18n/
│   ├── routing.ts              # Locales disponibles (fr, en)
│   ├── request.ts              # Configuration next-intl (getRequestConfig)
│   └── navigation.ts           # Link, redirect, useRouter localisés
├── messages/
│   ├── fr.json                 # Traductions françaises
│   └── en.json                 # Traductions anglaises
├── __tests__/
│   ├── contact-route.test.ts   # Tests unitaires de la route API
│   └── RadarChart.test.tsx     # Tests du composant SVG radar
├── lib/
│   ├── data/                   # Contenu statique TypeScript
│   └── utils.ts
├── next.config.ts              # Security headers (CSP, X-Frame-Options…)
├── vitest.config.ts            # Config Vitest
└── public/
    ├── CV_Julien_Lange.pdf     # À ajouter
    ├── CV_Julien_Lange_EN.pdf  # À ajouter
    ├── favicon.svg
    └── manifest.json
```

---

## Progressive Enhancement (sans JavaScript)

Le site est entièrement fonctionnel sans JavaScript :

- **Contenu visible** : la classe `no-js` sur `<html>` (retirée par un script inline si JS est actif) active des règles CSS dans `globals.css` qui neutralisent les états initiaux de Framer Motion (`opacity: 0`, `transform`).
- **Formulaire de contact** : soumission native via `action`/`method`, redirection 303 vers `/[locale]/merci` en cas de succès.
- **Sélecteur de langue** : lien `<a href>` ordinaire — JS intercepte le clic pour une navigation SPA ; sans JS, lien direct vers la racine de la locale cible.
- **Menu mobile** : masqué sans JS (bouton inutile sans JS) — les liens de navigation desktop restent accessibles.
- **Thème** : dark par défaut (classe `.dark` hardcodée côté serveur).

> Tester avec les Shields de Brave (icône lion → Block scripts) ou les Site Settings du navigateur. Le "Disable JavaScript" des DevTools Chrome/Brave ne désactive pas réellement l'exécution.

---

## Accessibilité

Le site implémente les bonnes pratiques WCAG 2.1 AA :

- Lien "skip to content" pour la navigation clavier
- HTML sémantique (`nav`, `main`, `section`, `header`, `footer`, `article`)
- Labels sur tous les champs de formulaire
- `alt` descriptifs sur toutes les images
- Focus visible (outline personnalisé cohérent avec le design)
- Contrastes conformes WCAG AA sur fond sombre et fond clair
- `aria-label` sur les liens dont le texte seul n'est pas suffisant
- `prefers-reduced-motion` respecté (via Framer Motion `useReducedMotion` + CSS)
- `aria-live="polite"` persistant dans le formulaire (annonce les états chargement/erreur/succès aux lecteurs d'écran)
- Focus déplacé automatiquement sur le message de confirmation après envoi
- Focus trap dans le menu mobile + fermeture par `Escape` avec retour du focus sur le bouton hamburger

## Sécurité

Headers HTTP configurés dans `next.config.ts` pour toutes les routes :

- `Content-Security-Policy` (adapté à Next.js + Vercel Analytics)
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

Côté API : validation Zod des entrées, échappement HTML de tous les champs dans l'email sortant, validation de la locale contre les valeurs autorisées avant toute redirection.

## Tests

```bash
npm test           # run once
npm run test:watch # mode watch
```

Couverture actuelle :

| Fichier                           | Ce qui est testé                                       |
| --------------------------------- | ------------------------------------------------------ |
| `__tests__/contact-route.test.ts` | Validation Zod, trim, rate limiting (429), réponse 200 |
| `__tests__/RadarChart.test.tsx`   | Rendu SVG, labels, axes, attribut aria-label           |

## Analytics

Vercel Web Analytics + Speed Insights (cookieless, sans bannière).

Événements trackés :

- `cv_download` — clic sur "Télécharger mon CV"
- `linkedin_click` — clic sur LinkedIn
- `github_click` — clic sur GitHub
- `contact_form_submit` — soumission réussie du formulaire
