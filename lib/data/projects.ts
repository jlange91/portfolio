export type Project = {
  id: string;
  title: string;
  context: string;
  description: string;
  tags: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    id: "smile",
    title: "SMILE — Refonte CMS interne",
    context: "Fnac Darty",
    description:
      "Conception des maquettes Figma en autonomie et refonte technique complète du front d'un CMS interne. Déployé en production et utilisé quotidiennement par ~50 éditeurs de contenu sur 8 marchés (France, Belgique, Suisse, Espagne, Portugal, Fnac Pro).",
    tags: ["Figma", "JavaScript", "Web Components", "CMS", "8 marchés"],
  },
  {
    id: "web-components-lib",
    title: "Librairie Web Components / Design System",
    context: "Fnac Darty",
    description:
      "Création et maintenance d'une librairie NPM interne de 20 à 30 composants UI en Custom Elements natifs, consommée par 3 équipes front sur fnac.com. Packages partagés (design tokens SCSS, configs ESLint/Babel communes) constituant le socle d'un Design System.",
    tags: ["Web Components", "Custom Elements", "NPM", "Design Tokens", "SCSS", "ESLint"],
  },
  {
    id: "42-lisboa-ecommerce",
    title: "Site e-commerce Next.js — 42 Lisboa",
    context: "42 Lisboa",
    description:
      "Site de merchandising pour l'école 42 Lisboa : catalogue produits, authentification OAuth via l'API officielle de 42, gestion des commandes. Développé en autonomie, from scratch, déployé en production.",
    tags: ["Next.js", "TypeScript", "OAuth", "API 42", "E-commerce", "Node.js"],
  },
  {
    id: "robot-pepper",
    title: "Robot Pepper — Interface web",
    context: "Société Générale",
    description:
      "Interface web et cas d'usage pour le robot conversationnel Pepper de Softbank Robotics, développé au sein du Lab Innovation de la Société Générale et mis en production dans les agences bancaires.",
    tags: ["React", "Redux", "JavaScript ES6", "Python", "Docker", "Webpack"],
  },
];
