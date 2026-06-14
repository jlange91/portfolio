export type EducationItem = {
  id: string;
  institution: string;
  degree: string;
  period: string;
  description: string;
  type: "degree" | "certification";
};

export const educationItems: EducationItem[] = [
  {
    id: "42",
    institution: "École 42",
    degree: "Architecte en technologie de l'information",
    period: "2016 — 2019",
    description:
      "Formation intensive par projets et peer learning. Programmation C, C++, Shell scripting, algorithmie, Unix, réseaux, systèmes. Pédagogie sans cours magistraux, 100% pratique et collaborative.",
    type: "degree",
  },
  {
    id: "bac",
    institution: "Lycée Rosa Parks",
    degree: "Baccalauréat STI2D",
    period: "2016",
    description:
      "Sciences et Technologies de l'Industrie et du Développement Durable, spécialité informatique et numérique.",
    type: "degree",
  },
  {
    id: "wcag",
    institution: "Fnac Darty — Formation interne",
    degree: "Accessibilité web (WCAG / RGAA)",
    period: "Mars 2025",
    description:
      "Formation sur les référentiels WCAG 2.1 et RGAA 4.1 : critères d'accessibilité, tests avec lecteurs d'écran, audits techniques.",
    type: "certification",
  },
  {
    id: "ai-copilot",
    institution: "Fnac Darty — Formation interne",
    degree: "IA & GitHub Copilot",
    period: "Juin 2025",
    description:
      "Utilisation de l'IA générative dans les workflows de développement : GitHub Copilot, prompt engineering, bonnes pratiques.",
    type: "certification",
  },
  {
    id: "azure",
    institution: "Fnac Darty — Formation interne",
    degree: "Microsoft Azure Cloud",
    period: "2022",
    description:
      "Fondamentaux Azure : services cloud, architecture distribuée, Cosmos DB, Kafka, déploiement d'applications.",
    type: "certification",
  },
  {
    id: "design-thinker",
    institution: "Formation externe",
    degree: "Design Thinker",
    period: "2022",
    description:
      "Méthodologie Design Thinking : empathie, idéation, prototypage, test utilisateur. Application sur des projets concrets.",
    type: "certification",
  },
];
