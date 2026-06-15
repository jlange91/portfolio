export type SkillCategory = {
  id: string;
  name: string;
  radarLabel: string;
  level: number; // 0-100
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Front-end",
    radarLabel: "Front-end",
    level: 95,
    skills: [
      "JavaScript ES6+",
      "Web Components / Custom Elements",
      "HTML5",
      "SCSS",
      "Less",
      "CSHTML / Razor (.NET MVC)",
    ],
  },
  {
    id: "frameworks",
    name: "Frameworks",
    radarLabel: "Frameworks",
    level: 90,
    skills: ["React", "Next.js", "Redux"],
  },
  {
    id: "build",
    name: "Build & Tooling",
    radarLabel: "Build",
    level: 78,
    skills: ["Webpack", "Babel", "NPM", "ESLint", "PostCSS", "Prettier"],
  },
  {
    id: "architecture",
    name: "Architecture",
    radarLabel: "Architecture",
    level: 85,
    skills: ["Micro-frontends (MFE)", "Design Systems", "Web Components natifs", "Design Tokens"],
  },
  {
    id: "backend",
    name: "Back-end & Langages",
    radarLabel: "Back-end",
    level: 62,
    skills: ["Node.js", "Python", "C#", ".NET", "C"],
  },
  {
    id: "cloud",
    name: "Cloud & Infra",
    radarLabel: "Cloud & Infra",
    level: 68,
    skills: ["Microsoft Azure", "VMware", "Ansible", "Docker", "Kafka", "Cosmos DB"],
  },
  {
    id: "other",
    name: "Outils & Méthodes",
    radarLabel: "Méthodes",
    level: 80,
    skills: ["Figma", "Datadog", "Git", "Jira", "Agile / Scrum", "WCAG / RGAA", "SEO technique"],
  },
];
