export type Highlight = {
  id: string;
  tags: string[];
};

export type Experience = {
  id: string;
  company: string;
  image?: string;
  type: string;
  startDate: string;
  endDate: string;
  location: string;
  highlights: Highlight[];
};

export const experiences: Experience[] = [
  {
    id: "fnac-darty",
    company: "Fnac Darty",
    type: "Freelance",
    startDate: "Octobre 2021",
    endDate: "Juillet 2026",
    location: "Ivry-sur-Seine",
    highlights: [
      {
        id: "web-components-lib",
        tags: ["Web Components", "Custom Elements", "NPM", "Design Tokens", "SCSS", "ESLint"],
      },
      {
        id: "migration-cloud",
        tags: ["Micro-frontends", "Azure", "Razor/CSHTML", "Kafka", "Cosmos DB", "SCSS"],
      },
      { id: "smile", tags: ["Figma", "CMS", "JavaScript", "8 marchés", "50 éditeurs"] },
      { id: "kamino", tags: ["JavaScript", "Publicité display", "Analytics", "Responsive"] },
      { id: "arrow", tags: ["JavaScript", "Web Components", "Marketplace", "Razor"] },
      { id: "autres", tags: ["WebPerf", "Core Web Vitals", "SEO", "DSA", "A/B Testing"] },
    ],
  },
  {
    id: "42-lisboa",
    image: "/img/42Lisboa.png",
    company: "42 Lisboa",
    type: "CDI",
    startDate: "Septembre 2020",
    endDate: "Juillet 2021",
    location: "Lisbonne, Portugal",
    highlights: [
      { id: "infra", tags: ["VMware", "Ansible", "LDAP", "Linux", "DevOps"] },
      { id: "ecommerce", tags: ["Next.js", "OAuth", "API 42", "E-commerce", "Node.js"] },
      { id: "pedagogie", tags: ["C", "Code Review", "Pédagogie", "École 42"] },
    ],
  },
  {
    id: "xfab",
    image: "/img/xfab.png",
    company: "X-FAB",
    type: "Freelance",
    startDate: "Mars 2020",
    endDate: "Septembre 2020",
    location: "Ormoy",
    highlights: [
      { id: "secsgem", tags: ["C", "SECS/GEM", "Systèmes industriels", "Semi-conducteurs"] },
    ],
  },
  {
    id: "societe-generale",
    company: "Société Générale",
    type: "Stage",
    startDate: "Avril 2018",
    endDate: "Novembre 2018",
    location: "Paris",
    highlights: [
      { id: "pepper", tags: ["JavaScript ES6", "Python", "React", "Redux", "Webpack", "Docker"] },
      { id: "microservices", tags: ["Python", "Docker", "Swagger", "Microservices", "REST API"] },
    ],
  },
];
