# Portfolio — Julien Lange

Site portfolio personnel de Julien Lange, développeur JavaScript senior freelance.

**Stack :** Next.js 16 · TypeScript strict · Tailwind CSS v4 · Framer Motion · Vercel

---

## Installation & développement

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

### Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production (après build) |
| `npm run lint` | Linter ESLint |
| `npm run format` | Formatage Prettier |
| `npm run format:check` | Vérification du formatage |

---

## Variables d'environnement

Copier `.env.example` en `.env.local` et renseigner les valeurs :

```bash
cp .env.example .env.local
```

| Variable | Obligatoire | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Non | URL de production (défaut : `https://julien-lange.dev`) |
| `RESEND_API_KEY` | Non | Clé API Resend pour le formulaire de contact. Si absente, le formulaire affiche un fallback mailto. |

---

## Ajouter le CV PDF

Le lien "Télécharger mon CV" pointe vers `/public/CV_Julien_Lange.pdf`.

Un fichier `.docx` est présent dans `/public/`. Pour activer le téléchargement :

1. Convertir `CV_Julien_Lange.docx` en PDF (Google Docs, Word, LibreOffice…)
2. Placer le fichier PDF dans `/public/CV_Julien_Lange.pdf`

---

## Configurer le formulaire de contact (Resend)

1. Créer un compte sur [resend.com](https://resend.com)
2. Ajouter et vérifier le domaine `julien-lange.dev` (ou utiliser l'email de test Resend)
3. Créer une clé API
4. Ajouter `RESEND_API_KEY=re_xxxxx` dans `.env.local` (dev) ou dans les variables Vercel (prod)

Sans clé, le formulaire reste fonctionnel avec un fallback vers `mailto:`.

---

## Modifier le contenu

Tout le contenu est centralisé dans `lib/data/` — éditable en TypeScript :

| Fichier | Contenu |
|---|---|
| `lib/data/site.ts` | Nom, email, LinkedIn, GitHub, URL du site |
| `lib/data/experiences.ts` | Expériences professionnelles (timeline) |
| `lib/data/skills.ts` | Compétences par catégorie |
| `lib/data/projects.ts` | Projets clés |
| `lib/data/education.ts` | Formation & certifications |

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
│   ├── layout.tsx          # Layout racine (fonts, analytics, JSON-LD)
│   ├── page.tsx            # Page principale
│   ├── globals.css         # Styles globaux + palette CSS
│   ├── opengraph-image.tsx # Image OG générée dynamiquement
│   ├── sitemap.ts
│   ├── robots.ts
│   └── api/contact/
│       └── route.ts        # API Resend avec fallback mailto
├── components/
│   ├── layout/             # Nav sticky, Footer
│   ├── sections/           # Hero, Experience, Skills, Projects, Education, Contact
│   └── ui/                 # Badge, Section, TimelineItem, ThemeToggle, SkipLink
├── lib/
│   ├── data/               # Contenu statique TypeScript
│   └── utils.ts
└── public/
    ├── CV_Julien_Lange.pdf # À ajouter
    ├── favicon.svg
    └── manifest.json
```

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
- `prefers-reduced-motion` respecté (via Framer Motion `MotionConfig` + CSS)

## Analytics

Vercel Web Analytics + Speed Insights (cookieless, sans bannière).

Événements trackés :
- `cv_download` — clic sur "Télécharger mon CV"
- `linkedin_click` — clic sur LinkedIn
- `github_click` — clic sur GitHub
- `contact_form_submit` — soumission réussie du formulaire
