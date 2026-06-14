export type SkillCategory = {
  id: string;
  name: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Front-end",
    skills: ["JavaScript ES6+", "Web Components / Custom Elements", "HTML5", "SCSS", "Less", "CSHTML / Razor (.NET MVC)"],
  },
  {
    id: "frameworks",
    name: "Frameworks",
    skills: ["React", "Next.js", "Redux"],
  },
  {
    id: "build",
    name: "Build & Tooling",
    skills: ["Webpack", "Babel", "NPM", "ESLint", "PostCSS", "Prettier"],
  },
  {
    id: "architecture",
    name: "Architecture",
    skills: ["Micro-frontends (MFE)", "Design Systems", "Web Components natifs", "Design Tokens"],
  },
  {
    id: "backend",
    name: "Back-end & Langages",
    skills: ["Node.js", "Python", "C#", ".NET", "C"],
  },
  {
    id: "cloud",
    name: "Cloud & Infra",
    skills: ["Microsoft Azure", "VMware", "Ansible", "Docker", "Kafka", "Cosmos DB"],
  },
  {
    id: "other",
    name: "Outils & Méthodes",
    skills: ["Figma", "Datadog", "Git", "Jira", "Agile / Scrum", "WCAG / RGAA", "SEO technique"],
  },
];
