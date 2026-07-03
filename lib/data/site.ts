export const siteConfig = {
  name: "Julien Lange",
  title: "Julien Lange — Développeur JavaScript Senior | Web Components, Design System, Fullstack",
  description:
    "Développeur web senior freelance, ~5 ans chez Fnac Darty sur des pages à 100 000+ visites/jour. Spécialisé Web Components, Design Systems et architecture micro-frontends. En transition vers des missions fullstack (Next.js, Node.js, Python).",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://julienlange.dev",
  locale: "fr",
  jobTitle: "Développeur JavaScript Senior — Web Components, Design System & Fullstack",
  location: "Île-de-France",
  // Alias « brûlable » (redirection DNS vers la vraie boîte). On expose ce
  // couple user/domain plutôt que l'adresse concaténée pour permettre
  // l'obfuscation côté client (cf. components/ui/ObfuscatedEmail.tsx).
  emailUser: "contact",
  emailDomain: "julienlange.dev",
  get email() {
    return `${this.emailUser}@${this.emailDomain}`;
  },
  linkedin: "https://www.linkedin.com/in/julien-lange-870a52112/",
  github: "https://github.com/jlange91",
  cvPath: "/CV_Julien_Lange.pdf",
} as const;
